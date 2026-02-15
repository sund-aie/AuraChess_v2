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
  // Base
  R(c, "#f5f5dc", 4, 12, 8, 3);
  R(c, "#e8e8c8", 5, 11, 6, 2);
  // Stem
  R(c, "#f5f5dc", 6, 6, 4, 6);
  R(c, "#e8e8c8", 7, 7, 2, 4);
  // Head (ball)
  R(c, "#f5f5dc", 5, 2, 6, 5);
  R(c, "#f5f5dc", 6, 1, 4, 1);
  R(c, "#ffffff", 6, 2, 2, 2);
  // Outline
  R(c, "#ccccaa", 4, 14, 8, 1);
  R(c, "#ccccaa", 5, 6, 1, 1);
  R(c, "#ccccaa", 10, 6, 1, 1);
}

// Classic White Rook
function drawClassicWhiteRook(c) {
  // Crenellations
  R(c, "#f5f5dc", 2, 0, 2, 3);
  R(c, "#f5f5dc", 5, 0, 2, 2);
  R(c, "#f5f5dc", 9, 0, 2, 2);
  R(c, "#f5f5dc", 12, 0, 2, 3);
  // Top platform
  R(c, "#f5f5dc", 2, 2, 12, 2);
  R(c, "#e8e8c8", 3, 3, 10, 1);
  // Body
  R(c, "#f5f5dc", 3, 4, 10, 8);
  R(c, "#e8e8c8", 5, 5, 6, 6);
  R(c, "#ffffff", 6, 6, 2, 2);
  // Base
  R(c, "#f5f5dc", 2, 12, 12, 3);
  R(c, "#ccccaa", 2, 14, 12, 1);
}

// Classic White Knight
function drawClassicWhiteKnight(c) {
  // Horse head
  R(c, "#f5f5dc", 4, 0, 6, 3);
  R(c, "#f5f5dc", 3, 2, 4, 4);
  R(c, "#f5f5dc", 2, 4, 3, 3);
  // Ear
  R(c, "#f5f5dc", 9, 0, 2, 2);
  R(c, "#e8e8c8", 9, 0, 1, 1);
  // Eye
  R(c, "#333333", 5, 2, 1, 1);
  // Mane
  R(c, "#e8e8c8", 7, 1, 3, 5);
  // Nostril
  R(c, "#ccccaa", 2, 5, 1, 1);
  // Neck
  R(c, "#f5f5dc", 5, 6, 6, 5);
  R(c, "#e8e8c8", 6, 7, 4, 3);
  // Base
  R(c, "#f5f5dc", 3, 11, 10, 4);
  R(c, "#ccccaa", 3, 14, 10, 1);
}

// Classic White Bishop
function drawClassicWhiteBishop(c) {
  // Top point
  R(c, "#f5f5dc", 7, 0, 2, 2);
  // Hat/Mitre
  R(c, "#f5f5dc", 5, 1, 6, 4);
  R(c, "#f5f5dc", 6, 2, 4, 3);
  // Slit
  R(c, "#ccccaa", 7, 2, 2, 2);
  // Collar
  R(c, "#f5f5dc", 4, 5, 8, 2);
  // Body
  R(c, "#f5f5dc", 5, 7, 6, 5);
  R(c, "#e8e8c8", 6, 8, 4, 3);
  // Base
  R(c, "#f5f5dc", 3, 12, 10, 3);
  R(c, "#ccccaa", 3, 14, 10, 1);
}

// Classic White Queen
function drawClassicWhiteQueen(c) {
  // Crown points
  R(c, "#f5f5dc", 3, 0, 2, 2);
  R(c, "#f5f5dc", 5, 1, 2, 2);
  R(c, "#f5f5dc", 7, 0, 2, 2);
  R(c, "#f5f5dc", 9, 1, 2, 2);
  R(c, "#f5f5dc", 11, 0, 2, 2);
  // Crown base
  R(c, "#f5f5dc", 3, 2, 10, 3);
  R(c, "#e8e8c8", 4, 3, 8, 1);
  // Neck
  R(c, "#f5f5dc", 5, 5, 6, 2);
  // Body
  R(c, "#f5f5dc", 4, 7, 8, 5);
  R(c, "#e8e8c8", 5, 8, 6, 3);
  R(c, "#ffffff", 6, 9, 2, 1);
  // Base
  R(c, "#f5f5dc", 2, 12, 12, 3);
  R(c, "#ccccaa", 2, 14, 12, 1);
}

