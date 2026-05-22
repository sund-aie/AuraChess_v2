"""
AuraChess v2 -- a fully offline Python / Pygame chess game.

Run with:  python main.py

Features
  * Adaptive rule-based opponent that learns game-to-game (no LLM, no network)
  * Gordon Ramsay commentary engine with 1400+ contextual lines
  * Procedural 32x32 pixel-art pieces with idle / walk / attack / death anims
  * Procedural artistic boards (marble, sand, moss, embers, frost, camo)
  * Drag-and-drop movement, synthesised sound effects, POW cages
  * Faction / terrain / kill-style theme selection, local profile save
"""

import math
import sys
import threading

import pygame

from chess_rules import WHITE, BLACK, Board, opposite
from ai_opponent import (AdaptiveAI, Profile, evaluate, find_hanging_piece)
from ramsay import RamsayCommentator
from sprites import PieceRenderer, render_portrait
from board_art import BoardArt
from audio import SoundFX
from themes import FACTION_NAMES, TERRAIN_NAMES, KILL_STYLE_NAMES, TERRAINS

# ----------------------------------------------------------------------
# layout constants
# ----------------------------------------------------------------------
WIN_W, WIN_H = 1180, 770
SQUARE = 78
BOARD = SQUARE * 8
BOARD_X, BOARD_Y = 42, 96
PANEL_X = BOARD_X + BOARD + 26
PANEL_W = WIN_W - PANEL_X - 26
PIECE = SQUARE - 12

BG = (24, 25, 32)
BG2 = (32, 34, 44)
PANEL_BG = (40, 42, 54)
INK = (236, 238, 246)
INK_DIM = (158, 162, 178)
GOLD = (226, 188, 96)

MOOD_COLOR = {
    "angry": (196, 64, 60), "sweat": (228, 156, 64),
    "happy": (104, 188, 96), "neutral": (120, 132, 158),
}
MOOD_WORD = {
    "angry": "FURIOUS", "sweat": "SWEATING",
    "happy": "GLEEFUL", "neutral": "WATCHING",
}
_CAT_MOOD = {
    "game_start": "angry", "idle": "angry", "teaching": "neutral",
    "player_good": "sweat", "player_capture": "sweat",
    "check_player": "sweat", "player_win": "sweat",
    "player_bad": "happy", "player_blunder": "happy",
    "ai_capture": "happy", "check_ai": "happy", "player_loss": "happy",
    "castle": "neutral", "promotion": "neutral",
}


def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def lerp(a, b, t):
    return a + (b - a) * t


def wrap_text(text, font, max_w):
    lines, cur = [], ""
    for word in text.split():
        trial = (cur + " " + word).strip()
        if font.size(trial)[0] <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


# ----------------------------------------------------------------------
# small UI button
# ----------------------------------------------------------------------
class Button:
    def __init__(self, rect, label, callback, font, accent=GOLD):
        self.rect = pygame.Rect(rect)
        self.label = label
        self.callback = callback
        self.font = font
        self.accent = accent

    def draw(self, surf, mouse):
        hover = self.rect.collidepoint(mouse)
        body = (62, 66, 84) if hover else (50, 53, 68)
        pygame.draw.rect(surf, body, self.rect, border_radius=8)
        pygame.draw.rect(surf, self.accent, self.rect, 2, border_radius=8)
        txt = self.font.render(self.label, True, INK)
        surf.blit(txt, txt.get_rect(center=self.rect.center))

    def handle(self, pos):
        if self.rect.collidepoint(pos):
            self.callback()
            return True
        return False


