// ============================================================
// CHESS THEMES - Multiple piece sets, board colors, kill styles
// ============================================================

const CHESS_THEMES = {
  // ============================================================
  // BOARD COLOR SCHEMES
  // ============================================================
  boards: {
    classic: { name: "Classic", light: "#f0d9b5", dark: "#b58863" },
    military: { name: "Military", light: "#5a6d33", dark: "#3d4a23" },
    ocean: { name: "Ocean", light: "#a8d8ea", dark: "#3d5a80" },
    volcanic: { name: "Volcanic", light: "#ff6b6b", dark: "#2d2d2d" },
    royal: { name: "Royal Purple", light: "#e8d5f7", dark: "#6b4499" },
    desert: { name: "Desert Sand", light: "#f5deb3", dark: "#d2a679" },
    ice: { name: "Ice", light: "#e0f7fa", dark: "#4dd0e1" },
    forest: { name: "Forest", light: "#a8d5a2", dark: "#4a7c47" }
  },

  // ============================================================
  // KILL ANIMATION STYLES
  // ============================================================
  killStyles: {
    shooting: { name: "Shooting", icon: "gun" },
    stabbing: { name: "Stabbing", icon: "knife" }
  },

  // ============================================================
  // PIECE THEMES - Each has white and black sets
  // ============================================================
  pieces: {
    // === CLASSIC CHESS PIECES ===
    classic_white: {
      name: "Classic White",
      color: "white",
      description: "Traditional ivory chess pieces",
      sprites: {}
    },
    classic_black: {
      name: "Classic Black",
      color: "black",
      description: "Traditional ebony chess pieces",
      sprites: {}
    },

    // === BRITISH SOLDIERS (Current White) ===
    british: {
      name: "British Soldiers",
      color: "white",
      description: "Royal British Army with Gordon Ramsay as King",
      sprites: {}
    },

    // === MONKEYS (Current Black) ===
    monkeys: {
      name: "Jungle Monkeys",
      color: "black",
      description: "Mischievous monkeys with banana guns",
      sprites: {}
    },

    // === AMERICAN SOLDIERS ===
    american: {
      name: "US Marines",
      color: "white",
      description: "American military forces",
      sprites: {}
    },

    // === ARAB WARRIORS ===
    arab: {
      name: "Desert Warriors",
      color: "black",
      description: "Arabian desert fighters",
      sprites: {}
    },

    // === MEDIEVAL KNIGHTS ===
    knights: {
      name: "Crusaders",
      color: "white",
      description: "Medieval knights in shining armor",
      sprites: {}
    },

    // === NINJA ===
    ninja: {
      name: "Shadow Ninjas",
      color: "black",
      description: "Silent assassins from the East",
      sprites: {}
    }
  }
};

// ============================================================
// SPRITE DRAWING HELPER
// ============================================================
function R(c, color, x, y, w, h) {
  c.fillStyle = color;
  c.fillRect(x, y, w || 1, h || 1);
}

// ============================================================
// CLASSIC CHESS PIECE SPRITES (16x16)
// ============================================================

// Classic White Pawn
function drawClassicWhitePawn(c) {
  // Dark outline for visibility on light squares
  R(c, "#8b8b6b", 5, 1, 6, 1); // head outline top
  R(c, "#8b8b6b", 4, 2, 1, 5); // head outline left
  R(c, "#8b8b6b", 11, 2, 1, 5); // head outline right
  R(c, "#8b8b6b", 5, 6, 1, 1);
  R(c, "#8b8b6b", 10, 6, 1, 1);
  R(c, "#8b8b6b", 3, 12, 1, 3); // base outline
  R(c, "#8b8b6b", 12, 12, 1, 3);
  R(c, "#8b8b6b", 3, 14, 10, 1);
  // Head ball
  R(c, "#f8f0e0", 5, 2, 6, 4);
  R(c, "#f8f0e0", 6, 1, 4, 1);
  R(c, "#ffffff", 6, 2, 2, 2); // highlight
  R(c, "#d8d0c0", 8, 4, 2, 2); // shadow
  // Stem
  R(c, "#f8f0e0", 6, 6, 4, 6);
  R(c, "#d8d0c0", 9, 7, 1, 4); // shadow
  // Base
  R(c, "#f8f0e0", 4, 12, 8, 2);
  R(c, "#e8e0d0", 5, 11, 6, 1);
  R(c, "#d8d0c0", 4, 13, 8, 1);
}

// Classic White Rook
function drawClassicWhiteRook(c) {
  // Outline
  R(c, "#8b8b6b", 1, 0, 1, 3);
  R(c, "#8b8b6b", 14, 0, 1, 3);
  R(c, "#8b8b6b", 1, 14, 14, 1);
  R(c, "#8b8b6b", 2, 4, 1, 10);
  R(c, "#8b8b6b", 13, 4, 1, 10);
  // Crenellations
  R(c, "#f8f0e0", 2, 0, 3, 3);
  R(c, "#f8f0e0", 6, 0, 2, 2);
  R(c, "#f8f0e0", 9, 0, 2, 2);
  R(c, "#f8f0e0", 12, 0, 2, 3);
  // Top platform
  R(c, "#f8f0e0", 2, 2, 12, 2);
  R(c, "#d8d0c0", 3, 3, 10, 1);
  // Body
  R(c, "#f8f0e0", 3, 4, 10, 8);
  R(c, "#e8e0d0", 5, 5, 6, 6);
  R(c, "#ffffff", 6, 6, 2, 2); // highlight
  R(c, "#d8d0c0", 10, 5, 2, 7); // shadow
  // Base
  R(c, "#f8f0e0", 2, 12, 12, 2);
  R(c, "#d8d0c0", 2, 13, 12, 1);
}

// Classic White Knight
function drawClassicWhiteKnight(c) {
  // Outline
  R(c, "#8b8b6b", 3, 0, 1, 3);
  R(c, "#8b8b6b", 10, 0, 1, 1);
  R(c, "#8b8b6b", 1, 4, 1, 3);
  R(c, "#8b8b6b", 11, 1, 1, 5);
  R(c, "#8b8b6b", 2, 14, 11, 1);
  // Horse head shape
  R(c, "#f8f0e0", 4, 0, 6, 3);
  R(c, "#f8f0e0", 3, 2, 4, 4);
  R(c, "#f8f0e0", 2, 4, 3, 3);
  // Ear
  R(c, "#f8f0e0", 9, 0, 2, 2);
  R(c, "#d8d0c0", 9, 0, 1, 1);
  // Eye
  R(c, "#222222", 5, 2, 1, 1);
  // Mane
  R(c, "#d8d0c0", 7, 1, 3, 5);
  R(c, "#c8c0b0", 8, 2, 2, 3);
  // Nostril
  R(c, "#c8c0b0", 2, 5, 1, 1);
  // Neck
  R(c, "#f8f0e0", 5, 6, 6, 5);
  R(c, "#d8d0c0", 8, 7, 3, 3); // shadow
  // Base
  R(c, "#f8f0e0", 3, 11, 10, 3);
  R(c, "#d8d0c0", 3, 13, 10, 1);
}

// Classic White Bishop
function drawClassicWhiteBishop(c) {
  // Outline
  R(c, "#8b8b6b", 6, 0, 1, 1);
  R(c, "#8b8b6b", 9, 0, 1, 1);
  R(c, "#8b8b6b", 4, 2, 1, 4);
  R(c, "#8b8b6b", 11, 2, 1, 4);
  R(c, "#8b8b6b", 2, 14, 12, 1);
  // Top ball
  R(c, "#f8f0e0", 7, 0, 2, 2);
  R(c, "#ffffff", 7, 0, 1, 1);
  // Mitre head
  R(c, "#f8f0e0", 5, 1, 6, 5);
  R(c, "#d8d0c0", 7, 2, 2, 2); // slit
  R(c, "#ffffff", 5, 2, 1, 2); // highlight
  // Collar
  R(c, "#f8f0e0", 4, 5, 8, 2);
  R(c, "#d8d0c0", 4, 6, 8, 1);
  // Body
  R(c, "#f8f0e0", 5, 7, 6, 5);
  R(c, "#e8e0d0", 6, 8, 4, 3);
  R(c, "#d8d0c0", 9, 7, 2, 5); // shadow
  // Base
  R(c, "#f8f0e0", 3, 12, 10, 2);
  R(c, "#d8d0c0", 3, 13, 10, 1);
}

// Classic White Queen
function drawClassicWhiteQueen(c) {
  // Crown point outlines
  R(c, "#8b8b6b", 2, 0, 1, 2);
  R(c, "#8b8b6b", 13, 0, 1, 2);
  // Crown points with balls on top
  R(c, "#f8f0e0", 3, 0, 2, 2);
  R(c, "#f8f0e0", 7, 0, 2, 1);
  R(c, "#f8f0e0", 11, 0, 2, 2);
  R(c, "#ffffff", 3, 0, 1, 1);
  R(c, "#ffffff", 7, 0, 1, 1);
  R(c, "#ffffff", 12, 0, 1, 1);
  // Crown body
  R(c, "#f8f0e0", 3, 2, 10, 3);
  R(c, "#d8d0c0", 4, 3, 8, 1);
  R(c, "#e8e0d0", 5, 1, 2, 2);
  R(c, "#e8e0d0", 9, 1, 2, 2);
  // Neck
  R(c, "#f8f0e0", 5, 5, 6, 2);
  // Body
  R(c, "#f8f0e0", 4, 7, 8, 5);
  R(c, "#e8e0d0", 5, 8, 6, 3);
  R(c, "#ffffff", 6, 8, 2, 1); // highlight
  R(c, "#d8d0c0", 10, 7, 1, 5); // shadow
  // Base outline + body
  R(c, "#8b8b6b", 1, 14, 14, 1);
  R(c, "#f8f0e0", 2, 12, 12, 2);
  R(c, "#d8d0c0", 2, 13, 12, 1);
}

