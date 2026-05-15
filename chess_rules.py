"""
Pure-Python chess rules engine for AuraChess v2.

No external dependencies. Handles full legal move generation including
castling, en passant, promotion, check / checkmate / stalemate detection,
the 50-move rule and insufficient-material draws.

Coordinate system: grid[row][col], row 0 = top of the board (Black's back
rank), row 7 = bottom (White's back rank). White moves up the board.
"""

WHITE = "white"
BLACK = "black"

PIECE_TYPES = ("pawn", "knight", "bishop", "rook", "queen", "king")

# Centipawn values used by the rules layer and the AI.
PIECE_VALUE = {
    "pawn": 100, "knight": 320, "bishop": 330,
    "rook": 500, "queen": 900, "king": 20000,
}

_KNIGHT_JUMPS = ((-2, -1), (-2, 1), (-1, -2), (-1, 2),
                  (1, -2), (1, 2), (2, -1), (2, 1))
_DIAGONALS = ((-1, -1), (-1, 1), (1, -1), (1, 1))
_ORTHOGONALS = ((-1, 0), (1, 0), (0, -1), (0, 1))
_ALL_DIRS = _DIAGONALS + _ORTHOGONALS


def opposite(color):
    return BLACK if color == WHITE else WHITE


class Piece:
    """A single chess piece. `uid` is stable across clones so the renderer
    can track an individual piece for per-piece animation seeds."""

    __slots__ = ("color", "type", "has_moved", "uid")
    _counter = 0

    def __init__(self, color, ptype):
        self.color = color
        self.type = ptype
        self.has_moved = False
        Piece._counter += 1
        self.uid = Piece._counter

    def clone(self):
        p = Piece.__new__(Piece)
        p.color = self.color
        p.type = self.type
        p.has_moved = self.has_moved
        p.uid = self.uid
        return p

    def __repr__(self):
        return f"<{self.color} {self.type}>"


class Move:
    """An immutable description of one move."""

    __slots__ = ("fr", "to", "piece", "captured", "cap_pos",
                 "promotion", "is_castle", "is_enpassant", "is_double")

    def __init__(self, fr, to, piece, captured=None, cap_pos=None,
                 promotion=None, is_castle=False, is_enpassant=False,
                 is_double=False):
        self.fr = fr
        self.to = to
        self.piece = piece
        self.captured = captured
        self.cap_pos = cap_pos if cap_pos is not None else to
        self.promotion = promotion
        self.is_castle = is_castle
        self.is_enpassant = is_enpassant
        self.is_double = is_double

    def __eq__(self, other):
        return (isinstance(other, Move) and self.fr == other.fr
                and self.to == other.to and self.promotion == other.promotion)

    def __hash__(self):
        return hash((self.fr, self.to, self.promotion))

    def __repr__(self):
        return f"Move({self.fr}->{self.to})"


