"""
Procedural 32x32 pixel-art piece renderer for AuraChess v2.

Every piece is drawn from code -- no image files. Base sprites are built
once per faction/colour/type, then animated at draw time through four
states (idle, walk, attack, death). Each individual piece is given a
unique variation seed so no two pieces ever animate in sync: the seed
controls bob height, speed, frame phase and a subtle RGB tint.
"""

import math
import random

import pygame

from themes import faction_palette

SPRITE = 32          # native pixel-art resolution


# ----------------------------------------------------------------------
# low-level drawing helpers (operate on a 32x32 surface)
# ----------------------------------------------------------------------
def _new_surface():
    return pygame.Surface((SPRITE, SPRITE), pygame.SRCALPHA)


def _outline(surf, edge):
    """Wrap every opaque cluster in a 1px edge colour."""
    opaque = [[surf.get_at((x, y))[3] > 24 for x in range(SPRITE)]
              for y in range(SPRITE)]
    border = []
    for y in range(SPRITE):
        for x in range(SPRITE):
            if opaque[y][x]:
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1),
                           (1, 1), (-1, -1), (1, -1), (-1, 1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < SPRITE and 0 <= ny < SPRITE and opaque[ny][nx]:
                    border.append((x, y))
                    break
    for (x, y) in border:
        surf.set_at((x, y), (*edge, 255))


def _pedestal(surf, pal):
    pygame.draw.polygon(surf, pal["shade"],
                        [(7, 30), (25, 30), (22, 25), (10, 25)])
    pygame.draw.polygon(surf, pal["body"],
                        [(9, 28), (23, 28), (21, 25), (11, 25)])
    pygame.draw.line(surf, pal["light"], (11, 26), (20, 26))


def _robe(surf, pal, top_y, top_w, base_w):
    """A shaded trapezoidal robe / gown from shoulders to the pedestal."""
    cx = 16
    th, bh = top_w // 2, base_w // 2
    pygame.draw.polygon(surf, pal["body"],
                        [(cx - th, top_y), (cx + th, top_y),
                         (cx + bh, 26), (cx - bh, 26)])
    pygame.draw.polygon(surf, pal["light"],
                        [(cx - th, top_y), (cx - th + 2, top_y),
                         (cx - bh + 2, 26), (cx - bh, 26)])
    pygame.draw.polygon(surf, pal["shade"],
                        [(cx + th - 2, top_y), (cx + th, top_y),
                         (cx + bh, 26), (cx + bh - 2, 26)])
    pygame.draw.line(surf, pal["accent"], (cx - th, top_y + 5),
                     (cx + th, top_y + 5))


def _head(surf, pal, cx, cy, radius):
    pygame.draw.circle(surf, pal["skin"], (cx, cy), radius)
    pygame.draw.circle(surf, pal["shade"], (cx + radius - 2, cy + 1), 1)


def _eyes(surf, cy, dark=(30, 26, 24)):
    surf.set_at((14, cy), (*dark, 255))
    surf.set_at((18, cy), (*dark, 255))


# ----------------------------------------------------------------------
# faction headgear, sized for a pawn head at (16, 12) radius 4
# ----------------------------------------------------------------------
def _pawn_gear(surf, pal, gear):
    if gear == "bearskin":
        pygame.draw.ellipse(surf, (26, 24, 28), (11, 0, 10, 13))
        pygame.draw.ellipse(surf, (60, 56, 62), (13, 2, 3, 5))
        pygame.draw.line(surf, pal["accent"], (12, 10), (20, 10))
    elif gear == "helmet":
        pygame.draw.circle(surf, pal["metal"], (16, 11), 5)
        pygame.draw.rect(surf, pal["skin"], (11, 13, 11, 4))
        pygame.draw.line(surf, pal["shade"], (11, 12), (21, 12))
        pygame.draw.arc(surf, pal["light"], (12, 6, 8, 9), 0.5, 2.5, 1)
    elif gear == "turban":
        pygame.draw.ellipse(surf, pal["body"], (10, 4, 12, 10))
        pygame.draw.ellipse(surf, pal["light"], (12, 6, 4, 4))
        pygame.draw.rect(surf, pal["skin"], (12, 12, 8, 5))
        pygame.draw.circle(surf, pal["metal"], (16, 6), 1)
    elif gear == "hood":
        pygame.draw.circle(surf, pal["body"], (16, 11), 6)
        pygame.draw.rect(surf, pal["shade"], (10, 12, 12, 4))
        surf.set_at((14, 13), (*pal["accent"], 255))
        surf.set_at((18, 13), (*pal["accent"], 255))
    elif gear == "greathelm":
        pygame.draw.ellipse(surf, pal["metal"], (11, 5, 10, 13))
        pygame.draw.rect(surf, pal["shade"], (11, 12, 10, 2))
        pygame.draw.line(surf, pal["light"], (13, 8), (13, 16))
    elif gear == "ears":
        pygame.draw.circle(surf, pal["skin"], (11, 10), 3)
        pygame.draw.circle(surf, pal["skin"], (21, 10), 3)
        pygame.draw.circle(surf, pal["shade"], (11, 10), 1)
        pygame.draw.circle(surf, pal["shade"], (21, 10), 1)
        pygame.draw.arc(surf, pal["body"], (12, 5, 8, 8), 0.3, 2.8, 2)
    else:  # classic -- simple cap
        pygame.draw.arc(surf, pal["metal"], (12, 6, 8, 9), 0.3, 2.85, 2)


# ----------------------------------------------------------------------
# per-piece builders
# ----------------------------------------------------------------------
def _build_pawn(pal, gear):
    s = _new_surface()
    _pedestal(s, pal)
    pygame.draw.polygon(s, pal["body"],
                        [(11, 20), (21, 20), (23, 26), (9, 26)])
    pygame.draw.polygon(s, pal["light"],
                        [(11, 20), (13, 20), (11, 26), (9, 26)])
    pygame.draw.polygon(s, pal["shade"],
                        [(19, 20), (21, 20), (23, 26), (21, 26)])
    pygame.draw.circle(s, pal["body"], (16, 18), 5)
    pygame.draw.circle(s, pal["light"], (14, 16), 1)
    _head(s, pal, 16, 12, 4)
    _pawn_gear(s, pal, gear)
    if gear not in ("hood", "greathelm"):
        _eyes(s, 13)
    return s


def _build_knight(pal, gear):
    s = _new_surface()
    _pedestal(s, pal)
    pygame.draw.polygon(s, pal["body"],
                        [(12, 25), (20, 25), (21, 14), (16, 6),
                         (9, 9), (7, 14), (10, 17)])
    pygame.draw.polygon(s, pal["light"],
                        [(9, 9), (16, 6), (14, 13), (9, 14)])
    pygame.draw.polygon(s, pal["shade"],
                        [(18, 11), (21, 14), (20, 25), (17, 25)])
    # ear + mane
    pygame.draw.polygon(s, pal["accent"], [(15, 6), (19, 3), (18, 9)])
    pygame.draw.line(s, pal["shade"], (16, 7), (20, 16), 2)
    # snout + eye + bridle
    pygame.draw.polygon(s, pal["light"], [(6, 13), (10, 12), (10, 16)])
    s.set_at((12, 12), (28, 24, 22, 255))
    s.set_at((13, 12), (28, 24, 22, 255))
    pygame.draw.line(s, pal["accent"], (8, 15), (12, 17))
    return s


def _build_rook(pal, gear):
    s = _new_surface()
    _pedestal(s, pal)
    pygame.draw.rect(s, pal["body"], (9, 13, 14, 13))
    pygame.draw.rect(s, pal["light"], (9, 13, 3, 13))
    pygame.draw.rect(s, pal["shade"], (20, 13, 3, 13))
    for mx in (9, 14, 19):
        pygame.draw.rect(s, pal["body"], (mx, 8, 4, 6))
        pygame.draw.rect(s, pal["light"], (mx, 8, 1, 6))
        pygame.draw.rect(s, pal["shade"], (mx + 3, 8, 1, 6))
    pygame.draw.line(s, pal["accent"], (9, 14), (22, 14))
    # arrow-slit windows + gate
    pygame.draw.rect(s, pal["shade"], (12, 17, 2, 5))
    pygame.draw.rect(s, pal["shade"], (18, 17, 2, 5))
    pygame.draw.rect(s, pal["shade"], (14, 21, 4, 5))
    pygame.draw.line(s, pal["accent"], (16, 21), (16, 26))
    return s


def _build_bishop(pal, gear):
    s = _new_surface()
    _pedestal(s, pal)
    _robe(s, pal, top_y=16, top_w=8, base_w=12)
    _head(s, pal, 16, 13, 3)
    # mitre
    pygame.draw.polygon(s, pal["light"], [(16, 2), (11, 13), (21, 13)])
    pygame.draw.line(s, pal["shade"], (16, 4), (16, 12))
    pygame.draw.circle(s, pal["accent"], (16, 3), 1)
    pygame.draw.rect(s, pal["skin"], (14, 13, 5, 3))   # reveal face
    _eyes(s, 14)
    # crozier staff
    pygame.draw.line(s, pal["metal"], (24, 14), (24, 26))
    pygame.draw.circle(s, pal["metal"], (24, 13), 2)
    return s


def _build_queen(pal, gear):
    s = _new_surface()
    _pedestal(s, pal)
    _robe(s, pal, top_y=16, top_w=10, base_w=15)
    pygame.draw.rect(s, pal["skin"], (14, 14, 4, 3))   # neck
    _head(s, pal, 16, 11, 4)
    _eyes(s, 11)
    # five-point crown
    pygame.draw.rect(s, pal["metal"], (11, 6, 10, 3))
    for cx, h in ((12, 3), (14, 5), (16, 7), (18, 5), (20, 3)):
        pygame.draw.line(s, pal["metal"], (cx, 6), (cx, 6 - h), 2)
        pygame.draw.circle(s, pal["accent"], (cx, 6 - h), 1)
    return s


def _build_king(pal, gear):
    s = _new_surface()
    _pedestal(s, pal)
    _robe(s, pal, top_y=16, top_w=11, base_w=16)
    pygame.draw.rect(s, pal["skin"], (14, 14, 4, 3))   # neck
    _head(s, pal, 16, 11, 4)
    _eyes(s, 11)
    # crown with cross
    pygame.draw.rect(s, pal["metal"], (11, 6, 10, 3))
    for cx in (12, 16, 20):
        pygame.draw.polygon(s, pal["metal"],
                            [(cx - 2, 6), (cx + 2, 6), (cx, 2)])
    pygame.draw.line(s, pal["accent"], (16, 5), (16, 0))
    pygame.draw.line(s, pal["accent"], (14, 2), (18, 2))
    return s


_BUILDERS = {
    "pawn": _build_pawn, "knight": _build_knight, "rook": _build_rook,
    "bishop": _build_bishop, "queen": _build_queen, "king": _build_king,
}


# ----------------------------------------------------------------------
# per-piece animation variation
# ----------------------------------------------------------------------
class Variation:
    """Unique animation parameters for a single piece (keyed by uid)."""

    __slots__ = ("speed", "phase", "bob", "tint", "sway", "flip")

    def __init__(self, uid):
        rng = random.Random(uid * 2654435761 & 0xFFFFFFFF)
        self.speed = rng.uniform(0.75, 1.55)
        self.phase = rng.uniform(0.0, math.tau)
        self.bob = rng.uniform(1.0, 3.0)
        self.sway = rng.uniform(0.6, 1.8)
        self.flip = rng.choice((1, -1))
        self.tint = tuple(rng.randint(-15, 15) for _ in range(3))


# ----------------------------------------------------------------------
# the renderer
# ----------------------------------------------------------------------
class PieceRenderer:
    """Builds, tints, caches and animates piece sprites."""

    def __init__(self):
        self._base = {}     # (faction, color, ptype) -> 32x32 surface
        self._scaled = {}   # (faction, color, ptype, uid, size) -> surface
        self._vars = {}     # uid -> Variation

    def base(self, faction, color, ptype):
        key = (faction, color, ptype)
        surf = self._base.get(key)
        if surf is None:
            pal = faction_palette(faction, color)
            surf = _BUILDERS[ptype](pal, pal["gear"])
            _outline(surf, (20, 18, 20) if color == "white" else (8, 7, 9))
            self._base[key] = surf
        return surf

    def variation(self, uid):
        v = self._vars.get(uid)
        if v is None:
            v = Variation(uid)
            self._vars[uid] = v
        return v

    def _piece_surface(self, faction, color, ptype, uid, size):
        """A tinted, scaled (nearest-neighbour) surface for one piece."""
        key = (faction, color, ptype, uid, size)
        surf = self._scaled.get(key)
        if surf is None:
            base = self.base(faction, color, ptype).copy()
            tr, tg, tb = self.variation(uid).tint
            base.fill((max(0, tr), max(0, tg), max(0, tb), 0),
                      special_flags=pygame.BLEND_RGB_ADD)
            base.fill((max(0, -tr), max(0, -tg), max(0, -tb), 0),
                      special_flags=pygame.BLEND_RGB_SUB)
            surf = pygame.transform.scale(base, (size, size))
            self._scaled[key] = surf
        return surf

    def draw(self, target, piece, cx, cy, size, faction,
             state="idle", t=0.0, progress=0.0, kill_style="Vanish"):
        """Blit `piece` centred on (cx, cy) at `size` px in the given state.

        state: 'idle', 'walk', 'attack', 'death' or 'static'.
        progress: 0..1 timeline for one-shot 'attack' / 'death' states.
        """
        v = self.variation(piece.uid)
        surf = self._piece_surface(faction, piece.color, piece.type,
                                   piece.uid, size)
        off_x = off_y = 0.0
        scale_x = scale_y = 1.0
        rot = 0.0
        alpha = 255

        ph = t * v.speed + v.phase
        if state == "idle":
            off_y = -abs(math.sin(ph)) * v.bob
            breathe = math.sin(ph * 0.9) * 0.03
            scale_x = 1.0 - breathe
            scale_y = 1.0 + breathe
        elif state == "walk":
            off_y = -abs(math.sin(ph * 2.4)) * (v.bob + 1.5)
            off_x = math.sin(ph * 2.4) * v.sway * 1.6
            rot = math.sin(ph * 2.4) * 4.0 * v.flip
        elif state == "attack":
            lunge = math.sin(min(progress, 1.0) * math.pi)
            off_y = -lunge * 7.0
            scale_x = scale_y = 1.0 + lunge * 0.16
            rot = lunge * 9.0 * v.flip
        elif state == "death":
            p = min(progress, 1.0)
            alpha = int(255 * (1.0 - p))
            if kill_style == "Topple":
                rot = p * 88.0 * v.flip
                off_y = p * size * 0.22
            elif kill_style == "Shatter":
                scale_x = scale_y = 1.0 + p * 0.7
                rot = p * 40.0 * v.flip
            else:  # Vanish
                scale_x = scale_y = 1.0 - p * 0.35
                off_y = -p * 6.0

        frame = surf
        if scale_x != 1.0 or scale_y != 1.0:
            frame = pygame.transform.scale(
                frame, (max(1, int(size * scale_x)),
                        max(1, int(size * scale_y))))
        if rot:
            frame = pygame.transform.rotate(frame, rot)
        if alpha < 255:
            frame = frame.copy()
            frame.fill((255, 255, 255, max(0, alpha)),
                       special_flags=pygame.BLEND_RGBA_MULT)

        rect = frame.get_rect()
        rect.center = (int(cx + off_x), int(cy + off_y))
        target.blit(frame, rect)


def render_portrait(size=96):
    """A blocky pixel-art Gordon Ramsay head for the commentary panel."""
    s = pygame.Surface((SPRITE, SPRITE), pygame.SRCALPHA)
    skin = (236, 198, 168)
    skin_d = (196, 156, 130)
    hair = (224, 222, 220)
    pygame.draw.rect(s, skin, (8, 7, 16, 19))
    pygame.draw.rect(s, skin_d, (8, 7, 3, 19))
    pygame.draw.rect(s, skin_d, (8, 22, 16, 3))
    pygame.draw.rect(s, hair, (7, 4, 18, 5))
    pygame.draw.rect(s, hair, (6, 7, 3, 7))
    pygame.draw.rect(s, hair, (23, 7, 3, 7))
    pygame.draw.line(s, (120, 96, 78), (11, 12), (15, 13))
    pygame.draw.line(s, (120, 96, 78), (17, 13), (21, 12))
    s.set_at((13, 14), (40, 60, 90, 255))
    s.set_at((14, 14), (40, 60, 90, 255))
    s.set_at((18, 14), (40, 60, 90, 255))
    s.set_at((19, 14), (40, 60, 90, 255))
    pygame.draw.line(s, (150, 78, 70), (12, 22), (20, 21))
    for sx in range(10, 22, 2):
        s.set_at((sx, 24), (170, 140, 120, 255))
    _outline(s, (40, 30, 26))
    return pygame.transform.scale(s, (size, size))