// Classic White King
function drawClassicWhiteKing(c) {
  // Cross on top
  R(c, "#f8f0e0", 7, 0, 2, 4);
  R(c, "#f8f0e0", 5, 1, 6, 2);
  R(c, "#ffffff", 7, 0, 1, 1); // cross highlight
  R(c, "#8b8b6b", 6, 0, 1, 1); // outline
  R(c, "#8b8b6b", 9, 0, 1, 1);
  // Crown
  R(c, "#f8f0e0", 4, 3, 8, 3);
  R(c, "#d8d0c0", 5, 4, 6, 1);
  R(c, "#8b8b6b", 3, 3, 1, 3); // outline
  R(c, "#8b8b6b", 12, 3, 1, 3);
  // Neck
  R(c, "#f8f0e0", 5, 6, 6, 2);
  // Body
  R(c, "#f8f0e0", 4, 8, 8, 4);
  R(c, "#e8e0d0", 5, 9, 6, 2);
  R(c, "#ffffff", 6, 9, 2, 1); // highlight
  R(c, "#d8d0c0", 10, 8, 2, 4); // shadow
  // Base outline + body
  R(c, "#8b8b6b", 1, 14, 14, 1);
  R(c, "#f8f0e0", 2, 12, 12, 2);
  R(c, "#d8d0c0", 2, 13, 12, 1);
}

// Classic Black Pawn
function drawClassicBlackPawn(c) {
  // Light outline for visibility on dark squares
  R(c, "#666666", 5, 1, 6, 1);
  R(c, "#666666", 4, 2, 1, 5);
  R(c, "#666666", 11, 2, 1, 5);
  R(c, "#666666", 3, 12, 1, 2);
  R(c, "#666666", 12, 12, 1, 2);
  R(c, "#666666", 3, 14, 10, 1);
  // Head ball
  R(c, "#2a2a2a", 5, 2, 6, 4);
  R(c, "#2a2a2a", 6, 1, 4, 1);
  R(c, "#484848", 6, 2, 2, 2); // highlight
  R(c, "#1a1a1a", 8, 4, 2, 2); // shadow
  // Stem
  R(c, "#2a2a2a", 6, 6, 4, 6);
  R(c, "#383838", 6, 7, 1, 4); // highlight
  // Base
  R(c, "#2a2a2a", 4, 12, 8, 2);
  R(c, "#383838", 5, 11, 6, 1);
  R(c, "#1a1a1a", 4, 13, 8, 1);
}

// Classic Black Rook
function drawClassicBlackRook(c) {
  // Outline
  R(c, "#666666", 1, 0, 1, 3);
  R(c, "#666666", 14, 0, 1, 3);
  R(c, "#666666", 1, 14, 14, 1);
  R(c, "#666666", 2, 4, 1, 10);
  R(c, "#666666", 13, 4, 1, 10);
  // Crenellations
  R(c, "#2a2a2a", 2, 0, 3, 3);
  R(c, "#2a2a2a", 6, 0, 2, 2);
  R(c, "#2a2a2a", 9, 0, 2, 2);
  R(c, "#2a2a2a", 12, 0, 2, 3);
  R(c, "#484848", 2, 0, 1, 1);
  R(c, "#484848", 12, 0, 1, 1);
  // Top
  R(c, "#2a2a2a", 2, 2, 12, 2);
  R(c, "#383838", 3, 2, 10, 1);
  // Body
  R(c, "#2a2a2a", 3, 4, 10, 8);
  R(c, "#383838", 4, 5, 4, 6); // highlight
  R(c, "#484848", 5, 6, 2, 2);
  R(c, "#1a1a1a", 10, 5, 2, 7); // shadow
  // Base
  R(c, "#2a2a2a", 2, 12, 12, 2);
  R(c, "#1a1a1a", 2, 13, 12, 1);
}

// Classic Black Knight
function drawClassicBlackKnight(c) {
  // Outline
  R(c, "#666666", 3, 0, 1, 3);
  R(c, "#666666", 10, 0, 1, 1);
  R(c, "#666666", 1, 4, 1, 3);
  R(c, "#666666", 11, 1, 1, 5);
  R(c, "#666666", 2, 14, 11, 1);
  // Horse head
  R(c, "#2a2a2a", 4, 0, 6, 3);
  R(c, "#2a2a2a", 3, 2, 4, 4);
  R(c, "#2a2a2a", 2, 4, 3, 3);
  // Ear
  R(c, "#2a2a2a", 9, 0, 2, 2);
  R(c, "#383838", 9, 0, 1, 1);
  // Eye
  R(c, "#ffffff", 5, 2, 1, 1);
  // Mane
  R(c, "#383838", 7, 1, 3, 5);
  R(c, "#484848", 8, 2, 1, 3);
  // Nostril
  R(c, "#1a1a1a", 2, 5, 1, 1);
  // Neck
  R(c, "#2a2a2a", 5, 6, 6, 5);
  R(c, "#383838", 5, 7, 2, 3); // highlight
  R(c, "#1a1a1a", 9, 7, 2, 3); // shadow
  // Base
  R(c, "#2a2a2a", 3, 11, 10, 3);
  R(c, "#1a1a1a", 3, 13, 10, 1);
}

// Classic Black Bishop
function drawClassicBlackBishop(c) {
  // Outline
  R(c, "#666666", 6, 0, 1, 1);
  R(c, "#666666", 9, 0, 1, 1);
  R(c, "#666666", 4, 2, 1, 4);
  R(c, "#666666", 11, 2, 1, 4);
  R(c, "#666666", 2, 14, 12, 1);
  // Top ball
  R(c, "#2a2a2a", 7, 0, 2, 2);
  R(c, "#484848", 7, 0, 1, 1);
  // Mitre
  R(c, "#2a2a2a", 5, 1, 6, 5);
  R(c, "#383838", 5, 2, 2, 2); // highlight
  R(c, "#484848", 7, 2, 2, 2); // slit (lighter)
  // Collar
  R(c, "#2a2a2a", 4, 5, 8, 2);
  R(c, "#383838", 4, 5, 8, 1);
  // Body
  R(c, "#2a2a2a", 5, 7, 6, 5);
  R(c, "#383838", 5, 8, 2, 3); // highlight
  R(c, "#1a1a1a", 9, 7, 2, 5); // shadow
  // Base
  R(c, "#2a2a2a", 3, 12, 10, 2);
  R(c, "#1a1a1a", 3, 13, 10, 1);
}

// Classic Black Queen
function drawClassicBlackQueen(c) {
  // Crown point outlines
  R(c, "#666666", 2, 0, 1, 2);
  R(c, "#666666", 13, 0, 1, 2);
  // Crown points
  R(c, "#2a2a2a", 3, 0, 2, 2);
  R(c, "#2a2a2a", 7, 0, 2, 1);
  R(c, "#2a2a2a", 11, 0, 2, 2);
  R(c, "#484848", 3, 0, 1, 1);
  R(c, "#484848", 7, 0, 1, 1);
  R(c, "#484848", 12, 0, 1, 1);
  // Crown body
  R(c, "#2a2a2a", 3, 2, 10, 3);
  R(c, "#383838", 4, 2, 8, 1);
  R(c, "#2a2a2a", 5, 1, 2, 2);
  R(c, "#2a2a2a", 9, 1, 2, 2);
  // Neck
  R(c, "#2a2a2a", 5, 5, 6, 2);
  // Body
  R(c, "#2a2a2a", 4, 7, 8, 5);
  R(c, "#383838", 5, 8, 3, 3); // highlight
  R(c, "#484848", 6, 8, 1, 1);
  R(c, "#1a1a1a", 10, 7, 1, 5); // shadow
  // Base
  R(c, "#666666", 1, 14, 14, 1);
  R(c, "#2a2a2a", 2, 12, 12, 2);
  R(c, "#1a1a1a", 2, 13, 12, 1);
}

// Classic Black King
function drawClassicBlackKing(c) {
  // Cross
  R(c, "#2a2a2a", 7, 0, 2, 4);
  R(c, "#2a2a2a", 5, 1, 6, 2);
  R(c, "#484848", 7, 0, 1, 1); // highlight
  R(c, "#666666", 6, 0, 1, 1); // outline
  R(c, "#666666", 9, 0, 1, 1);
  // Crown
  R(c, "#2a2a2a", 4, 3, 8, 3);
  R(c, "#383838", 5, 3, 6, 1);
  R(c, "#666666", 3, 3, 1, 3); // outline
  R(c, "#666666", 12, 3, 1, 3);
  // Neck
  R(c, "#2a2a2a", 5, 6, 6, 2);
  // Body
  R(c, "#2a2a2a", 4, 8, 8, 4);
  R(c, "#383838", 5, 9, 3, 2); // highlight
  R(c, "#484848", 6, 9, 1, 1);
  R(c, "#1a1a1a", 10, 8, 2, 4); // shadow
  // Base
  R(c, "#666666", 1, 14, 14, 1);
  R(c, "#2a2a2a", 2, 12, 12, 2);
  R(c, "#1a1a1a", 2, 13, 12, 1);
}

