"""
AI Learning Module for Gordon Ramsay Chess
Analyzes player games and generates gradual adaptations.
"""

from collections import defaultdict
from typing import Optional


class AILearning:
    """Analyzes games and generates AI adaptations"""

    # Piece values for analysis
    PIECE_VALUES = {
        'pawn': 1, 'knight': 3, 'bishop': 3,
        'rook': 5, 'queen': 9, 'king': 100
    }

    def analyze_all_games(self, games: list, player_id: str) -> dict:
        """Analyze all games for a specific player"""
        # Filter games for this player
        player_games = [g for g in games if g.get('playerId') == player_id]

        if not player_games:
            return self._empty_patterns(player_id)

        patterns = {
            'playerId': player_id,
            'gamesPlayed': len(player_games),
            'winRate': self._calculate_win_rate(player_games),
            'patterns': {
                'openings': self._analyze_openings(player_games),
                'piecePreferences': self._analyze_piece_usage(player_games),
                'weakSquares': self._find_weak_squares(player_games),
                'commonMistakes': self._find_common_mistakes(player_games),
                'averageGameLength': self._avg_game_length(player_games),
                'captureRatio': self._analyze_captures(player_games),
            },
            'analyzedAt': None
        }

        from datetime import datetime
        patterns['analyzedAt'] = datetime.now().isoformat()

        return patterns

    def generate_gradual_adaptations(self, patterns: dict) -> dict:
        """
        Generate FAST AI adaptations based on patterns.
        The AI learns quickly to provide a challenging experience.
        """
        games_played = patterns.get('gamesPlayed', 0)
        player_patterns = patterns.get('patterns', {})

        # FAST LEARNING: Adaptation strength maxes out at 5 games (was 20)
        # AI learns quickly and aggressively
        adaptation_strength = min(games_played / 5.0, 1.0)

        adaptations = {
            'enabled': games_played >= 1,  # Start adapting after just 1 game!
            'strength': adaptation_strength,
            'bonuses': {}
        }

        if games_played < 1:
            return adaptations

        # Counter-opening strategy (kicks in after 2 games, was 5)
        openings = player_patterns.get('openings', {})
        if games_played >= 2 and openings:
            most_common = max(openings, key=openings.get, default=None)
            adaptations['counterOpening'] = self._get_counter_opening(most_common)

        # Target weak squares (kicks in after 2 games, was 5)
        weak_squares = player_patterns.get('weakSquares', [])
        if games_played >= 2 and weak_squares:
            # Use top 5 weakest squares (was 3)
            adaptations['targetSquares'] = weak_squares[:5]
            # DOUBLED bonus (max +50, was +25)
            adaptations['bonuses']['weakSquareBonus'] = int(50 * adaptation_strength)

        # Exploit piece overuse (kicks in after 3 games, was 8)
        piece_prefs = player_patterns.get('piecePreferences', {})
        if games_played >= 3 and piece_prefs:
            overused = [p for p, freq in piece_prefs.items() if freq > 0.20]  # Lower threshold
            if overused:
                adaptations['targetPieces'] = overused
                # DOUBLED bonus (max +40, was +20)
                adaptations['bonuses']['pieceTargetBonus'] = int(40 * adaptation_strength)

        # Counter mistakes (kicks in after 4 games, was 10)
        mistakes = player_patterns.get('commonMistakes', [])
        if games_played >= 4 and mistakes:
            adaptations['exploitPatterns'] = [m['pattern'] for m in mistakes[:3]]  # Use more patterns
            # DOUBLED bonus (max +60, was +30)
            adaptations['bonuses']['mistakeExploitBonus'] = int(60 * adaptation_strength)

        # Add development bonuses based on player's win rate
        # If player is winning a lot, increase AI aggression slightly
        win_rate = patterns.get('winRate', 0.5)
        if win_rate > 0.5 and games_played >= 5:
            # Player is good, AI should try harder
            adaptations['bonuses']['aggressionBonus'] = int(15 * adaptation_strength * (win_rate - 0.5) * 2)

        return adaptations

    def _empty_patterns(self, player_id: str) -> dict:
        """Return empty pattern structure"""
        return {
            'playerId': player_id,
            'gamesPlayed': 0,
            'winRate': 0,
            'patterns': {},
            'analyzedAt': None
        }

    def _calculate_win_rate(self, games: list) -> float:
        """Calculate player's win rate"""
        if not games:
            return 0
        wins = sum(1 for g in games if g.get('winner') == 'black')  # Player is black
        return wins / len(games)

    def _analyze_openings(self, games: list) -> dict:
        """Analyze player's opening move preferences"""
        openings = defaultdict(int)

        for game in games:
            moves = game.get('moves', [])
            # Get first 3 player moves (black pieces)
            player_moves = [m for m in moves if m.get('piece', {}).get('color') == 'black'][:3]

            if player_moves:
                # Create opening signature
                opening_key = self._moves_to_key(player_moves)
                openings[opening_key] += 1

        return dict(openings)

    def _moves_to_key(self, moves: list) -> str:
        """Convert moves to a string key"""
        parts = []
        for m in moves:
            fr = m.get('from', {})
            to = m.get('to', {})
            piece = m.get('piece', {}).get('type', '?')
            parts.append(f"{piece[0]}{fr.get('col', 0)}{to.get('row', 0)}{to.get('col', 0)}")
        return '-'.join(parts)

    def _analyze_piece_usage(self, games: list) -> dict:
        """Analyze which pieces player moves most frequently"""
        piece_moves = defaultdict(int)
        total_moves = 0

        for game in games:
            moves = game.get('moves', [])
            for m in moves:
                if m.get('piece', {}).get('color') == 'black':
                    piece_type = m.get('piece', {}).get('type', 'unknown')
                    piece_moves[piece_type] += 1
                    total_moves += 1

        if total_moves == 0:
            return {}

        # Convert to percentages
        return {piece: count / total_moves for piece, count in piece_moves.items()}

    def _find_weak_squares(self, games: list) -> list:
        """Find squares where player frequently loses pieces"""
        loss_squares = defaultdict(int)

        for game in games:
            moves = game.get('moves', [])
            for m in moves:
                # If AI (white) captured a player piece
                captured = m.get('captured')
                if captured and captured.get('color') == 'black':
                    to = m.get('to', {})
                    square = f"{to.get('row', 0)},{to.get('col', 0)}"
                    # Weight by piece value
                    piece_type = captured.get('type', 'pawn')
                    loss_squares[square] += self.PIECE_VALUES.get(piece_type, 1)

        # Sort by frequency, return top 5
        sorted_squares = sorted(loss_squares.items(), key=lambda x: x[1], reverse=True)
        return [sq for sq, _ in sorted_squares[:5]]

    def _find_common_mistakes(self, games: list) -> list:
        """Find common mistake patterns"""
        mistakes = defaultdict(int)

        for game in games:
            moves = game.get('moves', [])
            for i, m in enumerate(moves):
                if m.get('piece', {}).get('color') != 'black':
                    continue

                # Check if next move was a capture of player's piece
                if i + 1 < len(moves):
                    next_move = moves[i + 1]
                    if (next_move.get('piece', {}).get('color') == 'white' and
                        next_move.get('captured', {}).get('color') == 'black'):
                        # Player made a move that led to immediate capture
                        piece_type = m.get('piece', {}).get('type', 'unknown')
                        mistakes[f"exposed_{piece_type}"] += 1

        # Return top mistakes
        sorted_mistakes = sorted(mistakes.items(), key=lambda x: x[1], reverse=True)
        return [{'pattern': p, 'frequency': c} for p, c in sorted_mistakes[:3]]

    def _avg_game_length(self, games: list) -> float:
        """Calculate average game length"""
        if not games:
            return 0
        lengths = [len(g.get('moves', [])) for g in games]
        return sum(lengths) / len(lengths)

    def _analyze_captures(self, games: list) -> dict:
        """Analyze capture statistics"""
        player_captures = defaultdict(int)
        ai_captures = defaultdict(int)

        for game in games:
            for piece_type in game.get('capturedByPlayer', []):
                player_captures[piece_type] += 1
            for piece_type in game.get('capturedByAI', []):
                ai_captures[piece_type] += 1

        return {
            'byPlayer': dict(player_captures),
            'byAI': dict(ai_captures)
        }

    def _get_counter_opening(self, opening: str) -> Optional[str]:
        """Get a counter-strategy for player's common opening"""
        # Simple counter mapping based on piece patterns
        if not opening:
            return None

        # If player starts with pawns in center, counter with knights
        if opening.startswith('p'):
            return 'knight_development'
        # If player starts with knight, control center with pawns
        if opening.startswith('n') or opening.startswith('k'):
            return 'pawn_center_control'
        # If player starts with bishop, develop knights first
        if opening.startswith('b'):
            return 'knight_before_bishop'

        return 'balanced_development'