// Classic White King
function drawClassicWhiteKing(c) {
  // Cross on top
  R(c, "#f5f5dc", 7, 0, 2, 4);
  R(c, "#f5f5dc", 5, 1, 6, 2);
  // Crown
  R(c, "#f5f5dc", 4, 3, 8, 3);
  R(c, "#e8e8c8", 5, 4, 6, 1);
  // Neck
  R(c, "#f5f5dc", 5, 6, 6, 2);
  // Body
  R(c, "#f5f5dc", 4, 8, 8, 4);
  R(c, "#e8e8c8", 5, 9, 6, 2);
  R(c, "#ffffff", 6, 9, 2, 1);
  // Base
  R(c, "#f5f5dc", 2, 12, 12, 3);
  R(c, "#ccccaa", 2, 14, 12, 1);
}

// Classic Black Pawn
function drawClassicBlackPawn(c) {
  // Base
  R(c, "#333333", 4, 12, 8, 3);
  R(c, "#444444", 5, 11, 6, 2);
  // Stem
  R(c, "#333333", 6, 6, 4, 6);
  R(c, "#444444", 7, 7, 2, 4);
  // Head
  R(c, "#333333", 5, 2, 6, 5);
  R(c, "#333333", 6, 1, 4, 1);
  R(c, "#555555", 6, 2, 2, 2);
  // Outline
  R(c, "#222222", 4, 14, 8, 1);
}

// Classic Black Rook
function drawClassicBlackRook(c) {
  // Crenellations
  R(c, "#333333", 2, 0, 2, 3);
  R(c, "#333333", 5, 0, 2, 2);
  R(c, "#333333", 9, 0, 2, 2);
  R(c, "#333333", 12, 0, 2, 3);
  // Top
  R(c, "#333333", 2, 2, 12, 2);
  R(c, "#444444", 3, 3, 10, 1);
  // Body
  R(c, "#333333", 3, 4, 10, 8);
  R(c, "#444444", 5, 5, 6, 6);
  R(c, "#555555", 6, 6, 2, 2);
  // Base
  R(c, "#333333", 2, 12, 12, 3);
  R(c, "#222222", 2, 14, 12, 1);
}

// Classic Black Knight
function drawClassicBlackKnight(c) {
  // Horse head
  R(c, "#333333", 4, 0, 6, 3);
  R(c, "#333333", 3, 2, 4, 4);
  R(c, "#333333", 2, 4, 3, 3);
  // Ear
  R(c, "#333333", 9, 0, 2, 2);
  R(c, "#444444", 9, 0, 1, 1);
  // Eye
  R(c, "#ffffff", 5, 2, 1, 1);
  // Mane
  R(c, "#444444", 7, 1, 3, 5);
  // Nostril
  R(c, "#222222", 2, 5, 1, 1);
  // Neck
  R(c, "#333333", 5, 6, 6, 5);
  R(c, "#444444", 6, 7, 4, 3);
  // Base
  R(c, "#333333", 3, 11, 10, 4);
  R(c, "#222222", 3, 14, 10, 1);
}

// Classic Black Bishop
function drawClassicBlackBishop(c) {
  // Top
  R(c, "#333333", 7, 0, 2, 2);
  // Mitre
  R(c, "#333333", 5, 1, 6, 4);
  R(c, "#333333", 6, 2, 4, 3);
  R(c, "#444444", 7, 2, 2, 2);
  // Collar
  R(c, "#333333", 4, 5, 8, 2);
  // Body
  R(c, "#333333", 5, 7, 6, 5);
  R(c, "#444444", 6, 8, 4, 3);
  // Base
  R(c, "#333333", 3, 12, 10, 3);
  R(c, "#222222", 3, 14, 10, 1);
}