// ============================================================
// AMERICAN SOLDIER SPRITES (16x16)
// ============================================================

function drawAmericanPawn(c) {
  // Outline shadow for visibility
  R(c, "#1a2e0a", 4, 0, 8, 1);
  // Kevlar helmet
  R(c, "#5a7a2e", 5, 0, 6, 3);
  R(c, "#6b8b3a", 6, 1, 4, 1);
  R(c, "#4a6a20", 5, 2, 6, 1);
  R(c, "#3a5a14", 4, 2, 1, 1); // helmet rim left
  R(c, "#3a5a14", 11, 2, 1, 1); // helmet rim right
  // Face
  R(c, "#f0c896", 6, 3, 4, 3);
  R(c, "#daa870", 6, 5, 4, 1);
  R(c, "#111111", 7, 4, 1, 1); // eye
  R(c, "#111111", 9, 4, 1, 1); // eye
  // Camo uniform body
  R(c, "#556b2f", 4, 6, 8, 5);
  R(c, "#6b8b3a", 5, 7, 2, 2);
  R(c, "#3a5a14", 8, 7, 2, 2);
  R(c, "#4a6a20", 7, 9, 2, 1);
  R(c, "#6b8b3a", 10, 8, 1, 2);
  // Belt
  R(c, "#8b7355", 4, 10, 8, 1);
  R(c, "#ffd700", 7, 10, 2, 1); // buckle
  // M4 rifle
  R(c, "#222222", 12, 2, 1, 8);
  R(c, "#444444", 12, 1, 1, 2); // barrel
  R(c, "#666666", 12, 1, 1, 1); // muzzle
  R(c, "#8b6914", 13, 5, 1, 3); // stock
  // Pants & boots
  R(c, "#556b2f", 5, 11, 2, 2);
  R(c, "#556b2f", 9, 11, 2, 2);
  R(c, "#2a1a0a", 5, 13, 2, 2);
  R(c, "#2a1a0a", 9, 13, 2, 2);
  R(c, "#1a1a1a", 5, 15, 2, 1);
  R(c, "#1a1a1a", 9, 15, 2, 1);
}

function drawAmericanRook(c) {
  // M1 Abrams Tank
  // Turret top
  R(c, "#5a7a2e", 5, 0, 6, 2);
  R(c, "#4a6a20", 6, 0, 4, 1);
  // Gun barrel
  R(c, "#444444", 0, 1, 6, 1);
  R(c, "#555555", 0, 1, 1, 1);
  R(c, "#ffaa00", 0, 1, 1, 1); // muzzle flash
  // Turret body
  R(c, "#6b8b3a", 4, 2, 8, 3);
  R(c, "#556b2f", 5, 3, 6, 1);
  // Hull
  R(c, "#5a7a2e", 2, 5, 12, 4);
  R(c, "#4a6a20", 3, 6, 10, 2);
  // White star emblem
  R(c, "#ffffff", 7, 6, 2, 2);
  R(c, "#ffffff", 6, 7, 1, 1);
  R(c, "#ffffff", 9, 7, 1, 1);
  R(c, "#ffffff", 8, 5, 1, 1);
  // Tracks
  R(c, "#333333", 1, 9, 14, 3);
  R(c, "#1a1a1a", 1, 11, 14, 1);
  // Track wheels
  R(c, "#555555", 2, 10, 2, 1);
  R(c, "#555555", 5, 10, 2, 1);
  R(c, "#555555", 8, 10, 2, 1);
  R(c, "#555555", 11, 10, 2, 1);
  // Skirt armor
  R(c, "#4a6a20", 1, 9, 1, 2);
  R(c, "#4a6a20", 14, 9, 1, 2);
  // Base shadow
  R(c, "#111111", 1, 12, 14, 2);
  R(c, "#222222", 2, 12, 12, 1);
}

function drawAmericanKnight(c) {
  // AH-64 Apache Helicopter
  // Main rotor blades
  R(c, "#888888", 1, 0, 14, 1);
  R(c, "#aaaaaa", 4, 0, 2, 1);
  R(c, "#aaaaaa", 10, 0, 2, 1);
  // Rotor hub
  R(c, "#666666", 7, 1, 2, 1);
  // Cockpit glass
  R(c, "#66ccff", 6, 2, 4, 3);
  R(c, "#88ddff", 7, 2, 2, 2);
  // Cockpit frame
  R(c, "#556b2f", 5, 2, 1, 3);
  R(c, "#556b2f", 10, 2, 1, 3);
  // Fuselage
  R(c, "#5a7a2e", 4, 5, 8, 3);
  R(c, "#4a6a20", 5, 6, 6, 1);
  // Tail boom
  R(c, "#5a7a2e", 11, 4, 4, 2);
  R(c, "#4a6a20", 13, 3, 2, 2);
  // Tail rotor
  R(c, "#888888", 15, 2, 1, 3);
  R(c, "#aaaaaa", 15, 3, 1, 1);
  // Weapon pylons
  R(c, "#333333", 3, 6, 2, 1);
  R(c, "#333333", 11, 6, 2, 1);
  // Hellfire missiles
  R(c, "#cc0000", 2, 6, 1, 1);
  R(c, "#cc0000", 13, 6, 1, 1);
  // Landing skids
  R(c, "#444444", 4, 8, 1, 4);
  R(c, "#444444", 11, 8, 1, 4);
  R(c, "#555555", 3, 11, 4, 1);
  R(c, "#555555", 10, 11, 4, 1);
  // US Army star
  R(c, "#ffffff", 7, 6, 2, 1);
}

function drawAmericanBishop(c) {
  // Sniper in ghillie suit
  // Ghillie hood (shaggy)
  R(c, "#6b8b3a", 4, 0, 8, 3);
  R(c, "#556b2f", 5, 0, 6, 2);
  R(c, "#7a9b4a", 4, 0, 1, 2); // shaggy bits
  R(c, "#7a9b4a", 11, 0, 1, 2);
  R(c, "#3a5a14", 6, 2, 4, 1);
  R(c, "#8bab5a", 3, 1, 1, 2); // extra shag
  R(c, "#8bab5a", 12, 1, 1, 2);
  // Face (camo paint)
  R(c, "#556b2f", 6, 3, 4, 2);
  R(c, "#f0c896", 7, 3, 2, 1); // eyes area
  R(c, "#111111", 7, 3, 1, 1); // eye
  R(c, "#111111", 8, 3, 1, 1); // eye
  // Ghillie body (layered shaggy)
  R(c, "#556b2f", 3, 5, 10, 6);
  R(c, "#6b8b3a", 4, 5, 3, 3);
  R(c, "#3a5a14", 8, 6, 3, 3);
  R(c, "#7a9b4a", 3, 5, 1, 3);
  R(c, "#7a9b4a", 12, 5, 1, 3);
  R(c, "#8bab5a", 5, 9, 2, 2); // hanging strands
  R(c, "#8bab5a", 9, 8, 2, 2);
  // Sniper rifle (M24)
  R(c, "#222222", 13, 1, 1, 9);
  R(c, "#333333", 13, 0, 1, 2); // barrel
  R(c, "#666666", 14, 0, 1, 1); // muzzle
  R(c, "#8b6914", 14, 4, 1, 4); // wooden stock
  R(c, "#444444", 13, 3, 1, 1); // scope
  R(c, "#66ccff", 14, 3, 1, 1); // scope lens
  // Legs hidden in ghillie
  R(c, "#556b2f", 5, 11, 2, 3);
  R(c, "#556b2f", 9, 11, 2, 3);
  R(c, "#2a1a0a", 5, 14, 2, 1);
  R(c, "#2a1a0a", 9, 14, 2, 1);
}

function drawAmericanQueen(c) {
  // 4-Star General
  // Officer peaked cap
  R(c, "#3a5a14", 4, 0, 8, 2);
  R(c, "#ffd700", 4, 1, 8, 1); // gold braid
  R(c, "#556b2f", 5, 2, 6, 1); // visor
  R(c, "#1a1a1a", 4, 2, 1, 1); // visor edge
  R(c, "#1a1a1a", 11, 2, 1, 1);
  R(c, "#ffd700", 7, 0, 2, 1); // eagle emblem
  // Face
  R(c, "#f0c896", 6, 3, 4, 3);
  R(c, "#daa870", 6, 5, 4, 1);
  R(c, "#111111", 7, 4, 1, 1); // eye
  R(c, "#111111", 9, 4, 1, 1); // eye
  R(c, "#888888", 7, 5, 2, 1); // jaw shadow
  // Dress uniform jacket
  R(c, "#3a5a14", 4, 6, 8, 5);
  R(c, "#2a4a0a", 5, 7, 6, 3);
  // 4 gold stars on shoulders
  R(c, "#ffd700", 4, 6, 1, 1);
  R(c, "#ffd700", 5, 6, 1, 1);
  R(c, "#ffd700", 10, 6, 1, 1);
  R(c, "#ffd700", 11, 6, 1, 1);
  // Medals ribbon rack
  R(c, "#ff0000", 6, 7, 1, 1);
  R(c, "#0000cc", 7, 7, 1, 1);
  R(c, "#ffd700", 8, 7, 1, 1);
  R(c, "#00cc00", 9, 7, 1, 1);
  // Gold buttons
  R(c, "#ffd700", 7, 9, 1, 1);
  R(c, "#ffd700", 7, 10, 1, 1);
  // Sidearm holster
  R(c, "#2a1a0a", 12, 8, 1, 3);
  R(c, "#333333", 12, 7, 1, 1);
  // Dress pants
  R(c, "#3a5a14", 5, 11, 2, 2);
  R(c, "#3a5a14", 9, 11, 2, 2);
  // Gold stripe on pants
  R(c, "#ffd700", 5, 11, 1, 2);
  R(c, "#ffd700", 10, 11, 1, 2);
  // Polished shoes
  R(c, "#111111", 5, 13, 2, 2);
  R(c, "#111111", 9, 13, 2, 2);
}