# ----------------------------------------------------------------------
# animation effects
# ----------------------------------------------------------------------
class SlideEffect:
    blocking = True

    def __init__(self, scene, piece, faction, frm, to, captured,
                 cap_faction, cap_px, dur=0.34):
        self.scene = scene
        self.piece = piece
        self.faction = faction
        self.frm = frm
        self.to = to
        self.captured = captured
        self.cap_faction = cap_faction
        self.cap_px = cap_px
        self.dur = dur
        self.t = 0.0
        self.done = False
        self.cover = {piece.uid}

    def update(self, dt):
        self.t += dt / self.dur
        if self.t >= 1.0:
            self.done = True
            sc = self.scene
            if self.captured:
                sc.effects.append(DeathEffect(sc, self.captured,
                                              self.cap_faction, self.cap_px))
                sc.effects.append(AttackEffect(sc, self.piece,
                                               self.faction, self.to))

    def draw(self, surf):
        e = ease(self.t)
        x = lerp(self.frm[0], self.to[0], e)
        y = lerp(self.frm[1], self.to[1], e)
        if self.captured:
            self.scene.renderer.draw(surf, self.captured, self.cap_px[0],
                                     self.cap_px[1], PIECE, self.cap_faction,
                                     "idle", self.scene.anim_time)
        self.scene.renderer.draw(surf, self.piece, x, y, PIECE,
                                 self.faction, "walk", self.scene.anim_time)


class AttackEffect:
    blocking = False

    def __init__(self, scene, piece, faction, square, dur=0.30):
        self.scene = scene
        self.piece = piece
        self.faction = faction
        self.px = scene.square_center(*square)
        self.dur = dur
        self.t = 0.0
        self.done = False
        self.cover = {piece.uid}

    def update(self, dt):
        self.t += dt / self.dur
        if self.t >= 1.0:
            self.done = True

    def draw(self, surf):
        self.scene.renderer.draw(surf, self.piece, self.px[0], self.px[1],
                                 PIECE, self.faction, "attack",
                                 self.scene.anim_time, progress=self.t)


class DeathEffect:
    blocking = False

    def __init__(self, scene, piece, faction, px, dur=0.55):
        self.scene = scene
        self.piece = piece
        self.faction = faction
        self.px = px
        self.dur = dur
        self.t = 0.0
        self.done = False
        self.cover = set()

    def update(self, dt):
        self.t += dt / self.dur
        if self.t >= 1.0:
            self.done = True

    def draw(self, surf):
        self.scene.renderer.draw(surf, self.piece, self.px[0], self.px[1],
                                 PIECE, self.faction, "death",
                                 self.scene.anim_time, progress=self.t,
                                 kill_style=self.scene.kill_style)


