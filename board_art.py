"""
Procedural artistic chessboards for AuraChess v2.

No two-colour boards here: every terrain layers seeded detail onto each
square -- marble veins, sand cracks, moss, volcanic embers, frost, camo.
The board is drawn once into a cached surface so it costs nothing per
frame.
"""

import random

import pygame

from themes import TERRAINS


def _clamp(v):
    return max(0, min(255, int(v)))


def _shift(color, amount):
    return tuple(_clamp(c + amount) for c in color)


def _mix(a, b, t):
    return tuple(_clamp(a[i] + (b[i] - a[i]) * t) for i in range(3))


def _draw_marble(surf, rng, sq, base):
    for _ in range(rng.randint(2, 4)):
        x0 = rng.randint(0, sq)
        y0 = rng.randint(0, sq)
        pts = [(x0, y0)]
        for _ in range(3):
            x0 += rng.randint(-sq // 3, sq // 3)
            y0 += rng.randint(-sq // 3, sq // 3)
            pts.append((x0, y0))
        pygame.draw.lines(surf, _shift(base, rng.choice((-16, 14))),
                          False, pts, 1)


def _draw_sand(surf, rng, sq, base):
    for _ in range(rng.randint(2, 4)):       # cracks
        x = rng.randint(4, sq - 4)
        y = rng.randint(4, sq - 4)
        pts = [(x, y)]
        for _ in range(rng.randint(3, 5)):
            x += rng.randint(-7, 7)
            y += rng.randint(2, 8)
            pts.append((x, y))
        pygame.draw.lines(surf, _shift(base, -34), False, pts, 1)
    for _ in range(rng.randint(8, 16)):      # grains
        surf.set_at((rng.randint(0, sq - 1), rng.randint(0, sq - 1)),
                    _shift(base, rng.choice((-22, 20))))


def _draw_moss(surf, rng, sq, base):
    moss = (78, 116, 56)
    for _ in range(rng.randint(2, 4)):
        cx = rng.choice((4, sq - 6)) + rng.randint(-3, 3)
        cy = rng.choice((4, sq - 6)) + rng.randint(-3, 3)
        for _ in range(rng.randint(4, 9)):
            x = cx + rng.randint(-5, 5)
            y = cy + rng.randint(-5, 5)
            if 0 <= x < sq and 0 <= y < sq:
                surf.set_at((x, y), _mix(moss, base, rng.random() * 0.5))
    pygame.draw.line(surf, _shift(base, -20),
                     (0, rng.randint(0, sq)), (sq, rng.randint(0, sq)), 1)


def _draw_embers(surf, rng, sq, base):
    pygame.draw.line(surf, _shift(base, -18),
                     (rng.randint(0, sq), 0),
                     (rng.randint(0, sq), sq), 1)
    for _ in range(rng.randint(2, 5)):
        x = rng.randint(2, sq - 3)
        y = rng.randint(2, sq - 3)
        glow = rng.choice([(255, 150, 40), (255, 96, 24), (240, 60, 16)])
        pygame.draw.circle(surf, _mix(glow, base, 0.55), (x, y), 2)
        surf.set_at((x, y), glow)


def _draw_frost(surf, rng, sq, base):
    corner = rng.choice([(0, 0), (sq, 0), (0, sq), (sq, sq)])
    for _ in range(rng.randint(3, 6)):
        ang = rng.uniform(0, 6.28)
        length = rng.randint(sq // 3, sq)
        ex = corner[0] + int(length * (1 if corner[0] == 0 else -1)
                             * abs(random.random()))
        ey = corner[1] + int(length * (1 if corner[1] == 0 else -1)
                             * abs(random.random()))
        pygame.draw.line(surf, _shift(base, 26), corner, (ex, ey), 1)
    for _ in range(rng.randint(4, 9)):
        surf.set_at((rng.randint(0, sq - 1), rng.randint(0, sq - 1)),
                    _shift(base, 34))


def _draw_camo(surf, rng, sq, base):
    tones = [_shift(base, -28), _shift(base, 22), _shift(base, -10)]
    for _ in range(rng.randint(3, 6)):
        x = rng.randint(-4, sq)
        y = rng.randint(-4, sq)
        w = rng.randint(sq // 4, sq // 2)
        h = rng.randint(sq // 4, sq // 2)
        pygame.draw.ellipse(surf, rng.choice(tones), (x, y, w, h))


_OVERLAYS = {
    "marble": _draw_marble, "sand": _draw_sand, "moss": _draw_moss,
    "embers": _draw_embers, "frost": _draw_frost, "camo": _draw_camo,
}


class BoardArt:
    """Caches a fully drawn board surface per (terrain, square size)."""

    def __init__(self):
        self._cache = {}

    def surface(self, terrain_name, square):
        key = (terrain_name, square)
        surf = self._cache.get(key)
        if surf is not None:
            return surf

        spec = TERRAINS[terrain_name]
        size = square * 8
        board = pygame.Surface((size, size))
        overlay = _OVERLAYS[spec["overlay"]]

        for r in range(8):
            for c in range(8):
                light = (r + c) % 2 == 0
                base = spec["light"] if light else spec["dark"]
                cell = pygame.Surface((square, square))
                cell.fill(base)
                # gentle corner vignette for depth
                pygame.draw.line(cell, _shift(base, 18), (0, 0),
                                 (square, 0))
                pygame.draw.line(cell, _shift(base, 18), (0, 0),
                                 (0, square))
                pygame.draw.line(cell, _shift(base, -22),
                                 (0, square - 1), (square, square - 1))
                pygame.draw.line(cell, _shift(base, -22),
                                 (square - 1, 0), (square - 1, square))
                rng = random.Random(hash((terrain_name, r, c)) & 0xFFFFFFFF)
                overlay(cell, rng, square, base)
                board.blit(cell, (c * square, r * square))

        pygame.draw.rect(board, spec["edge"], (0, 0, size, size), 2)
        self._cache[key] = board
        return board