function drawAmericanKing(c) {
  // Supreme Commander with American Flag
  // Green beret
  R(c, "#2a8a2a", 5, 0, 6, 2);
  R(c, "#1a7a1a", 6, 0, 4, 1);
  R(c, "#3a9a3a", 5, 1, 6, 1);
  // Beret badge
  R(c, "#ffd700", 9, 0, 2, 1);
  R(c, "#ffd700", 10, 1, 1, 1);
  // Face
  R(c, "#f0c896", 6, 2, 4, 3);
  R(c, "#111111", 7, 3, 1, 1); // eye
  R(c, "#111111", 9, 3, 1, 1); // eye
  R(c, "#cccccc", 7, 4, 2, 1); // mustache
  R(c, "#daa870", 6, 4, 1, 1); // jaw
  // Flag pole
  R(c, "#8b6914", 2, 0, 1, 14);
  R(c, "#ffd700", 2, 0, 1, 1); // gold top
  // American flag (waving)
  R(c, "#cc0000", 3, 1, 4, 1); // red stripe
  R(c, "#ffffff", 3, 2, 4, 1); // white stripe
  R(c, "#cc0000", 3, 3, 4, 1); // red stripe
  R(c, "#ffffff", 3, 4, 4, 1); // white stripe
  R(c, "#cc0000", 3, 5, 4, 1); // red stripe
  R(c, "#000088", 3, 1, 2, 2); // blue canton
  R(c, "#ffffff", 3, 1, 1, 1); // star
  R(c, "#ffffff", 4, 2, 1, 1); // star
  // Dress uniform
  R(c, "#2a4a14", 5, 5, 6, 6);
  R(c, "#1a3a0a", 6, 6, 4, 4);
  // 5-star insignia
  R(c, "#ffd700", 6, 6, 1, 1);
  R(c, "#ffd700", 7, 5, 1, 1);
  R(c, "#ffd700", 8, 5, 1, 1);
  R(c, "#ffd700", 9, 6, 1, 1);
  R(c, "#ffd700", 8, 7, 1, 1);
  // Gold eagle on chest
  R(c, "#ffd700", 7, 8, 2, 2);
  // Pants & polished boots
  R(c, "#2a4a14", 6, 11, 2, 2);
  R(c, "#2a4a14", 8, 11, 2, 2);
  R(c, "#111111", 6, 13, 2, 2);
  R(c, "#111111", 8, 13, 2, 2);
}

// ============================================================
// ARAB WARRIOR SPRITES (16x16)
// ============================================================

function drawArabPawn(c) {
  // Keffiyeh (head covering)
  R(c, "#f0e6d0", 5, 0, 6, 4);
  R(c, "#e0d0b8", 6, 0, 4, 1);
  R(c, "#cc2222", 5, 1, 6, 1); // red agal band
  R(c, "#f0e6d0", 5, 2, 6, 2);
  R(c, "#e0d0b8", 4, 2, 1, 2); // draping side
  R(c, "#e0d0b8", 11, 2, 1, 2);
  // Face
  R(c, "#d4a06a", 6, 4, 4, 2);
  R(c, "#111111", 7, 4, 1, 1); // eye
  R(c, "#111111", 9, 4, 1, 1); // eye
  R(c, "#1a1a1a", 6, 5, 4, 1); // beard
  R(c, "#111111", 7, 5, 2, 1); // thick beard
  // White thobe robe
  R(c, "#f0e6d0", 5, 6, 6, 5);
  R(c, "#e0d0b8", 6, 7, 4, 3);
  R(c, "#d0c0a8", 5, 10, 6, 1); // hem shadow
  // AK-47
  R(c, "#8b6914", 12, 3, 1, 7); // wooden body
  R(c, "#333333", 12, 2, 1, 2); // barrel
  R(c, "#222222", 13, 4, 1, 4); // magazine
  R(c, "#555555", 12, 1, 1, 1); // muzzle
  // Ammo belt
  R(c, "#8b6914", 4, 7, 1, 3);
  R(c, "#ffd700", 4, 8, 1, 1);
  // Sandals
  R(c, "#8b6914", 6, 11, 2, 3);
  R(c, "#8b6914", 8, 11, 2, 3);
  R(c, "#6b4410", 6, 14, 2, 1);
  R(c, "#6b4410", 8, 14, 2, 1);
}

function drawArabRook(c) {
  // War Camel with armored rider
  // Camel head and neck
  R(c, "#c9a84c", 2, 2, 3, 3);
  R(c, "#b89840", 1, 3, 2, 2);
  R(c, "#111111", 2, 3, 1, 1); // eye
  R(c, "#d4b860", 1, 4, 1, 1); // nostril area
  R(c, "#c9a84c", 3, 0, 2, 3); // neck
  // Camel body
  R(c, "#c9a84c", 4, 4, 8, 4);
  R(c, "#b89840", 5, 5, 6, 2);
  // Hump
  R(c, "#d4b860", 6, 2, 4, 3);
  R(c, "#c9a84c", 7, 3, 2, 1);
  // Rider on top
  R(c, "#f0e6d0", 8, 0, 3, 2); // keffiyeh
  R(c, "#cc2222", 9, 0, 1, 1); // agal
  R(c, "#d4a06a", 9, 2, 1, 1); // face
  R(c, "#f0e6d0", 8, 3, 3, 2); // robe
  // Rider's spear
  R(c, "#8b6914", 12, 0, 1, 6);
  R(c, "#c0c0c0", 12, 0, 1, 1); // spear tip
  // Saddle blanket
  R(c, "#cc2222", 5, 3, 5, 1);
  R(c, "#ffd700", 7, 3, 1, 1); // gold trim
  // Supply bags
  R(c, "#8b6914", 4, 5, 2, 2);
  R(c, "#a08040", 11, 5, 2, 2);
  // Camel legs
  R(c, "#c9a84c", 4, 8, 2, 5);
  R(c, "#c9a84c", 10, 8, 2, 5);
  R(c, "#b89840", 5, 9, 1, 3);
  R(c, "#b89840", 11, 9, 1, 3);
  // Hooves
  R(c, "#6b5030", 4, 13, 2, 2);
  R(c, "#6b5030", 10, 13, 2, 2);
}

function drawArabKnight(c) {
  // Arabian horseman with scimitar
  // Arabian horse head
  R(c, "#3a2a18", 2, 2, 4, 3);
  R(c, "#2a1a08", 1, 3, 2, 2);
  R(c, "#111111", 2, 3, 1, 1); // eye
  R(c, "#f0e6d0", 1, 4, 1, 1); // blaze
  // Bridle
  R(c, "#cc2222", 3, 4, 2, 1);
  R(c, "#ffd700", 4, 4, 1, 1); // gold bit
  // Horse body
  R(c, "#3a2a18", 4, 5, 8, 4);
  R(c, "#2a1a08", 5, 6, 6, 2);
  // Decorative saddle blanket
  R(c, "#cc2222", 6, 4, 5, 1);
  R(c, "#ffd700", 6, 5, 5, 1);
  R(c, "#cc2222", 6, 5, 1, 1);
  R(c, "#cc2222", 10, 5, 1, 1);
  // Rider
  R(c, "#f0e6d0", 8, 0, 4, 2); // keffiyeh
  R(c, "#cc2222", 9, 0, 2, 1); // agal
  R(c, "#d4a06a", 9, 2, 2, 1); // face
  R(c, "#111111", 9, 2, 1, 1); // eye
  R(c, "#f0e6d0", 8, 3, 4, 2); // robe
  // Raised scimitar
  R(c, "#e0e0e0", 13, 0, 1, 1); // tip
  R(c, "#c0c0c0", 13, 1, 1, 1);
  R(c, "#c0c0c0", 12, 2, 1, 1); // curved blade
  R(c, "#c0c0c0", 12, 3, 1, 1);
  R(c, "#ffd700", 12, 4, 1, 1); // hilt
  R(c, "#8b4513", 12, 5, 1, 1); // grip
  // Horse legs (galloping)
  R(c, "#3a2a18", 4, 9, 2, 5);
  R(c, "#3a2a18", 10, 9, 2, 4);
  R(c, "#3a2a18", 9, 10, 1, 4);
  // Hooves
  R(c, "#1a1a1a", 4, 14, 2, 1);
  R(c, "#1a1a1a", 9, 14, 2, 1);
  // Flowing tail
  R(c, "#1a1a1a", 12, 7, 2, 2);
  R(c, "#111111", 13, 8, 1, 1);
}