# ======================================================================
# Menu scene
# ======================================================================
class MenuScene:
    def __init__(self, app):
        self.app = app
        f = app.fonts
        cx = WIN_W // 2
        self.buttons = [
            Button((cx - 130, 430, 260, 56), "PLAY",
                   lambda: app.goto(SelectScene(app)), f["header"]),
            Button((cx - 130, 500, 260, 56), "QUIT",
                   app.quit, f["header"], accent=(150, 90, 90)),
        ]

    def handle_event(self, ev):
        if ev.type == pygame.MOUSEBUTTONDOWN and ev.button == 1:
            for b in self.buttons:
                b.handle(ev.pos)

    def update(self, dt):
        pass

    def draw(self, surf):
        surf.fill(BG)
        f = self.app.fonts
        t = pygame.time.get_ticks() / 1000.0
        # title
        title = f["title"].render("AURACHESS", True, GOLD)
        surf.blit(title, title.get_rect(center=(WIN_W // 2, 170)))
        sub = f["normal"].render("v2  -  Gordon Ramsay's Kitchen Gambit",
                                 True, INK)
        surf.blit(sub, sub.get_rect(center=(WIN_W // 2, 230)))
        # bobbing portrait
        bob = math.sin(t * 2.2) * 8
        port = self.app.portrait
        surf.blit(port, port.get_rect(center=(WIN_W // 2, 330 + bob)))
        # profile stats
        p = self.app.profile
        info = (f"Games played: {p.games_played}    Wins: {p.wins}    "
                f"Losses: {p.losses}    Draws: {p.draws}")
        line = f["small"].render(info, True, INK_DIM)
        surf.blit(line, line.get_rect(center=(WIN_W // 2, 600)))
        rank = f["small"].render(
            f"Opponent rank: {AdaptiveAI(BLACK, p).describe_level()}",
            True, GOLD)
        surf.blit(rank, rank.get_rect(center=(WIN_W // 2, 626)))
        mouse = pygame.mouse.get_pos()
        for b in self.buttons:
            b.draw(surf, mouse)


# ======================================================================
# Theme selection scene
# ======================================================================
class SelectScene:
    def __init__(self, app):
        self.app = app
        self.options = [
            ["Your Side", ["White", "Black"], 0],
            ["Your Army", list(FACTION_NAMES), 0],
            ["Ramsay's Army", list(FACTION_NAMES), 4],
            ["Battlefield", list(TERRAIN_NAMES), 0],
            ["Kill Style", list(KILL_STYLE_NAMES), 0],
        ]
        f = app.fonts
        self.row_btns = []
        y0 = 170
        for i in range(len(self.options)):
            y = y0 + i * 74
            self.row_btns.append((
                Button((430, y, 44, 48), "<",
                       lambda i=i: self._cycle(i, -1), f["header"]),
                Button((690, y, 44, 48), ">",
                       lambda i=i: self._cycle(i, 1), f["header"]),
            ))
        self.start_btn = Button((WIN_W // 2 - 150, 600, 300, 58),
                                "START COOKING", self._start, f["header"])
        self.back_btn = Button((40, 30, 110, 44), "Back",
                               lambda: app.goto(MenuScene(app)), f["normal"])

    def _cycle(self, i, d):
        opt = self.options[i]
        opt[2] = (opt[2] + d) % len(opt[1])
        self.app.sounds.play("select")

    def _start(self):
        s = {}
        s["player_color"] = WHITE if self.options[0][2] == 0 else BLACK
        s["white_faction"] = self.options[1][1][self.options[1][2]]
        s["black_faction"] = self.options[2][1][self.options[2][2]]
        s["terrain"] = self.options[3][1][self.options[3][2]]
        s["kill_style"] = self.options[4][1][self.options[4][2]]
        self.app.settings = s
        self.app.goto(GameScene(app=self.app))

    def handle_event(self, ev):
        if ev.type == pygame.MOUSEBUTTONDOWN and ev.button == 1:
            self.back_btn.handle(ev.pos)
            self.start_btn.handle(ev.pos)
            for lo, ro in self.row_btns:
                lo.handle(ev.pos)
                ro.handle(ev.pos)

    def update(self, dt):
        pass

    def draw(self, surf):
        surf.fill(BG)
        f = self.app.fonts
        mouse = pygame.mouse.get_pos()
        head = f["header"].render("CHOOSE YOUR BATTLE", True, GOLD)
        surf.blit(head, head.get_rect(center=(WIN_W // 2, 90)))

        for i, opt in enumerate(self.options):
            y = 170 + i * 74
            label = f["normal"].render(opt[0], True, INK_DIM)
            surf.blit(label, (160, y + 12))
            box = pygame.Rect(484, y, 200, 48)
            pygame.draw.rect(surf, BG2, box, border_radius=6)
            pygame.draw.rect(surf, GOLD, box, 1, border_radius=6)
            val = f["normal"].render(opt[1][opt[2]], True, INK)
            surf.blit(val, val.get_rect(center=box.center))
            lo, ro = self.row_btns[i]
            lo.draw(surf, mouse)
            ro.draw(surf, mouse)

        # description of current terrain
        terr = self.options[3][1][self.options[3][2]]
        d = f["small"].render(f"{terr}: {TERRAINS[terr]['blurb']}",
                              True, INK_DIM)
        surf.blit(d, d.get_rect(center=(WIN_W // 2, 560)))

        self.back_btn.draw(surf, mouse)
        self.start_btn.draw(surf, mouse)


# ======================================================================
# Game scene
# ======================================================================
class GameScene:
    def __init__(self, app):
        self.app = app
        s = app.settings
        self.player_color = s["player_color"]
        self.ai_color = opposite(self.player_color)
        self.white_faction = s["white_faction"]
        self.black_faction = s["black_faction"]
        self.terrain = s["terrain"]
        self.kill_style = s["kill_style"]
        self.flip = self.player_color == BLACK

        self.renderer = app.renderer
        self.board_surface = app.board_art.surface(self.terrain, SQUARE)
        self.board = Board()
        self.ai = AdaptiveAI(self.ai_color, app.profile)
        self.ramsay = app.ramsay

        self.effects = []
        self.selected = None
        self.legal = []
        self.dragging = False
        self.drag_piece = None
        self.last_move = None
        self.anim_time = 0.0

        self.player_moves = 0
        self.blunders = 0
        self.lost_squares = []
        self.pow_player = []     # AI pieces captured by the player
        self.pow_ai = []         # player pieces captured by Ramsay

        self.board_dirty = True
        self.status_val = "ongoing"
        self.check_square = None

        self.over = False
        self.result = None
        self.idle_timer = 0.0
        self.ai_thread = None        # background search thread
        self.ai_result = None
        self.ai_min_timer = 0.0      # minimum "thinking" time for pacing

        self.ramsay_text = self.ramsay.comment("game_start")
        self.ramsay_mood = "angry"

        f = app.fonts
        self.menu_btn = Button((WIN_W - 150, 24, 120, 42), "Menu",
                               lambda: app.goto(MenuScene(app)), f["small"])
        self.mute_btn = Button((WIN_W - 280, 24, 120, 42), "Sound",
                               self._toggle_sound, f["small"])
        self.over_buttons = [
            Button((PANEL_X + 20, 560, PANEL_W // 2 - 30, 50), "REMATCH",
                   self._rematch, f["normal"]),
            Button((PANEL_X + PANEL_W // 2 + 10, 560, PANEL_W // 2 - 30, 50),
                   "MENU", lambda: app.goto(MenuScene(app)), f["normal"]),
        ]

    # -- helpers --------------------------------------------------------
    def faction_of(self, color):
        return self.white_faction if color == WHITE else self.black_faction

    def _toggle_sound(self):
        self.app.sounds.toggle_mute()

    def square_center(self, r, c):
        dr, dc = (7 - r, 7 - c) if self.flip else (r, c)
        return (BOARD_X + dc * SQUARE + SQUARE // 2,
                BOARD_Y + dr * SQUARE + SQUARE // 2)

    def square_at(self, px, py):
        dc = (px - BOARD_X) // SQUARE
        dr = (py - BOARD_Y) // SQUARE
        if not (0 <= dr < 8 and 0 <= dc < 8):
            return None
        dr, dc = int(dr), int(dc)
        return (7 - dr, 7 - dc) if self.flip else (dr, dc)

    def _blocking(self):
        return any(e.blocking for e in self.effects)

    def covered_uids(self):
        cov = set()
        for e in self.effects:
            cov |= e.cover
        if self.dragging and self.drag_piece:
            cov.add(self.drag_piece.uid)
        return cov

    def _say(self, category):
        line = self.ramsay.comment(category)
        if line:
            self.ramsay_text = line
            self.ramsay_mood = _CAT_MOOD.get(category, "angry")

    # -- move execution -------------------------------------------------
    def _make_move(self, move, by_player, slide):
        mover = self.board.piece_at(*move.fr)
        faction = self.faction_of(mover.color)
        from_px = self.square_center(*move.fr)
        to_px = self.square_center(*move.to)
        captured = move.captured
        cap_faction = self.faction_of(captured.color) if captured else None
        cap_px = self.square_center(*move.cap_pos) if captured else None

        weak = self.app.profile.top_weak_squares()
        eval_before = evaluate(self.board, weak)
        self.board.push(move)
        eval_after = evaluate(self.board, weak)
        self.last_move = (move.fr, move.to)
        self.board_dirty = True

        # POW cages + learning data
        if captured:
            if mover.color == self.player_color:
                self.pow_player.append(captured)
            else:
                self.pow_ai.append(captured)
                self.lost_squares.append(move.cap_pos)

        # sound
        snd = self.app.sounds
        if captured:
            snd.play("capture")
        else:
            snd.play("move")

        # visual effect
        if slide:
            self.effects.append(SlideEffect(
                self, mover, faction, from_px, to_px, captured,
                cap_faction, cap_px))
        elif captured:
            self.effects.append(DeathEffect(self, captured, cap_faction,
                                            cap_px))
            self.effects.append(AttackEffect(self, mover, faction, move.to))

        # commentary
        if by_player:
            self.player_moves += 1
            self._comment_player_move(move, eval_before, eval_after)
        else:
            self._comment_ai_move(move)

    def _comment_player_move(self, move, ev_before, ev_after):
        sign = 1 if self.player_color == WHITE else -1
        delta = (ev_after - ev_before) * sign
        ai_in_check = self.board.in_check(self.ai_color)
        if delta <= -190:
            self.blunders += 1
            self._say("player_blunder")
        elif ai_in_check:
            self._say("check_player")
        elif move.captured:
            self._say("player_capture")
        elif move.is_castle:
            self._say("castle")
        elif move.promotion:
            self._say("promotion")
        elif find_hanging_piece(self.board, self.player_color):
            self._say("teaching")
        elif delta >= 55:
            self._say("player_good")
        elif delta <= -65:
            self._say("player_bad")

    def _comment_ai_move(self, move):
        if self.board.in_check(self.player_color):
            self._say("check_ai")
        elif move.captured:
            self._say("ai_capture")
        elif (find_hanging_piece(self.board, self.player_color)
              and self.app.rng.random() < 0.55):
            self._say("teaching")

    def _rematch(self):
        self.app.goto(GameScene(self.app))

    def _enter_over(self, status):
        self.over = True
        winner = self.board.winner()
        if status in ("stalemate", "draw"):
            self.result = "draw"
            self.ramsay_text = ("A draw. Nobody wins, nobody loses, "
                                "and I'm somehow still annoyed.")
            self.ramsay_mood = "neutral"
            self.app.sounds.play("check")
        elif winner == self.player_color:
            self.result = "win"
            self._say("player_win")
            self.app.sounds.play("win")
        else:
            self.result = "loss"
            self._say("player_loss")
            self.app.sounds.play("lose")
        self.app.profile.record_game(self.result, self.blunders,
                                     self.player_moves, self.lost_squares)
        self.app.profile.save()

    # -- event handling -------------------------------------------------
    def handle_event(self, ev):
        if ev.type == pygame.KEYDOWN:
            if ev.key == pygame.K_ESCAPE:
                self.app.goto(MenuScene(self.app))
            elif ev.key == pygame.K_m:
                self.app.sounds.toggle_mute()
            elif ev.key == pygame.K_r and self.over:
                self._rematch()
            return

        if ev.type == pygame.MOUSEBUTTONDOWN and ev.button == 1:
            if self.menu_btn.handle(ev.pos):
                return
            if self.mute_btn.handle(ev.pos):
                return
            if self.over:
                for b in self.over_buttons:
                    b.handle(ev.pos)
                return
            self._mouse_down(ev.pos)
        elif ev.type == pygame.MOUSEBUTTONUP and ev.button == 1:
            if not self.over:
                self._mouse_up(ev.pos)
        elif ev.type == pygame.MOUSEMOTION:
            if self.selected is not None and ev.buttons[0]:
                self.dragging = True

    def _can_play(self):
        return (not self.over and not self._blocking()
                and self.board.turn == self.player_color)

    def _mouse_down(self, pos):
        if not self._can_play():
            return
        sq = self.square_at(*pos)
        if sq is None:
            self.selected = None
            self.legal = []
            return
        # click a legal destination of an already-selected piece
        if self.selected is not None and sq in self.legal:
            self._commit_player_move(sq, slide=True)
            return
        piece = self.board.piece_at(*sq)
        if piece and piece.color == self.player_color:
            self.selected = sq
            self.drag_piece = piece
            self.legal = [m.to for m in self.board.moves_from(*sq)]
            self.app.sounds.play("select", volume=0.7)
        else:
            self.selected = None
            self.legal = []

    def _mouse_up(self, pos):
        if self.selected is None:
            self.dragging = False
            return
        if self.dragging:
            sq = self.square_at(*pos)
            if sq is not None and sq in self.legal:
                self._commit_player_move(sq, slide=False)
            else:
                self.app.sounds.play("invalid", volume=0.6)
        self.dragging = False
        self.drag_piece = None

    def _commit_player_move(self, dest, slide):
        moves = [m for m in self.board.moves_from(*self.selected)
                 if m.to == dest]
        if not moves:
            return
        move = moves[0]
        for m in moves:               # auto-queen on promotion
            if m.promotion == "queen":
                move = m
                break
        self.selected = None
        self.legal = []
        self.dragging = False
        self.drag_piece = None
        self._make_move(move, by_player=True, slide=slide)

    # -- update ---------------------------------------------------------
    def update(self, dt):
        self.anim_time += dt
        for e in list(self.effects):
            e.update(dt)
        self.effects = [e for e in self.effects if not e.done]

        if self._blocking():
            return

        if self.board_dirty:
            self.status_val = self.board.status()
            self.check_square = None
            if self.board.in_check(self.board.turn):
                self.check_square = self.board.king_pos(self.board.turn)
            self.board_dirty = False

        if self.status_val != "ongoing":
            if not self.over:
                self._enter_over(self.status_val)
            return

        if self.board.turn == self.ai_color:
            self.idle_timer = 0.0
            if self.ai_thread is None:
                self.ai_min_timer = 0.45
                self.ai_result = None
                snapshot = self.board.clone()

                def worker(snap=snapshot):
                    self.ai_result = self.ai.choose_move(snap)

                self.ai_thread = threading.Thread(target=worker, daemon=True)
                self.ai_thread.start()
            else:
                self.ai_min_timer -= dt
                if (not self.ai_thread.is_alive()
                        and self.ai_min_timer <= 0):
                    move = self.ai_result
                    self.ai_thread = None
                    self.ai_result = None
                    if move is not None:
                        self.app.sounds.play(
                            "attack" if move.captured else "drag",
                            volume=0.6)
                        self._make_move(move, by_player=False, slide=True)
        else:
            self.idle_timer += dt
            if self.idle_timer > 13.0:
                self.idle_timer = 0.0
                self._say("idle")

    # -- drawing --------------------------------------------------------
    def draw(self, surf):
        surf.fill(BG)
        self._draw_topbar(surf)
        surf.blit(self.board_surface, (BOARD_X, BOARD_Y))
        self._draw_highlights(surf)
        self._draw_pieces(surf)
        for e in self.effects:
            e.draw(surf)
        self._draw_dragged(surf)
        self._draw_panel(surf)
        if self.over:
            self._draw_over(surf)

    def _draw_topbar(self, surf):
        f = self.app.fonts
        if self.over:
            msg, col = "Game over", INK_DIM
        elif self.board.turn == self.player_color:
            msg, col = "Your move, chef.", GOLD
        else:
            msg, col = "Ramsay is plating his move...", (228, 156, 64)
        t = f["header"].render(msg, True, col)
        surf.blit(t, (BOARD_X, 36))
        mouse = pygame.mouse.get_pos()
        self.menu_btn.draw(surf, mouse)
        self.mute_btn.label = "Muted" if self.app.sounds.muted else "Sound"
        self.mute_btn.draw(surf, mouse)

    def _square_rect(self, r, c):
        dr, dc = (7 - r, 7 - c) if self.flip else (r, c)
        return pygame.Rect(BOARD_X + dc * SQUARE, BOARD_Y + dr * SQUARE,
                           SQUARE, SQUARE)

    def _tint_square(self, surf, r, c, color, alpha):
        s = pygame.Surface((SQUARE, SQUARE), pygame.SRCALPHA)
        s.fill((*color, alpha))
        surf.blit(s, self._square_rect(r, c).topleft)

    def _draw_highlights(self, surf):
        if self.last_move:
            for sq in self.last_move:
                self._tint_square(surf, sq[0], sq[1], (226, 188, 96), 70)
        if self.check_square:
            self._tint_square(surf, *self.check_square, (210, 60, 56), 110)
        if self.selected:
            self._tint_square(surf, *self.selected, (120, 200, 255), 90)
        for sq in self.legal:
            cx, cy = self.square_center(*sq)
            target = self.board.piece_at(*sq)
            if target:
                pygame.draw.circle(surf, (255, 240, 200), (cx, cy),
                                   SQUARE // 2 - 4, 4)
            else:
                dot = pygame.Surface((20, 20), pygame.SRCALPHA)
                pygame.draw.circle(dot, (255, 255, 255, 150), (10, 10), 8)
                surf.blit(dot, (cx - 10, cy - 10))

    def _draw_pieces(self, surf):
        cov = self.covered_uids()
        for r in range(8):
            for c in range(8):
                p = self.board.grid[r][c]
                if p is None or p.uid in cov:
                    continue
                cx, cy = self.square_center(r, c)
                self.renderer.draw(surf, p, cx, cy, PIECE,
                                   self.faction_of(p.color), "idle",
                                   self.anim_time)

    def _draw_dragged(self, surf):
        if self.dragging and self.drag_piece:
            mx, my = pygame.mouse.get_pos()
            self.renderer.draw(surf, self.drag_piece, mx, my - 6,
                               PIECE + 10, self.faction_of(self.drag_piece.color),
                               "static", self.anim_time)

    # -- side panel -----------------------------------------------------
    def _draw_panel(self, surf):
        f = self.app.fonts
        panel = pygame.Rect(PANEL_X, BOARD_Y, PANEL_W, BOARD)
        pygame.draw.rect(surf, PANEL_BG, panel, border_radius=12)
        pygame.draw.rect(surf, (60, 63, 80), panel, 2, border_radius=12)

        # portrait + mood
        port = self.app.portrait
        surf.blit(port, (PANEL_X + 20, BOARD_Y + 20))
        name = f["normal"].render("GORDON RAMSAY", True, INK)
        surf.blit(name, (PANEL_X + 130, BOARD_Y + 30))
        mood = self.ramsay_mood
        pygame.draw.rect(surf, MOOD_COLOR[mood],
                         (PANEL_X + 130, BOARD_Y + 62, 150, 26),
                         border_radius=6)
        mw = f["small"].render(MOOD_WORD[mood], True, (20, 20, 24))
        surf.blit(mw, mw.get_rect(center=(PANEL_X + 205, BOARD_Y + 75)))
        rank = f["tiny"].render(self.ai.describe_level(), True, GOLD)
        surf.blit(rank, (PANEL_X + 130, BOARD_Y + 96))

        # speech bubble
        bub = pygame.Rect(PANEL_X + 20, BOARD_Y + 134, PANEL_W - 40, 150)
        pygame.draw.rect(surf, (28, 29, 38), bub, border_radius=10)
        pygame.draw.rect(surf, MOOD_COLOR[mood], bub, 2, border_radius=10)
        lines = wrap_text('"' + self.ramsay_text + '"', f["small"],
                          bub.width - 28)
        for i, ln in enumerate(lines[:6]):
            txt = f["small"].render(ln, True, INK)
            surf.blit(txt, (bub.x + 14, bub.y + 14 + i * 22))

        # difficulty bar
        by = BOARD_Y + 300
        lbl = f["tiny"].render("Opponent skill", True, INK_DIM)
        surf.blit(lbl, (PANEL_X + 20, by))
        bar = pygame.Rect(PANEL_X + 20, by + 20, PANEL_W - 40, 14)
        pygame.draw.rect(surf, (28, 29, 38), bar, border_radius=7)
        fill = bar.copy()
        fill.width = int(bar.width * self.ai.level)
        pygame.draw.rect(surf, GOLD, fill, border_radius=7)

        # POW cages
        self._draw_cage(surf, "Your spoils", self.pow_player,
                        BOARD_Y + 350)
        self._draw_cage(surf, "Ramsay's spoils", self.pow_ai,
                        BOARD_Y + 446)

    def _draw_cage(self, surf, title, pieces, y):
        f = self.app.fonts
        lbl = f["tiny"].render(f"{title}  ({len(pieces)})", True, INK_DIM)
        surf.blit(lbl, (PANEL_X + 20, y))
        cage = pygame.Rect(PANEL_X + 20, y + 20, PANEL_W - 40, 64)
        pygame.draw.rect(surf, (26, 27, 35), cage, border_radius=8)
        for i in range(0, 9):                    # cage bars
            x = cage.x + 6 + i * (cage.width - 12) / 8
            pygame.draw.line(surf, (70, 72, 88), (x, cage.y + 4),
                             (x, cage.bottom - 4), 1)
        size = 30
        for i, pc in enumerate(pieces[:24]):
            px = cage.x + 16 + (i % 12) * ((cage.width - 28) / 12)
            py = cage.y + 18 + (i // 12) * 30
            self.renderer.draw(surf, pc, int(px), int(py), size,
                               self.faction_of(pc.color), "static",
                               self.anim_time)

    def _draw_over(self, surf):
        f = self.app.fonts
        veil = pygame.Surface((WIN_W, WIN_H), pygame.SRCALPHA)
        veil.fill((0, 0, 0, 150))
        surf.blit(veil, (0, 0))
        box = pygame.Rect(PANEL_X - 4, BOARD_Y + 150, PANEL_W + 8, 470)
        pygame.draw.rect(surf, PANEL_BG, box, border_radius=14)
        pygame.draw.rect(surf, GOLD, box, 3, border_radius=14)
        titles = {"win": ("YOU WIN!", (104, 188, 96)),
                  "loss": ("CHECKMATE", (210, 70, 66)),
                  "draw": ("DRAW", INK_DIM)}
        text, col = titles[self.result]
        t = f["header"].render(text, True, col)
        surf.blit(t, t.get_rect(center=(box.centerx, box.y + 50)))
        lines = wrap_text('"' + self.ramsay_text + '"', f["small"],
                          box.width - 50)
        for i, ln in enumerate(lines[:6]):
            txt = f["small"].render(ln, True, INK)
            surf.blit(txt, txt.get_rect(center=(box.centerx,
                                                box.y + 110 + i * 24)))
        p = self.app.profile
        stat = f["tiny"].render(
            f"Record  W:{p.wins}  L:{p.losses}  D:{p.draws}    "
            f"Next rank: {self.ai.describe_level()}", True, GOLD)
        surf.blit(stat, stat.get_rect(center=(box.centerx, box.y + 290)))
        mouse = pygame.mouse.get_pos()
        for b in self.over_buttons:
            b.draw(surf, mouse)


# ======================================================================
# Application shell
# ======================================================================
class App:
    def __init__(self):
        self.screen = pygame.display.set_mode((WIN_W, WIN_H))
        pygame.display.set_caption("AuraChess v2 - Ramsay's Kitchen Gambit")
        self.clock = pygame.time.Clock()
        self.running = True

        self.fonts = {
            "title": pygame.font.Font(None, 96),
            "header": pygame.font.Font(None, 40),
            "normal": pygame.font.Font(None, 28),
            "small": pygame.font.Font(None, 23),
            "tiny": pygame.font.Font(None, 19),
        }
        import random
        self.rng = random.Random()
        self.profile = Profile.load()
        self.renderer = PieceRenderer()
        self.board_art = BoardArt()
        self.sounds = SoundFX()
        self.ramsay = RamsayCommentator(self.rng)
        self.portrait = render_portrait(96)
        self.settings = {}
        self.scene = MenuScene(self)

    def goto(self, scene):
        self.scene = scene

    def quit(self):
        self.running = False

    def run(self):
        while self.running:
            dt = min(self.clock.tick(60) / 1000.0, 0.05)
            for ev in pygame.event.get():
                if ev.type == pygame.QUIT:
                    self.running = False
                else:
                    self.scene.handle_event(ev)
            self.scene.update(dt)
            self.scene.draw(self.screen)
            pygame.display.flip()
        pygame.quit()


def main():
    pygame.mixer.pre_init(44100, -16, 1, 512)
    pygame.init()
    App().run()
    sys.exit(0)


if __name__ == "__main__":
    main()
