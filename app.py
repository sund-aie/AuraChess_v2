#!/usr/bin/env python3
"""
Gordon Ramsay's Chess Battlefield - Flask Server
Serves the game and provides API for Ollama quotes, local storage, and AI learning.
Run with: python3 app.py
"""

import os
import json
import time
import uuid
import requests
from datetime import datetime
from flask import Flask, send_from_directory, request, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='.')

# Configuration
OLLAMA_URL = os.getenv('OLLAMA_URL', 'http://localhost:11434')
OLLAMA_TIMEOUT = 30  # seconds - longer timeout for chess move generation

# Local storage directories
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
GAMES_DIR = os.path.join(DATA_DIR, 'games')
ANALYSIS_DIR = os.path.join(DATA_DIR, 'analysis')
os.makedirs(GAMES_DIR, exist_ok=True)
os.makedirs(ANALYSIS_DIR, exist_ok=True)

# Import our modules (created separately)
try:
    from ai_learning import AILearning
    ai_learning = AILearning()
except ImportError:
    ai_learning = None
    print("Warning: ai_learning module not found")


def get_all_local_games():
    games = []
    if os.path.exists(GAMES_DIR):
        for filename in os.listdir(GAMES_DIR):
            if filename.endswith('.json'):
                filepath = os.path.join(GAMES_DIR, filename)
                try:
                    with open(filepath, 'r') as f:
                        games.append(json.load(f))
                except:
                    pass
    return games

# ============================================================
# STATIC FILE SERVING
# ============================================================

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve any static file (js, css, etc.) from the project directory"""
    allowed_extensions = {'.js', '.css', '.html', '.png', '.jpg', '.ico', '.svg', '.woff', '.woff2'}
    ext = os.path.splitext(filename)[1].lower()
    if ext in allowed_extensions:
        return send_from_directory('.', filename)
    return 'Not found', 404

# ============================================================
# GORDON RAMSAY QUOTES API
# ============================================================

# No fallback quotes - ALL commentary comes from the LLM

def get_ollama_quote(context: str, move_info: dict = None) -> tuple[str, str]:
    """Get a quote from Ollama - LLM only, no fallback"""

    move_detail = ""
    if move_info:
        if move_info.get('captured'):
            move_detail = f" The move captured a {move_info['captured']}."
        move_detail += f" Move was from row {move_info.get('from', {}).get('row')} to row {move_info.get('to', {}).get('row')}."

    prompt = f"""You are Gordon Ramsay, the famously angry British celebrity chef. You are playing a chess game where you command British soldiers against an army of monkeys. Stay 100% in character as the furious, dramatic, insult-hurling Gordon Ramsay.

Use signature insults like "donkey", "idiot sandwich", "muppet", "donut". Use CAPS for emphasis and dramatic effect. Be over-the-top and theatrical.

{context}{move_detail}

Respond in 1-3 sentences only. Do NOT break character. Do NOT mention being an AI. Be FRESH and CREATIVE - don't repeat yourself!"""

    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False
            },
            timeout=OLLAMA_TIMEOUT
        )

        if response.status_code == 200:
            data = response.json()
            quote = data.get('response', '').strip()
            if quote:
                return quote, 'ollama'
    except requests.exceptions.RequestException as e:
        print(f"Ollama error: {e}")

    return None, None


@app.route('/api/quote', methods=['POST'])
def generate_quote():
    """Generate a Gordon Ramsay quote via Ollama - NO fallback"""
    data = request.get_json() or {}
    context = data.get('context', '')
    move_info = data.get('moveInfo')

    quote, source = get_ollama_quote(context, move_info)

    if not quote:
        return jsonify({
            'quote': None,
            'source': 'unavailable',
            'error': 'Ollama is not available. Cannot generate commentary.'
        }), 503

    return jsonify({
        'quote': quote,
        'source': source
    })

# ============================================================
# GAME STORAGE API
# ============================================================