function drawArabBishop(c) {
  // Islamic Scholar / Imam
  // Grand turban
  R(c, "#ffffff", 5, 0, 6, 4);
  R(c, "#eeeeee", 6, 0, 4, 3);
  R(c, "#dddddd", 7, 1, 2, 1); // turban folds
  R(c, "#ffffff", 5, 0, 1, 3); // wrap left
  R(c, "#ffffff", 10, 0, 1, 3); // wrap right
  // Emerald jewel on turban
  R(c, "#00cc44", 7, 0, 2, 1);
  R(c, "#00ff55", 8, 0, 1, 1); // glint
  // Face
  R(c, "#d4a06a", 6, 4, 4, 3);
  R(c, "#111111", 7, 4, 1, 1); // eye
  R(c, "#111111", 9, 4, 1, 1); // eye
  // Long flowing beard
  R(c, "#222222", 6, 6, 4, 2);
  R(c, "#111111", 7, 6, 2, 2);
  R(c, "#222222", 7, 8, 2, 1); // beard tip
  // Green scholarly robe
  R(c, "#228b22", 4, 7, 8, 4);
  R(c, "#1a7a1a", 5, 8, 6, 2);
  R(c, "#ffd700", 4, 7, 8, 1); // gold trim collar
  R(c, "#ffd700", 4, 10, 8, 1); // gold trim hem
  // Quran / Holy book
  R(c, "#228b22", 12, 6, 2, 3);
  R(c, "#ffd700", 12, 6, 2, 1); // gold pages
  R(c, "#1a6b1a", 12, 7, 2, 1);
  R(c, "#f0e6d0", 13, 7, 1, 1); // page edge
  // Prayer beads in hand
  R(c, "#8b6914", 3, 8, 1, 3);
  R(c, "#ffd700", 3, 8, 1, 1);
  R(c, "#ffd700", 3, 10, 1, 1);
  // Sandals
  R(c, "#8b6914", 5, 11, 2, 3);
  R(c, "#8b6914", 9, 11, 2, 3);
  R(c, "#6b4410", 5, 14, 2, 1);
  R(c, "#6b4410", 9, 14, 2, 1);
}

function drawArabQueen(c) {
  // Desert Queen / Warrior Princess
  // Ornate golden crown headdress
  R(c, "#ffd700", 4, 0, 8, 2);
  R(c, "#ffaa00", 5, 0, 6, 1);
  R(c, "#ff0000", 7, 0, 2, 1); // central ruby
  R(c, "#00cc44", 5, 0, 1, 1); // emerald
  R(c, "#00cc44", 10, 0, 1, 1); // emerald
  R(c, "#ffd700", 4, 0, 1, 2); // crown points
  R(c, "#ffd700", 11, 0, 1, 2);
  // Purple silk veil
  R(c, "#9933cc", 4, 2, 8, 3);
  R(c, "#7722aa", 5, 3, 6, 1);
  R(c, "#aa44dd", 4, 2, 1, 2); // veil drape
  R(c, "#aa44dd", 11, 2, 1, 2);
  // Fierce eyes visible through veil
  R(c, "#d4a06a", 6, 3, 4, 1);
  R(c, "#111111", 7, 3, 1, 1); // eye
  R(c, "#111111", 9, 3, 1, 1); // eye
  R(c, "#000000", 6, 3, 1, 1); // kohl liner
  R(c, "#000000", 10, 3, 1, 1);
  // Royal purple robe
  R(c, "#9933cc", 4, 5, 8, 6);
  R(c, "#7722aa", 5, 6, 6, 4);
  // Gold ornamental trim
  R(c, "#ffd700", 4, 5, 8, 1); // collar
  R(c, "#ffd700", 4, 10, 8, 1); // hem
  R(c, "#ffd700", 7, 6, 2, 3); // center embroidery
  // Twin curved daggers
  R(c, "#e0e0e0", 2, 5, 1, 4); // left blade
  R(c, "#c0c0c0", 2, 5, 1, 1);
  R(c, "#ffd700", 2, 9, 1, 1); // left hilt
  R(c, "#e0e0e0", 13, 5, 1, 4); // right blade
  R(c, "#c0c0c0", 13, 5, 1, 1);
  R(c, "#ffd700", 13, 9, 1, 1); // right hilt
  // Golden slippers
  R(c, "#ffd700", 5, 11, 2, 3);
  R(c, "#ffd700", 9, 11, 2, 3);
  R(c, "#cc9900", 5, 14, 2, 1);
  R(c, "#cc9900", 9, 14, 2, 1);
}

function drawArabKing(c) {
  // Grand Sultan / Sheikh
  // Magnificent turban
  R(c, "#ffffff", 4, 0, 8, 4);
  R(c, "#eeeeee", 5, 0, 6, 3);
  R(c, "#dddddd", 6, 1, 4, 1); // turban wraps
  R(c, "#ffffff", 4, 0, 1, 3);
  R(c, "#ffffff", 11, 0, 1, 3);
  // Gold band on turban
  R(c, "#ffd700", 5, 1, 6, 1);
  // Giant ruby center
  R(c, "#ff0000", 7, 0, 2, 1);
  R(c, "#ff4444", 8, 0, 1, 1); // ruby glint
  // Sapphires on sides
  R(c, "#0088ff", 5, 0, 1, 1);
  R(c, "#0088ff", 10, 0, 1, 1);
  // Peacock feather
  R(c, "#00aa44", 8, 0, 1, 1);
  // Face
  R(c, "#d4a06a", 6, 4, 4, 3);
  R(c, "#111111", 7, 4, 1, 1); // eye
  R(c, "#111111", 9, 4, 1, 1); // eye
  // Royal beard
  R(c, "#111111", 6, 6, 4, 1);
  R(c, "#222222", 7, 7, 2, 1);
  R(c, "#222222", 7, 8, 2, 1); // long beard
  // Royal burgundy robe
  R(c, "#880022", 4, 7, 8, 4);
  R(c, "#660018", 5, 8, 6, 2);
  // Gold embroidery
  R(c, "#ffd700", 4, 7, 8, 1); // gold collar
  R(c, "#ffd700", 7, 8, 2, 2); // central motif
  R(c, "#ffd700", 4, 10, 8, 1); // gold hem
  // Royal scepter
  R(c, "#ffd700", 13, 2, 1, 9);
  R(c, "#ffd700", 12, 2, 3, 1); // top bar
  R(c, "#ff0000", 13, 1, 1, 1); // ruby top
  R(c, "#ffd700", 12, 3, 1, 1); // ornament
  R(c, "#ffd700", 14, 3, 1, 1);
  // Golden slippers
  R(c, "#ffd700", 5, 11, 2, 3);
  R(c, "#ffd700", 9, 11, 2, 3);
  R(c, "#cc9900", 5, 14, 2, 1);
  R(c, "#cc9900", 9, 14, 2, 1);
}

// ============================================================
// NINJA SPRITES (16x16)
// ============================================================

function drawNinjaPawn(c) {
  // Shadow Genin - stealthy foot soldier with shuriken
  // Black hood/mask - wrapped tight
  R(c, "#0d0d0d", 5, 0, 6, 2);   // top of hood
  R(c, "#1a1a1a", 4, 2, 8, 3);   // full head wrap
  R(c, "#141414", 5, 2, 6, 2);    // inner shadow
  // Glowing red eyes peering through mask slit
  R(c, "#2a2a2a", 5, 3, 6, 1);   // mask slit
  R(c, "#ff0033", 6, 3, 1, 1);    // left eye glow
  R(c, "#ff0033", 9, 3, 1, 1);    // right eye glow
  R(c, "#cc0022", 7, 3, 1, 1);    // eye reflection L
  R(c, "#cc0022", 8, 3, 1, 1);    // eye reflection R
  // Body - dark gi with purple trim
  R(c, "#0d0d0d", 4, 5, 8, 5);   // torso
  R(c, "#1a1a1a", 5, 5, 6, 4);   // inner gi
  R(c, "#3a1a5e", 4, 5, 1, 5);   // left purple trim
  R(c, "#3a1a5e", 11, 5, 1, 5);  // right purple trim
  R(c, "#2d1450", 6, 6, 4, 1);   // belt/obi
  // Shuriken in right hand
  R(c, "#d0d0d0", 12, 5, 1, 1);  // star center
  R(c, "#b0b0b0", 11, 4, 1, 1);  // star point top-left
  R(c, "#b0b0b0", 13, 4, 1, 1);  // star point top-right
  R(c, "#b0b0b0", 11, 6, 1, 1);  // star point bottom-left
  R(c, "#b0b0b0", 13, 6, 1, 1);  // star point bottom-right
  // Arms
  R(c, "#0d0d0d", 3, 6, 1, 3);   // left arm
  R(c, "#0d0d0d", 12, 6, 1, 3);  // right arm
  // Leg wraps - tapered stance
  R(c, "#0d0d0d", 5, 10, 2, 4);  // left leg
  R(c, "#0d0d0d", 9, 10, 2, 4);  // right leg
  R(c, "#1a1a1a", 5, 11, 1, 2);  // left leg wrap
  R(c, "#1a1a1a", 10, 11, 1, 2); // right leg wrap
  // Tabi boots
  R(c, "#222222", 5, 14, 2, 2);  // left boot
  R(c, "#222222", 9, 14, 2, 2);  // right boot
}

