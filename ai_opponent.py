"""
Adaptive chess opponent for AuraChess v2.

This replaces the old Ollama / LLM stack entirely. It is a lightweight
rule-based engine: alpha-beta search over a material + piece-square
evaluation, wrapped in a dynamic "blunder" layer so the opponent starts
genuinely weak and sharpens up game by game.

Learning is persistent: a Profile is stored on disk and the opponent's
level climbs as you play -- faster if you keep winning -- so the AI
"learns how you play" and gradually becomes more professional.
"""

import json
import os
import random

from chess_rules import WHITE, BLACK, PIECE_VALUE, opposite

MATE = 100_000
INF = 10**9

PROFILE_DIR = "data"
PROFILE_PATH = os.path.join(PROFILE_DIR, "profile.json")

# Piece-square tables, white's point of view, row 0 = top (Black side).
# Higher = better square for a white piece.
_PST = {
    "pawn": [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [5, 5, 10, 25, 25, 10, 5, 5],
        [0, 0, 0, 20, 20, 0, 0, 0],
        [5, -5, -10, 0, 0, -10, -5, 5],
        [5, 10, 10, -20, -20, 10, 10, 5],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    "knight": [
        [-50, -40, -30, -30, -30, -30, -40, -50],
        [-40, -20, 0, 0, 0, 0, -20, -40],
        [-30, 0, 10, 15, 15, 10, 0, -30],
        [-30, 5, 15, 20, 20, 15, 5, -30],
        [-30, 0, 15, 20, 20, 15, 0, -30],
        [-30, 5, 10, 15, 15, 10, 5, -30],
        [-40, -20, 0, 5, 5, 0, -20, -40],
        [-50, -40, -30, -30, -30, -30, -40, -50],
    ],
    "bishop": [
        [-20, -10, -10, -10, -10, -10, -10, -20],
        [-10, 0, 0, 0, 0, 0, 0, -10],
        [-10, 0, 5, 10, 10, 5, 0, -10],
        [-10, 5, 5, 10, 10, 5, 5, -10],
        [-10, 0, 10, 10, 10, 10, 0, -10],
        [-10, 10, 10, 10, 10, 10, 10, -10],
        [-10, 5, 0, 0, 0, 0, 5, -10],
        [-20, -10, -10, -10, -10, -10, -10, -20],
    ],
    "rook": [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [5, 10, 10, 10, 10, 10, 10, 5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [0, 0, 0, 5, 5, 0, 0, 0],
    ],
    "queen": [
        [-20, -10, -10, -5, -5, -10, -10, -20],
        [-10, 0, 0, 0, 0, 0, 0, -10],
        [-10, 0, 5, 5, 5, 5, 0, -10],
        [-5, 0, 5, 5, 5, 5, 0, -5],
        [0, 0, 5, 5, 5, 5, 0, -5],
        [-10, 5, 5, 5, 5, 5, 0, -10],
        [-10, 0, 5, 0, 0, 0, 0, -10],
        [-20, -10, -10, -5, -5, -10, -10, -20],
    ],
    "king": [
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-20, -30, -30, -40, -40, -30, -30, -20],
        [-10, -20, -20, -20, -20, -20, -20, -10],
        [20, 20, 0, 0, 0, 0, 20, 20],
        [20, 30, 10, 0, 0, 10, 30, 20],
    ],
}


def evaluate(board, weak_squares=None):
    """Static evaluation in centipawns. Positive favours White."""
    score = 0
    for r in range(8):
        for c in range(8):
            p = board.grid[r][c]
            if p is None:
                continue
            val = PIECE_VALUE[p.type]
            if p.color == WHITE:
                score += val + _PST[p.type][r][c]
            else:
                score -= val + _PST[p.type][7 - r][c]
    # learned bias: nudge the AI toward squares the player keeps losing on
    if weak_squares:
        for (r, c) in weak_squares:
            p = board.grid[r][c]
            if p and p.color == BLACK:        # AI piece parked on a weak square
                score -= 12
    return score


def find_hanging_piece(board, color):
    """Return (pos, piece) for the most valuable undefended piece of `color`
    that is currently attacked, or None. Used for teaching hints."""
    enemy = opposite(color)
    worst = None
    worst_val = 0
    for r in range(8):
        for c in range(8):
            p = board.grid[r][c]
            if not p or p.color != color or p.type == "king":
                continue
            if board.square_attacked(r, c, enemy):
                if not board.square_attacked(r, c, color):   # undefended
                    val = PIECE_VALUE[p.type]
                    if val > worst_val:
                        worst_val = val
                        worst = ((r, c), p)
    return worst


# ----------------------------------------------------------------------
# Persistent learning profile
# ----------------------------------------------------------------------
class Profile:
    """Tracks results across sessions and drives difficulty scaling."""

    def __init__(self):
        self.games_played = 0
        self.wins = 0          # player wins
        self.losses = 0        # player losses
        self.draws = 0
        self.ai_level = 0.08   # 0 = clueless, 1 = ruthless
        self.skill = 0.15      # rolling estimate of the player's skill
        self.player_blunders = 0
        self.player_moves = 0
        self.weak_squares = {}  # "r,c" -> times a player piece died there

    # -- persistence ----------------------------------------------------
    def to_dict(self):
        return {
            "games_played": self.games_played, "wins": self.wins,
            "losses": self.losses, "draws": self.draws,
            "ai_level": round(self.ai_level, 4), "skill": round(self.skill, 4),
            "player_blunders": self.player_blunders,
            "player_moves": self.player_moves,
            "weak_squares": self.weak_squares,
        }

    @classmethod
    def load(cls):
        prof = cls()
        try:
            with open(PROFILE_PATH, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            for key in ("games_played", "wins", "losses", "draws",
                        "player_blunders", "player_moves"):
                prof.__dict__[key] = int(data.get(key, 0))
            prof.ai_level = float(data.get("ai_level", 0.08))
            prof.skill = float(data.get("skill", 0.15))
            prof.weak_squares = dict(data.get("weak_squares", {}))
        except (FileNotFoundError, ValueError, KeyError):
            pass
        return prof

    def save(self):
        try:
            os.makedirs(PROFILE_DIR, exist_ok=True)
            with open(PROFILE_PATH, "w", encoding="utf-8") as fh:
                json.dump(self.to_dict(), fh, indent=2)
        except OSError:
            pass

    # -- learning -------------------------------------------------------
    def record_game(self, result, blunders, moves, lost_squares):
        """result: 'win' / 'loss' / 'draw' from the player's perspective."""
        self.games_played += 1
        self.player_blunders += blunders
        self.player_moves += max(moves, 1)
        for sq in lost_squares:
            key = f"{sq[0]},{sq[1]}"
            self.weak_squares[key] = self.weak_squares.get(key, 0) + 1

        blunder_rate = blunders / max(moves, 1)
        if result == "win":
            self.wins += 1
            # player is doing well -- the AI must work noticeably harder
            self.ai_level += 0.13
            self.skill = min(1.0, self.skill + 0.10)
        elif result == "loss":
            self.losses += 1
            # still ramps, but gently -- it keeps teaching without crushing
            self.ai_level += 0.035
            self.skill = max(0.0, self.skill - 0.04)
        else:
            self.draws += 1
            self.ai_level += 0.07

        # fewer blunders => the player is sharper => nudge difficulty up
        if blunder_rate < 0.08:
            self.ai_level += 0.04
        self.ai_level = max(0.05, min(1.0, self.ai_level))

    def top_weak_squares(self, n=6):
        ranked = sorted(self.weak_squares.items(),
                        key=lambda kv: kv[1], reverse=True)
        out = []
        for key, _ in ranked[:n]:
            r, c = key.split(",")
            out.append((int(r), int(c)))
        return out


# ----------------------------------------------------------------------
# The opponent
# ----------------------------------------------------------------------
class AdaptiveAI:
    """Alpha-beta searcher with a difficulty-driven blunder layer."""

    def __init__(self, color, profile, rng=None):
        self.color = color
        self.profile = profile
        self.rng = rng or random.Random()
        self.nodes = 0

    # -- difficulty knobs ----------------------------------------------
    @property
    def level(self):
        return self.profile.ai_level

    @property
    def depth(self):
        lvl = self.level
        if lvl < 0.22:
            return 1
        if lvl < 0.55:
            return 2
        return 3

    @property
    def blunder_chance(self):
        # plenty of mistakes early on, almost none once it turns pro
        return max(0.03, 0.82 * (1.0 - self.level) ** 1.4)

    def describe_level(self):
        lvl = self.level
        if lvl < 0.20:
            return "Clueless Commis"
        if lvl < 0.40:
            return "Nervous Line Cook"
        if lvl < 0.62:
            return "Steady Sous Chef"
        if lvl < 0.85:
            return "Sharp Head Chef"
        return "Ruthless Michelin Master"

    # -- search ---------------------------------------------------------
    def _order(self, board, moves):
        def key(mv):
            s = 0
            if mv.captured:
                s += 10 * PIECE_VALUE[mv.captured.type] \
                    - PIECE_VALUE[mv.piece.type]
            if mv.promotion:
                s += PIECE_VALUE[mv.promotion]
            return -s
        return sorted(moves, key=key)

    def _search(self, board, depth, alpha, beta, weak):
        self.nodes += 1
        moves = board.legal_moves()
        if not moves:
            if board.in_check(board.turn):
                return -MATE - depth          # mated: prefer faster mates
            return 0                          # stalemate
        if board.halfmove_clock >= 100 or board.insufficient_material():
            return 0
        if depth == 0:
            ev = evaluate(board, weak)
            return ev if board.turn == WHITE else -ev
        best = -INF
        for mv in self._order(board, moves):
            child = board.clone()
            child.push(mv)
            score = -self._search(child, depth - 1, -beta, -alpha, weak)
            if score > best:
                best = score
            if score > alpha:
                alpha = score
            if alpha >= beta:
                break
        return best

    # -- public ---------------------------------------------------------
    def choose_move(self, board):
        """Pick a move for the AI's colour. Returns a Move (or None)."""
        moves = board.legal_moves(self.color)
        if not moves:
            return None
        if len(moves) == 1:
            return moves[0]

        self.nodes = 0
        weak = self.profile.top_weak_squares()
        depth = self.depth
        scored = []
        for mv in self._order(board, moves):
            child = board.clone()
            child.push(mv)
            score = -self._search(child, depth - 1, -INF, INF, weak)
            scored.append((mv, score))
        scored.sort(key=lambda ms: ms[1], reverse=True)

        # blunder layer: an unsharpened opponent drifts off the best line
        if len(scored) > 1 and self.rng.random() < self.blunder_chance:
            # weight the choice toward weaker moves, but keep it bounded
            pool = scored[1:]
            spread = max(1, int(len(pool) * (1.0 - self.level)))
            pick_from = pool[:spread] if spread < len(pool) else pool
            return self.rng.choice(pick_from)[0]

        best_score = scored[0][1]
        near_best = [mv for mv, s in scored if s >= best_score - 12]
        return self.rng.choice(near_best)