class Board:
    def __init__(self, setup=True):
        self.grid = [[None] * 8 for _ in range(8)]
        self.turn = WHITE
        self.en_passant = None          # target square (row, col) or None
        self.halfmove_clock = 0         # plies since last pawn move / capture
        self.move_log = []              # list of Move
        if setup:
            self._setup()

    def _setup(self):
        back = ["rook", "knight", "bishop", "queen",
                "king", "bishop", "knight", "rook"]
        for c in range(8):
            self.grid[0][c] = Piece(BLACK, back[c])
            self.grid[1][c] = Piece(BLACK, "pawn")
            self.grid[6][c] = Piece(WHITE, "pawn")
            self.grid[7][c] = Piece(WHITE, back[c])

    # ------------------------------------------------------------------
    # basic access
    # ------------------------------------------------------------------
    def piece_at(self, r, c):
        if 0 <= r < 8 and 0 <= c < 8:
            return self.grid[r][c]
        return None

    def clone(self):
        b = Board.__new__(Board)
        b.grid = [[(p.clone() if p else None) for p in row]
                  for row in self.grid]
        b.turn = self.turn
        b.en_passant = self.en_passant
        b.halfmove_clock = self.halfmove_clock
        b.move_log = []
        return b

    def king_pos(self, color):
        for r in range(8):
            for c in range(8):
                p = self.grid[r][c]
                if p and p.type == "king" and p.color == color:
                    return (r, c)
        return None

    # ------------------------------------------------------------------
    # attack detection
    # ------------------------------------------------------------------
    def square_attacked(self, r, c, by_color):
        """True if any `by_color` piece attacks square (r, c)."""
        # knights
        for dr, dc in _KNIGHT_JUMPS:
            p = self.piece_at(r + dr, c + dc)
            if p and p.color == by_color and p.type == "knight":
                return True
        # king
        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                if dr == 0 and dc == 0:
                    continue
                p = self.piece_at(r + dr, c + dc)
                if p and p.color == by_color and p.type == "king":
                    return True
        # pawns: a white pawn sits below the square it attacks
        pawn_row = r + 1 if by_color == WHITE else r - 1
        for dc in (-1, 1):
            p = self.piece_at(pawn_row, c + dc)
            if p and p.color == by_color and p.type == "pawn":
                return True
        # sliding diagonals (bishop / queen)
        for dr, dc in _DIAGONALS:
            nr, nc = r + dr, c + dc
            while 0 <= nr < 8 and 0 <= nc < 8:
                p = self.grid[nr][nc]
                if p:
                    if p.color == by_color and p.type in ("bishop", "queen"):
                        return True
                    break
                nr += dr
                nc += dc
        # sliding orthogonals (rook / queen)
        for dr, dc in _ORTHOGONALS:
            nr, nc = r + dr, c + dc
            while 0 <= nr < 8 and 0 <= nc < 8:
                p = self.grid[nr][nc]
                if p:
                    if p.color == by_color and p.type in ("rook", "queen"):
                        return True
                    break
                nr += dr
                nc += dc
        return False

    def in_check(self, color):
        kp = self.king_pos(color)
        if kp is None:
            return False
        return self.square_attacked(kp[0], kp[1], opposite(color))

    # ------------------------------------------------------------------
    # move generation
    # ------------------------------------------------------------------
    def _pseudo_moves(self, r, c):
        piece = self.grid[r][c]
        if piece is None:
            return []
        moves = []
        color = piece.color
        t = piece.type

        if t == "pawn":
            direction = -1 if color == WHITE else 1
            start_row = 6 if color == WHITE else 1
            promo_row = 0 if color == WHITE else 7
            one = r + direction
            if 0 <= one < 8 and self.grid[one][c] is None:
                self._add_pawn_move(moves, (r, c), (one, c), piece, None,
                                    promo_row)
                two = r + 2 * direction
                if r == start_row and self.grid[two][c] is None:
                    moves.append(Move((r, c), (two, c), piece,
                                      is_double=True))
            for dc in (-1, 1):
                nr, nc = r + direction, c + dc
                if not (0 <= nr < 8 and 0 <= nc < 8):
                    continue
                target = self.grid[nr][nc]
                if target and target.color != color:
                    self._add_pawn_move(moves, (r, c), (nr, nc), piece,
                                        target, promo_row)
                elif self.en_passant == (nr, nc):
                    cap_pos = (r, nc)
                    cap = self.grid[r][nc]
                    if cap and cap.color != color:
                        moves.append(Move((r, c), (nr, nc), piece,
                                          captured=cap, cap_pos=cap_pos,
                                          is_enpassant=True))
        elif t == "knight":
            for dr, dc in _KNIGHT_JUMPS:
                self._add_simple(moves, r, c, dr, dc, piece)
        elif t == "king":
            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    if dr == 0 and dc == 0:
                        continue
                    self._add_simple(moves, r, c, dr, dc, piece)
            moves.extend(self._castle_moves(r, c, piece))
        else:
            dirs = {"bishop": _DIAGONALS, "rook": _ORTHOGONALS,
                    "queen": _ALL_DIRS}[t]
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                while 0 <= nr < 8 and 0 <= nc < 8:
                    target = self.grid[nr][nc]
                    if target is None:
                        moves.append(Move((r, c), (nr, nc), piece))
                    else:
                        if target.color != color:
                            moves.append(Move((r, c), (nr, nc), piece,
                                              captured=target))
                        break
                    nr += dr
                    nc += dc
        return moves

    def _add_simple(self, moves, r, c, dr, dc, piece):
        nr, nc = r + dr, c + dc
        if not (0 <= nr < 8 and 0 <= nc < 8):
            return
        target = self.grid[nr][nc]
        if target is None:
            moves.append(Move((r, c), (nr, nc), piece))
        elif target.color != piece.color:
            moves.append(Move((r, c), (nr, nc), piece, captured=target))

    def _add_pawn_move(self, moves, fr, to, piece, captured, promo_row):
        if to[0] == promo_row:
            for promo in ("queen", "rook", "bishop", "knight"):
                moves.append(Move(fr, to, piece, captured=captured,
                                  promotion=promo))
        else:
            moves.append(Move(fr, to, piece, captured=captured))

    def _castle_moves(self, r, c, king):
        out = []
        if king.has_moved or self.in_check(king.color):
            return out
        home = 7 if king.color == WHITE else 0
        if r != home or c != 4:
            return out
        enemy = opposite(king.color)
        # king-side
        rook = self.grid[home][7]
        if (rook and rook.type == "rook" and not rook.has_moved
                and self.grid[home][5] is None and self.grid[home][6] is None
                and not self.square_attacked(home, 5, enemy)
                and not self.square_attacked(home, 6, enemy)):
            out.append(Move((r, c), (home, 6), king, is_castle=True))
        # queen-side
        rook = self.grid[home][0]
        if (rook and rook.type == "rook" and not rook.has_moved
                and self.grid[home][1] is None and self.grid[home][2] is None
                and self.grid[home][3] is None
                and not self.square_attacked(home, 3, enemy)
                and not self.square_attacked(home, 2, enemy)):
            out.append(Move((r, c), (home, 2), king, is_castle=True))
        return out

    def legal_moves(self, color=None):
        """Every fully legal move for `color` (defaults to side to move)."""
        if color is None:
            color = self.turn
        out = []
        for r in range(8):
            for c in range(8):
                p = self.grid[r][c]
                if p and p.color == color:
                    for mv in self._pseudo_moves(r, c):
                        if self._is_legal(mv, color):
                            out.append(mv)
        return out

    def moves_from(self, r, c):
        """Legal moves originating from a single square."""
        p = self.grid[r][c]
        if p is None or p.color != self.turn:
            return []
        return [mv for mv in self._pseudo_moves(r, c)
                if self._is_legal(mv, p.color)]

    def _is_legal(self, move, color):
        test = self.clone()
        test._apply_raw(move)
        return not test.in_check(color)

    # ------------------------------------------------------------------
    # applying moves
    # ------------------------------------------------------------------
    def _apply_raw(self, move):
        """Apply a move to the grid without bookkeeping for legality tests."""
        fr, to = move.fr, move.to
        piece = self.grid[fr[0]][fr[1]]
        self.grid[fr[0]][fr[1]] = None
        if move.is_enpassant:
            self.grid[move.cap_pos[0]][move.cap_pos[1]] = None
        self.grid[to[0]][to[1]] = piece
        if move.promotion:
            piece.type = move.promotion
        if move.is_castle:
            home = to[0]
            if to[1] == 6:
                rook = self.grid[home][7]
                self.grid[home][7] = None
                self.grid[home][5] = rook
            else:
                rook = self.grid[home][0]
                self.grid[home][0] = None
                self.grid[home][3] = rook

    def push(self, move):
        """Apply `move` as the real next move and switch turns."""
        piece = self.grid[move.fr[0]][move.fr[1]]
        is_pawn = piece.type == "pawn"
        captured = move.captured

        self._apply_raw(move)
        piece.has_moved = True
        if move.is_castle:
            home = move.to[0]
            rook = self.grid[home][5] if move.to[1] == 6 else self.grid[home][3]
            if rook:
                rook.has_moved = True

        # en passant target
        if move.is_double:
            self.en_passant = ((move.fr[0] + move.to[0]) // 2, move.fr[1])
        else:
            self.en_passant = None

        # halfmove clock
        if is_pawn or captured is not None:
            self.halfmove_clock = 0
        else:
            self.halfmove_clock += 1

        self.move_log.append(move)
        self.turn = opposite(self.turn)

    # ------------------------------------------------------------------
    # game state
    # ------------------------------------------------------------------
    def has_legal_moves(self, color=None):
        if color is None:
            color = self.turn
        for r in range(8):
            for c in range(8):
                p = self.grid[r][c]
                if p and p.color == color:
                    for mv in self._pseudo_moves(r, c):
                        if self._is_legal(mv, color):
                            return True
        return False

    def insufficient_material(self):
        pieces = [p for row in self.grid for p in row if p]
        types = sorted(p.type for p in pieces if p.type != "king")
        if not types:
            return True
        if types in (["knight"], ["bishop"]):
            return True
        return False

    def status(self):
        """Return one of: 'ongoing', 'checkmate', 'stalemate', 'draw'."""
        if not self.has_legal_moves(self.turn):
            return "checkmate" if self.in_check(self.turn) else "stalemate"
        if self.halfmove_clock >= 100:
            return "draw"
        if self.insufficient_material():
            return "draw"
        return "ongoing"

    def winner(self):
        """Color that delivered checkmate, or None."""
        if self.status() == "checkmate":
            return opposite(self.turn)
        return None