function drawNinjaRook(c) {
  // Shadow Pagoda - dark Japanese fortress
  // Curved top roof (3-tiered pagoda)
  R(c, "#1a0a2e", 3, 0, 10, 1);  // top roof overhang
  R(c, "#2d1450", 4, 0, 8, 1);   // roof accent
  R(c, "#0d0d0d", 5, 1, 6, 1);   // upper roof shadow
  // Shachihoko ornament on top
  R(c, "#ffd700", 7, 0, 2, 1);   // gold ornament
  // Upper floor
  R(c, "#1a1a1a", 4, 2, 8, 2);   // dark walls
  R(c, "#ff0033", 6, 2, 1, 1);   // left lantern glow
  R(c, "#ff0033", 9, 2, 1, 1);   // right lantern glow
  R(c, "#2a2a2a", 5, 3, 6, 1);   // upper window strip
  // Middle roof
  R(c, "#1a0a2e", 2, 4, 12, 1);  // wide mid-roof
  R(c, "#2d1450", 3, 4, 10, 1);  // roof purple accent
  // Middle floor
  R(c, "#1a1a1a", 3, 5, 10, 2);  // dark walls
  R(c, "#2a2a2a", 4, 5, 8, 1);   // wall detail
  R(c, "#ff0033", 5, 6, 1, 1);   // lantern left
  R(c, "#ff0033", 10, 6, 1, 1);  // lantern right
  R(c, "#0d0d0d", 6, 5, 4, 2);   // center shadow window
  // Lower roof
  R(c, "#1a0a2e", 1, 7, 14, 1);  // widest roof
  R(c, "#2d1450", 2, 7, 12, 1);  // roof accent
  // Ground floor - heavy stone base
  R(c, "#1a1a1a", 2, 8, 12, 4);  // walls
  R(c, "#2a2a2a", 3, 8, 10, 3);  // inner wall
  R(c, "#0d0d0d", 6, 9, 4, 3);   // dark doorway
  R(c, "#3a1a5e", 7, 9, 2, 2);   // purple inner glow
  // Stone foundation
  R(c, "#333333", 2, 12, 12, 2); // stone base
  R(c, "#444444", 3, 12, 10, 1); // base highlight
  R(c, "#222222", 2, 14, 12, 2); // foundation
}

function drawNinjaKnight(c) {
  // Shadow Stallion - spectral black horse with ninja rider
  // Ninja rider head
  R(c, "#0d0d0d", 8, 0, 4, 3);  // hood
  R(c, "#1a1a1a", 9, 1, 2, 1);  // inner hood
  R(c, "#ff0033", 9, 1, 1, 1);  // left eye glow
  R(c, "#ff0033", 10, 1, 1, 1); // right eye glow
  // Rider body on horseback
  R(c, "#0d0d0d", 8, 3, 4, 3);  // rider torso
  R(c, "#3a1a5e", 9, 3, 2, 1);  // purple collar
  // Kusarigama weapon extended
  R(c, "#d0d0d0", 12, 1, 1, 3); // chain sickle blade
  R(c, "#b0b0b0", 13, 2, 1, 1); // blade tip
  R(c, "#888888", 12, 4, 1, 2); // chain links
  // Horse head - ghostly
  R(c, "#1a1a1a", 2, 3, 4, 3);  // head shape
  R(c, "#0d0d0d", 1, 4, 2, 2);  // muzzle
  R(c, "#2a2a2a", 3, 3, 2, 2);  // face detail
  R(c, "#ff0033", 3, 4, 1, 1);  // red eye
  // Ear
  R(c, "#1a1a1a", 3, 2, 1, 1);  // ear
  // Horse mane - purple tinted
  R(c, "#3a1a5e", 5, 2, 1, 3);  // mane
  R(c, "#2d1450", 6, 3, 1, 2);  // mane shadow
  // Horse body
  R(c, "#1a1a1a", 4, 6, 8, 4);  // main body
  R(c, "#2a2a2a", 5, 7, 6, 2);  // body highlight
  R(c, "#0d0d0d", 4, 8, 2, 2);  // chest shadow
  // Spectral wisps under horse
  R(c, "#3a1a5e", 3, 9, 1, 1);  // purple wisp
  R(c, "#2d1450", 12, 8, 1, 1); // purple wisp
  // Horse legs - in gallop pose
  R(c, "#1a1a1a", 4, 10, 2, 4); // front left leg
  R(c, "#1a1a1a", 6, 10, 2, 3); // front right (raised)
  R(c, "#1a1a1a", 9, 10, 2, 4); // back left leg
  R(c, "#1a1a1a", 11, 10, 2, 3);// back right (raised)
  // Hooves
  R(c, "#333333", 4, 14, 2, 2); // front hoof
  R(c, "#333333", 9, 14, 2, 2); // back hoof
  // Smoke/shadow trail
  R(c, "#2a2a2a", 13, 10, 2, 1);// shadow trail
  R(c, "#1a1a1a", 14, 11, 1, 1);// wisp
}

function drawNinjaBishop(c) {
  // Shadow Monk - mystic ninja with dark arts scroll
  // Conical straw hat (amigasa) - deep purple
  R(c, "#2d1450", 3, 0, 10, 1); // hat brim wide
  R(c, "#3a1a5e", 4, 0, 8, 1);  // hat highlight
  R(c, "#1a0a2e", 5, 1, 6, 1);  // hat mid
  R(c, "#2d1450", 6, 1, 4, 1);  // hat accent
  // Face behind veil
  R(c, "#0d0d0d", 5, 2, 6, 3);  // dark mask
  R(c, "#1a1a1a", 6, 2, 4, 2);  // inner
  // Glowing mystic eyes - bright green
  R(c, "#00ff66", 6, 3, 1, 1);  // left eye
  R(c, "#00ff66", 9, 3, 1, 1);  // right eye
  R(c, "#00cc44", 7, 3, 1, 1);  // eye glow spread
  R(c, "#00cc44", 8, 3, 1, 1);  // eye glow spread
  // Monk robes - flowing dark with mystic symbols
  R(c, "#0d0d0d", 3, 5, 10, 7); // outer robe
  R(c, "#1a1a1a", 4, 5, 8, 6);  // inner robe
  R(c, "#2a2a2a", 5, 6, 6, 4);  // robe folds
  // Mystic kanji symbol on chest
  R(c, "#00ff66", 6, 6, 1, 2);  // kanji stroke 1
  R(c, "#00ff66", 7, 7, 2, 1);  // kanji stroke 2
  R(c, "#00ff66", 9, 6, 1, 2);  // kanji stroke 3
  // Enchanted scroll in left hand
  R(c, "#f5f5dc", 2, 5, 1, 4);  // scroll shaft
  R(c, "#e8d8a0", 2, 4, 1, 1);  // scroll top
  R(c, "#e8d8a0", 2, 9, 1, 1);  // scroll bottom
  R(c, "#00ff66", 2, 6, 1, 1);  // glowing text
  R(c, "#00ff66", 2, 8, 1, 1);  // glowing text
  // Spirit orb in right hand
  R(c, "#00ff66", 13, 6, 2, 2); // orb glow
  R(c, "#88ffaa", 13, 6, 1, 1); // orb highlight
  // Arms
  R(c, "#0d0d0d", 2, 6, 1, 3);  // left arm
  R(c, "#0d0d0d", 13, 7, 1, 2); // right arm
  // Robe bottom hem
  R(c, "#3a1a5e", 3, 11, 10, 1);// purple hem
  // Legs hidden in robe, sandals peek
  R(c, "#0d0d0d", 5, 12, 2, 2); // left robe
  R(c, "#0d0d0d", 9, 12, 2, 2); // right robe
  R(c, "#4a3520", 5, 14, 2, 2); // left sandal
  R(c, "#4a3520", 9, 14, 2, 2); // right sandal
}