@app.route('/api/save-game', methods=['POST'])
def save_game():
    """Save a completed game to local filesystem"""
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'error': 'No data provided'}), 400

    # Add metadata
    game_id = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{data.get('playerId', 'unknown')[:8]}"
    data['gameId'] = game_id
    data['savedAt'] = datetime.now().isoformat()

    try:
        # Save game to local file
        filepath = os.path.join(GAMES_DIR, f"{game_id}.json")
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)

        # Trigger pattern re-analysis
        games_analyzed = 0
        if ai_learning:
            games = get_all_local_games()
            games_analyzed = len(games)
            patterns = ai_learning.analyze_all_games(games, data.get('playerId'))
            player_id = data.get('playerId', 'default')
            analysis_path = os.path.join(ANALYSIS_DIR, f"player_{player_id}.json")
            with open(analysis_path, 'w') as f:
                json.dump(patterns, f, indent=2)

        return jsonify({
            'success': True,
            'gameId': game_id,
            'gamesAnalyzed': games_analyzed
        })
    except Exception as e:
        print(f"Error saving game: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

# ============================================================
# AI LEARNING API
# ============================================================

@app.route('/api/player-patterns', methods=['GET'])
def get_player_patterns():
    """Get learned patterns for a player"""
    player_id = request.args.get('playerId', 'default')

    if not ai_learning:
        # Return empty patterns if not configured
        return jsonify({
            'playerId': player_id,
            'gamesPlayed': 0,
            'patterns': {},
            'aiAdaptations': {}
        })

    try:
        # Read stored patterns from local file
        analysis_path = os.path.join(ANALYSIS_DIR, f"player_{player_id}.json")

        if not os.path.exists(analysis_path):
            # No patterns yet, return empty
            return jsonify({
                'playerId': player_id,
                'gamesPlayed': 0,
                'patterns': {},
                'aiAdaptations': {}
            })

        with open(analysis_path, 'r') as f:
            patterns = json.load(f)

        # Generate AI adaptations based on patterns
        adaptations = ai_learning.generate_gradual_adaptations(patterns)
        patterns['aiAdaptations'] = adaptations

        return jsonify(patterns)
    except Exception as e:
        print(f"Error getting patterns: {e}")
        return jsonify({
            'playerId': player_id,
            'gamesPlayed': 0,
            'patterns': {},
            'aiAdaptations': {},
            'error': str(e)
        })

@app.route('/api/ai-advice', methods=['POST'])
def get_ai_advice():
    """Get strategic advice from Ollama based on patterns"""
    data = request.get_json() or {}
    patterns = data.get('patterns', {})

    if not patterns:
        return jsonify({'advice': None})

    prompt = f"""As a chess strategist, analyze these player tendencies and suggest how to gradually improve against them:

Player patterns:
- Games played: {patterns.get('gamesPlayed', 0)}
- Win rate: {patterns.get('winRate', 0):.0%}
- Favorite pieces to move: {patterns.get('piecePreferences', {})}
- Frequently loses pieces at: {patterns.get('weakSquares', [])}
- Common opening moves: {patterns.get('openings', {})}

Suggest 2-3 subtle strategic adjustments (not too aggressive, help them learn):"""

    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={"model": "llama3.2", "prompt": prompt, "stream": False},
            timeout=10
        )
        if response.status_code == 200:
            advice = response.json().get('response', '').strip()
            return jsonify({'advice': advice})
    except:
        pass

    return jsonify({'advice': None})

# ============================================================
# AI CHESS MOVE - LLM PICKS THE MOVE + COMMENTARY
# ============================================================

def board_to_text(board_state):
    """Convert board array to readable text grid for LLM"""
    piece_symbols = {
        'king': 'K', 'queen': 'Q', 'rook': 'R',
        'bishop': 'B', 'knight': 'N', 'pawn': 'P'
    }
    cols = "    a   b   c   d   e   f   g   h"
    separator = "  +---+---+---+---+---+---+---+---+"
    lines = [cols, separator]

    for r in range(8):
        row_str = f"{8 - r} |"
        for c in range(8):
            cell = board_state[r][c] if board_state[r] else None
            if cell:
                symbol = piece_symbols.get(cell.get('type', ''), '?')
                if cell.get('color') == 'black':
                    symbol = symbol.lower()  # lowercase for black/player pieces
                row_str += f" {symbol} |"
            else:
                row_str += "   |"
        lines.append(row_str)
        lines.append(separator)

    return "\n".join(lines)


def format_move_algebraic(move, board_state):
    """Format a move in readable notation like 'Nb1-c3' """
    piece_names = {
        'king': 'K', 'queen': 'Q', 'rook': 'R',
        'bishop': 'B', 'knight': 'N', 'pawn': ''
    }
    cols = 'abcdefgh'
    fr = move.get('from', {})
    to = move.get('to', {})
    piece = move.get('piece', {})
    capture = move.get('capture')

    piece_letter = piece_names.get(piece.get('type', ''), '')
    from_sq = f"{cols[fr.get('col', 0)]}{8 - fr.get('row', 0)}"
    to_sq = f"{cols[to.get('col', 0)]}{8 - to.get('row', 0)}"
    capture_str = "x" if capture else "-"

    result = f"{piece_letter}{from_sq}{capture_str}{to_sq}"
    if capture:
        cap_name = capture.get('type', 'piece')
        result += f" (captures {cap_name})"
    return result


