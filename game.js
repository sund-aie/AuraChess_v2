// ============================================================
// GORDON RAMSAY'S CHESS BATTLEFIELD
// British Soldiers (White) vs Monkeys (Black)
// 16x16 Pixel Art | Ollama LLama 3.2 AI
// ============================================================
(function () {
  "use strict";

  // === CONFIGURATION ===
  const SQ = 80;
  const BOARD = 8;
  const SP = 16; // sprite resolution
  const W = "white",
    B = "black";
  const PAWN = "pawn",
    ROOK = "rook",
    KNIGHT = "knight",
    BISHOP = "bishop",
    QUEEN = "queen",
    KING = "king";
  const VALUES = {
    pawn: 100,
    knight: 300,
    bishop: 320,
    rook: 500,
    queen: 900,
    king: 10000,
  };

  // === CANVAS ===
  const canvas = document.getElementById("chessBoard");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // === GAME STATE ===
  let board,
    selected,
    validMoves,
    currentPlayer,
    gameOver;
  let capturedMonkeys, capturedSoldiers, moveHistory, animState, ollamaOK;
  let ramsayThinking = false;
  let usedQuotes = [];
  let lastPlayerMoveQuality = "neutral"; // "good", "bad", or "neutral"

  // === API & LEARNING ===
  const API_BASE = window.location.origin;
  let playerId = localStorage.getItem('chessPlayerId');
  if (!playerId) {
    playerId = 'player_' + Math.random().toString(36).substr(2, 12);
    localStorage.setItem('chessPlayerId', playerId);
  }
  let learnedPatterns = null;

  // === SPRITE CACHE ===
  const sprites = {};

  // === THEME CONFIGURATION ===
  let gameConfig = {
    whitePieces: 'british',
    blackPieces: 'monkeys',
    boardColors: 'classic',
    killStyle: 'shooting',
    playerSide: 'black', // 'white' or 'black'
    customBoard: null
  };

  // Board color schemes
  const BOARD_COLORS = {
    classic: { light: "#f0d9b5", dark: "#b58863" },
    military: { light: "#5a6d33", dark: "#3d4a23" },
    ocean: { light: "#a8d8ea", dark: "#3d5a80" },
    volcanic: { light: "#ff6b6b", dark: "#2d2d2d" },
    royal: { light: "#e8d5f7", dark: "#6b4499" },
    desert: { light: "#f5deb3", dark: "#d2a679" },
    forest: { light: "#a8d5a2", dark: "#4a7c47" },
    ice: { light: "#e0f7fa", dark: "#4dd0e1" }
  };

  // Theme display names
  const THEME_NAMES = {
    british: "British Soldiers",
    monkeys: "Jungle Monkeys",
    american: "US Marines",
    arab: "Desert Warriors",
    classic_white: "Classic White",
    classic_black: "Classic Black",
    ninja: "Shadow Ninjas",
    knights: "Crusaders"
  };

  // === SPRITE HELPERS ===
  function mkSprite(fn) {
    const c = document.createElement("canvas");
    c.width = c.height = SP;
    const x = c.getContext("2d");
    fn(x);
    return c;
  }
  function R(c, color, x, y, w, h) {
    c.fillStyle = color;
    c.fillRect(x, y, w || 1, h || 1);
  }

  // ============================================================
  // 16x16 PIXEL ART SPRITES - BRITISH SOLDIERS (WHITE)
  // ============================================================

  function drawSoldierPawn(c) {
    // Bearskin hat
    R(c, "#1a1a2e", 5, 0, 6, 4);
    R(c, "#12121e", 6, 0, 4, 1);
    // Face
    R(c, "#ffcc99", 6, 4, 4, 2);
    R(c, "#220000", 7, 4, 1, 1);
    R(c, "#220000", 9, 4, 1, 1);
    R(c, "#ee9966", 7, 5, 2, 1);
    // Red coat
    R(c, "#cc2222", 5, 6, 6, 4);
    R(c, "#ffffff", 5, 6, 1, 4);
    R(c, "#ffffff", 10, 6, 1, 4);
    R(c, "#ffd700", 7, 7, 1, 1);
    R(c, "#ffd700", 7, 8, 1, 1);
    // Rifle
    R(c, "#888888", 11, 3, 1, 8);
    R(c, "#6B4226", 11, 9, 1, 2);
    R(c, "#aaaaaa", 11, 2, 1, 2);
    // Pants & boots
    R(c, "#2a2a5a", 6, 10, 2, 3);
    R(c, "#2a2a5a", 8, 10, 2, 3);
    R(c, "#111122", 6, 13, 2, 2);
    R(c, "#111122", 8, 13, 2, 2);
  }

  function drawSoldierRook(c) {
    // Fortress tower top (crenellations)
    R(c, "#888888", 3, 0, 2, 2);
    R(c, "#888888", 7, 0, 2, 2);
    R(c, "#888888", 11, 0, 2, 2);
    R(c, "#999999", 3, 2, 10, 2);
    // Tower body
    R(c, "#cc2222", 4, 4, 8, 6);
    R(c, "#aa1111", 5, 4, 6, 1);
    // Cross emblem
    R(c, "#ffffff", 7, 5, 2, 4);
    R(c, "#ffffff", 6, 6, 4, 2);
    // Cannon barrel
    R(c, "#555555", 2, 6, 3, 2);
    R(c, "#444444", 1, 7, 2, 1);
    R(c, "#ffff00", 0, 7, 1, 1); // muzzle
    // Base
    R(c, "#666666", 3, 10, 10, 2);
    R(c, "#555555", 4, 12, 8, 2);
    R(c, "#444444", 5, 14, 6, 2);
  }

  function drawSoldierKnight(c) {
    // Horse head
    R(c, "#8B6914", 6, 0, 5, 3);
    R(c, "#7a5a10", 5, 2, 3, 2);
    R(c, "#8B6914", 4, 3, 3, 2);
    // Horse eye
    R(c, "#000000", 8, 1, 1, 1);
    // Horse ear
    R(c, "#6B4914", 9, 0, 1, 1);
    // Mane
    R(c, "#3a2a0a", 10, 0, 1, 3);
    R(c, "#3a2a0a", 11, 1, 1, 2);
    // Horse mouth
    R(c, "#daa520", 4, 4, 2, 1);
    R(c, "#000000", 4, 4, 1, 1);
    // Rider body (red coat)
    R(c, "#cc2222", 6, 5, 5, 4);
    R(c, "#ffd700", 8, 6, 1, 2); // button
    // Rider head
    R(c, "#1a1a2e", 7, 3, 3, 1); // helmet
    R(c, "#ffcc99", 7, 4, 3, 1); // face
    // Sword
    R(c, "#cccccc", 11, 4, 1, 6);
    R(c, "#ffd700", 11, 9, 1, 1);
    R(c, "#8B4513", 11, 10, 1, 2);
    // Legs / horse body
    R(c, "#8B6914", 5, 9, 7, 2);
    R(c, "#7a5a10", 4, 11, 3, 3);
    R(c, "#7a5a10", 9, 11, 3, 3);
    // Hooves
    R(c, "#333333", 4, 14, 2, 2);
    R(c, "#333333", 10, 14, 2, 2);
  }

  function drawSoldierBishop(c) {
    // Bicorn hat
    R(c, "#1a1a2e", 3, 1, 4, 2);
    R(c, "#1a1a2e", 9, 1, 4, 2);
    R(c, "#1a1a2e", 5, 0, 6, 3);
    R(c, "#ffd700", 7, 0, 2, 1); // gold band
    // Face
    R(c, "#ffcc99", 6, 3, 4, 3);
    R(c, "#220000", 7, 4, 1, 1);
    R(c, "#220000", 9, 4, 1, 1);
    R(c, "#ee9966", 7, 5, 2, 1);
    // Red coat with epaulettes
    R(c, "#cc2222", 5, 6, 6, 5);
    R(c, "#ffd700", 5, 6, 1, 1); // left epaulette
    R(c, "#ffd700", 10, 6, 1, 1); // right epaulette
    R(c, "#ffffff", 7, 7, 2, 3); // front panel
    R(c, "#ffd700", 7, 7, 1, 1);
    R(c, "#ffd700", 7, 9, 1, 1);
    // Pistol
    R(c, "#555555", 11, 7, 2, 1);
    R(c, "#555555", 12, 7, 1, 3);
    R(c, "#8B4513", 12, 9, 1, 2);
    // Pants & boots
    R(c, "#2a2a5a", 6, 11, 2, 2);
    R(c, "#2a2a5a", 8, 11, 2, 2);
    R(c, "#111122", 6, 13, 2, 2);
    R(c, "#111122", 8, 13, 2, 2);
  }

  function drawSoldierQueen(c) {
    // Plumed hat
    R(c, "#1a1a2e", 5, 1, 6, 3);
    R(c, "#cc2222", 6, 0, 4, 2); // red plume
    R(c, "#ff4444", 7, 0, 2, 1);
    R(c, "#ffd700", 5, 3, 6, 1); // gold brim
    // Face
    R(c, "#ffcc99", 6, 4, 4, 2);
    R(c, "#220000", 7, 4, 1, 1);
    R(c, "#220000", 9, 4, 1, 1);
    // Decorated red coat
    R(c, "#cc2222", 4, 6, 8, 5);
    R(c, "#ffd700", 4, 6, 8, 1); // gold trim top
    R(c, "#ffd700", 4, 10, 8, 1); // gold trim bottom
    R(c, "#ffffff", 7, 7, 2, 3);
    R(c, "#ffd700", 7, 7, 1, 1);
    R(c, "#ffd700", 7, 8, 1, 1);
    R(c, "#ffd700", 7, 9, 1, 1);
    // Twin pistols
    R(c, "#555555", 3, 7, 1, 3);
    R(c, "#555555", 2, 7, 1, 1);
    R(c, "#555555", 12, 7, 1, 3);
    R(c, "#555555", 13, 7, 1, 1);
    // Pants & boots
    R(c, "#2a2a5a", 5, 11, 2, 2);
    R(c, "#2a2a5a", 9, 11, 2, 2);
    R(c, "#111122", 5, 13, 2, 2);
    R(c, "#111122", 9, 13, 2, 2);
  }

  function drawSoldierKing(c) {
    // Chef hat (Gordon Ramsay!)
    R(c, "#ffffff", 5, 0, 6, 4);
    R(c, "#eeeeee", 6, 0, 4, 1);
    R(c, "#dddddd", 5, 3, 6, 1);
    R(c, "#f0f0f0", 6, 1, 4, 2);
    // Hair (blonde)
    R(c, "#daa520", 5, 4, 1, 1);
    R(c, "#daa520", 10, 4, 1, 1);
    // Angry face
    R(c, "#ffcc99", 5, 4, 6, 3);
    R(c, "#aa6633", 6, 4, 2, 1); // angry left brow (\/shape)
    R(c, "#aa6633", 8, 4, 2, 1); // angry right brow
    R(c, "#2244aa", 6, 5, 1, 1); // left eye
    R(c, "#2244aa", 9, 5, 1, 1); // right eye
    R(c, "#ee9966", 7, 6, 2, 1); // nose
    R(c, "#cc0000", 6, 7, 4, 1); // shouting mouth
    R(c, "#880000", 7, 7, 2, 1); // mouth inner
    // Chef jacket
    R(c, "#ffffff", 4, 8, 8, 4);
    R(c, "#dddddd", 4, 8, 8, 1);
    R(c, "#333333", 7, 9, 1, 1); // button
    R(c, "#333333", 7, 10, 1, 1);
    R(c, "#333333", 7, 11, 1, 1);
    // Cleaver
    R(c, "#cccccc", 12, 5, 2, 3);
    R(c, "#aaaaaa", 12, 5, 2, 1);
    R(c, "#8B4513", 12, 8, 1, 3);
    // Pants & shoes
    R(c, "#333333", 5, 12, 2, 2);
    R(c, "#333333", 9, 12, 2, 2);
    R(c, "#222222", 5, 14, 2, 2);
    R(c, "#222222", 9, 14, 2, 2);
  }

  // ============================================================
  // 16x16 PIXEL ART SPRITES - MONKEYS (BLACK)
  // ============================================================

  function drawMonkeyPawn(c) {
    // Head (round)
    R(c, "#8B5E3C", 5, 1, 5, 4);
    R(c, "#8B5E3C", 6, 0, 3, 1);
    // Ears
    R(c, "#DEB887", 4, 2, 1, 2);
    R(c, "#DEB887", 10, 2, 1, 2);
    R(c, "#8B5E3C", 4, 1, 1, 1);
    R(c, "#8B5E3C", 10, 1, 1, 1);
    // Face
    R(c, "#DEB887", 6, 2, 3, 3);
    R(c, "#111111", 6, 3, 1, 1); // left eye
    R(c, "#111111", 8, 3, 1, 1); // right eye
    R(c, "#5C3A1E", 7, 4, 1, 1); // nose
    R(c, "#aa5533", 6, 4, 3, 1); // mouth area
    // Body
    R(c, "#8B5E3C", 5, 5, 5, 5);
    R(c, "#A0724A", 6, 6, 3, 3); // belly
    // Banana gun (right hand)
    R(c, "#FFD700", 10, 4, 3, 1);
    R(c, "#FFD700", 11, 5, 2, 1);
    R(c, "#FFC300", 12, 4, 1, 1);
    R(c, "#555555", 12, 3, 1, 2); // barrel
    // Arms
    R(c, "#8B5E3C", 4, 6, 1, 3);
    R(c, "#8B5E3C", 10, 6, 1, 3);
    // Legs
    R(c, "#8B5E3C", 5, 10, 2, 3);
    R(c, "#8B5E3C", 8, 10, 2, 3);
    // Feet
    R(c, "#5C3A1E", 5, 13, 2, 2);
    R(c, "#5C3A1E", 8, 13, 2, 2);
    // Tail
    R(c, "#7A4E2D", 3, 8, 1, 1);
    R(c, "#7A4E2D", 2, 7, 1, 1);
    R(c, "#7A4E2D", 1, 6, 1, 1);
    R(c, "#7A4E2D", 1, 5, 1, 2);
  }

  function drawMonkeyRook(c) {
    // Gorilla - big blocky head
    R(c, "#5C3A1E", 3, 0, 10, 5);
    R(c, "#4A2E18", 4, 0, 8, 1);
    // Brow ridge
    R(c, "#4A2E18", 4, 2, 8, 1);
    // Eyes
    R(c, "#DEB887", 5, 3, 2, 1);
    R(c, "#DEB887", 9, 3, 2, 1);
    R(c, "#ff0000", 5, 3, 1, 1);
    R(c, "#ff0000", 9, 3, 1, 1);
    // Snout
    R(c, "#DEB887", 6, 4, 4, 2);
    R(c, "#111111", 7, 4, 1, 1);
    R(c, "#111111", 8, 4, 1, 1);
    R(c, "#aa5533", 7, 5, 2, 1); // mouth
    // Massive body
    R(c, "#5C3A1E", 2, 6, 12, 5);
    R(c, "#4A2E18", 3, 6, 10, 1);
    R(c, "#6B4A30", 5, 7, 6, 3); // chest
    // Club weapon
    R(c, "#8B4513", 0, 3, 2, 6);
    R(c, "#6B3510", 0, 2, 2, 2);
    R(c, "#555555", 0, 1, 2, 2); // metal head
    // Arms
    R(c, "#5C3A1E", 1, 6, 2, 4);
    R(c, "#5C3A1E", 13, 6, 2, 4);
    // Legs
    R(c, "#5C3A1E", 4, 11, 3, 3);
    R(c, "#5C3A1E", 9, 11, 3, 3);
    // Feet
    R(c, "#3A2212", 4, 14, 3, 2);
    R(c, "#3A2212", 9, 14, 3, 2);
  }

  function drawMonkeyKnight(c) {
    // Swinging monkey - dynamic pose
    // Head
    R(c, "#8B5E3C", 7, 0, 4, 3);
    R(c, "#8B5E3C", 8, 0, 2, 1);
    // Tuft of hair
    R(c, "#5C3A1E", 8, 0, 2, 1);
    // Ears
    R(c, "#DEB887", 6, 1, 1, 1);
    R(c, "#DEB887", 11, 1, 1, 1);
    // Face
    R(c, "#DEB887", 8, 1, 2, 2);
    R(c, "#111111", 8, 1, 1, 1); // eye
    R(c, "#111111", 9, 1, 1, 1); // eye
    R(c, "#5C3A1E", 8, 2, 2, 1); // nose/mouth
    // Body
    R(c, "#8B5E3C", 6, 3, 5, 5);
    R(c, "#A0724A", 7, 4, 3, 3); // belly
    // Vine/rope
    R(c, "#228B22", 4, 0, 1, 7);
    R(c, "#228B22", 5, 3, 1, 1);
    // Arm holding vine
    R(c, "#8B5E3C", 5, 3, 2, 2);
    // Coconut bomb (right hand)
    R(c, "#8B4513", 11, 4, 3, 3);
    R(c, "#6B3510", 12, 4, 1, 1);
    R(c, "#ff6600", 12, 3, 1, 1); // fuse spark
    R(c, "#ffff00", 12, 3, 1, 1);
    // Right arm
    R(c, "#8B5E3C", 10, 4, 2, 2);
    // Curled tail
    R(c, "#7A4E2D", 4, 6, 1, 1);
    R(c, "#7A4E2D", 3, 5, 1, 1);
    R(c, "#7A4E2D", 2, 4, 1, 1);
    R(c, "#7A4E2D", 2, 3, 1, 2);
    // Legs
    R(c, "#8B5E3C", 6, 8, 2, 4);
    R(c, "#8B5E3C", 9, 8, 2, 4);
    // Feet
    R(c, "#5C3A1E", 6, 12, 2, 2);
    R(c, "#5C3A1E", 9, 12, 2, 2);
    // Banana holster
    R(c, "#FFD700", 8, 7, 1, 2);
  }

  function drawMonkeyBishop(c) {
    // Chimp with blowdart - smart looking
    // Head
    R(c, "#5C3A1E", 5, 0, 6, 4);
    R(c, "#5C3A1E", 6, 0, 4, 1);
    // Smart eyes (glasses-like)
    R(c, "#DEB887", 6, 2, 4, 2);
    R(c, "#111111", 6, 2, 1, 1);
    R(c, "#111111", 9, 2, 1, 1);
    R(c, "#333388", 6, 2, 2, 1); // "glasses" left
    R(c, "#333388", 8, 2, 2, 1); // "glasses" right
    // Nose & mouth
    R(c, "#aa6644", 7, 3, 2, 1);
    // Ears
    R(c, "#DEB887", 4, 1, 1, 2);
    R(c, "#DEB887", 11, 1, 1, 2);
    // Body
    R(c, "#5C3A1E", 5, 4, 6, 5);
    R(c, "#7A5E3C", 6, 5, 4, 3);
    // Blowdart tube (long!)
    R(c, "#228B22", 11, 1, 5, 1);
    R(c, "#1a6b1a", 11, 1, 1, 1);
    // Holding arm
    R(c, "#5C3A1E", 10, 3, 2, 2);
    // Left arm
    R(c, "#5C3A1E", 4, 5, 1, 3);
    // Legs
    R(c, "#5C3A1E", 6, 9, 2, 4);
    R(c, "#5C3A1E", 8, 9, 2, 4);
    R(c, "#3A2212", 6, 13, 2, 2);
    R(c, "#3A2212", 8, 13, 2, 2);
    // Tail
    R(c, "#7A4E2D", 4, 7, 1, 1);
    R(c, "#7A4E2D", 3, 6, 1, 1);
    R(c, "#7A4E2D", 2, 5, 1, 2);
  }

  function drawMonkeyQueen(c) {
    // Orangutan - wide, powerful, orange-red
    // Wide head with cheek pads
    R(c, "#CC6600", 3, 0, 10, 5);
    R(c, "#DD7711", 2, 1, 2, 3); // left cheek pad
    R(c, "#DD7711", 12, 1, 2, 3); // right cheek pad
    // Face
    R(c, "#DEB887", 5, 2, 6, 3);
    R(c, "#111111", 6, 2, 1, 1);
    R(c, "#111111", 9, 2, 1, 1);
    R(c, "#aa6644", 7, 3, 2, 1);
    R(c, "#884422", 6, 4, 4, 1); // mouth
    // Long red-orange fur
    R(c, "#CC6600", 3, 5, 10, 5);
    R(c, "#BB5500", 4, 5, 8, 1);
    R(c, "#DEB887", 5, 6, 6, 3); // belly
    // Long arms with dual bamboo guns
    R(c, "#CC6600", 1, 4, 3, 5);
    R(c, "#CC6600", 12, 4, 3, 5);
    R(c, "#228B22", 0, 4, 1, 3); // left bamboo gun
    R(c, "#1a6b1a", 0, 3, 1, 2);
    R(c, "#228B22", 15, 4, 1, 3); // right bamboo gun
    R(c, "#1a6b1a", 15, 3, 1, 2);
    // Legs
    R(c, "#CC6600", 4, 10, 3, 4);
    R(c, "#CC6600", 9, 10, 3, 4);
    R(c, "#3A2212", 4, 14, 3, 2);
    R(c, "#3A2212", 9, 14, 3, 2);
  }

  function drawMonkeyKing(c) {
    // Monkey King - crown, cape, golden staff
    // Crown
    R(c, "#FFD700", 5, 0, 6, 3);
    R(c, "#FF4444", 6, 1, 1, 1); // ruby
    R(c, "#FF4444", 9, 1, 1, 1);
    R(c, "#FFD700", 5, 0, 1, 1);
    R(c, "#FFD700", 7, 0, 1, 1);
    R(c, "#FFD700", 10, 0, 1, 1);
    // Head
    R(c, "#5C3A1E", 5, 3, 6, 3);
    R(c, "#DEB887", 6, 4, 4, 2);
    R(c, "#111111", 7, 4, 1, 1);
    R(c, "#111111", 9, 4, 1, 1);
    R(c, "#aa6644", 7, 5, 2, 1);
    // Ears
    R(c, "#DEB887", 4, 3, 1, 2);
    R(c, "#DEB887", 11, 3, 1, 2);
    // Cape (purple/red royal)
    R(c, "#8B0000", 3, 6, 10, 6);
    R(c, "#aa1111", 4, 6, 8, 1);
    // Body under cape
    R(c, "#5C3A1E", 5, 6, 6, 5);
    R(c, "#7A5E3C", 6, 7, 4, 3);
    // Golden staff
    R(c, "#FFD700", 12, 2, 1, 10);
    R(c, "#FFD700", 11, 2, 3, 1); // staff top
    R(c, "#FF4444", 12, 1, 1, 1); // jewel
    // Arms
    R(c, "#5C3A1E", 4, 7, 1, 3);
    R(c, "#5C3A1E", 11, 7, 1, 3);
    // Legs under cape
    R(c, "#5C3A1E", 5, 12, 2, 2);
    R(c, "#5C3A1E", 9, 12, 2, 2);
    R(c, "#3A2212", 5, 14, 2, 2);
    R(c, "#3A2212", 9, 14, 2, 2);
    // Tail
    R(c, "#7A4E2D", 2, 9, 1, 1);
    R(c, "#7A4E2D", 1, 8, 1, 1);
    R(c, "#7A4E2D", 1, 7, 1, 2);
  }

  // ============================================================
  // CREATE ALL SPRITES
  // ============================================================
  function createAllSprites() {
    sprites.white_pawn = mkSprite(drawSoldierPawn);
    sprites.white_rook = mkSprite(drawSoldierRook);
    sprites.white_knight = mkSprite(drawSoldierKnight);
    sprites.white_bishop = mkSprite(drawSoldierBishop);
    sprites.white_queen = mkSprite(drawSoldierQueen);
    sprites.white_king = mkSprite(drawSoldierKing);

    sprites.black_pawn = mkSprite(drawMonkeyPawn);
    sprites.black_rook = mkSprite(drawMonkeyRook);
    sprites.black_knight = mkSprite(drawMonkeyKnight);
    sprites.black_bishop = mkSprite(drawMonkeyBishop);
    sprites.black_queen = mkSprite(drawMonkeyQueen);
    sprites.black_king = mkSprite(drawMonkeyKing);
  }

  // ============================================================
  // GORDON RAMSAY PIXEL PORTRAIT
  // ============================================================
  function drawRamsayPortrait(expression = "neutral") {
    // Expressions: "neutral", "furious", "impressed", "smug", "worried"
    const rc = document.getElementById("ramsayFace");
    if (!rc) return;
    const rx = rc.getContext("2d");
    rx.imageSmoothingEnabled = false;
    const oc = document.createElement("canvas");
    oc.width = oc.height = 32;
    const ox = oc.getContext("2d");

    // Face colors based on expression
    const faceColors = {
      neutral: "#ffcc99",
      furious: "#ff8866",   // Red tinted - angry
      impressed: "#ffcc99",
      smug: "#ffcc99",
      worried: "#ffeebb"    // Pale/yellowish
    };
    const faceColor = faceColors[expression] || faceColors.neutral;

    // Background
    R(ox, "#2a1a0e", 0, 0, 32, 32);

    // Steam lines for furious expression
    if (expression === "furious") {
      R(ox, "#ffffff", 4, 2, 1, 3);
      R(ox, "#eeeeee", 5, 1, 1, 2);
      R(ox, "#ffffff", 27, 2, 1, 3);
      R(ox, "#eeeeee", 26, 1, 1, 2);
    }

    // Chef hat
    R(ox, "#ffffff", 8, 0, 16, 7);
    R(ox, "#f8f8f8", 10, 0, 12, 3);
    R(ox, "#eeeeee", 9, 6, 14, 1);
    // Hair (blonde)
    R(ox, "#daa520", 8, 7, 3, 3);
    R(ox, "#daa520", 21, 7, 3, 3);
    // Face
    R(ox, faceColor, 9, 7, 14, 10);
    R(ox, faceColor, 10, 17, 12, 2);

    // Expression-specific eyebrows
    if (expression === "neutral") {
      // Slight frown
      R(ox, "#8B6914", 10, 10, 5, 1);
      R(ox, "#8B6914", 17, 10, 5, 1);
    } else if (expression === "furious") {
      // Deep V frown, lower
      R(ox, "#8B6914", 10, 9, 5, 2);
      R(ox, "#8B6914", 17, 9, 5, 2);
      R(ox, "#5a3a00", 12, 9, 2, 1);
      R(ox, "#5a3a00", 18, 9, 2, 1);
      R(ox, "#5a3a00", 14, 10, 4, 1);
    } else if (expression === "impressed") {
      // One raised eyebrow
      R(ox, "#8B6914", 10, 8, 5, 1);  // Left raised
      R(ox, "#8B6914", 17, 10, 5, 1); // Right normal
    } else if (expression === "smug") {
      // Relaxed, slightly raised
      R(ox, "#8B6914", 10, 9, 5, 1);
      R(ox, "#8B6914", 17, 9, 5, 1);
    } else if (expression === "worried") {
      // Raised worried brows
      R(ox, "#8B6914", 10, 8, 5, 1);
      R(ox, "#8B6914", 17, 8, 5, 1);
      R(ox, "#8B6914", 12, 9, 2, 1);
      R(ox, "#8B6914", 18, 9, 2, 1);
    }

    // Eyes - vary by expression
    if (expression === "smug") {
      // Squinted laughing eyes
      R(ox, "#ffffff", 11, 11, 3, 1);
      R(ox, "#ffffff", 18, 11, 3, 1);
      R(ox, "#2244aa", 12, 11, 2, 1);
      R(ox, "#2244aa", 19, 11, 2, 1);
    } else if (expression === "impressed") {
      // Narrowed calculating eyes
      R(ox, "#ffffff", 11, 11, 3, 2);
      R(ox, "#ffffff", 18, 11, 3, 2);
      R(ox, "#2244aa", 11, 11, 2, 2);
      R(ox, "#2244aa", 19, 11, 2, 2);
      R(ox, "#000000", 11, 12, 1, 1);
      R(ox, "#000000", 19, 12, 1, 1);
    } else if (expression === "furious") {
      // Wide angry eyes
      R(ox, "#ffffff", 10, 11, 4, 3);
      R(ox, "#ffffff", 18, 11, 4, 3);
      R(ox, "#cc2222", 11, 12, 3, 2); // Red-tinted irises
      R(ox, "#cc2222", 19, 12, 3, 2);
      R(ox, "#000000", 12, 12, 1, 1);
      R(ox, "#000000", 20, 12, 1, 1);
    } else {
      // Normal eyes
      R(ox, "#ffffff", 11, 11, 3, 2);
      R(ox, "#ffffff", 18, 11, 3, 2);
      R(ox, "#2244aa", 12, 11, 2, 2);
      R(ox, "#2244aa", 19, 11, 2, 2);
      R(ox, "#000000", 12, 12, 1, 1);
      R(ox, "#000000", 19, 12, 1, 1);
    }

    // Sweat drop for worried
    if (expression === "worried") {
      R(ox, "#88ccff", 7, 10, 1, 2);
      R(ox, "#aaeeff", 7, 10, 1, 1);
    }

    // Nose
    R(ox, "#eebb88", 14, 13, 4, 3);
    R(ox, "#dd9966", 15, 14, 2, 2);

    // Mouth - varies by expression
    if (expression === "neutral") {
      // Slight frown
      R(ox, "#cc6666", 12, 17, 8, 2);
      R(ox, "#993333", 13, 18, 6, 1);
    } else if (expression === "furious") {
      // Wide open shouting
      R(ox, "#cc0000", 10, 17, 12, 4);
      R(ox, "#880000", 11, 18, 10, 3);
      R(ox, "#ffffff", 11, 17, 2, 1); // teeth
      R(ox, "#ffffff", 19, 17, 2, 1);
      R(ox, "#ff4444", 14, 19, 4, 1); // tongue
    } else if (expression === "impressed") {
      // Pursed/concerned
      R(ox, "#cc6666", 13, 17, 6, 2);
      R(ox, "#aa4444", 14, 17, 4, 1);
    } else if (expression === "smug") {
      // Big grin
      R(ox, "#cc4444", 11, 17, 10, 3);
      R(ox, "#ffffff", 12, 17, 8, 1); // big toothy grin
      R(ox, "#993333", 12, 19, 8, 1);
    } else if (expression === "worried") {
      // Nervous wavy mouth
      R(ox, "#cc8866", 12, 17, 2, 1);
      R(ox, "#cc8866", 14, 18, 4, 1);
      R(ox, "#cc8866", 18, 17, 2, 1);
    }

    // Wrinkle lines
    R(ox, "#ddaa77", 8, 13, 1, 2);
    R(ox, "#ddaa77", 23, 13, 1, 2);
    // Chef jacket
    R(ox, "#ffffff", 6, 20, 20, 12);
    R(ox, "#eeeeee", 6, 20, 20, 1);
    R(ox, "#dddddd", 15, 22, 2, 8);
    // Buttons
    R(ox, "#333333", 15, 23, 2, 1);
    R(ox, "#333333", 15, 26, 2, 1);
    R(ox, "#333333", 15, 29, 2, 1);

    rx.drawImage(oc, 0, 0, 128, 128);
  }

  // ============================================================
  // GAME INITIALIZATION
  // ============================================================
  function initGame() {
    board = Array(BOARD)
      .fill(null)
      .map(() => Array(BOARD).fill(null));

    // White (Soldiers/Ramsay) at top: rows 0-1
    const backRow = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];
    for (let c = 0; c < 8; c++) {
      board[0][c] = { type: backRow[c], color: W, hasMoved: false };
      board[1][c] = { type: PAWN, color: W, hasMoved: false };
      board[6][c] = { type: PAWN, color: B, hasMoved: false };
      board[7][c] = { type: backRow[c], color: B, hasMoved: false };
    }

    selected = null;
    validMoves = [];
    currentPlayer = W;
    gameOver = false;
    capturedMonkeys = [];
    capturedSoldiers = [];
    moveHistory = [];
    animState = null;
    ramsayThinking = false;
    lastPlayerMoveQuality = "neutral";

    updatePOW();
    drawBoard();
    updateTurnInfo();
    drawRamsayPortrait("neutral");

    // Gordon Ramsay (white) goes first
    showRamsayComment(
      "RIGHT THEN! Listen here you furry little DONKEYS! Chef Ramsay is about to teach you what REAL strategy looks like! MOVE IT!"
    );
    setTimeout(() => makeRamsayMove(), 1500);
  }

  // ============================================================
  // BOARD DRAWING
  // ============================================================
  function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const colors = getBoardColors();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const light = (r + c) % 2 === 0;
        ctx.fillStyle = light ? colors.light : colors.dark;
        ctx.fillRect(c * SQ, r * SQ, SQ, SQ);
      }
    }

    // Highlights
    if (selected && !animState) {
      ctx.fillStyle = "rgba(255, 255, 0, 0.35)";
      ctx.fillRect(selected.col * SQ, selected.row * SQ, SQ, SQ);

      for (const m of validMoves) {
        if (board[m.row][m.col]) {
          // Attack highlight (red)
          ctx.fillStyle = "rgba(255, 50, 50, 0.35)";
        } else {
          ctx.fillStyle = "rgba(0, 255, 0, 0.25)";
        }
        ctx.fillRect(m.col * SQ, m.row * SQ, SQ, SQ);
      }
    }

    // Draw pieces (skip pieces being animated)
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (!piece) continue;
        if (animState && animState.skipPiece) {
          if (animState.skipPiece.row === r && animState.skipPiece.col === c)
            continue;
        }
        if (animState && animState.skipTarget) {
          if (
            animState.skipTarget.row === r &&
            animState.skipTarget.col === c &&
            animState.targetHidden
          )
            continue;
        }
        drawPieceAt(piece, c * SQ, r * SQ, 1);
      }
    }
  }

  function drawPieceAt(piece, x, y, alpha) {
    const key = piece.color + "_" + piece.type;
    const sprite = sprites[key];
    if (!sprite) return;
    ctx.imageSmoothingEnabled = false;
    if (alpha !== undefined && alpha < 1) {
      ctx.globalAlpha = alpha;
    }
    // Draw sprite scaled up within the square (with small padding)
    ctx.drawImage(sprite, x + 4, y + 4, SQ - 8, SQ - 8);
    if (alpha !== undefined && alpha < 1) {
      ctx.globalAlpha = 1;
    }
  }

  // ============================================================
  // CHESS LOGIC
  // ============================================================
  function inBounds(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
  }

  function getValidMoves(row, col) {
    const piece = board[row][col];
    if (!piece) return [];
    const moves = [];
    const color = piece.color;
    const enemy = color === W ? B : W;

    switch (piece.type) {
      case PAWN: {
        const dir = color === W ? 1 : -1; // White at top moves down, Black at bottom moves up
        const startRow = color === W ? 1 : 6;
        // Forward
        if (inBounds(row + dir, col) && !board[row + dir][col]) {
          moves.push({ row: row + dir, col });
          // Double move from start
          if (
            row === startRow &&
            inBounds(row + 2 * dir, col) &&
            !board[row + 2 * dir][col]
          ) {
            moves.push({ row: row + 2 * dir, col });
          }
        }
        // Captures
        for (const dc of [-1, 1]) {
          if (
            inBounds(row + dir, col + dc) &&
            board[row + dir][col + dc] &&
            board[row + dir][col + dc].color === enemy
          ) {
            moves.push({ row: row + dir, col: col + dc });
          }
        }
        break;
      }
      case ROOK:
        addSliding(
          moves,
          row,
          col,
          color,
          [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
          ]
        );
        break;
      case BISHOP:
        addSliding(
          moves,
          row,
          col,
          color,
          [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
          ]
        );
        break;
      case QUEEN:
        addSliding(
          moves,
          row,
          col,
          color,
          [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
          ]
        );
        break;
      case KNIGHT: {
        const jumps = [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1],
        ];
        for (const [dr, dc] of jumps) {
          const nr = row + dr,
            nc = col + dc;
          if (
            inBounds(nr, nc) &&
            (!board[nr][nc] || board[nr][nc].color === enemy)
          ) {
            moves.push({ row: nr, col: nc });
          }
        }
        break;
      }
      case KING: {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = row + dr,
              nc = col + dc;
            if (
              inBounds(nr, nc) &&
              (!board[nr][nc] || board[nr][nc].color === enemy)
            ) {
              moves.push({ row: nr, col: nc });
            }
          }
        }
        break;
      }
    }
    return moves;
  }

  function addSliding(moves, row, col, color, dirs) {
    const enemy = color === W ? B : W;
    for (const [dr, dc] of dirs) {
      let r = row + dr,
        c = col + dc;
      while (inBounds(r, c)) {
        if (!board[r][c]) {
          moves.push({ row: r, col: c });
        } else {
          if (board[r][c].color === enemy) moves.push({ row: r, col: c });
          break;
        }
        r += dr;
        c += dc;
      }
    }
  }

  function getAllMoves(color) {
    const moves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] && board[r][c].color === color) {
          const pm = getValidMoves(r, c);
          for (const m of pm) {
            moves.push({
              from: { row: r, col: c },
              to: m,
              piece: board[r][c],
              capture: board[m.row][m.col],
            });
          }
        }
      }
    }
    return moves;
  }

  // ============================================================
  // ANIMATION SYSTEM
  // ============================================================

  function startWalkAnim(from, to, piece, callback) {
    animState = {
      type: "walk",
      from,
      to,
      piece,
      startTime: performance.now(),
      duration: 500,
      callback,
      skipPiece: from,
    };
  }

  function startShootAnim(from, to, attacker, victim, callback) {
    animState = {
      type: "shoot",
      from,
      to,
      attacker,
      victim,
      startTime: performance.now(),
      callback,
      skipPiece: from,
      skipTarget: to,
      targetHidden: false,
      phase: 0, // 0=aim, 1=fire, 2=hit, 3=walk
    };
  }

  function updateAnimation(now) {
    if (!animState) return;

    const elapsed = now - animState.startTime;

    if (animState.type === "walk") {
      const t = Math.min(elapsed / animState.duration, 1);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const fx = animState.from.col * SQ;
      const fy = animState.from.row * SQ;
      const tx = animState.to.col * SQ;
      const ty = animState.to.row * SQ;

      const x = fx + (tx - fx) * ease;
      const y = fy + (ty - fy) * ease - Math.sin(t * Math.PI) * 12;

      drawBoard();
      drawPieceAt(animState.piece, x, y, 1);

      if (t >= 1) {
        const cb = animState.callback;
        animState = null;
        drawBoard();
        if (cb) cb();
      }
    } else if (animState.type === "shoot") {
      const aimDur = 350;
      const fireDur = 250;
      const hitDur = 350;
      const walkDur = 500;

      const fx = animState.from.col * SQ + SQ / 2;
      const fy = animState.from.row * SQ + SQ / 2;
      const tx = animState.to.col * SQ + SQ / 2;
      const ty = animState.to.row * SQ + SQ / 2;

      drawBoard();

      if (elapsed < aimDur) {
        // Phase 0: Aiming - draw attacker and target, red dotted aim line
        drawPieceAt(
          animState.attacker,
          animState.from.col * SQ,
          animState.from.row * SQ,
          1
        );
        drawPieceAt(
          animState.victim,
          animState.to.col * SQ,
          animState.to.row * SQ,
          1
        );

        ctx.strokeStyle = "rgba(255, 0, 0, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (elapsed < aimDur + fireDur) {
        // Phase 1: Firing - muzzle flash + bullet
        const t = (elapsed - aimDur) / fireDur;

        drawPieceAt(
          animState.attacker,
          animState.from.col * SQ,
          animState.from.row * SQ,
          1
        );
        drawPieceAt(
          animState.victim,
          animState.to.col * SQ,
          animState.to.row * SQ,
          1
        );

        // Muzzle flash
        const mfx = fx + (tx - fx) * 0.15;
        const mfy = fy + (ty - fy) * 0.15;
        ctx.fillStyle = "#ffff44";
        ctx.beginPath();
        ctx.arc(mfx, mfy, 8 * (1 - t), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(mfx, mfy, 4 * (1 - t), 0, Math.PI * 2);
        ctx.fill();

        // 16x16 Bullet sprite
        const bx = fx + (tx - fx) * (0.15 + 0.85 * t);
        const by = fy + (ty - fy) * (0.15 + 0.85 * t);

        // Draw 16x16 pixel art bullet
        const bulletX = bx - 8;
        const bulletY = by - 8;

        // Bullet body (copper/brass color)
        ctx.fillStyle = "#cc8833";
        ctx.fillRect(bulletX + 4, bulletY + 2, 8, 12);
        // Bullet tip (pointed)
        ctx.fillStyle = "#ddaa44";
        ctx.fillRect(bulletX + 5, bulletY, 6, 2);
        ctx.fillRect(bulletX + 6, bulletY - 1, 4, 1);
        ctx.fillRect(bulletX + 7, bulletY - 2, 2, 1);
        // Bullet casing base
        ctx.fillStyle = "#aa6622";
        ctx.fillRect(bulletX + 4, bulletY + 12, 8, 4);
        ctx.fillStyle = "#886611";
        ctx.fillRect(bulletX + 4, bulletY + 14, 8, 2);
        // Highlight
        ctx.fillStyle = "#ffcc66";
        ctx.fillRect(bulletX + 5, bulletY + 3, 2, 8);
        // Shadow
        ctx.fillStyle = "#995522";
        ctx.fillRect(bulletX + 10, bulletY + 3, 1, 10);

        // Bullet trail (wider for 16x16)
        ctx.strokeStyle = "rgba(255, 200, 0, 0.4)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(mfx, mfy);
        ctx.lineTo(bx, by);
        ctx.stroke();
        // Inner trail
        ctx.strokeStyle = "rgba(255, 255, 200, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mfx, mfy);
        ctx.lineTo(bx, by);
        ctx.stroke();
      } else if (elapsed < aimDur + fireDur + hitDur) {
        // Phase 2: Hit - target flashes red, shakes, fades
        const t = (elapsed - aimDur - fireDur) / hitDur;
        animState.targetHidden = true;

        drawPieceAt(
          animState.attacker,
          animState.from.col * SQ,
          animState.from.row * SQ,
          1
        );

        // Hit flash
        if (t < 0.3) {
          ctx.fillStyle = "rgba(255, 100, 0, 0.6)";
          ctx.fillRect(
            animState.to.col * SQ,
            animState.to.row * SQ,
            SQ,
            SQ
          );
        }

        // Victim shaking and fading
        const shake = Math.sin(t * Math.PI * 8) * 5 * (1 - t);
        const fadeAlpha = Math.max(0, 1 - t * 1.5);
        drawPieceAt(
          animState.victim,
          animState.to.col * SQ + shake,
          animState.to.row * SQ + t * 15,
          fadeAlpha
        );

        // Explosion particles
        if (t < 0.5) {
          const numP = 6;
          for (let i = 0; i < numP; i++) {
            const angle = (i / numP) * Math.PI * 2;
            const dist = t * 30;
            const px = tx + Math.cos(angle) * dist;
            const py = ty + Math.sin(angle) * dist;
            const size = 4 * (1 - t * 2);
            if (size > 0) {
              ctx.fillStyle = i % 2 === 0 ? "#ff6600" : "#ffcc00";
              ctx.fillRect(px - size / 2, py - size / 2, size, size);
            }
          }
        }
      } else if (elapsed < aimDur + fireDur + hitDur + walkDur) {
        // Phase 3: Walk to target square
        const t =
          (elapsed - aimDur - fireDur - hitDur) / walkDur;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        animState.targetHidden = true;

        const ax =
          animState.from.col * SQ +
          (animState.to.col - animState.from.col) * SQ * ease;
        const ay =
          animState.from.row * SQ +
          (animState.to.row - animState.from.row) * SQ * ease -
          Math.sin(t * Math.PI) * 12;

        drawPieceAt(animState.attacker, ax, ay, 1);
      } else {
        // Animation complete
        animState.targetHidden = true;
        const cb = animState.callback;
        animState = null;
        drawBoard();
        if (cb) cb();
      }
    } else if (animState.type === "stab") {
      // Stabbing animation phases
      const rushDur = 300;   // Rush towards target
      const stabDur = 150;   // Stab motion
      const hitDur = 300;    // Target falls
      const walkDur = 400;   // Walk to square
      const totalDur = rushDur + stabDur + hitDur + walkDur;

      const fx = animState.from.col * SQ + SQ / 2;
      const fy = animState.from.row * SQ + SQ / 2;
      const tx = animState.to.col * SQ + SQ / 2;
      const ty = animState.to.row * SQ + SQ / 2;

      drawBoard();

      if (elapsed < rushDur) {
        // Phase 0: Rush towards target
        const t = elapsed / rushDur;
        const ease = t * t; // Accelerate

        const ax = animState.from.col * SQ + (animState.to.col - animState.from.col) * SQ * ease * 0.7;
        const ay = animState.from.row * SQ + (animState.to.row - animState.from.row) * SQ * ease * 0.7;

        drawPieceAt(animState.attacker, ax, ay, 1);
        drawPieceAt(animState.victim, animState.to.col * SQ, animState.to.row * SQ, 1);
      } else if (elapsed < rushDur + stabDur) {
        // Phase 1: Stab motion - lunge forward
        const t = (elapsed - rushDur) / stabDur;
        const lunge = Math.sin(t * Math.PI) * 15;

        const ax = animState.from.col * SQ + (animState.to.col - animState.from.col) * SQ * 0.7;
        const ay = animState.from.row * SQ + (animState.to.row - animState.from.row) * SQ * 0.7;

        // Calculate direction for lunge
        const dx = (tx - fx);
        const dy = (ty - fy);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const lungeX = ax + (dx / dist) * lunge;
        const lungeY = ay + (dy / dist) * lunge;

        drawPieceAt(animState.attacker, lungeX, lungeY, 1);
        drawPieceAt(animState.victim, animState.to.col * SQ, animState.to.row * SQ, 1);

        // Draw knife/blade effect
        if (t > 0.3 && t < 0.7) {
          const bladeMidX = (lungeX + SQ/2 + animState.to.col * SQ + SQ/2) / 2;
          const bladeMidY = (lungeY + SQ/2 + animState.to.row * SQ + SQ/2) / 2;
          ctx.fillStyle = "#c0c0c0";
          ctx.fillRect(bladeMidX - 2, bladeMidY - 8, 4, 16);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(bladeMidX - 1, bladeMidY - 6, 2, 10);
        }
      } else if (elapsed < rushDur + stabDur + hitDur) {
        // Phase 2: Hit - target falls with blood effect
        const t = (elapsed - rushDur - stabDur) / hitDur;
        animState.targetHidden = true;

        const ax = animState.from.col * SQ + (animState.to.col - animState.from.col) * SQ * 0.7;
        const ay = animState.from.row * SQ + (animState.to.row - animState.from.row) * SQ * 0.7;

        drawPieceAt(animState.attacker, ax, ay, 1);

        // Blood splash
        if (t < 0.4) {
          ctx.fillStyle = "rgba(180, 0, 0, 0.7)";
          const splashSize = t * 40;
          ctx.beginPath();
          ctx.arc(tx, ty, splashSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Victim falling
        const fallAngle = t * Math.PI / 4;
        const fadeAlpha = Math.max(0, 1 - t * 1.5);
        ctx.save();
        ctx.translate(animState.to.col * SQ + SQ/2, animState.to.row * SQ + SQ/2);
        ctx.rotate(fallAngle);
        ctx.globalAlpha = fadeAlpha;
        ctx.translate(-SQ/2, -SQ/2 + t * 20);
        const victimSprite = sprites[animState.victim.color + "_" + animState.victim.type];
        if (victimSprite) {
          ctx.drawImage(victimSprite, 0, 0, SQ, SQ);
        }
        ctx.restore();
      } else if (elapsed < totalDur) {
        // Phase 3: Walk to target square
        const t = (elapsed - rushDur - stabDur - hitDur) / walkDur;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        animState.targetHidden = true;

        const startX = animState.from.col * SQ + (animState.to.col - animState.from.col) * SQ * 0.7;
        const startY = animState.from.row * SQ + (animState.to.row - animState.from.row) * SQ * 0.7;
        const ax = startX + (animState.to.col * SQ - startX) * ease;
        const ay = startY + (animState.to.row * SQ - startY) * ease - Math.sin(t * Math.PI) * 8;

        drawPieceAt(animState.attacker, ax, ay, 1);
      } else {
        // Animation complete
        animState.targetHidden = true;
        const cb = animState.callback;
        animState = null;
        drawBoard();
        if (cb) cb();
      }
    }
  }

  // ============================================================
  // MOVE EXECUTION
  // ============================================================
  function executeMove(from, to, callback) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    const afterMove = () => {
      board[to.row][to.col] = piece;
      board[from.row][from.col] = null;
      piece.hasMoved = true;

      // Pawn promotion
      if (piece.type === PAWN) {
        if (piece.color === W && to.row === 7) piece.type = QUEEN;
        if (piece.color === B && to.row === 0) piece.type = QUEEN;
      }

      // King captured = game over
      if (target && target.type === KING) {
        gameOver = true;
      }

      moveHistory.push({ from, to, piece, captured: target });
      currentPlayer = currentPlayer === W ? B : W;
      updateTurnInfo();
      updatePOW();
      drawBoard();

      if (callback) callback();
    };

    if (target) {
      // Capture: use selected kill animation
      if (target.color === B) {
        capturedMonkeys.push(target);
      } else {
        capturedSoldiers.push(target);
      }
      if (gameConfig.killStyle === 'stabbing') {
        startStabAnim(from, to, piece, target, afterMove);
      } else {
        startShootAnim(from, to, piece, target, afterMove);
      }
    } else {
      // Normal move: walk animation
      startWalkAnim(from, to, piece, afterMove);
    }
  }

  // ============================================================
  // AI - GORDON RAMSAY'S CHESS BRAIN
  // ============================================================
  function evaluateMove(move) {
    let score = 0;

    // Capture value
    if (move.capture) {
      score += VALUES[move.capture.type] * 10;
    }

    // Center control
    const cd =
      Math.abs(move.to.row - 3.5) + Math.abs(move.to.col - 3.5);
    score += (7 - cd) * 5;

    // Advance pawns
    if (move.piece.type === PAWN) {
      score += move.to.row * 4; // white moves down, higher row = more advanced
    }

    // Develop pieces early
    if (!move.piece.hasMoved && move.piece.type !== PAWN) {
      score += 15;
    }

    // Protect king - don't move king early
    if (move.piece.type === KING && moveHistory.length < 20) {
      score -= 20;
    }

    // === LEARNED PATTERN ADAPTATIONS ===
    if (learnedPatterns && learnedPatterns.aiAdaptations && learnedPatterns.aiAdaptations.enabled) {
      score += applyLearnedPatterns(move);
    }

    // Random factor for variety
    score += Math.random() * 25;

    return score;
  }

  function applyLearnedPatterns(move) {
    if (!learnedPatterns || !learnedPatterns.aiAdaptations) return 0;

    const adapt = learnedPatterns.aiAdaptations;
    const bonuses = adapt.bonuses || {};
    let bonus = 0;

    // Target player's weak squares
    if (adapt.targetSquares) {
      const squareKey = `${move.to.row},${move.to.col}`;
      if (adapt.targetSquares.includes(squareKey)) {
        bonus += bonuses.weakSquareBonus || 15;
      }
    }

    // Target overused pieces (try to capture them)
    if (adapt.targetPieces && move.capture) {
      if (adapt.targetPieces.includes(move.capture.type)) {
        bonus += bonuses.pieceTargetBonus || 10;
      }
    }

    // Counter-opening strategy
    if (adapt.counterOpening && moveHistory.length < 10) {
      if (adapt.counterOpening === 'knight_development' && move.piece.type === KNIGHT) {
        bonus += 10;
      } else if (adapt.counterOpening === 'pawn_center_control' && move.piece.type === PAWN) {
        if (move.to.col >= 3 && move.to.col <= 4) {
          bonus += 8;
        }
      }
    }

    // Aggression bonus (if player is winning a lot)
    if (bonuses.aggressionBonus && move.capture) {
      bonus += bonuses.aggressionBonus;
    }

    return bonus;
  }

  function makeRamsayMove() {
    if (gameOver || currentPlayer !== W) return;
    ramsayThinking = true;
    updateTurnInfo();

    setTimeout(() => {
      const moves = getAllMoves(W);
      if (moves.length === 0) {
        gameOver = true;
        showRamsayComment(
          "BLOODY HELL! I can't even MOVE! You win this time, you lucky DONKEY! But I WILL be back!"
        );
        currentPlayer = B;
        updateTurnInfo();
        ramsayThinking = false;
        saveGameToServer();
        return;
      }

      // Score and pick best move
      moves.sort((a, b) => evaluateMove(b) - evaluateMove(a));
      const best = moves[0];

      ramsayThinking = false;
      executeMove(best.from, best.to, () => {
        // Ramsay comments once per round (after his move completes)
        if (gameOver) {
          getRamsayReaction("game_over_win", best);
          drawRamsayPortrait("smug");
          saveGameToServer();
        } else {
          // Comment based on player's last move quality
          if (lastPlayerMoveQuality === "good") {
            const expr = Math.random() > 0.5 ? "furious" : "impressed";
            getRamsayReaction("good_player_move", best);
            drawRamsayPortrait(expr);
          } else if (lastPlayerMoveQuality === "bad") {
            const expr = Math.random() > 0.5 ? "smug" : "worried";
            getRamsayReaction("bad_player_move", best);
            drawRamsayPortrait(expr);
          } else {
            getRamsayReaction("own_move", best);
            drawRamsayPortrait("neutral");
          }
        }
      });
    }, 800);
  }

  // ============================================================
  // GORDON RAMSAY'S COMMENTARY - OLLAMA INTEGRATION
  // ============================================================

  const RAMSAY_ANGRY = [
    "BLOODY HELL! That was actually a GOOD move! How DARE you, you banana-munching DONKEY!",
    "Oh for f***'s sake! Even a MONKEY gets lucky! Wait... you ARE a monkey! STILL UNACCEPTABLE!",
    "RIGHT! That's IT! You think you're CLEVER?! I've seen better strategy from a FISH FINGER but that was actually DECENT!",
    "SHUT IT DOWN! Where did your pathetic monkey brain come up with THAT?! I'm LIVID!",
    "You MUPPET! That was actually... good?! NO! I REFUSE to accept this!",
    "ARE YOU KIDDING ME?! My SOUFFLÉ collapsed and now THIS?! You're RUINING my day, you hairy DONUT!",
    "THAT was unexpected from a creature that eats BUGS off other creatures' HEADS! I'm FURIOUS!",
    "Oh WONDERFUL! The monkey learned to play chess! What's next, a Michelin star?! OVER MY DEAD BODY!",
  ];

  const RAMSAY_MOCK = [
    "HAHAHAHA! What was THAT?! My GRANDMOTHER plays better chess, and she's been DEAD for twenty years!",
    "Oh BRILLIANT move! If your goal was to LOSE, you absolute DONUT! Were you aiming for the banana instead?!",
    "Did you just... did you REALLY?! You're an IDIOT SANDWICH! Say it! SAY IT! 'I'm an idiot sandwich!'",
    "WHAT ARE YOU?! A chess player?! Don't make me LAUGH! You're a DONKEY playing with expensive furniture!",
    "That move was so BAD I wouldn't serve it to my WORST ENEMY! And I have MANY enemies, trust me!",
    "Oh look at the little monkey pushing pieces around! Hasn't got a CLUE! ADORABLE but PATHETIC!",
    "That's EMBARRASSING! I've seen better moves from a WORM trying to escape a BIRD! You're HOPELESS!",
    "Is that your strategy?! A TODDLER with a CRAYON could plan better than THAT! Absolute SHAMBLES!",
  ];

  const RAMSAY_OWN = [
    "RIGHT THEN! Watch and LEARN, you furry waste of space! THAT'S how a genius plays!",
    "BOOM! That's how a REAL strategist does it! Take NOTES, DONKEY! Oh wait, you can't WRITE!",
    "Oh YES! Beautiful! Like a perfectly seared WELLINGTON! Something YOU will never understand!",
    "THAT is what EXCELLENCE looks like! Military PRECISION! Your monkey brain can't even COMPREHEND it!",
    "Moving with the precision of a MASTER CHEF plating a dessert! You're the BURNT TOAST, by the way!",
    "Check THAT out, monkey boy! Your bananas won't save you NOW! HAHAHAHA!",
    "Lovely, LOVELY move! I'm a GENIUS on the battlefield AND in the kitchen! You're just a MUPPET everywhere!",
  ];

  const RAMSAY_CAPTURE = [
    "GET OUT! GET OUT OF MY KITCHEN— I mean BATTLEFIELD! Another monkey DOWN!",
    "BANG BANG! One more monkey in CHAINS! How does that FEEL, you furry DONKEY?! GLORIOUS!",
    "That monkey just got SERVED! Like a BURNT SOUFFLÉ at a three-star restaurant! OFF TO THE P.O.W. CAMP!",
    "ANOTHER ONE BITES THE DUST! Your army is crumbling like a BAD RISOTTO! I LOVE IT!",
    "Into the CHAINS with that one! This is a MASSACRE and I'm ENJOYING every SECOND!",
    "Oh DEAR! Lost another soldier, have we?! Well, that's what happens when MONKEYS play SOLDIERS' games!",
    "ELIMINATED! That monkey couldn't handle the HEAT so it got out of the KITCHEN! Permanently! HAHA!",
  ];

  const RAMSAY_WIN = [
    "IT'S DONE! IT'S OVER! Your pathetic monkey king is FINISHED! I AM THE GREATEST CHEF AND CHESS MASTER!",
    "CHECKMATE, you absolute DONUT! That's what happens when you mess with GORDON BLOODY RAMSAY!",
    "Game OVER! Your monkey army was RAWWWW! Completely RAW! Uncooked! PATHETIC! I WIN! GET OUT!",
  ];

  const RAMSAY_LOSE = [
    "NO! NO NO NO! This CAN'T be happening! A MONKEY beat GORDON RAMSAY?! SHUT IT DOWN! SHUT EVERYTHING DOWN!",
    "IMPOSSIBLE! You got LUCKY, you banana-breathing DONKEY! I want a REMATCH! RIGHT NOW!",
    "FINE! You win THIS time! But I swear on my MICHELIN STARS, I'll DESTROY you next game! This isn't OVER!",
  ];

  async function getRamsayReaction(type, move) {
    let fallback;
    let context = "";

    switch (type) {
      case "good_player_move":
        fallback = RAMSAY_ANGRY;
        context =
          "The opponent's monkey army just made an excellent chess move, capturing or threatening your important pieces. You are FURIOUS and in complete disbelief. React with extreme anger and dramatic insults.";
        break;
      case "bad_player_move":
        fallback = RAMSAY_MOCK;
        context =
          "The opponent's monkey army just made a terrible chess move. Mock them mercilessly and laugh at their stupidity.";
        break;
      case "own_move":
        if (move && move.capture) {
          fallback = RAMSAY_CAPTURE;
          context =
            "You just captured one of the opponent's monkey chess pieces with your British soldier! Gloat, celebrate, and send them to the P.O.W. camp in chains!";
        } else {
          fallback = RAMSAY_OWN;
          context =
            "You just made a brilliant chess move with your British soldiers. Brag about how amazing you are.";
        }
        break;
      case "game_over_win":
        fallback = RAMSAY_WIN;
        context =
          "You just WON the chess game against the monkeys! Celebrate wildly and insult the defeated opponent!";
        break;
      case "game_over_lose":
        fallback = RAMSAY_LOSE;
        context =
          "You just LOST the chess game to the monkeys! You're devastated, furious, and in complete denial!";
        break;
    }

    // Always try to get a fresh quote from the server (which uses Ollama)
    try {
      const resp = await fetch(`${API_BASE}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: context,
          type: type,
          moveInfo: move ? {
            from: move.from,
            to: move.to,
            captured: move.capture?.type || move.captured?.type
          } : null
        }),
      });
      const data = await resp.json();
      if (data.quote) {
        showRamsayComment(data.quote);
        return;
      }
    } catch (e) {
      console.warn("API quote error:", e);
    }

    // Fallback to pre-written quotes only if API fails
    const quote = fallback[Math.floor(Math.random() * fallback.length)];
    showRamsayComment(quote);
  }

  function showRamsayComment(text) {
    // Check for duplicate - skip if already used
    if (usedQuotes.includes(text)) {
      console.log("Skipping duplicate quote");
      return;
    }
    usedQuotes.push(text);

    const el = document.getElementById("ramsayText");
    if (el) {
      el.textContent = text;
      const speech = document.getElementById("ramsaySpeech");
      if (speech) speech.scrollTop = speech.scrollHeight;
    }
  }

  // ============================================================
  // UI UPDATES
  // ============================================================
  function updateTurnInfo() {
    const el = document.getElementById("turnInfo");
    if (!el) return;
    el.className = "turn-info";

    if (gameOver) {
      const lastMove = moveHistory[moveHistory.length - 1];
      if (lastMove && lastMove.captured && lastMove.captured.type === KING) {
        if (lastMove.piece.color === W) {
          el.textContent = "RAMSAY WINS! GET OUT!";
        } else {
          el.textContent = "YOUR MONKEYS WIN!";
        }
      } else {
        el.textContent = "GAME OVER!";
      }
      el.classList.add("game-over");
    } else if (ramsayThinking) {
      el.textContent = "RAMSAY IS THINKING...";
      el.classList.add("ramsay-turn");
    } else if (currentPlayer === B) {
      el.textContent = "YOUR TURN (Monkeys)";
      el.classList.add("your-turn");
    } else {
      el.textContent = "RAMSAY'S TURN (Soldiers)";
      el.classList.add("ramsay-turn");
    }
  }

  function updatePOW() {
    renderPOWCage("powMonkeys", capturedMonkeys);
    renderPOWCage("powSoldiers", capturedSoldiers);
  }

  function renderPOWCage(elementId, pieces) {
    const cage = document.getElementById(elementId);
    if (!cage) return;
    cage.innerHTML = "";

    for (const p of pieces) {
      const c = document.createElement("canvas");
      c.width = 48;
      c.height = 48;
      c.style.width = "40px";
      c.style.height = "40px";
      const x = c.getContext("2d");
      x.imageSmoothingEnabled = false;

      const key = p.color + "_" + (p.originalType || p.type);
      const sprite = sprites[key];
      if (sprite) {
        // Draw piece slightly desaturated
        x.filter = "saturate(0.5) brightness(0.7)";
        x.drawImage(sprite, 4, 4, 40, 40);
        x.filter = "none";
      }

      // Draw chains over the piece
      x.strokeStyle = "#777";
      x.lineWidth = 2;
      // Horizontal chain links
      for (let i = 0; i < 48; i += 10) {
        x.beginPath();
        x.ellipse(i + 5, 6, 5, 3, 0, 0, Math.PI * 2);
        x.stroke();
      }
      // Vertical chain on left
      for (let i = 0; i < 48; i += 10) {
        x.beginPath();
        x.ellipse(4, i + 5, 3, 5, 0, 0, Math.PI * 2);
        x.stroke();
      }
      // X marks
      x.strokeStyle = "rgba(255, 0, 0, 0.3)";
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(0, 0);
      x.lineTo(48, 48);
      x.moveTo(48, 0);
      x.lineTo(0, 48);
      x.stroke();

      cage.appendChild(c);
    }
  }

  // ============================================================
  // INPUT HANDLING
  // ============================================================
  canvas.addEventListener("click", (e) => {
    if (gameOver || animState || currentPlayer !== B || ramsayThinking) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    const col = Math.floor(mx / SQ);
    const row = Math.floor(my / SQ);
    if (!inBounds(row, col)) return;

    // If a piece is selected and clicked a valid move
    if (selected) {
      const isValid = validMoves.some(
        (m) => m.row === row && m.col === col
      );

      if (isValid) {
        const from = { row: selected.row, col: selected.col };
        const to = { row, col };
        const captured = board[to.row][to.col];

        selected = null;
        validMoves = [];

        executeMove(from, to, () => {
          // Evaluate player's move quality
          evaluatePlayerMove(from, to, captured);

          if (gameOver) {
            getRamsayReaction("game_over_lose", null);
            saveGameToServer();
          } else {
            // Ramsay's turn after a delay
            setTimeout(() => makeRamsayMove(), 1200);
          }
        });
        return;
      }

      // Clicked elsewhere - deselect
      selected = null;
      validMoves = [];
    }

    // Select a monkey piece
    const piece = board[row][col];
    if (piece && piece.color === B) {
      selected = { row, col };
      validMoves = getValidMoves(row, col);
    }

    drawBoard();
  });

  function evaluatePlayerMove(from, to, captured) {
    let isGoodMove = false;

    if (captured) {
      isGoodMove = true;
      // Even better if captured high-value piece
      if (VALUES[captured.type] >= 300) isGoodMove = true;
    }

    // Check if the moved piece is now threatened
    const piece = board[to.row][to.col];
    if (piece) {
      const enemyMoves = getAllMoves(W);
      const threatened = enemyMoves.some(
        (m) => m.to.row === to.row && m.to.col === to.col
      );
      if (threatened && !captured) {
        isGoodMove = false;
      }
      // Extra good: threatening high-value enemy pieces
      const myMoves = getValidMoves(to.row, to.col);
      for (const m of myMoves) {
        if (board[m.row][m.col] && board[m.row][m.col].color === W) {
          if (VALUES[board[m.row][m.col].type] >= 500) {
            isGoodMove = true;
          }
        }
      }
    }

    // Store quality for Ramsay's comment after his move
    lastPlayerMoveQuality = isGoodMove ? "good" : "bad";
  }

  // ============================================================
  // RESET
  // ============================================================
  document.getElementById("resetBtn").addEventListener("click", () => {
    // Clear used quotes for new game
    usedQuotes = [];
    lastPlayerMoveQuality = "neutral";
    drawRamsayPortrait("neutral");
    showRamsayComment(
      "FINE! Let's go AGAIN! This time I'll absolutely DESTROY you, you pathetic banana-brained DONUT! COME ON!"
    );
    setTimeout(() => initGame(), 500);
  });

  // ============================================================
  // GAME LOOP
  // ============================================================
  function gameLoop(now) {
    if (animState) {
      updateAnimation(now);
    }
    requestAnimationFrame(gameLoop);
  }

  // ============================================================
  // SERVER STATUS CHECK
  // ============================================================
  async function checkServerStatus() {
    const el = document.getElementById("ollamaStatus");
    try {
      const resp = await fetch(`${API_BASE}/api/health`);
      if (resp.ok) {
        const data = await resp.json();
        ollamaOK = data.ollama === 'connected';
        if (el) {
          if (data.ollama === 'connected') {
            el.textContent = `OLLAMA: Connected | GitHub: ${data.github}`;
            el.className = "ollama-status connected";
          } else {
            el.textContent = "OLLAMA: Using fallback quotes";
            el.className = "ollama-status disconnected";
          }
        }
      }
    } catch (e) {
      ollamaOK = false;
      if (el) {
        el.textContent = "Server: Connecting...";
        el.className = "ollama-status disconnected";
      }
    }
  }

  // ============================================================
  // FETCH LEARNED PATTERNS
  // ============================================================
  async function fetchLearnedPatterns() {
    try {
      const resp = await fetch(`${API_BASE}/api/player-patterns?playerId=${playerId}`);
      if (resp.ok) {
        learnedPatterns = await resp.json();
        console.log("Learned patterns loaded:", learnedPatterns);
      }
    } catch (e) {
      console.warn("Could not fetch patterns:", e);
    }
  }

  // ============================================================
  // SAVE GAME TO SERVER
  // ============================================================
  async function saveGameToServer() {
    const winner = determineWinner();
    const gameData = {
      playerId: playerId,
      moves: moveHistory.map(m => ({
        from: m.from,
        to: m.to,
        piece: { type: m.piece.type, color: m.piece.color },
        captured: m.captured ? { type: m.captured.type, color: m.captured.color } : null
      })),
      winner: winner,
      timestamp: new Date().toISOString(),
      capturedByPlayer: capturedSoldiers.map(p => p.type),
      capturedByAI: capturedMonkeys.map(p => p.type),
      totalMoves: moveHistory.length
    };

    try {
      const resp = await fetch(`${API_BASE}/api/save-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      });
      const result = await resp.json();
      if (result.success) {
        console.log(`Game saved! Total games analyzed: ${result.gamesAnalyzed}`);
      }
    } catch (e) {
      console.warn('Failed to save game:', e);
    }
  }

  function determineWinner() {
    if (!gameOver) return null;
    const lastMove = moveHistory[moveHistory.length - 1];
    if (lastMove && lastMove.captured && lastMove.captured.type === KING) {
      return lastMove.piece.color === W ? 'white' : 'black';
    }
    return currentPlayer === W ? 'black' : 'white'; // Other player won
  }

  // ============================================================
  // THEME SELECTOR
  // ============================================================
  function initThemeSelector() {
    const themeSelector = document.getElementById('themeSelector');
    const gameContainer = document.getElementById('gameContainer');
    const startBtn = document.getElementById('startGameBtn');
    const changeThemeBtn = document.getElementById('changeThemeBtn');
    const designerBtn = document.getElementById('designerBtn');
    const designerModal = document.getElementById('designerModal');
    const saveDesignBtn = document.getElementById('saveDesignBtn');
    const cancelDesignBtn = document.getElementById('cancelDesignBtn');
    const lightPicker = document.getElementById('lightColorPicker');
    const darkPicker = document.getElementById('darkColorPicker');

    // Side selection
    document.querySelectorAll('.side-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.side-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        gameConfig.playerSide = btn.dataset.side;
      });
    });

    // White pieces selection
    document.querySelectorAll('#whitePieces .piece-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('#whitePieces .piece-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        gameConfig.whitePieces = card.dataset.theme;
      });
    });

    // Black pieces selection
    document.querySelectorAll('#blackPieces .piece-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('#blackPieces .piece-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        gameConfig.blackPieces = card.dataset.theme;
      });
    });

    // Board colors selection
    document.querySelectorAll('.board-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.board-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        gameConfig.boardColors = card.dataset.board;
      });
    });

    // Kill style selection
    document.querySelectorAll('.kill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.kill-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        gameConfig.killStyle = btn.dataset.kill;
      });
    });

    // Designer button
    if (designerBtn) {
      designerBtn.addEventListener('click', () => {
        designerModal.style.display = 'flex';
        updateDesignerPreview();
      });
    }

    // Save design
    if (saveDesignBtn) {
      saveDesignBtn.addEventListener('click', () => {
        gameConfig.customBoard = {
          light: lightPicker.value,
          dark: darkPicker.value
        };
        // Update custom preview in selector
        const customPreview = document.getElementById('customBoardPreview');
        if (customPreview) {
          const squares = customPreview.querySelectorAll('.board-square');
          squares.forEach((sq, i) => {
            sq.style.background = (i === 0 || i === 3) ? lightPicker.value : darkPicker.value;
          });
        }
        // Select custom board
        document.querySelectorAll('.board-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('customBoardCard').classList.add('selected');
        gameConfig.boardColors = 'custom';
        designerModal.style.display = 'none';
      });
    }

    // Cancel design
    if (cancelDesignBtn) {
      cancelDesignBtn.addEventListener('click', () => {
        designerModal.style.display = 'none';
      });
    }

    // Update designer preview on color change
    if (lightPicker && darkPicker) {
      lightPicker.addEventListener('input', updateDesignerPreview);
      darkPicker.addEventListener('input', updateDesignerPreview);
    }

    function updateDesignerPreview() {
      const preview = document.getElementById('designerPreviewBoard');
      if (!preview) return;
      preview.innerHTML = '';
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const sq = document.createElement('div');
          sq.style.width = '40px';
          sq.style.height = '40px';
          sq.style.background = ((r + c) % 2 === 0) ? lightPicker.value : darkPicker.value;
          preview.appendChild(sq);
        }
      }
    }

    // Start game
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        themeSelector.style.display = 'none';
        gameContainer.style.display = 'block';
        startGameWithConfig();
      });
    }

    // Change theme button (in game)
    if (changeThemeBtn) {
      changeThemeBtn.addEventListener('click', () => {
        gameContainer.style.display = 'none';
        themeSelector.style.display = 'flex';
      });
    }

    // Generate preview sprites for theme cards
    generateThemePreviews();
  }

  function generateThemePreviews() {
    // Generate preview sprites for each piece theme card
    const previewPieces = {
      'british': drawSoldierKing,
      'american': window.SPRITE_FUNCTIONS?.american?.king,
      'classic_white': window.SPRITE_FUNCTIONS?.classic_white?.king,
      'knights': drawSoldierKnight,
      'monkeys': drawMonkeyKing,
      'arab': window.SPRITE_FUNCTIONS?.arab?.king,
      'classic_black': window.SPRITE_FUNCTIONS?.classic_black?.king,
      'ninja': window.SPRITE_FUNCTIONS?.ninja?.king
    };

    document.querySelectorAll('.piece-card').forEach(card => {
      const canvas = card.querySelector('.piece-preview');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;

      const theme = card.dataset.theme;
      let drawFn = previewPieces[theme];

      // Create a temp 16x16 canvas and draw
      const temp = document.createElement('canvas');
      temp.width = temp.height = 16;
      const tempCtx = temp.getContext('2d');

      if (drawFn) {
        drawFn(tempCtx);
      } else {
        // Fallback - draw a simple placeholder
        tempCtx.fillStyle = '#888';
        tempCtx.fillRect(4, 4, 8, 8);
      }

      // Scale to preview canvas
      ctx.drawImage(temp, 0, 0, 48, 48);
    });
  }

  function startGameWithConfig() {
    // Update UI labels based on config
    const whiteName = THEME_NAMES[gameConfig.whitePieces] || gameConfig.whitePieces;
    const blackName = THEME_NAMES[gameConfig.blackPieces] || gameConfig.blackPieces;

    const subtitle = document.getElementById('gameSubtitle');
    if (subtitle) {
      subtitle.textContent = `${whiteName} vs ${blackName}`;
    }

    const powLabelWhite = document.getElementById('powLabelWhite');
    const powLabelBlack = document.getElementById('powLabelBlack');
    if (powLabelWhite) powLabelWhite.textContent = `CAPTURED ${whiteName.toUpperCase()}`;
    if (powLabelBlack) powLabelBlack.textContent = `CAPTURED ${blackName.toUpperCase()}`;

    // Create sprites based on selected themes
    createAllSprites();
    drawRamsayPortrait("neutral");
    checkServerStatus();
    fetchLearnedPatterns();
    initGame();
    requestAnimationFrame(gameLoop);
  }

  function getBoardColors() {
    if (gameConfig.boardColors === 'custom' && gameConfig.customBoard) {
      return gameConfig.customBoard;
    }
    return BOARD_COLORS[gameConfig.boardColors] || BOARD_COLORS.classic;
  }

  // ============================================================
  // STABBING ANIMATION
  // ============================================================
  function startStabAnim(from, to, attacker, victim, callback) {
    animState = {
      type: "stab",
      from,
      to,
      attacker,
      victim,
      startTime: performance.now(),
      callback,
      skipPiece: from,
      skipTarget: to,
      targetHidden: false,
      phase: 0
    };
  }

  // ============================================================
  // BOOT UP
  // ============================================================
  initThemeSelector();
})();