function drawNinjaQueen(c) {
  // Kunoichi Grandmaster - deadly female ninja assassin
  // Long dark hair flowing back
  R(c, "#0d0d0d", 4, 0, 8, 2);  // hair top
  R(c, "#1a1a1a", 3, 1, 2, 4);  // hair left flowing
  R(c, "#1a1a1a", 11, 1, 2, 4); // hair right flowing
  R(c, "#0d0d0d", 13, 3, 1, 3); // hair trail right
  // Face - half-mask with visible eye
  R(c, "#0d0d0d", 5, 2, 6, 3);  // head
  R(c, "#ffe0bd", 6, 2, 4, 2);  // visible face
  R(c, "#0d0d0d", 6, 3, 4, 1);  // lower mask
  R(c, "#cc0044", 7, 2, 1, 1);  // left eye (crimson)
  R(c, "#cc0044", 8, 2, 1, 1);  // right eye (crimson)
  // Ornamental hairpin
  R(c, "#ffd700", 5, 0, 1, 1);  // gold hairpin
  R(c, "#ff0033", 4, 0, 1, 1);  // red ornament
  // Body - sleek battle kunoichi outfit
  R(c, "#0d0d0d", 4, 5, 8, 6);  // torso armor
  R(c, "#1a1a1a", 5, 5, 6, 5);  // inner armor
  R(c, "#cc0044", 6, 5, 4, 1);  // crimson collar
  R(c, "#cc0044", 6, 7, 4, 1);  // crimson sash/obi
  R(c, "#3a1a5e", 5, 6, 1, 1);  // left trim
  R(c, "#3a1a5e", 10, 6, 1, 1); // right trim
  // Twin wakizashi blades - crossed
  R(c, "#d0d0d0", 2, 3, 1, 6);  // left blade
  R(c, "#e8e8e8", 2, 3, 1, 1);  // blade tip L
  R(c, "#8b4513", 2, 8, 1, 1);  // hilt L
  R(c, "#ffd700", 2, 9, 1, 1);  // pommel L
  R(c, "#d0d0d0", 13, 3, 1, 6); // right blade
  R(c, "#e8e8e8", 13, 3, 1, 1); // blade tip R
  R(c, "#8b4513", 13, 8, 1, 1); // hilt R
  R(c, "#ffd700", 13, 9, 1, 1); // pommel R
  // Arms extended
  R(c, "#0d0d0d", 3, 6, 1, 3);  // left arm
  R(c, "#0d0d0d", 12, 6, 1, 3); // right arm
  // Legs - battle stance
  R(c, "#0d0d0d", 5, 11, 2, 3); // left leg
  R(c, "#0d0d0d", 9, 11, 2, 3); // right leg
  R(c, "#cc0044", 5, 11, 2, 1); // red leg wrap L
  R(c, "#cc0044", 9, 11, 2, 1); // red leg wrap R
  // Tabi boots
  R(c, "#222222", 5, 14, 2, 2); // left boot
  R(c, "#222222", 9, 14, 2, 2); // right boot
}

function drawNinjaKing(c) {
  // Shadow Shogun - demonic oni-masked warlord
  // Oni mask with horns - terrifying demon face
  R(c, "#0d0d0d", 3, 0, 1, 2);  // left horn base
  R(c, "#1a0a2e", 2, 0, 1, 1);  // left horn tip
  R(c, "#0d0d0d", 12, 0, 1, 2); // right horn base
  R(c, "#1a0a2e", 13, 0, 1, 1); // right horn tip
  // Oni mask
  R(c, "#8b0000", 4, 0, 8, 4);  // red demon mask
  R(c, "#cc0000", 5, 1, 6, 2);  // mask face
  R(c, "#ff0000", 6, 1, 4, 1);  // mask highlight
  // Burning yellow eyes
  R(c, "#ffff00", 5, 1, 2, 1);  // left eye blaze
  R(c, "#ffff00", 9, 1, 2, 1);  // right eye blaze
  R(c, "#ffaa00", 6, 2, 1, 1);  // left eye lower
  R(c, "#ffaa00", 9, 2, 1, 1);  // right eye lower
  // Fanged mouth
  R(c, "#ffffff", 6, 3, 1, 1);  // left fang
  R(c, "#ffffff", 9, 3, 1, 1);  // right fang
  R(c, "#440000", 7, 3, 2, 1);  // mouth darkness
  // Shogun helmet crest
  R(c, "#ffd700", 7, 0, 2, 1);  // gold crest
  // Heavy shadow armor
  R(c, "#0d0d0d", 3, 4, 10, 7); // outer armor
  R(c, "#1a1a1a", 4, 4, 8, 6);  // inner armor
  R(c, "#2a2a2a", 5, 5, 6, 4);  // armor detail
  // Glowing demon kanji on chest
  R(c, "#ff0033", 6, 5, 1, 3);  // kanji stroke 1
  R(c, "#ff0033", 7, 6, 2, 1);  // kanji stroke 2
  R(c, "#ff0033", 9, 5, 1, 3);  // kanji stroke 3
  // Spiked shoulder pauldrons
  R(c, "#333333", 3, 4, 1, 2);  // left pauldron
  R(c, "#444444", 2, 4, 1, 1);  // left spike
  R(c, "#333333", 12, 4, 1, 2); // right pauldron
  R(c, "#444444", 13, 4, 1, 1); // right spike
  // Shadow Nodachi (great sword) on back
  R(c, "#d0d0d0", 14, 0, 1, 10);// blade
  R(c, "#e8e8e8", 14, 0, 1, 2); // blade edge
  R(c, "#ffd700", 14, 9, 1, 1); // tsuba (guard)
  R(c, "#5c3a1e", 14, 10, 1, 3);// handle wrap
  // Dark energy / shadow aura
  R(c, "#3a1a5e", 2, 7, 1, 2);  // left aura
  R(c, "#2d1450", 1, 8, 1, 1);  // left wisp
  R(c, "#3a1a5e", 13, 7, 1, 2); // right aura
  R(c, "#2d1450", 14, 8, 1, 1); // right wisp (below sword)
  // Armored legs
  R(c, "#0d0d0d", 5, 11, 2, 3); // left leg
  R(c, "#0d0d0d", 9, 11, 2, 3); // right leg
  R(c, "#333333", 5, 12, 2, 1); // left shin guard
  R(c, "#333333", 9, 12, 2, 1); // right shin guard
  // Armored boots
  R(c, "#222222", 5, 14, 2, 2); // left boot
  R(c, "#222222", 9, 14, 2, 2); // right boot
}

// ============================================================
// CRUSADER/KNIGHT SPRITES (16x16)
// ============================================================

function drawCrusaderPawn(c) {
  // Templar foot soldier
  // Chain mail coif (hood)
  R(c, "#999999", 5, 0, 6, 3);
  R(c, "#aaaaaa", 6, 0, 4, 2);
  R(c, "#888888", 5, 2, 6, 1);
  R(c, "#777777", 4, 2, 1, 1); // coif drape
  R(c, "#777777", 11, 2, 1, 1);
  // Face
  R(c, "#f0c896", 6, 3, 4, 2);
  R(c, "#111111", 7, 3, 1, 1); // eye
  R(c, "#111111", 9, 3, 1, 1); // eye
  R(c, "#daa870", 7, 4, 2, 1); // mouth shadow
  // White tabard with red Templar cross
  R(c, "#eeeeee", 4, 5, 8, 6);
  R(c, "#dddddd", 5, 6, 6, 4);
  R(c, "#dd0000", 7, 5, 2, 6); // vertical cross
  R(c, "#dd0000", 5, 7, 6, 1); // horizontal cross
  // Chain mail sleeves
  R(c, "#999999", 3, 5, 1, 4);
  R(c, "#888888", 3, 7, 1, 2);
  R(c, "#999999", 12, 5, 1, 4);
  R(c, "#888888", 12, 7, 1, 2);
  // Sword at side
  R(c, "#d0d0d0", 13, 2, 1, 8); // blade
  R(c, "#e0e0e0", 13, 2, 1, 1); // tip
  R(c, "#ffd700", 13, 6, 1, 1); // crossguard
  R(c, "#ffd700", 14, 6, 1, 1);
  R(c, "#8b6914", 13, 7, 1, 2); // grip
  // Chain mail legs
  R(c, "#999999", 5, 11, 2, 2);
  R(c, "#999999", 9, 11, 2, 2);
  // Boots
  R(c, "#555555", 5, 13, 2, 2);
  R(c, "#555555", 9, 13, 2, 2);
}

function drawCrusaderRook(c) {
  // Crusader castle / fortified tower
  // Banner on top
  R(c, "#eeeeee", 6, 0, 4, 2);
  R(c, "#dd0000", 7, 0, 2, 2); // red cross on banner
  // Crenellations (battlements)
  R(c, "#aaaaaa", 2, 2, 2, 2);
  R(c, "#aaaaaa", 6, 2, 4, 1);
  R(c, "#aaaaaa", 12, 2, 2, 2);
  R(c, "#bbbbbb", 2, 3, 12, 1);
  // Tower body (stone blocks)
  R(c, "#cccccc", 3, 4, 10, 7);
  R(c, "#bbbbbb", 4, 4, 8, 1);
  R(c, "#aaaaaa", 3, 6, 10, 1); // stone line
  R(c, "#aaaaaa", 3, 9, 10, 1); // stone line
  // Red cross on tower
  R(c, "#dd0000", 7, 5, 2, 4);
  R(c, "#dd0000", 6, 6, 4, 2);
  // Arrow slits
  R(c, "#222222", 4, 5, 1, 2);
  R(c, "#222222", 11, 5, 1, 2);
  // Gate/entrance
  R(c, "#555555", 7, 9, 2, 2);
  R(c, "#444444", 7, 9, 2, 1);
  // Base (stone foundation)
  R(c, "#999999", 2, 11, 12, 2);
  R(c, "#888888", 3, 12, 10, 1);
  R(c, "#777777", 2, 13, 12, 2);
}