def get_player_summary(player_id):
    """Get a text summary of player patterns for the LLM prompt"""
    if not ai_learning:
        return "No prior game data available."

    analysis_path = os.path.join(ANALYSIS_DIR, f"player_{player_id}.json")
    if not os.path.exists(analysis_path):
        return "This is a new player with no prior games."

    try:
        with open(analysis_path, 'r') as f:
            patterns = json.load(f)

        games_played = patterns.get('gamesPlayed', 0)
        if games_played == 0:
            return "This is a new player with no prior games."

        win_rate = patterns.get('winRate', 0)
        p = patterns.get('patterns', {})
        avg_length = p.get('averageGameLength', 0)
        piece_prefs = p.get('piecePreferences', {})
        weak_squares = p.get('weakSquares', [])
        mistakes = p.get('commonMistakes', [])

        summary_parts = [
            f"Player has played {games_played} games (win rate: {win_rate:.0%}).",
            f"Average game length: {avg_length:.0f} moves.",
        ]

        if piece_prefs:
            top_pieces = sorted(piece_prefs.items(), key=lambda x: x[1], reverse=True)[:3]
            prefs_str = ", ".join(f"{p}({f:.0%})" for p, f in top_pieces)
            summary_parts.append(f"Most moved pieces: {prefs_str}.")

        if weak_squares:
            cols = 'abcdefgh'
            sq_names = []
            for sq in weak_squares[:3]:
                parts = sq.split(',')
                if len(parts) == 2:
                    r, c = int(parts[0]), int(parts[1])
                    sq_names.append(f"{cols[c]}{8-r}")
            if sq_names:
                summary_parts.append(f"Frequently loses pieces at: {', '.join(sq_names)}.")

        if mistakes:
            mistake_strs = [m.get('pattern', '') for m in mistakes[:2]]
            summary_parts.append(f"Common mistakes: {', '.join(mistake_strs)}.")

        # Determine skill level for adaptive difficulty
        if games_played <= 2:
            skill = "beginner"
            difficulty_note = "Play at an easy level. Make some suboptimal moves to let them learn. Focus on teaching basic chess principles."
        elif win_rate < 0.2:
            skill = "struggling"
            difficulty_note = "Play gently. Make occasional mistakes to give them chances. Subtly guide them toward better positions."
        elif win_rate < 0.4:
            skill = "learning"
            difficulty_note = "Play at moderate difficulty. Occasionally leave tactical opportunities for them to find."
        elif win_rate < 0.6:
            skill = "intermediate"
            difficulty_note = "Play solidly. Challenge them but don't crush them. Push them to think deeper."
        else:
            skill = "advanced"
            difficulty_note = "Play at full strength. This player is skilled and needs a real challenge."

        summary_parts.append(f"Skill assessment: {skill}. {difficulty_note}")

        return " ".join(summary_parts)

    except Exception as e:
        print(f"Error reading player summary: {e}")
        return "Error reading player history."


@app.route('/api/ai-move', methods=['POST'])
def ai_move():
    """
    LLM picks a chess move AND generates Ramsay commentary in one call.
    Receives: board state, legal moves, move history, player patterns.
    Returns: chosen move index + Ramsay commentary.
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    board_state = data.get('board', [])
    legal_moves = data.get('legalMoves', [])
    move_history = data.get('moveHistory', [])
    player_id = data.get('playerId', 'default')
    last_player_move_quality = data.get('lastPlayerMoveQuality', 'neutral')
    game_phase = data.get('gamePhase', 'middle')  # opening, middle, endgame

    if not legal_moves:
        return jsonify({'error': 'No legal moves available'}), 400

    # Build the board text
    board_text = board_to_text(board_state)

    # Format legal moves as numbered list
    moves_list = []
    for i, move in enumerate(legal_moves):
        move_text = format_move_algebraic(move, board_state)
        moves_list.append(f"{i + 1}. {move_text}")
    moves_text = "\n".join(moves_list)

    # Get recent move history (last 6 moves)
    history_text = ""
    if move_history:
        recent = move_history[-6:]
        history_parts = []
        for m in recent:
            color = m.get('piece', {}).get('color', '?')
            side = "White" if color == 'white' else "Black"
            move_str = format_move_algebraic(m, board_state)
            history_parts.append(f"{side}: {move_str}")
        history_text = "\n".join(history_parts)

    # Get player analysis summary
    player_summary = get_player_summary(player_id)

    # Build the mega-prompt
    prompt = f"""You are Gordon Ramsay, the famously angry British celebrity chef, AND a chess strategist. You are playing chess commanding the WHITE pieces (British soldiers) against the player's BLACK pieces (monkeys/opponents).