// Classic Black Queen
function drawClassicBlackQueen(c) {
  // Crown points
  R(c, "#333333", 3, 0, 2, 2);
  R(c, "#333333", 5, 1, 2, 2);
  R(c, "#333333", 7, 0, 2, 2);
  R(c, "#333333", 9, 1, 2, 2);
  R(c, "#333333", 11, 0, 2, 2);
  // Crown base
  R(c, "#333333", 3, 2, 10, 3);
  R(c, "#444444", 4, 3, 8, 1);
  // Neck
  R(c, "#333333", 5, 5, 6, 2);
  // Body
  R(c, "#333333", 4, 7, 8, 5);
  R(c, "#444444", 5, 8, 6, 3);
  R(c, "#555555", 6, 9, 2, 1);
  // Base
  R(c, "#333333", 2, 12, 12, 3);
  R(c, "#222222", 2, 14, 12, 1);
}

// Classic Black King
function drawClassicBlackKing(c) {
  // Cross
  R(c, "#333333", 7, 0, 2, 4);
  R(c, "#333333", 5, 1, 6, 2);
  // Crown
  R(c, "#333333", 4, 3, 8, 3);
  R(c, "#444444", 5, 4, 6, 1);
  // Neck
  R(c, "#333333", 5, 6, 6, 2);
  // Body
  R(c, "#333333", 4, 8, 8, 4);
  R(c, "#444444", 5, 9, 6, 2);
  R(c, "#555555", 6, 9, 2, 1);
  // Base
  R(c, "#333333", 2, 12, 12, 3);
  R(c, "#222222", 2, 14, 12, 1);
}

// ============================================================
// AMERICAN SOLDIER SPRITES (16x16)
// ============================================================

function drawAmericanPawn(c) {
  // Kevlar helmet
  R(c, "#4a5d23", 5, 0, 6, 3);
  R(c, "#3d4a1c", 6, 0, 4, 1);
  R(c, "#5a6d33", 6, 2, 4, 1);
  // Face
  R(c, "#e0ac69", 6, 3, 4, 3);
  R(c, "#220000", 7, 4, 1, 1);
  R(c, "#220000", 9, 4, 1, 1);
  // Camo uniform
  R(c, "#4a5d23", 5, 6, 6, 5);
  R(c, "#5a6d33", 6, 7, 2, 2);
  R(c, "#3d4a1c", 8, 8, 2, 2);
  // M4 rifle
  R(c, "#333333", 11, 3, 1, 7);
  R(c, "#444444", 11, 2, 1, 2);
  R(c, "#222222", 12, 4, 1, 4);
  // Pants
  R(c, "#4a5d23", 6, 11, 2, 3);
  R(c, "#4a5d23", 8, 11, 2, 3);
  // Boots
  R(c, "#3d2817", 6, 14, 2, 2);
  R(c, "#3d2817", 8, 14, 2, 2);
}

function drawAmericanRook(c) {
  // Tank/Humvee shape
  // Turret
  R(c, "#4a5d23", 4, 0, 8, 3);
  R(c, "#3d4a1c", 5, 1, 6, 1);
  // Gun barrel
  R(c, "#333333", 1, 1, 4, 1);
  R(c, "#444444", 0, 1, 2, 1);
  // Body
  R(c, "#5a6d33", 2, 3, 12, 6);
  R(c, "#4a5d23", 3, 4, 10, 4);
  // Star emblem
  R(c, "#ffffff", 7, 5, 2, 2);
  R(c, "#ffffff", 6, 6, 1, 1);
  R(c, "#ffffff", 9, 6, 1, 1);
  // Tracks
  R(c, "#333333", 2, 9, 12, 3);
  R(c, "#555555", 3, 10, 2, 1);
  R(c, "#555555", 6, 10, 2, 1);
  R(c, "#555555", 9, 10, 2, 1);
  // Base
  R(c, "#222222", 2, 12, 12, 3);
}