function drawCrusaderKnight(c) {
  // Mounted Templar knight with lance
  // White horse head
  R(c, "#dddddd", 2, 3, 4, 3);
  R(c, "#cccccc", 1, 4, 2, 2);
  R(c, "#111111", 2, 4, 1, 1); // eye
  R(c, "#aaaaaa", 1, 5, 1, 1); // nostril
  // Bridle
  R(c, "#dd0000", 3, 5, 2, 1);
  // Horse armor barding (white with red cross)
  R(c, "#dddddd", 5, 6, 7, 4);
  R(c, "#cccccc", 6, 7, 5, 2);
  R(c, "#dd0000", 7, 6, 2, 3); // cross on barding
  R(c, "#dd0000", 6, 7, 4, 1);
  // Knight rider in helm
  R(c, "#aaaaaa", 8, 0, 4, 3); // great helm
  R(c, "#bbbbbb", 9, 0, 2, 2);
  R(c, "#222222", 9, 1, 2, 1); // visor slit
  R(c, "#999999", 8, 3, 4, 3); // armor body
  R(c, "#dd0000", 9, 4, 2, 1); // cross on chest
  // Lance with pennant
  R(c, "#8b6914", 1, 0, 1, 8); // wooden shaft
  R(c, "#d0d0d0", 1, 0, 1, 2); // steel tip
  R(c, "#dd0000", 2, 2, 1, 2); // red pennant
  R(c, "#eeeeee", 2, 3, 1, 1);
  // Horse legs (galloping)
  R(c, "#dddddd", 5, 10, 2, 4);
  R(c, "#dddddd", 10, 10, 2, 4);
  // Hooves
  R(c, "#888888", 5, 14, 2, 1);
  R(c, "#888888", 10, 14, 2, 1);
}

function drawCrusaderBishop(c) {
  // Templar chaplain / priest
  // Mitre bishop hat
  R(c, "#ffffff", 6, 0, 4, 2);
  R(c, "#eeeeee", 7, 0, 2, 1);
  R(c, "#ffd700", 7, 0, 2, 1); // gold top
  R(c, "#ffffff", 5, 2, 6, 2);
  R(c, "#ffd700", 5, 2, 6, 1); // gold band
  R(c, "#dd0000", 7, 1, 2, 1); // cross on mitre
  // Face
  R(c, "#f0c896", 6, 4, 4, 2);
  R(c, "#111111", 7, 4, 1, 1); // eye
  R(c, "#111111", 9, 4, 1, 1); // eye
  // White robe with red cross
  R(c, "#eeeeee", 4, 6, 8, 5);
  R(c, "#dddddd", 5, 7, 6, 3);
  R(c, "#dd0000", 7, 6, 2, 5); // vertical cross
  R(c, "#dd0000", 5, 8, 6, 1); // horizontal cross
  // Golden crozier (bishop staff)
  R(c, "#ffd700", 13, 1, 1, 10);
  R(c, "#ffd700", 12, 1, 2, 1); // crook top
  R(c, "#ffd700", 12, 2, 1, 1); // crook curve
  R(c, "#ffaa00", 13, 3, 1, 1); // ornament
  // Holy book in hand
  R(c, "#8b4513", 3, 7, 2, 2);
  R(c, "#ffd700", 3, 7, 2, 1); // gold edges
  // Sandals
  R(c, "#8b6914", 5, 11, 2, 3);
  R(c, "#8b6914", 9, 11, 2, 3);
  R(c, "#6b4410", 5, 14, 2, 1);
  R(c, "#6b4410", 9, 14, 2, 1);
}

function drawCrusaderQueen(c) {
  // Templar Grand Master
  // Great helm with red plume
  R(c, "#dd0000", 3, 0, 2, 3); // red plume
  R(c, "#bb0000", 3, 0, 1, 2);
  R(c, "#bbbbbb", 5, 0, 6, 5); // great helm
  R(c, "#cccccc", 6, 1, 4, 3);
  R(c, "#222222", 6, 2, 4, 1); // visor slit
  R(c, "#dddddd", 6, 0, 4, 1); // helm top
  R(c, "#ffd700", 7, 0, 2, 1); // gold crown on helm
  // Plate armor body
  R(c, "#bbbbbb", 4, 5, 8, 5);
  R(c, "#aaaaaa", 5, 6, 6, 3);
  R(c, "#cccccc", 4, 5, 2, 1); // pauldron left
  R(c, "#cccccc", 10, 5, 2, 1); // pauldron right
  // Red Templar cross on chest
  R(c, "#dd0000", 7, 5, 2, 4);
  R(c, "#dd0000", 5, 7, 6, 1);
  // Dual longswords
  R(c, "#d0d0d0", 2, 2, 1, 8); // left blade
  R(c, "#e0e0e0", 2, 2, 1, 1);
  R(c, "#ffd700", 2, 5, 1, 1); // crossguard
  R(c, "#d0d0d0", 13, 2, 1, 8); // right blade
  R(c, "#e0e0e0", 13, 2, 1, 1);
  R(c, "#ffd700", 13, 5, 1, 1);
  // Armored legs
  R(c, "#999999", 5, 10, 2, 3);
  R(c, "#999999", 9, 10, 2, 3);
  // Sabatons (foot armor)
  R(c, "#777777", 5, 13, 2, 2);
  R(c, "#777777", 9, 13, 2, 2);
}

function drawCrusaderKing(c) {
  // Crusader King - crowned helm, royal cape
  // Golden crown on great helm
  R(c, "#ffd700", 4, 0, 8, 2);
  R(c, "#ffaa00", 5, 0, 6, 1);
  R(c, "#ff0000", 7, 0, 2, 1); // central ruby
  R(c, "#00aaff", 5, 0, 1, 1); // sapphire
  R(c, "#00aaff", 10, 0, 1, 1);
  R(c, "#ffd700", 4, 0, 1, 2); // crown point
  R(c, "#ffd700", 11, 0, 1, 2);
  // Great helm
  R(c, "#bbbbbb", 5, 2, 6, 4);
  R(c, "#cccccc", 6, 2, 4, 3);
  R(c, "#222222", 6, 3, 4, 1); // visor slit
  R(c, "#ffd700", 6, 4, 4, 1); // gold trim
  // Royal burgundy cape
  R(c, "#990022", 3, 4, 2, 8);
  R(c, "#770018", 3, 5, 1, 6);
  R(c, "#990022", 11, 4, 2, 8);
  R(c, "#770018", 12, 5, 1, 6);
  // Gold cape trim
  R(c, "#ffd700", 3, 4, 2, 1);
  R(c, "#ffd700", 11, 4, 2, 1);
  R(c, "#ffd700", 3, 11, 2, 1);
  R(c, "#ffd700", 11, 11, 2, 1);
  // Armor body
  R(c, "#bbbbbb", 5, 6, 6, 5);
  R(c, "#aaaaaa", 6, 7, 4, 3);
  R(c, "#cccccc", 5, 6, 1, 1); // highlight
  // Golden Templar cross on chest
  R(c, "#ffd700", 7, 6, 2, 4);
  R(c, "#ffd700", 6, 8, 4, 1);
  // Royal scepter
  R(c, "#ffd700", 14, 1, 1, 10);
  R(c, "#ffd700", 13, 1, 2, 1); // cross top
  R(c, "#ff0000", 14, 0, 1, 1); // ruby
  // Armored legs
  R(c, "#999999", 6, 11, 2, 3);
  R(c, "#999999", 8, 11, 2, 3);
  R(c, "#777777", 6, 14, 2, 1);
  R(c, "#777777", 8, 14, 2, 1);
}

// ============================================================
// SPRITE GENERATION FUNCTIONS
// ============================================================

function generateSprite(drawFn) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 16;
  const ctx = canvas.getContext("2d");
  drawFn(ctx);
  return canvas;
}

// Map theme pieces to draw functions
const SPRITE_FUNCTIONS = {
  classic_white: {
    pawn: drawClassicWhitePawn,
    rook: drawClassicWhiteRook,
    knight: drawClassicWhiteKnight,
    bishop: drawClassicWhiteBishop,
    queen: drawClassicWhiteQueen,
    king: drawClassicWhiteKing
  },
  classic_black: {
    pawn: drawClassicBlackPawn,
    rook: drawClassicBlackRook,
    knight: drawClassicBlackKnight,
    bishop: drawClassicBlackBishop,
    queen: drawClassicBlackQueen,
    king: drawClassicBlackKing
  },
  american: {
    pawn: drawAmericanPawn,
    rook: drawAmericanRook,
    knight: drawAmericanKnight,
    bishop: drawAmericanBishop,
    queen: drawAmericanQueen,
    king: drawAmericanKing
  },
  arab: {
    pawn: drawArabPawn,
    rook: drawArabRook,
    knight: drawArabKnight,
    bishop: drawArabBishop,
    queen: drawArabQueen,
    king: drawArabKing
  },
  ninja: {
    pawn: drawNinjaPawn,
    rook: drawNinjaRook,
    knight: drawNinjaKnight,
    bishop: drawNinjaBishop,
    queen: drawNinjaQueen,
    king: drawNinjaKing
  },
  knights: {
    pawn: drawCrusaderPawn,
    rook: drawCrusaderRook,
    knight: drawCrusaderKnight,
    bishop: drawCrusaderBishop,
    queen: drawCrusaderQueen,
    king: drawCrusaderKing
  }
};

// Generate all sprites for a theme
function generateThemeSprites(themeKey) {
  const functions = SPRITE_FUNCTIONS[themeKey];
  if (!functions) return null;

  const sprites = {};
  for (const [piece, drawFn] of Object.entries(functions)) {
    sprites[piece] = generateSprite(drawFn);
  }
  return sprites;
}

// Export for use in game.js
if (typeof window !== 'undefined') {
  window.CHESS_THEMES = CHESS_THEMES;
  window.SPRITE_FUNCTIONS = SPRITE_FUNCTIONS;
  window.generateThemeSprites = generateThemeSprites;
  window.generateSprite = generateSprite;
}