CURRENT BOARD STATE:
{board_text}
(Uppercase = your White pieces, lowercase = player's Black pieces)

YOUR LEGAL MOVES (pick ONE by number):
{moves_text}

RECENT MOVE HISTORY:
{history_text if history_text else "Game just started."}

GAME PHASE: {game_phase}

PLAYER ANALYSIS:
{player_summary}

PLAYER'S LAST MOVE WAS: {last_player_move_quality}

INSTRUCTIONS:
1. Analyze the board position carefully.
2. Pick the BEST move from the numbered list above based on your assessment and the player analysis. Consider: material advantage, positional control, king safety, tactical opportunities, and the player's skill level.
3. As Gordon Ramsay, write a short trash-talk comment (1-3 sentences). Use signature insults like "donkey", "idiot sandwich", "muppet", "donut". Use CAPS for emphasis. If the player made a bad move, mock them. If they made a good move, be furious. If you're capturing, gloat. Be CREATIVE and FRESH.

RESPOND IN EXACTLY THIS FORMAT:
MOVE: <number>
COMMENT: <your Ramsay trash talk>

Example:
MOVE: 3
COMMENT: BOOM! That's how a REAL strategist does it! Take NOTES, you pathetic DONKEY!"""

    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False
            },
            timeout=OLLAMA_TIMEOUT
        )

        if response.status_code != 200:
            return jsonify({'error': f'Ollama returned status {response.status_code}'}), 502

        result = response.json()
        llm_response = result.get('response', '').strip()
        print(f"LLM response:\n{llm_response}")

        # Parse the response
        move_idx = None
        comment = None

        for line in llm_response.split('\n'):
            line = line.strip()
            if line.upper().startswith('MOVE:'):
                try:
                    num_str = line.split(':', 1)[1].strip()
                    # Extract just the number (handle "3." or "3" or "#3")
                    num_str = num_str.replace('#', '').replace('.', '').strip()
                    move_idx = int(num_str) - 1  # Convert to 0-indexed
                except (ValueError, IndexError):
                    pass
            elif line.upper().startswith('COMMENT:'):
                comment = line.split(':', 1)[1].strip()

        # If we couldn't parse comment from a single line, try to get everything after COMMENT:
        if not comment:
            parts = llm_response.split('COMMENT:', 1)
            if len(parts) < 2:
                parts = llm_response.split('Comment:', 1)
            if len(parts) == 2:
                comment = parts[1].strip()

        # Validate move index
        if move_idx is None or move_idx < 0 or move_idx >= len(legal_moves):
            # LLM gave invalid move - pick the best heuristic move
            print(f"Invalid move index {move_idx}, falling back to first move")
            move_idx = 0  # Default to first legal move

        chosen_move = legal_moves[move_idx]

        return jsonify({
            'success': True,
            'moveIndex': move_idx,
            'move': chosen_move,
            'comment': comment or "RIGHT THEN! Let's see how you handle THAT, you DONKEY!",
            'source': 'ollama'
        })

    except requests.exceptions.Timeout:
        return jsonify({'error': 'Ollama timed out. The AI is taking too long to think.'}), 504
    except requests.exceptions.ConnectionError:
        return jsonify({'error': 'Cannot connect to Ollama. Make sure Ollama is running.'}), 503
    except Exception as e:
        print(f"AI move error: {e}")
        return jsonify({'error': str(e)}), 500


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint - verifies Ollama AND llama3.2 model"""
    ollama_status = 'disconnected'
    model_available = False

    try:
        resp = requests.get(f"{OLLAMA_URL}/api/tags", timeout=3)
        if resp.status_code == 200:
            ollama_status = 'connected'
            # Check if llama3.2 model is available
            tags = resp.json()
            models = tags.get('models', [])
            for m in models:
                name = m.get('name', '')
                if 'llama3.2' in name or name.startswith('llama3.2'):
                    model_available = True
                    break
    except:
        pass

    return jsonify({
        'status': 'ok',
        'ollama': ollama_status,
        'modelAvailable': model_available,
        'storage': 'local',
        'timestamp': datetime.now().isoformat()
    })

# ============================================================
# MAIN
# ============================================================

if __name__ == '__main__':
    print("=" * 60)
    print("GORDON RAMSAY'S CHESS BATTLEFIELD - Server Starting")
    print("=" * 60)
    print(f"Ollama URL: {OLLAMA_URL}")
    print(f"Storage: Local filesystem ({DATA_DIR})")
    print("-" * 60)
    print("Open http://localhost:8080 in your browser")
    print("=" * 60)

    app.run(host='0.0.0.0', port=8080, debug=True)