function drawAmericanKnight(c) {
  // Apache helicopter
  // Rotor
  R(c, "#666666", 2, 0, 12, 1);
  R(c, "#888888", 7, 0, 2, 2);
  // Cockpit
  R(c, "#87ceeb", 5, 2, 6, 3);
  R(c, "#4a5d23", 4, 3, 2, 2);
  R(c, "#4a5d23", 10, 3, 2, 2);
  // Body
  R(c, "#4a5d23", 3, 5, 10, 4);
  R(c, "#3d4a1c", 4, 6, 8, 2);
  // Tail
  R(c, "#4a5d23", 11, 5, 4, 2);
  R(c, "#666666", 14, 4, 1, 4);
  // Weapons
  R(c, "#333333", 2, 7, 2, 1);
  R(c, "#333333", 12, 7, 2, 1);
  // Landing gear
  R(c, "#333333", 4, 9, 2, 4);
  R(c, "#333333", 10, 9, 2, 4);
  R(c, "#444444", 3, 12, 4, 2);
  R(c, "#444444", 9, 12, 4, 2);
}

function drawAmericanBishop(c) {
  // Sniper with ghillie suit
  // Hood
  R(c, "#4a5d23", 5, 0, 6, 3);
  R(c, "#5a6d33", 6, 1, 4, 2);
  R(c, "#3d4a1c", 4, 2, 2, 2);
  R(c, "#3d4a1c", 10, 2, 2, 2);
  // Face (camo paint)
  R(c, "#4a5d23", 6, 3, 4, 2);
  R(c, "#e0ac69", 7, 3, 2, 2);
  R(c, "#220000", 7, 3, 1, 1);
  R(c, "#220000", 8, 3, 1, 1);
  // Ghillie body
  R(c, "#4a5d23", 4, 5, 8, 6);
  R(c, "#5a6d33", 5, 6, 3, 2);
  R(c, "#3d4a1c", 8, 7, 3, 2);
  R(c, "#6b7d43", 4, 5, 1, 2);
  R(c, "#6b7d43", 11, 5, 1, 2);
  // Sniper rifle
  R(c, "#333333", 12, 2, 1, 8);
  R(c, "#222222", 12, 1, 1, 2);
  R(c, "#444444", 13, 4, 1, 3);
  // Legs
  R(c, "#4a5d23", 5, 11, 2, 3);
  R(c, "#4a5d23", 9, 11, 2, 3);
  R(c, "#3d2817", 5, 14, 2, 2);
  R(c, "#3d2817", 9, 14, 2, 2);
}

function drawAmericanQueen(c) {
  // General with stars
  // Officer cap
  R(c, "#3d4a1c", 4, 0, 8, 3);
  R(c, "#ffd700", 5, 1, 6, 1);
  R(c, "#4a5d23", 5, 2, 6, 1);
  // Face
  R(c, "#e0ac69", 6, 3, 4, 3);
  R(c, "#220000", 7, 4, 1, 1);
  R(c, "#220000", 9, 4, 1, 1);
  // Decorated uniform
  R(c, "#4a5d23", 4, 6, 8, 5);
  R(c, "#ffd700", 5, 6, 1, 1); // star
  R(c, "#ffd700", 6, 6, 1, 1); // star
  R(c, "#ffd700", 9, 6, 1, 1); // star
  R(c, "#ffd700", 10, 6, 1, 1); // star
  // Medals
  R(c, "#ffd700", 6, 8, 1, 1);
  R(c, "#c0c0c0", 7, 8, 1, 1);
  R(c, "#cd7f32", 8, 8, 1, 1);
  // Sidearm
  R(c, "#333333", 12, 7, 2, 3);
  R(c, "#222222", 12, 6, 1, 2);
  // Pants
  R(c, "#4a5d23", 5, 11, 2, 2);
  R(c, "#4a5d23", 9, 11, 2, 2);
  R(c, "#2a2a2a", 5, 13, 2, 2);
  R(c, "#2a2a2a", 9, 13, 2, 2);
}

