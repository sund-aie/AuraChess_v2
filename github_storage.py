"""
GitHub Storage Module for Gordon Ramsay Chess
Handles saving/loading game data to GitHub repository.
"""

import os
import json
import base64
import requests
from datetime import datetime
from typing import Optional


class GitHubStorage:
    """Handles GitHub API operations for game storage"""

    def __init__(self, token: str, repo: str):
        self.token = token
        self.repo = repo
        self.api_base = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        }
        # Local cache
        self._games_cache = None
        self._cache_time = None
        self._cache_ttl = 300  # 5 minutes

    def test_connection(self) -> bool:
        """Test if GitHub connection works"""
        if not self.token:
            return False
        try:
            resp = requests.get(
                f"{self.api_base}/repos/{self.repo}",
                headers=self.headers,
                timeout=5
            )
            return resp.status_code == 200
        except:
            return False

    def save_game(self, game_id: str, game_data: dict) -> dict:
        """Save a game to GitHub"""
        filename = f"games/{game_id}.json"
        content = json.dumps(game_data, indent=2)
        content_b64 = base64.b64encode(content.encode()).decode()

        # Check if file exists (to get SHA for update)
        sha = self._get_file_sha(filename)

        payload = {
            "message": f"Add game {game_id}",
            "content": content_b64
        }
        if sha:
            payload["sha"] = sha

        resp = requests.put(
            f"{self.api_base}/repos/{self.repo}/contents/{filename}",
            headers=self.headers,
            json=payload,
            timeout=10
        )

        if resp.status_code in [200, 201]:
            # Invalidate cache
            self._games_cache = None
            return {"success": True, "totalGames": self._count_games()}
        else:
            raise Exception(f"GitHub API error: {resp.status_code} - {resp.text}")

    def get_all_games(self) -> list:
        """Get all saved games (with caching)"""
        now = datetime.now().timestamp()

        # Check cache
        if (self._games_cache is not None and
            self._cache_time and
            now - self._cache_time < self._cache_ttl):
            return self._games_cache

        games = []
        try:
            # List files in games directory
            resp = requests.get(
                f"{self.api_base}/repos/{self.repo}/contents/games",
                headers=self.headers,
                timeout=10
            )

            if resp.status_code == 200:
                files = resp.json()
                for file_info in files:
                    if file_info['name'].endswith('.json'):
                        game_data = self._get_file_content(file_info['path'])
                        if game_data:
                            games.append(game_data)

            # Update cache
            self._games_cache = games
            self._cache_time = now

        except Exception as e:
            print(f"Error fetching games: {e}")

        return games

    def save_patterns(self, player_id: str, patterns: dict) -> bool:
        """Save player pattern analysis"""
        filename = f"analysis/player_{player_id[:16]}.json"
        content = json.dumps(patterns, indent=2)
        content_b64 = base64.b64encode(content.encode()).decode()

        sha = self._get_file_sha(filename)

        payload = {
            "message": f"Update patterns for {player_id[:8]}",
            "content": content_b64
        }
        if sha:
            payload["sha"] = sha

        try:
            resp = requests.put(
                f"{self.api_base}/repos/{self.repo}/contents/{filename}",
                headers=self.headers,
                json=payload,
                timeout=10
            )
            return resp.status_code in [200, 201]
        except:
            return False

    def get_patterns(self, player_id: str) -> Optional[dict]:
        """Get stored patterns for a player"""
        filename = f"analysis/player_{player_id[:16]}.json"
        return self._get_file_content(filename)

    def _get_file_sha(self, path: str) -> Optional[str]:
        """Get SHA of existing file (needed for updates)"""
        try:
            resp = requests.get(
                f"{self.api_base}/repos/{self.repo}/contents/{path}",
                headers=self.headers,
                timeout=5
            )
            if resp.status_code == 200:
                return resp.json().get('sha')
        except:
            pass
        return None

    def _get_file_content(self, path: str) -> Optional[dict]:
        """Get content of a JSON file"""
        try:
            resp = requests.get(
                f"{self.api_base}/repos/{self.repo}/contents/{path}",
                headers=self.headers,
                timeout=10
            )
            if resp.status_code == 200:
                content_b64 = resp.json().get('content', '')
                content = base64.b64decode(content_b64).decode()
                return json.loads(content)
        except Exception as e:
            print(f"Error reading {path}: {e}")
        return None

    def _count_games(self) -> int:
        """Count total games stored"""
        try:
            resp = requests.get(
                f"{self.api_base}/repos/{self.repo}/contents/games",
                headers=self.headers,
                timeout=5
            )
            if resp.status_code == 200:
                files = resp.json()
                return len([f for f in files if f['name'].endswith('.json')])
        except:
            pass
        return 0

    def ensure_directories(self) -> bool:
        """Ensure games/ and analysis/ directories exist"""
        for dirname in ['games', 'analysis']:
            readme_path = f"{dirname}/.gitkeep"
            if not self._get_file_sha(readme_path):
                try:
                    content = base64.b64encode(f"# {dirname}\n".encode()).decode()
                    requests.put(
                        f"{self.api_base}/repos/{self.repo}/contents/{readme_path}",
                        headers=self.headers,
                        json={
                            "message": f"Create {dirname} directory",
                            "content": content
                        },
                        timeout=10
                    )
                except:
                    pass
        return True
