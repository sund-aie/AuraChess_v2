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
OLLAMA_TIMEOUT = 8  # seconds

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

# Fallback quotes when Ollama is unavailable
FALLBACK_QUOTES = {
    'good_player_move': [
        "BLOODY HELL! That was actually a GOOD move! How DARE you, you banana-munching DONKEY!",
        "Oh for f***'s sake! Even a MONKEY gets lucky! Wait... you ARE a monkey! STILL UNACCEPTABLE!",
        "RIGHT! That's IT! You think you're CLEVER?! I've seen better strategy from a FISH FINGER but that was DECENT!",
        "SHUT IT DOWN! Where did your pathetic monkey brain come up with THAT?! I'm LIVID!",
        "You MUPPET! That was actually... good?! NO! I REFUSE to accept this!",
    ],
    'bad_player_move': [
        "HAHAHAHA! What was THAT?! My GRANDMOTHER plays better chess, and she's been DEAD for twenty years!",
        "Oh BRILLIANT move! If your goal was to LOSE, you absolute DONUT! Were you aiming for the banana instead?!",
        "Did you just... did you REALLY?! You're an IDIOT SANDWICH! Say it! SAY IT!",
        "WHAT ARE YOU?! A chess player?! Don't make me LAUGH! You're a DONKEY playing with furniture!",
        "That move was so BAD I wouldn't serve it to my WORST ENEMY!",
    ],
    'own_move': [
        "RIGHT THEN! Watch and LEARN, you furry waste of space! THAT'S how a genius plays!",
        "BOOM! That's how a REAL strategist does it! Take NOTES, DONKEY!",
        "Oh YES! Beautiful! Like a perfectly seared WELLINGTON!",
        "THAT is what EXCELLENCE looks like! Military PRECISION!",
        "Lovely, LOVELY move! I'm a GENIUS on the battlefield AND in the kitchen!",
    ],
    'capture': [
        "GET OUT! GET OUT OF MY BATTLEFIELD! Another monkey DOWN!",
        "BANG BANG! One more monkey in CHAINS! How does that FEEL?!",
        "That monkey just got SERVED! OFF TO THE P.O.W. CAMP!",
        "ANOTHER ONE BITES THE DUST! Your army is crumbling!",
        "Into the CHAINS with that one! This is a MASSACRE!",
    ],
    'game_over_win': [
        "IT'S DONE! IT'S OVER! Your pathetic monkey king is FINISHED! I AM THE GREATEST!",
        "CHECKMATE, you absolute DONUT! That's what happens when you mess with GORDON RAMSAY!",
        "Game OVER! Your monkey army was RAWWWW! Completely PATHETIC!",
    ],
    'game_over_lose': [
        "NO! NO NO NO! This CAN'T be happening! A MONKEY beat GORDON RAMSAY?!",
        "IMPOSSIBLE! You got LUCKY! I want a REMATCH! RIGHT NOW!",
        "FINE! You win THIS time! But I WILL DESTROY you next game!",
    ],
}

def get_ollama_quote(context: str, move_info: dict = None) -> tuple[str, str]:
    """Get a quote from Ollama, returns (quote, source)"""

    # Build detailed prompt
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

def get_fallback_quote(quote_type: str) -> str:
    """Get a random fallback quote"""
    import random
    quotes = FALLBACK_QUOTES.get(quote_type, FALLBACK_QUOTES['own_move'])
    return random.choice(quotes)

@app.route('/api/quote', methods=['POST'])
def generate_quote():
    """Generate a Gordon Ramsay quote via Ollama or fallback"""
    data = request.get_json() or {}
    context = data.get('context', '')
    quote_type = data.get('type', 'own_move')
    move_info = data.get('moveInfo')

    # Try Ollama first
    quote, source = get_ollama_quote(context, move_info)

    if not quote:
        # Fallback
        quote = get_fallback_quote(quote_type)
        source = 'fallback'

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
# HEALTH CHECK
# ============================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    ollama_status = 'disconnected'

    # Check Ollama
    try:
        resp = requests.get(f"{OLLAMA_URL}/api/tags", timeout=2)
        if resp.status_code == 200:
            ollama_status = 'connected'
    except:
        pass

    return jsonify({
        'status': 'ok',
        'ollama': ollama_status,
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