function drawAmericanKing(c) {
  // Commander with flag
  // Beret
  R(c, "#228b22", 5, 0, 6, 3);
  R(c, "#1a6b1a", 6, 1, 4, 1);
  R(c, "#ffd700", 9, 1, 2, 1); // badge
  // Face
  R(c, "#e0ac69", 6, 3, 4, 3);
  R(c, "#220000", 7, 4, 1, 1);
  R(c, "#220000", 9, 4, 1, 1);
  R(c, "#cccccc", 7, 5, 2, 1); // mustache
  // Dress uniform
  R(c, "#2a3d1c", 4, 6, 8, 5);
  R(c, "#ffd700", 7, 7, 2, 2); // eagle
  // Flag pole
  R(c, "#8b4513", 2, 1, 1, 12);
  // American flag
  R(c, "#cc0000", 3, 1, 4, 1);
  R(c, "#ffffff", 3, 2, 4, 1);
  R(c, "#cc0000", 3, 3, 4, 1);
  R(c, "#0000aa", 3, 1, 2, 2);
  // Pants & boots
  R(c, "#2a3d1c", 5, 11, 2, 2);
  R(c, "#2a3d1c", 9, 11, 2, 2);
  R(c, "#111111", 5, 13, 2, 2);
  R(c, "#111111", 9, 13, 2, 2);
}

// ============================================================
// ARAB WARRIOR SPRITES (16x16)
// ============================================================

function drawArabPawn(c) {
  // Keffiyeh (head covering)
  R(c, "#f5f5dc", 5, 0, 6, 4);
  R(c, "#cc0000", 6, 1, 4, 1);
  R(c, "#ffffff", 5, 3, 6, 1);
  // Face
  R(c, "#c68642", 6, 4, 4, 2);
  R(c, "#220000", 7, 4, 1, 1);
  R(c, "#220000", 9, 4, 1, 1);
  R(c, "#1a1a1a", 7, 5, 2, 1); // beard
  // Robe
  R(c, "#f5f5dc", 5, 6, 6, 5);
  R(c, "#e8e8c8", 6, 7, 4, 3);
  // AK-47
  R(c, "#8b4513", 11, 4, 1, 6);
  R(c, "#333333", 11, 3, 1, 2);
  R(c, "#333333", 12, 5, 1, 3);
  R(c, "#ffd700", 11, 2, 1, 1);
  // Sandals
  R(c, "#8b4513", 6, 11, 2, 3);
  R(c, "#8b4513", 8, 11, 2, 3);
  R(c, "#6b3410", 6, 14, 2, 1);
  R(c, "#6b3410", 8, 14, 2, 1);
}

function drawArabRook(c) {
  // Fortress/Camel with rider
  // Camel head
  R(c, "#c2a366", 3, 0, 4, 3);
  R(c, "#a08050", 2, 1, 2, 2);
  R(c, "#111111", 3, 1, 1, 1);
  // Camel body
  R(c, "#c2a366", 4, 3, 8, 5);
  R(c, "#a08050", 5, 4, 6, 3);
  // Hump
  R(c, "#c2a366", 7, 2, 4, 2);
  // Rider
  R(c, "#f5f5dc", 8, 0, 4, 2);
  R(c, "#c68642", 9, 2, 2, 1);
  R(c, "#f5f5dc", 8, 3, 4, 2);
  // Camel legs
  R(c, "#c2a366", 4, 8, 2, 5);
  R(c, "#c2a366", 10, 8, 2, 5);
  R(c, "#8b7355", 4, 13, 2, 2);
  R(c, "#8b7355", 10, 13, 2, 2);
  // Supplies
  R(c, "#8b4513", 5, 5, 2, 2);
  R(c, "#8b4513", 11, 5, 2, 2);
}

function drawArabKnight(c) {
  // Horseman with scimitar
  // Horse head
  R(c, "#4a3728", 3, 2, 4, 3);
  R(c, "#3a2718", 2, 3, 2, 2);
  R(c, "#111111", 3, 3, 1, 1);
  // Horse body
  R(c, "#4a3728", 5, 5, 7, 4);
  R(c, "#3a2718", 6, 6, 5, 2);
  // Rider (Arab warrior)
  R(c, "#f5f5dc", 8, 0, 4, 2);
  R(c, "#c68642", 9, 2, 2, 1);
  R(c, "#f5f5dc", 8, 3, 4, 3);
  // Scimitar
  R(c, "#c0c0c0", 12, 2, 2, 1);
  R(c, "#c0c0c0", 13, 3, 1, 1);
  R(c, "#c0c0c0", 13, 4, 1, 2);
  R(c, "#ffd700", 12, 5, 1, 1);
  // Horse legs
  R(c, "#4a3728", 5, 9, 2, 5);
  R(c, "#4a3728", 10, 9, 2, 5);
  R(c, "#2a1708", 5, 14, 2, 1);
  R(c, "#2a1708", 10, 14, 2, 1);
}

function drawArabBishop(c) {
  // Scholar/Imam
  // Turban
  R(c, "#ffffff", 5, 0, 6, 4);
  R(c, "#e8e8e8", 6, 1, 4, 2);
  R(c, "#228b22", 7, 0, 2, 1); // jewel
  // Face with beard
  R(c, "#c68642", 6, 4, 4, 3);
  R(c, "#220000", 7, 4, 1, 1);
  R(c, "#220000", 9, 4, 1, 1);
  R(c, "#1a1a1a", 6, 6, 4, 1); // beard
  R(c, "#1a1a1a", 7, 7, 2, 1);
  // Robe (scholarly)
  R(c, "#228b22", 5, 7, 6, 4);
  R(c, "#1a6b1a", 6, 8, 4, 2);
  // Book/scroll
  R(c, "#8b4513", 11, 6, 2, 3);
  R(c, "#f5f5dc", 11, 6, 2, 1);
  // Sandals
  R(c, "#8b4513", 6, 11, 2, 3);
  R(c, "#8b4513", 8, 11, 2, 3);
  R(c, "#6b3410", 6, 14, 2, 1);
  R(c, "#6b3410", 8, 14, 2, 1);
}

function drawArabQueen(c) {
  // Desert Queen
  // Crown/headdress
  R(c, "#ffd700", 4, 0, 8, 3);
  R(c, "#ff0000", 7, 0, 2, 1); // ruby
  R(c, "#00ff00", 5, 1, 1, 1); // emerald
  R(c, "#00ff00", 10, 1, 1, 1);
  // Veil
  R(c, "#800080", 4, 2, 8, 3);
  R(c, "#6b006b", 5, 3, 6, 1);
  // Eyes only visible
  R(c, "#c68642", 6, 3, 4, 1);
  R(c, "#220000", 7, 3, 1, 1);
  R(c, "#220000", 9, 3, 1, 1);
  // Royal robe
  R(c, "#800080", 4, 5, 8, 6);
  R(c, "#ffd700", 4, 5, 8, 1); // gold trim
  R(c, "#ffd700", 4, 10, 8, 1);
  R(c, "#6b006b", 5, 6, 6, 3);
  // Daggers
  R(c, "#c0c0c0", 3, 6, 1, 3);
  R(c, "#c0c0c0", 12, 6, 1, 3);
  R(c, "#ffd700", 3, 9, 1, 1);
  R(c, "#ffd700", 12, 9, 1, 1);
  // Feet
  R(c, "#ffd700", 5, 11, 2, 3);
  R(c, "#ffd700", 9, 11, 2, 3);
}

function drawArabKing(c) {
  // Sultan/Sheikh
  // Grand turban
  R(c, "#ffffff", 4, 0, 8, 4);
  R(c, "#ffd700", 6, 0, 4, 1); // gold band
  R(c, "#ff0000", 7, 1, 2, 1); // ruby
  R(c, "#00bfff", 5, 2, 1, 1); // sapphire
  R(c, "#00bfff", 10, 2, 1, 1);
  // Face
  R(c, "#c68642", 6, 4, 4, 3);
  R(c, "#220000", 7, 4, 1, 1);
  R(c, "#220000", 9, 4, 1, 1);
  R(c, "#1a1a1a", 6, 6, 4, 1); // beard
  R(c, "#1a1a1a", 7, 7, 2, 1);
  // Royal robe
  R(c, "#800020", 4, 7, 8, 4);
  R(c, "#ffd700", 4, 7, 8, 1);
  R(c, "#ffd700", 7, 8, 2, 2);
  // Scepter
  R(c, "#ffd700", 12, 3, 1, 8);
  R(c, "#ffd700", 11, 3, 3, 1);
  R(c, "#ff0000", 12, 2, 1, 1);
  // Sandals
  R(c, "#ffd700", 5, 11, 2, 3);
  R(c, "#ffd700", 9, 11, 2, 3);
  R(c, "#cc9900", 5, 14, 2, 1);
  R(c, "#cc9900", 9, 14, 2, 1);
}

// ============================================================
// NINJA SPRITES (16x16)
// ============================================================

function drawNinjaPawn(c) {
  // Hood
  R(c, "#1a1a1a", 5, 0, 6, 4);
  R(c, "#2a2a2a", 6, 1, 4, 2);
  // Eyes only
  R(c, "#ffffff", 6, 2, 1, 1);
  R(c, "#ffffff", 9, 2, 1, 1);
  R(c, "#000000", 6, 2, 1, 1);
  R(c, "#000000", 9, 2, 1, 1);
  // Body
  R(c, "#1a1a1a", 5, 4, 6, 6);
  R(c, "#2a2a2a", 6, 5, 4, 4);
  // Katana on back
  R(c, "#c0c0c0", 10, 1, 1, 7);
  R(c, "#8b4513", 10, 7, 1, 2);
  // Legs
  R(c, "#1a1a1a", 6, 10, 2, 4);
  R(c, "#1a1a1a", 8, 10, 2, 4);
  R(c, "#333333", 6, 14, 2, 1);
  R(c, "#333333", 8, 14, 2, 1);
}

function drawNinjaRook(c) {
  // Fortress tower (Japanese style)
  // Roof
  R(c, "#2a2a2a", 2, 0, 12, 2);
  R(c, "#1a1a1a", 3, 2, 10, 1);
  // Upper level
  R(c, "#f5f5dc", 3, 3, 10, 3);
  R(c, "#e8e8c8", 4, 4, 8, 1);
  // Lower roof
  R(c, "#2a2a2a", 2, 6, 12, 1);
  // Lower level
  R(c, "#f5f5dc", 3, 7, 10, 4);
  R(c, "#e8e8c8", 4, 8, 8, 2);
  // Windows
  R(c, "#1a1a1a", 5, 8, 2, 2);
  R(c, "#1a1a1a", 9, 8, 2, 2);
  // Base
  R(c, "#666666", 2, 11, 12, 4);
  R(c, "#555555", 3, 12, 10, 2);
}

function drawNinjaKnight(c) {
  // Ninja on horseback
  // Horse head
  R(c, "#1a1a1a", 3, 3, 4, 3);
  R(c, "#2a2a2a", 2, 4, 2, 2);
  R(c, "#ff0000", 4, 4, 1, 1); // red eye
  // Horse body
  R(c, "#1a1a1a", 5, 6, 7, 4);
  R(c, "#2a2a2a", 6, 7, 5, 2);
  // Ninja rider
  R(c, "#1a1a1a", 8, 2, 4, 4);
  R(c, "#ffffff", 9, 3, 1, 1); // eye
  R(c, "#ffffff", 10, 3, 1, 1);
  // Throwing stars
  R(c, "#c0c0c0", 12, 3, 2, 2);
  // Horse legs
  R(c, "#1a1a1a", 5, 10, 2, 5);
  R(c, "#1a1a1a", 10, 10, 2, 5);
  R(c, "#333333", 5, 14, 2, 1);
  R(c, "#333333", 10, 14, 2, 1);
}

function drawNinjaBishop(c) {
  // Shadow ninja with kusarigama
  // Hood
  R(c, "#1a1a1a", 5, 0, 6, 4);
  R(c, "#2a2a2a", 6, 1, 4, 2);
  // Eyes
  R(c, "#ff0000", 6, 2, 1, 1);
  R(c, "#ff0000", 9, 2, 1, 1);
  // Body
  R(c, "#1a1a1a", 4, 4, 8, 6);
  R(c, "#2a2a2a", 5, 5, 6, 4);
  // Kusarigama (chain sickle)
  R(c, "#c0c0c0", 11, 2, 2, 1);
  R(c, "#c0c0c0", 12, 3, 1, 2);
  R(c, "#888888", 12, 5, 1, 4); // chain
  R(c, "#888888", 11, 8, 1, 1);
  R(c, "#c0c0c0", 10, 9, 2, 1); // weight
  // Legs
  R(c, "#1a1a1a", 5, 10, 2, 4);
  R(c, "#1a1a1a", 9, 10, 2, 4);
  R(c, "#333333", 5, 14, 2, 1);
  R(c, "#333333", 9, 14, 2, 1);
}

function drawNinjaQueen(c) {
  // Kunoichi (female ninja)
  // Hair/mask
  R(c, "#1a1a1a", 4, 0, 8, 4);
  R(c, "#2a2a2a", 5, 1, 6, 2);
  // Face with mask
  R(c, "#ffe0bd", 6, 2, 4, 2);
  R(c, "#220000", 7, 2, 1, 1);
  R(c, "#220000", 9, 2, 1, 1);
  R(c, "#cc0066", 7, 3, 2, 1); // lips
  // Body
  R(c, "#1a1a1a", 4, 4, 8, 6);
  R(c, "#cc0066", 6, 5, 4, 1); // sash
  R(c, "#2a2a2a", 5, 6, 6, 3);
  // Twin sai
  R(c, "#c0c0c0", 2, 4, 1, 5);
  R(c, "#c0c0c0", 1, 5, 1, 1);
  R(c, "#c0c0c0", 3, 5, 1, 1);
  R(c, "#c0c0c0", 13, 4, 1, 5);
  R(c, "#c0c0c0", 12, 5, 1, 1);
  R(c, "#c0c0c0", 14, 5, 1, 1);
  // Legs
  R(c, "#1a1a1a", 5, 10, 2, 4);
  R(c, "#1a1a1a", 9, 10, 2, 4);
  R(c, "#333333", 5, 14, 2, 1);
  R(c, "#333333", 9, 14, 2, 1);
}

function drawNinjaKing(c) {
  // Shadow master
  // Demon mask
  R(c, "#8b0000", 5, 0, 6, 4);
  R(c, "#ff0000", 6, 1, 4, 2);
  R(c, "#ffff00", 6, 1, 1, 1); // eye
  R(c, "#ffff00", 9, 1, 1, 1);
  R(c, "#ffffff", 7, 2, 2, 1); // fangs
  // Horns
  R(c, "#1a1a1a", 4, 0, 1, 2);
  R(c, "#1a1a1a", 11, 0, 1, 2);
  // Dark robes
  R(c, "#1a1a1a", 3, 4, 10, 7);
  R(c, "#2a2a2a", 4, 5, 8, 5);
  R(c, "#8b0000", 6, 6, 4, 2); // symbol
  // Ninjato blade
  R(c, "#c0c0c0", 13, 2, 1, 9);
  R(c, "#ffd700", 13, 10, 1, 1);
  R(c, "#1a1a1a", 13, 11, 1, 2);
  // Smoke effects
  R(c, "#4a4a4a", 2, 8, 1, 2);
  R(c, "#3a3a3a", 1, 9, 1, 1);
  // Legs
  R(c, "#1a1a1a", 5, 11, 2, 3);
  R(c, "#1a1a1a", 9, 11, 2, 3);
  R(c, "#333333", 5, 14, 2, 1);
  R(c, "#333333", 9, 14, 2, 1);
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
