// ============================================================
// CLASSIC CHESS PIECE SPRITES (32x32)
// Traditional chess pieces with 3D shading
// Classic White: ivory/cream with dark outline
// Classic Black: dark ebony with lighter outline
// ============================================================

// ============================================================
// CLASSIC WHITE 32x32 PIECES
// ============================================================

// Classic White Pawn (32x32)
function drawClassicWhite32Pawn(c) {
  // Dark outline for visibility on light squares
  R(c, "#8b8b6b", 11, 2, 10, 1);  // head outline top
  R(c, "#8b8b6b", 10, 3, 1, 2);   // head outline upper-left
  R(c, "#8b8b6b", 9, 5, 1, 6);    // head outline left
  R(c, "#8b8b6b", 21, 3, 1, 2);   // head outline upper-right
  R(c, "#8b8b6b", 22, 5, 1, 6);   // head outline right
  R(c, "#8b8b6b", 10, 11, 1, 1);  // head outline bottom-left
  R(c, "#8b8b6b", 21, 11, 1, 1);  // head outline bottom-right
  R(c, "#8b8b6b", 11, 22, 1, 1);  // stem-base left
  R(c, "#8b8b6b", 20, 22, 1, 1);  // stem-base right
  R(c, "#8b8b6b", 6, 23, 1, 6);   // base outline left
  R(c, "#8b8b6b", 25, 23, 1, 6);  // base outline right
  R(c, "#8b8b6b", 6, 29, 20, 1);  // base outline bottom

  // Head ball
  R(c, "#f8f0e0", 11, 3, 10, 8);
  R(c, "#f8f0e0", 12, 2, 8, 1);   // top of head
  R(c, "#f8f0e0", 10, 5, 1, 4);   // left curve
  R(c, "#f8f0e0", 21, 5, 1, 4);   // right curve
  // Head highlight
  R(c, "#ffffff", 12, 4, 4, 3);
  R(c, "#ffffff", 13, 3, 2, 1);
  // Head shadow
  R(c, "#d8d0c0", 18, 6, 3, 4);
  R(c, "#d8d0c0", 19, 10, 2, 1);
  R(c, "#e8e0d0", 16, 9, 2, 2);

  // Stem
  R(c, "#f8f0e0", 12, 11, 8, 11);
  R(c, "#e8e0d0", 11, 12, 1, 10);  // left side of stem
  R(c, "#e8e0d0", 20, 12, 1, 10);  // right side of stem
  // Stem highlight
  R(c, "#ffffff", 13, 12, 2, 6);
  // Stem shadow
  R(c, "#d8d0c0", 18, 12, 2, 10);

  // Flare above base
  R(c, "#f8f0e0", 9, 22, 14, 2);
  R(c, "#e8e0d0", 10, 21, 12, 1);

  // Base
  R(c, "#f8f0e0", 7, 24, 18, 5);
  R(c, "#e8e0d0", 8, 24, 16, 1);   // base top highlight
  R(c, "#ffffff", 9, 24, 4, 2);     // base shine
  R(c, "#d8d0c0", 7, 27, 18, 2);   // base shadow bottom
  R(c, "#c8c0b0", 7, 28, 18, 1);   // base darkest bottom
}

// Classic White Rook (32x32)
function drawClassicWhite32Rook(c) {
  // Outline
  R(c, "#8b8b6b", 2, 0, 1, 6);    // left merlon outline
  R(c, "#8b8b6b", 29, 0, 1, 6);   // right merlon outline
  R(c, "#8b8b6b", 4, 7, 1, 22);   // left body outline
  R(c, "#8b8b6b", 27, 7, 1, 22);  // right body outline
  R(c, "#8b8b6b", 4, 29, 24, 1);  // base outline bottom

  // Crenellations (3 merlons)
  R(c, "#f8f0e0", 3, 0, 4, 5);    // left merlon
  R(c, "#f8f0e0", 14, 0, 4, 4);   // center merlon
  R(c, "#f8f0e0", 25, 0, 4, 5);   // right merlon
  // Merlon highlights
  R(c, "#ffffff", 3, 0, 2, 2);
  R(c, "#ffffff", 14, 0, 2, 2);
  R(c, "#ffffff", 25, 0, 2, 2);
  // Merlon shadows
  R(c, "#d8d0c0", 5, 2, 2, 3);
  R(c, "#d8d0c0", 16, 2, 2, 2);
  R(c, "#d8d0c0", 27, 2, 2, 3);

  // Top platform connecting merlons
  R(c, "#f8f0e0", 3, 4, 26, 3);
  R(c, "#e8e0d0", 7, 4, 7, 1);    // gap between merlons (recessed)
  R(c, "#e8e0d0", 18, 4, 7, 1);   // gap between merlons (recessed)
  R(c, "#d8d0c0", 5, 6, 22, 1);   // platform shadow

  // Body
  R(c, "#f8f0e0", 5, 7, 22, 16);
  // Body inner shading
  R(c, "#e8e0d0", 8, 9, 16, 12);
  // Body highlight
  R(c, "#ffffff", 9, 10, 4, 6);
  R(c, "#ffffff", 10, 9, 2, 1);
  // Body shadow
  R(c, "#d8d0c0", 21, 8, 4, 14);
  R(c, "#c8c0b0", 23, 9, 2, 12);

  // Decorative band
  R(c, "#d8d0c0", 5, 14, 22, 1);

  // Base flare
  R(c, "#f8f0e0", 5, 23, 22, 2);
  R(c, "#e8e0d0", 5, 23, 22, 1);

  // Base
  R(c, "#f8f0e0", 5, 25, 22, 4);
  R(c, "#e8e0d0", 6, 25, 20, 1);   // base top
  R(c, "#ffffff", 7, 25, 4, 2);     // base shine
  R(c, "#d8d0c0", 5, 27, 22, 2);   // base shadow
  R(c, "#c8c0b0", 5, 28, 22, 1);   // base darkest
}

// Classic White Knight (32x32)
function drawClassicWhite32Knight(c) {
  // Outline
  R(c, "#8b8b6b", 6, 0, 1, 5);    // head top-left outline
  R(c, "#8b8b6b", 21, 0, 1, 2);   // ear outline right
  R(c, "#8b8b6b", 2, 7, 1, 7);    // snout left outline
  R(c, "#8b8b6b", 23, 2, 1, 10);  // right outline
  R(c, "#8b8b6b", 5, 29, 22, 1);  // base bottom outline

  // Ear
  R(c, "#f8f0e0", 19, 0, 3, 3);
  R(c, "#d8d0c0", 19, 0, 2, 1);   // ear inner shadow
  R(c, "#c8c0b0", 20, 1, 1, 1);

  // Horse head top
  R(c, "#f8f0e0", 7, 0, 12, 5);
  R(c, "#f8f0e0", 7, 5, 8, 3);
  // Forehead highlight
  R(c, "#ffffff", 8, 1, 5, 3);
  R(c, "#ffffff", 9, 0, 3, 1);

  // Mane (right side)
  R(c, "#d8d0c0", 15, 1, 5, 9);
  R(c, "#c8c0b0", 17, 2, 4, 7);
  R(c, "#b8b0a0", 19, 3, 3, 5);

  // Eye
  R(c, "#222222", 10, 5, 2, 2);
  R(c, "#ffffff", 10, 5, 1, 1);    // eye shine

  // Snout / jaw
  R(c, "#f8f0e0", 3, 7, 12, 6);
  R(c, "#f8f0e0", 4, 6, 4, 1);
  R(c, "#e8e0d0", 3, 10, 8, 3);   // lower jaw shading
  // Nostril
  R(c, "#c8c0b0", 4, 9, 2, 2);
  R(c, "#b8b0a0", 4, 10, 1, 1);
  // Mouth line
  R(c, "#c8c0b0", 3, 12, 8, 1);

  // Neck
  R(c, "#f8f0e0", 9, 13, 13, 9);
  R(c, "#e8e0d0", 8, 12, 2, 6);   // left neck edge
  // Neck highlight
  R(c, "#ffffff", 10, 14, 3, 4);
  // Neck shadow
  R(c, "#d8d0c0", 17, 13, 4, 8);
  R(c, "#c8c0b0", 19, 14, 3, 6);

  // Base flare
  R(c, "#f8f0e0", 7, 22, 18, 2);
  R(c, "#e8e0d0", 8, 21, 14, 1);

  // Base
  R(c, "#f8f0e0", 6, 24, 20, 5);
  R(c, "#e8e0d0", 7, 24, 18, 1);   // base top
  R(c, "#ffffff", 8, 24, 4, 2);     // base shine
  R(c, "#d8d0c0", 6, 27, 20, 2);   // base shadow
  R(c, "#c8c0b0", 6, 28, 20, 1);   // base darkest
}

// Classic White Bishop (32x32)
function drawClassicWhite32Bishop(c) {
  // Outline
  R(c, "#8b8b6b", 13, 0, 1, 1);   // top ball outline left
  R(c, "#8b8b6b", 18, 0, 1, 1);   // top ball outline right
  R(c, "#8b8b6b", 8, 4, 1, 8);    // mitre left outline
  R(c, "#8b8b6b", 23, 4, 1, 8);   // mitre right outline
  R(c, "#8b8b6b", 5, 29, 22, 1);  // base bottom outline

  // Top ball
  R(c, "#f8f0e0", 14, 0, 4, 3);
  R(c, "#f8f0e0", 13, 1, 1, 1);
  R(c, "#f8f0e0", 18, 1, 1, 1);
  R(c, "#ffffff", 14, 0, 2, 1);    // ball highlight
  R(c, "#d8d0c0", 16, 2, 2, 1);   // ball shadow

  // Mitre point
  R(c, "#f8f0e0", 12, 3, 8, 2);
  R(c, "#f8f0e0", 10, 5, 12, 3);
  R(c, "#f8f0e0", 9, 8, 14, 4);
  // Mitre highlight
  R(c, "#ffffff", 11, 5, 3, 3);
  R(c, "#ffffff", 12, 4, 2, 1);
  // Mitre slit (diagonal cross)
  R(c, "#d8d0c0", 14, 5, 4, 4);
  R(c, "#c8c0b0", 15, 6, 2, 2);
  // Mitre shadow
  R(c, "#d8d0c0", 18, 5, 4, 6);
  R(c, "#c8c0b0", 20, 6, 2, 4);

  // Collar band
  R(c, "#f8f0e0", 8, 12, 16, 3);
  R(c, "#e8e0d0", 9, 12, 14, 1);   // collar top highlight
  R(c, "#d8d0c0", 8, 14, 16, 1);   // collar shadow

  // Body (tapered)
  R(c, "#f8f0e0", 9, 15, 14, 8);
  R(c, "#e8e0d0", 10, 16, 12, 6);
  // Body highlight
  R(c, "#ffffff", 11, 16, 3, 4);
  // Body shadow
  R(c, "#d8d0c0", 19, 15, 3, 7);
  R(c, "#c8c0b0", 20, 16, 2, 5);

  // Base flare
  R(c, "#f8f0e0", 7, 23, 18, 2);
  R(c, "#e8e0d0", 8, 22, 16, 1);

  // Base
  R(c, "#f8f0e0", 6, 25, 20, 4);
  R(c, "#e8e0d0", 7, 25, 18, 1);   // base top
  R(c, "#ffffff", 8, 25, 4, 2);     // base shine
  R(c, "#d8d0c0", 6, 27, 20, 2);   // base shadow
  R(c, "#c8c0b0", 6, 28, 20, 1);   // base darkest
}

// Classic White Queen (32x32)
function drawClassicWhite32Queen(c) {
  // Crown point outlines
  R(c, "#8b8b6b", 4, 0, 1, 3);    // left point outline
  R(c, "#8b8b6b", 27, 0, 1, 3);   // right point outline

  // Crown balls on 3 points
  R(c, "#f8f0e0", 5, 0, 3, 3);    // left ball
  R(c, "#f8f0e0", 14, 0, 4, 2);   // center ball
  R(c, "#f8f0e0", 24, 0, 3, 3);   // right ball
  // Ball highlights
  R(c, "#ffffff", 5, 0, 2, 1);
  R(c, "#ffffff", 14, 0, 2, 1);
  R(c, "#ffffff", 24, 0, 2, 1);

  // Crown connecting arches
  R(c, "#f8f0e0", 8, 2, 6, 3);    // left arch
  R(c, "#f8f0e0", 18, 2, 6, 3);   // right arch
  R(c, "#e8e0d0", 9, 1, 5, 2);
  R(c, "#e8e0d0", 19, 1, 5, 2);

  // Crown body
  R(c, "#f8f0e0", 6, 4, 20, 4);
  R(c, "#d8d0c0", 8, 6, 16, 2);   // crown band shadow
  R(c, "#e8e0d0", 7, 5, 18, 1);
  // Crown jewel details
  R(c, "#d8d0c0", 10, 5, 2, 1);
  R(c, "#d8d0c0", 20, 5, 2, 1);

  // Neck
  R(c, "#f8f0e0", 10, 8, 12, 3);
  R(c, "#e8e0d0", 11, 9, 10, 1);

  // Body (tapered)
  R(c, "#f8f0e0", 8, 11, 16, 10);
  R(c, "#e8e0d0", 9, 12, 14, 8);
  // Body highlight
  R(c, "#ffffff", 11, 13, 3, 4);
  R(c, "#ffffff", 12, 12, 2, 1);
  // Body shadow
  R(c, "#d8d0c0", 20, 11, 3, 9);
  R(c, "#c8c0b0", 21, 12, 2, 7);

  // Base flare
  R(c, "#f8f0e0", 6, 21, 20, 2);
  R(c, "#e8e0d0", 7, 20, 18, 1);

  // Base
  R(c, "#8b8b6b", 3, 29, 26, 1);  // base outline bottom
  R(c, "#f8f0e0", 4, 23, 24, 6);
  R(c, "#e8e0d0", 5, 23, 22, 1);   // base top
  R(c, "#ffffff", 7, 23, 5, 2);     // base shine
  R(c, "#d8d0c0", 4, 27, 24, 2);   // base shadow
  R(c, "#c8c0b0", 4, 28, 24, 1);   // base darkest
}

// Classic White King (32x32)
function drawClassicWhite32King(c) {
  // Cross on top
  R(c, "#f8f0e0", 14, 0, 4, 8);   // vertical beam
  R(c, "#f8f0e0", 10, 2, 12, 4);  // horizontal beam
  R(c, "#ffffff", 14, 0, 2, 2);    // cross highlight
  R(c, "#ffffff", 10, 3, 3, 1);    // cross arm highlight
  R(c, "#d8d0c0", 16, 4, 2, 4);   // cross shadow
  R(c, "#d8d0c0", 18, 3, 4, 2);   // cross arm shadow
  // Cross outline
  R(c, "#8b8b6b", 12, 1, 1, 2);   // arm outline left
  R(c, "#8b8b6b", 19, 1, 1, 2);   // arm outline right
  R(c, "#8b8b6b", 13, 0, 1, 1);   // top outline left
  R(c, "#8b8b6b", 18, 0, 1, 1);   // top outline right

  // Crown band
  R(c, "#f8f0e0", 7, 7, 18, 5);
  R(c, "#e8e0d0", 8, 8, 16, 3);
  R(c, "#d8d0c0", 9, 9, 14, 1);   // crown center band detail
  // Crown outline
  R(c, "#8b8b6b", 6, 7, 1, 5);    // crown left outline
  R(c, "#8b8b6b", 25, 7, 1, 5);   // crown right outline
  // Crown highlight
  R(c, "#ffffff", 9, 7, 4, 2);
  // Crown shadow
  R(c, "#d8d0c0", 20, 7, 4, 4);
  R(c, "#c8c0b0", 22, 8, 2, 3);

  // Neck
  R(c, "#f8f0e0", 10, 12, 12, 3);
  R(c, "#e8e0d0", 11, 13, 10, 1);

  // Body (tapered)
  R(c, "#f8f0e0", 8, 15, 16, 8);
  R(c, "#e8e0d0", 9, 16, 14, 6);
  // Body highlight
  R(c, "#ffffff", 11, 16, 3, 4);
  R(c, "#ffffff", 12, 15, 2, 1);
  // Body shadow
  R(c, "#d8d0c0", 20, 15, 3, 7);
  R(c, "#c8c0b0", 21, 16, 2, 5);

  // Base flare
  R(c, "#f8f0e0", 6, 23, 20, 2);
  R(c, "#e8e0d0", 7, 22, 18, 1);

  // Base
  R(c, "#8b8b6b", 3, 29, 26, 1);  // base outline bottom
  R(c, "#f8f0e0", 4, 25, 24, 4);
  R(c, "#e8e0d0", 5, 25, 22, 1);   // base top
  R(c, "#ffffff", 7, 25, 5, 2);     // base shine
  R(c, "#d8d0c0", 4, 27, 24, 2);   // base shadow
  R(c, "#c8c0b0", 4, 28, 24, 1);   // base darkest
}

// ============================================================
// CLASSIC BLACK 32x32 PIECES
// ============================================================

// Classic Black Pawn (32x32)
function drawClassicBlack32Pawn(c) {
  // Light outline for visibility on dark squares
  R(c, "#666666", 11, 2, 10, 1);  // head outline top
  R(c, "#666666", 10, 3, 1, 2);   // head outline upper-left
  R(c, "#666666", 9, 5, 1, 6);    // head outline left
  R(c, "#666666", 21, 3, 1, 2);   // head outline upper-right
  R(c, "#666666", 22, 5, 1, 6);   // head outline right
  R(c, "#666666", 10, 11, 1, 1);  // head outline bottom-left
  R(c, "#666666", 21, 11, 1, 1);  // head outline bottom-right
  R(c, "#666666", 11, 22, 1, 1);  // stem-base left
  R(c, "#666666", 20, 22, 1, 1);  // stem-base right
  R(c, "#666666", 6, 23, 1, 6);   // base outline left
  R(c, "#666666", 25, 23, 1, 6);  // base outline right
  R(c, "#666666", 6, 29, 20, 1);  // base outline bottom

  // Head ball
  R(c, "#2a2a2a", 11, 3, 10, 8);
  R(c, "#2a2a2a", 12, 2, 8, 1);   // top of head
  R(c, "#2a2a2a", 10, 5, 1, 4);   // left curve
  R(c, "#2a2a2a", 21, 5, 1, 4);   // right curve
  // Head highlight
  R(c, "#484848", 12, 4, 4, 3);
  R(c, "#484848", 13, 3, 2, 1);
  R(c, "#555555", 13, 4, 2, 2);
  // Head shadow
  R(c, "#1a1a1a", 18, 6, 3, 4);
  R(c, "#1a1a1a", 19, 10, 2, 1);

  // Stem
  R(c, "#2a2a2a", 12, 11, 8, 11);
  R(c, "#383838", 11, 12, 1, 10);  // left side highlight
  R(c, "#383838", 20, 12, 1, 10);  // right side
  // Stem highlight
  R(c, "#484848", 13, 12, 2, 6);
  // Stem shadow
  R(c, "#1a1a1a", 18, 12, 2, 10);

  // Flare above base
  R(c, "#2a2a2a", 9, 22, 14, 2);
  R(c, "#383838", 10, 21, 12, 1);

  // Base
  R(c, "#2a2a2a", 7, 24, 18, 5);
  R(c, "#383838", 8, 24, 16, 1);   // base top highlight
  R(c, "#484848", 9, 24, 4, 2);    // base shine
  R(c, "#1a1a1a", 7, 27, 18, 2);   // base shadow bottom
  R(c, "#111111", 7, 28, 18, 1);   // base darkest bottom
}

// Classic Black Rook (32x32)
function drawClassicBlack32Rook(c) {
  // Outline
  R(c, "#666666", 2, 0, 1, 6);    // left merlon outline
  R(c, "#666666", 29, 0, 1, 6);   // right merlon outline
  R(c, "#666666", 4, 7, 1, 22);   // left body outline
  R(c, "#666666", 27, 7, 1, 22);  // right body outline
  R(c, "#666666", 4, 29, 24, 1);  // base outline bottom

  // Crenellations (3 merlons)
  R(c, "#2a2a2a", 3, 0, 4, 5);    // left merlon
  R(c, "#2a2a2a", 14, 0, 4, 4);   // center merlon
  R(c, "#2a2a2a", 25, 0, 4, 5);   // right merlon
  // Merlon highlights
  R(c, "#484848", 3, 0, 2, 2);
  R(c, "#484848", 14, 0, 2, 2);
  R(c, "#484848", 25, 0, 2, 2);
  // Merlon shadows
  R(c, "#1a1a1a", 5, 2, 2, 3);
  R(c, "#1a1a1a", 16, 2, 2, 2);
  R(c, "#1a1a1a", 27, 2, 2, 3);

  // Top platform
  R(c, "#2a2a2a", 3, 4, 26, 3);
  R(c, "#383838", 7, 4, 7, 1);    // gap highlight
  R(c, "#383838", 18, 4, 7, 1);   // gap highlight
  R(c, "#1a1a1a", 5, 6, 22, 1);   // platform shadow

  // Body
  R(c, "#2a2a2a", 5, 7, 22, 16);
  // Body inner shading
  R(c, "#383838", 8, 9, 10, 12);  // highlight area
  R(c, "#484848", 9, 10, 4, 6);   // bright highlight
  R(c, "#555555", 10, 11, 2, 3);  // brightest
  // Body shadow
  R(c, "#1a1a1a", 21, 8, 4, 14);
  R(c, "#111111", 23, 9, 2, 12);

  // Decorative band
  R(c, "#383838", 5, 14, 22, 1);

  // Base flare
  R(c, "#2a2a2a", 5, 23, 22, 2);
  R(c, "#383838", 5, 23, 22, 1);

  // Base
  R(c, "#2a2a2a", 5, 25, 22, 4);
  R(c, "#383838", 6, 25, 20, 1);   // base top
  R(c, "#484848", 7, 25, 4, 2);    // base shine
  R(c, "#1a1a1a", 5, 27, 22, 2);   // base shadow
  R(c, "#111111", 5, 28, 22, 1);   // base darkest
}

// Classic Black Knight (32x32)
function drawClassicBlack32Knight(c) {
  // Outline
  R(c, "#666666", 6, 0, 1, 5);    // head top-left outline
  R(c, "#666666", 21, 0, 1, 2);   // ear outline right
  R(c, "#666666", 2, 7, 1, 7);    // snout left outline
  R(c, "#666666", 23, 2, 1, 10);  // right outline
  R(c, "#666666", 5, 29, 22, 1);  // base bottom outline

  // Ear
  R(c, "#2a2a2a", 19, 0, 3, 3);
  R(c, "#383838", 19, 0, 2, 1);   // ear inner highlight
  R(c, "#484848", 20, 1, 1, 1);

  // Horse head top
  R(c, "#2a2a2a", 7, 0, 12, 5);
  R(c, "#2a2a2a", 7, 5, 8, 3);
  // Forehead highlight
  R(c, "#484848", 8, 1, 5, 3);
  R(c, "#555555", 9, 1, 3, 2);

  // Mane (right side)
  R(c, "#1a1a1a", 15, 1, 5, 9);
  R(c, "#111111", 17, 2, 4, 7);
  R(c, "#0a0a0a", 19, 3, 3, 5);

  // Eye
  R(c, "#ffffff", 10, 5, 2, 2);
  R(c, "#dddddd", 11, 6, 1, 1);   // eye detail

  // Snout / jaw
  R(c, "#2a2a2a", 3, 7, 12, 6);
  R(c, "#2a2a2a", 4, 6, 4, 1);
  R(c, "#383838", 4, 7, 6, 3);    // snout highlight
  R(c, "#1a1a1a", 3, 10, 8, 3);   // lower jaw shadow
  // Nostril
  R(c, "#111111", 4, 9, 2, 2);
  R(c, "#0a0a0a", 4, 10, 1, 1);
  // Mouth line
  R(c, "#111111", 3, 12, 8, 1);

  // Neck
  R(c, "#2a2a2a", 9, 13, 13, 9);
  R(c, "#383838", 8, 12, 2, 6);   // left neck edge highlight
  // Neck highlight
  R(c, "#484848", 10, 14, 3, 4);
  R(c, "#555555", 11, 15, 2, 2);
  // Neck shadow
  R(c, "#1a1a1a", 17, 13, 4, 8);
  R(c, "#111111", 19, 14, 3, 6);

  // Base flare
  R(c, "#2a2a2a", 7, 22, 18, 2);
  R(c, "#383838", 8, 21, 14, 1);

  // Base
  R(c, "#2a2a2a", 6, 24, 20, 5);
  R(c, "#383838", 7, 24, 18, 1);   // base top
  R(c, "#484848", 8, 24, 4, 2);    // base shine
  R(c, "#1a1a1a", 6, 27, 20, 2);   // base shadow
  R(c, "#111111", 6, 28, 20, 1);   // base darkest
}

// Classic Black Bishop (32x32)
function drawClassicBlack32Bishop(c) {
  // Outline
  R(c, "#666666", 13, 0, 1, 1);   // top ball outline left
  R(c, "#666666", 18, 0, 1, 1);   // top ball outline right
  R(c, "#666666", 8, 4, 1, 8);    // mitre left outline
  R(c, "#666666", 23, 4, 1, 8);   // mitre right outline
  R(c, "#666666", 5, 29, 22, 1);  // base bottom outline

  // Top ball
  R(c, "#2a2a2a", 14, 0, 4, 3);
  R(c, "#2a2a2a", 13, 1, 1, 1);
  R(c, "#2a2a2a", 18, 1, 1, 1);
  R(c, "#484848", 14, 0, 2, 1);   // ball highlight
  R(c, "#1a1a1a", 16, 2, 2, 1);   // ball shadow

  // Mitre point
  R(c, "#2a2a2a", 12, 3, 8, 2);
  R(c, "#2a2a2a", 10, 5, 12, 3);
  R(c, "#2a2a2a", 9, 8, 14, 4);
  // Mitre highlight
  R(c, "#484848", 11, 5, 3, 3);
  R(c, "#555555", 12, 5, 2, 2);
  // Mitre slit (lighter to show detail)
  R(c, "#484848", 14, 5, 4, 4);
  R(c, "#555555", 15, 6, 2, 2);
  // Mitre shadow
  R(c, "#1a1a1a", 18, 5, 4, 6);
  R(c, "#111111", 20, 6, 2, 4);

  // Collar band
  R(c, "#2a2a2a", 8, 12, 16, 3);
  R(c, "#383838", 9, 12, 14, 1);   // collar top highlight
  R(c, "#1a1a1a", 8, 14, 16, 1);   // collar shadow

  // Body (tapered)
  R(c, "#2a2a2a", 9, 15, 14, 8);
  R(c, "#383838", 10, 16, 6, 6);   // body highlight
  R(c, "#484848", 11, 17, 3, 3);   // brightest highlight
  // Body shadow
  R(c, "#1a1a1a", 19, 15, 3, 7);
  R(c, "#111111", 20, 16, 2, 5);

  // Base flare
  R(c, "#2a2a2a", 7, 23, 18, 2);
  R(c, "#383838", 8, 22, 16, 1);

  // Base
  R(c, "#2a2a2a", 6, 25, 20, 4);
  R(c, "#383838", 7, 25, 18, 1);   // base top
  R(c, "#484848", 8, 25, 4, 2);    // base shine
  R(c, "#1a1a1a", 6, 27, 20, 2);   // base shadow
  R(c, "#111111", 6, 28, 20, 1);   // base darkest
}

// Classic Black Queen (32x32)
function drawClassicBlack32Queen(c) {
  // Crown point outlines
  R(c, "#666666", 4, 0, 1, 3);    // left point outline
  R(c, "#666666", 27, 0, 1, 3);   // right point outline

  // Crown balls on 3 points
  R(c, "#2a2a2a", 5, 0, 3, 3);    // left ball
  R(c, "#2a2a2a", 14, 0, 4, 2);   // center ball
  R(c, "#2a2a2a", 24, 0, 3, 3);   // right ball
  // Ball highlights
  R(c, "#484848", 5, 0, 2, 1);
  R(c, "#484848", 14, 0, 2, 1);
  R(c, "#484848", 24, 0, 2, 1);

  // Crown connecting arches
  R(c, "#2a2a2a", 8, 2, 6, 3);    // left arch
  R(c, "#2a2a2a", 18, 2, 6, 3);   // right arch
  R(c, "#383838", 9, 1, 5, 2);
  R(c, "#383838", 19, 1, 5, 2);

  // Crown body
  R(c, "#2a2a2a", 6, 4, 20, 4);
  R(c, "#383838", 8, 4, 16, 1);   // crown top highlight
  R(c, "#1a1a1a", 8, 6, 16, 2);   // crown band shadow
  // Crown details
  R(c, "#484848", 10, 5, 2, 1);
  R(c, "#484848", 20, 5, 2, 1);

  // Neck
  R(c, "#2a2a2a", 10, 8, 12, 3);
  R(c, "#383838", 11, 9, 10, 1);

  // Body (tapered)
  R(c, "#2a2a2a", 8, 11, 16, 10);
  R(c, "#383838", 9, 12, 8, 8);   // body highlight
  R(c, "#484848", 11, 13, 3, 4);
  R(c, "#555555", 12, 14, 2, 2);  // brightest
  // Body shadow
  R(c, "#1a1a1a", 20, 11, 3, 9);
  R(c, "#111111", 21, 12, 2, 7);

  // Base flare
  R(c, "#2a2a2a", 6, 21, 20, 2);
  R(c, "#383838", 7, 20, 18, 1);

  // Base
  R(c, "#666666", 3, 29, 26, 1);  // base outline bottom
  R(c, "#2a2a2a", 4, 23, 24, 6);
  R(c, "#383838", 5, 23, 22, 1);   // base top
  R(c, "#484848", 7, 23, 5, 2);    // base shine
  R(c, "#1a1a1a", 4, 27, 24, 2);   // base shadow
  R(c, "#111111", 4, 28, 24, 1);   // base darkest
}

// Classic Black King (32x32)
function drawClassicBlack32King(c) {
  // Cross on top
  R(c, "#2a2a2a", 14, 0, 4, 8);   // vertical beam
  R(c, "#2a2a2a", 10, 2, 12, 4);  // horizontal beam
  R(c, "#484848", 14, 0, 2, 2);   // cross highlight
  R(c, "#484848", 10, 3, 3, 1);   // cross arm highlight
  R(c, "#1a1a1a", 16, 4, 2, 4);   // cross shadow
  R(c, "#1a1a1a", 18, 3, 4, 2);   // cross arm shadow
  // Cross outline
  R(c, "#666666", 12, 1, 1, 2);   // arm outline left
  R(c, "#666666", 19, 1, 1, 2);   // arm outline right
  R(c, "#666666", 13, 0, 1, 1);   // top outline left
  R(c, "#666666", 18, 0, 1, 1);   // top outline right

  // Crown band
  R(c, "#2a2a2a", 7, 7, 18, 5);
  R(c, "#383838", 8, 7, 16, 2);   // crown top highlight
  R(c, "#1a1a1a", 9, 9, 14, 2);   // crown band shadow
  // Crown outline
  R(c, "#666666", 6, 7, 1, 5);    // crown left outline
  R(c, "#666666", 25, 7, 1, 5);   // crown right outline
  // Crown highlight
  R(c, "#484848", 9, 7, 4, 2);
  R(c, "#555555", 10, 7, 2, 1);
  // Crown shadow
  R(c, "#1a1a1a", 20, 7, 4, 4);
  R(c, "#111111", 22, 8, 2, 3);

  // Neck
  R(c, "#2a2a2a", 10, 12, 12, 3);
  R(c, "#383838", 11, 13, 10, 1);

  // Body (tapered)
  R(c, "#2a2a2a", 8, 15, 16, 8);
  R(c, "#383838", 9, 16, 8, 6);   // body highlight
  R(c, "#484848", 11, 17, 3, 3);  // brightest highlight
  R(c, "#555555", 12, 17, 2, 2);
  // Body shadow
  R(c, "#1a1a1a", 20, 15, 3, 7);
  R(c, "#111111", 21, 16, 2, 5);

  // Base flare
  R(c, "#2a2a2a", 6, 23, 20, 2);
  R(c, "#383838", 7, 22, 18, 1);

  // Base
  R(c, "#666666", 3, 29, 26, 1);  // base outline bottom
  R(c, "#2a2a2a", 4, 25, 24, 4);
  R(c, "#383838", 5, 25, 22, 1);   // base top
  R(c, "#484848", 7, 25, 5, 2);    // base shine
  R(c, "#1a1a1a", 4, 27, 24, 2);   // base shadow
  R(c, "#111111", 4, 28, 24, 1);   // base darkest
}

// ============================================================
// NINJA 32x32 PIECES
// Shadow Ninjas - dark theme with purple accents and red eyes
// ============================================================

function drawNinja32Pawn(c) {
  // Shadow Genin - stealthy foot soldier with shuriken (32x32)
  // Black hood/mask - wrapped tight
  R(c, "#0d0d0d", 10, 0, 12, 4);   // top of hood
  R(c, "#1a1a1a", 8, 4, 16, 6);    // full head wrap
  R(c, "#141414", 10, 4, 12, 4);   // inner shadow
  R(c, "#0d0d0d", 9, 3, 14, 1);    // hood brim
  // Glowing red eyes peering through mask slit
  R(c, "#2a2a2a", 10, 6, 12, 2);   // mask slit
  R(c, "#ff0033", 12, 6, 2, 2);    // left eye glow
  R(c, "#ff0033", 18, 6, 2, 2);    // right eye glow
  R(c, "#cc0022", 14, 7, 2, 1);    // eye reflection L
  R(c, "#cc0022", 16, 7, 2, 1);    // eye reflection R
  R(c, "#ff4444", 12, 6, 1, 1);    // left eye bright
  R(c, "#ff4444", 19, 6, 1, 1);    // right eye bright
  // Body - dark gi with purple trim
  R(c, "#0d0d0d", 8, 10, 16, 10);  // torso
  R(c, "#1a1a1a", 10, 10, 12, 8);  // inner gi
  R(c, "#3a1a5e", 8, 10, 2, 10);   // left purple trim
  R(c, "#3a1a5e", 22, 10, 2, 10);  // right purple trim
  R(c, "#2d1450", 12, 12, 8, 2);   // belt/obi
  R(c, "#3a1a5e", 13, 12, 6, 1);   // obi highlight
  // Shuriken in right hand
  R(c, "#d0d0d0", 24, 10, 2, 2);   // star center
  R(c, "#e0e0e0", 25, 10, 1, 1);   // star glint
  R(c, "#b0b0b0", 22, 8, 2, 2);    // star point top-left
  R(c, "#b0b0b0", 26, 8, 2, 2);    // star point top-right
  R(c, "#b0b0b0", 22, 12, 2, 2);   // star point bottom-left
  R(c, "#b0b0b0", 26, 12, 2, 2);   // star point bottom-right
  // Arms
  R(c, "#0d0d0d", 6, 12, 2, 6);    // left arm
  R(c, "#141414", 6, 13, 2, 4);    // left arm highlight
  R(c, "#0d0d0d", 24, 12, 2, 6);   // right arm
  // Leg wraps - tapered stance
  R(c, "#0d0d0d", 10, 20, 4, 8);   // left leg
  R(c, "#0d0d0d", 18, 20, 4, 8);   // right leg
  R(c, "#1a1a1a", 10, 22, 2, 4);   // left leg wrap
  R(c, "#1a1a1a", 20, 22, 2, 4);   // right leg wrap
  // Tabi boots
  R(c, "#222222", 10, 28, 4, 4);   // left boot
  R(c, "#222222", 18, 28, 4, 4);   // right boot
  R(c, "#2a2a2a", 10, 28, 2, 2);   // boot highlight L
  R(c, "#2a2a2a", 18, 28, 2, 2);   // boot highlight R
}

function drawNinja32Rook(c) {
  // Shadow Pagoda - dark Japanese fortress (32x32)
  // Top roof tier
  R(c, "#1a0a2e", 6, 0, 20, 2);    // top roof overhang
  R(c, "#2d1450", 8, 0, 16, 2);    // roof purple accent
  R(c, "#0d0d0d", 10, 2, 12, 2);   // upper roof shadow
  // Shachihoko gold ornament
  R(c, "#ffd700", 14, 0, 4, 2);    // gold ornament
  R(c, "#ffaa00", 15, 0, 2, 1);    // ornament highlight
  // Upper floor
  R(c, "#1a1a1a", 8, 4, 16, 4);    // dark walls
  R(c, "#ff0033", 12, 4, 2, 2);    // left lantern glow
  R(c, "#ff0033", 18, 4, 2, 2);    // right lantern glow
  R(c, "#ff4444", 12, 4, 1, 1);    // lantern bright L
  R(c, "#ff4444", 19, 4, 1, 1);    // lantern bright R
  R(c, "#2a2a2a", 10, 6, 12, 2);   // upper window strip
  // Middle roof
  R(c, "#1a0a2e", 4, 8, 24, 2);    // wide mid-roof
  R(c, "#2d1450", 6, 8, 20, 2);    // roof purple accent
  // Middle floor
  R(c, "#1a1a1a", 6, 10, 20, 4);   // dark walls
  R(c, "#2a2a2a", 8, 10, 16, 2);   // wall detail
  R(c, "#ff0033", 10, 12, 2, 2);   // lantern left
  R(c, "#ff0033", 20, 12, 2, 2);   // lantern right
  R(c, "#0d0d0d", 12, 10, 8, 4);   // center shadow window
  // Lower roof
  R(c, "#1a0a2e", 2, 14, 28, 2);   // widest roof
  R(c, "#2d1450", 4, 14, 24, 2);   // roof accent
  // Ground floor - heavy stone base
  R(c, "#1a1a1a", 4, 16, 24, 8);   // walls
  R(c, "#2a2a2a", 6, 16, 20, 6);   // inner wall
  R(c, "#0d0d0d", 12, 18, 8, 6);   // dark doorway
  R(c, "#3a1a5e", 14, 18, 4, 4);   // purple inner glow
  R(c, "#2d1450", 15, 19, 2, 2);   // glow center
  // Stone foundation
  R(c, "#333333", 4, 24, 24, 4);   // stone base
  R(c, "#444444", 6, 24, 20, 2);   // base highlight
  R(c, "#222222", 4, 28, 24, 4);   // foundation
  R(c, "#1a1a1a", 4, 30, 24, 2);   // foundation shadow
}

function drawNinja32Knight(c) {
  // Shadow Stallion - spectral black horse with ninja rider (32x32)
  // Ninja rider head
  R(c, "#0d0d0d", 16, 0, 8, 6);    // hood
  R(c, "#1a1a1a", 18, 2, 4, 2);    // inner hood
  R(c, "#ff0033", 18, 2, 2, 2);    // left eye glow
  R(c, "#ff0033", 20, 2, 2, 2);    // right eye glow
  R(c, "#ff4444", 18, 2, 1, 1);    // eye bright L
  R(c, "#ff4444", 21, 2, 1, 1);    // eye bright R
  // Rider body on horseback
  R(c, "#0d0d0d", 16, 6, 8, 6);    // rider torso
  R(c, "#3a1a5e", 18, 6, 4, 2);    // purple collar
  R(c, "#2d1450", 19, 7, 2, 1);    // collar dark
  // Kusarigama weapon extended
  R(c, "#d0d0d0", 24, 2, 2, 6);    // chain sickle blade
  R(c, "#e0e0e0", 24, 2, 2, 2);    // blade bright
  R(c, "#b0b0b0", 26, 4, 2, 2);    // blade tip
  R(c, "#888888", 24, 8, 2, 4);    // chain links
  R(c, "#999999", 24, 9, 1, 1);    // chain highlight
  // Horse head - ghostly
  R(c, "#1a1a1a", 4, 6, 8, 6);     // head shape
  R(c, "#0d0d0d", 2, 8, 4, 4);     // muzzle
  R(c, "#2a2a2a", 6, 6, 4, 4);     // face detail
  R(c, "#ff0033", 6, 8, 2, 2);     // red eye
  R(c, "#ff4444", 6, 8, 1, 1);     // eye bright
  // Ear
  R(c, "#1a1a1a", 6, 4, 2, 2);     // ear
  // Horse mane - purple tinted
  R(c, "#3a1a5e", 10, 4, 2, 6);    // mane
  R(c, "#2d1450", 12, 6, 2, 4);    // mane shadow
  // Horse body
  R(c, "#1a1a1a", 8, 12, 16, 8);   // main body
  R(c, "#2a2a2a", 10, 14, 12, 4);  // body highlight
  R(c, "#0d0d0d", 8, 16, 4, 4);    // chest shadow
  // Spectral wisps under horse
  R(c, "#3a1a5e", 6, 18, 2, 2);    // purple wisp
  R(c, "#2d1450", 24, 16, 2, 2);   // purple wisp
  R(c, "#3a1a5e", 4, 17, 2, 1);    // wisp trail
  // Horse legs - in gallop pose
  R(c, "#1a1a1a", 8, 20, 4, 8);    // front left leg
  R(c, "#1a1a1a", 12, 20, 4, 6);   // front right (raised)
  R(c, "#1a1a1a", 18, 20, 4, 8);   // back left leg
  R(c, "#1a1a1a", 22, 20, 4, 6);   // back right (raised)
  // Hooves
  R(c, "#333333", 8, 28, 4, 4);    // front hoof
  R(c, "#333333", 18, 28, 4, 4);   // back hoof
  R(c, "#444444", 8, 28, 2, 2);    // hoof highlight
  R(c, "#444444", 18, 28, 2, 2);   // hoof highlight
  // Smoke/shadow trail
  R(c, "#2a2a2a", 26, 20, 4, 2);   // shadow trail
  R(c, "#1a1a1a", 28, 22, 2, 2);   // wisp
}

function drawNinja32Bishop(c) {
  // Shadow Monk - mystic ninja with dark arts scroll (32x32)
  // Conical straw hat (amigasa) - deep purple
  R(c, "#2d1450", 6, 0, 20, 2);    // hat brim wide
  R(c, "#3a1a5e", 8, 0, 16, 2);    // hat highlight
  R(c, "#1a0a2e", 10, 2, 12, 2);   // hat mid
  R(c, "#2d1450", 12, 2, 8, 2);    // hat accent
  R(c, "#3a1a5e", 13, 1, 6, 1);    // hat shine
  // Face behind veil
  R(c, "#0d0d0d", 10, 4, 12, 6);   // dark mask
  R(c, "#1a1a1a", 12, 4, 8, 4);    // inner
  // Glowing mystic eyes - bright green
  R(c, "#00ff66", 12, 6, 2, 2);    // left eye
  R(c, "#00ff66", 18, 6, 2, 2);    // right eye
  R(c, "#00cc44", 14, 7, 2, 1);    // eye glow spread
  R(c, "#00cc44", 16, 7, 2, 1);    // eye glow spread
  R(c, "#88ffaa", 12, 6, 1, 1);    // left eye bright
  R(c, "#88ffaa", 19, 6, 1, 1);    // right eye bright
  // Monk robes - flowing dark with mystic symbols
  R(c, "#0d0d0d", 6, 10, 20, 14);  // outer robe
  R(c, "#1a1a1a", 8, 10, 16, 12);  // inner robe
  R(c, "#2a2a2a", 10, 12, 12, 8);  // robe folds
  // Mystic kanji symbol on chest
  R(c, "#00ff66", 12, 12, 2, 4);   // kanji stroke 1
  R(c, "#00ff66", 14, 14, 4, 2);   // kanji stroke 2
  R(c, "#00ff66", 18, 12, 2, 4);   // kanji stroke 3
  R(c, "#00cc44", 13, 13, 1, 2);   // kanji glow
  R(c, "#00cc44", 19, 13, 1, 2);   // kanji glow
  // Enchanted scroll in left hand
  R(c, "#f5f5dc", 4, 10, 2, 8);    // scroll shaft
  R(c, "#e8d8a0", 4, 8, 2, 2);     // scroll top
  R(c, "#e8d8a0", 4, 18, 2, 2);    // scroll bottom
  R(c, "#00ff66", 4, 12, 2, 2);    // glowing text
  R(c, "#00ff66", 4, 16, 2, 2);    // glowing text
  R(c, "#00cc44", 5, 14, 1, 2);    // text glow
  // Spirit orb in right hand
  R(c, "#00ff66", 26, 12, 4, 4);   // orb glow
  R(c, "#88ffaa", 26, 12, 2, 2);   // orb highlight
  R(c, "#00cc44", 28, 14, 2, 2);   // orb shadow
  // Arms
  R(c, "#0d0d0d", 4, 12, 2, 6);    // left arm
  R(c, "#0d0d0d", 26, 14, 2, 4);   // right arm
  // Robe bottom hem
  R(c, "#3a1a5e", 6, 22, 20, 2);   // purple hem
  R(c, "#2d1450", 8, 23, 16, 1);   // hem shadow
  // Legs hidden in robe, sandals peek
  R(c, "#0d0d0d", 10, 24, 4, 4);   // left robe
  R(c, "#0d0d0d", 18, 24, 4, 4);   // right robe
  // Sandals
  R(c, "#4a3520", 10, 28, 4, 4);   // left sandal
  R(c, "#4a3520", 18, 28, 4, 4);   // right sandal
  R(c, "#5a4530", 10, 28, 2, 2);   // sandal highlight L
  R(c, "#5a4530", 18, 28, 2, 2);   // sandal highlight R
}

function drawNinja32Queen(c) {
  // Kunoichi Grandmaster - deadly female ninja assassin (32x32)
  // Long dark hair flowing back
  R(c, "#0d0d0d", 8, 0, 16, 4);    // hair top
  R(c, "#1a1a1a", 6, 2, 4, 8);     // hair left flowing
  R(c, "#1a1a1a", 22, 2, 4, 8);    // hair right flowing
  R(c, "#0d0d0d", 26, 6, 2, 6);    // hair trail right
  R(c, "#141414", 7, 3, 2, 6);     // hair strand L
  R(c, "#141414", 23, 3, 2, 6);    // hair strand R
  // Face - half-mask with visible eye
  R(c, "#0d0d0d", 10, 4, 12, 6);   // head
  R(c, "#ffe0bd", 12, 4, 8, 4);    // visible face
  R(c, "#ffd0a8", 13, 5, 6, 2);    // face shadow
  R(c, "#0d0d0d", 12, 6, 8, 2);    // lower mask
  R(c, "#cc0044", 14, 4, 2, 2);    // left eye (crimson)
  R(c, "#cc0044", 16, 4, 2, 2);    // right eye (crimson)
  R(c, "#ff0055", 14, 4, 1, 1);    // eye bright L
  R(c, "#ff0055", 17, 4, 1, 1);    // eye bright R
  // Ornamental hairpin
  R(c, "#ffd700", 10, 0, 2, 2);    // gold hairpin
  R(c, "#ff0033", 8, 0, 2, 2);     // red ornament
  // Body - sleek battle kunoichi outfit
  R(c, "#0d0d0d", 8, 10, 16, 12);  // torso armor
  R(c, "#1a1a1a", 10, 10, 12, 10); // inner armor
  R(c, "#cc0044", 12, 10, 8, 2);   // crimson collar
  R(c, "#cc0044", 12, 14, 8, 2);   // crimson sash/obi
  R(c, "#3a1a5e", 10, 12, 2, 2);   // left trim
  R(c, "#3a1a5e", 20, 12, 2, 2);   // right trim
  // Twin wakizashi blades - crossed
  R(c, "#d0d0d0", 4, 6, 2, 12);    // left blade
  R(c, "#e8e8e8", 4, 6, 2, 2);     // blade tip L
  R(c, "#c0c0c0", 4, 8, 2, 8);     // blade mid L
  R(c, "#8b4513", 4, 16, 2, 2);    // hilt L
  R(c, "#ffd700", 4, 18, 2, 2);    // pommel L
  R(c, "#d0d0d0", 26, 6, 2, 12);   // right blade
  R(c, "#e8e8e8", 26, 6, 2, 2);    // blade tip R
  R(c, "#c0c0c0", 26, 8, 2, 8);    // blade mid R
  R(c, "#8b4513", 26, 16, 2, 2);   // hilt R
  R(c, "#ffd700", 26, 18, 2, 2);   // pommel R
  // Arms extended
  R(c, "#0d0d0d", 6, 12, 2, 6);    // left arm
  R(c, "#0d0d0d", 24, 12, 2, 6);   // right arm
  // Legs - battle stance
  R(c, "#0d0d0d", 10, 22, 4, 6);   // left leg
  R(c, "#0d0d0d", 18, 22, 4, 6);   // right leg
  R(c, "#cc0044", 10, 22, 4, 2);   // red leg wrap L
  R(c, "#cc0044", 18, 22, 4, 2);   // red leg wrap R
  // Tabi boots
  R(c, "#222222", 10, 28, 4, 4);   // left boot
  R(c, "#222222", 18, 28, 4, 4);   // right boot
  R(c, "#2a2a2a", 10, 28, 2, 2);   // boot highlight L
  R(c, "#2a2a2a", 18, 28, 2, 2);   // boot highlight R
}

function drawNinja32King(c) {
  // Shadow Shogun - demonic oni-masked warlord (32x32)
  // Oni mask with horns - terrifying demon face
  R(c, "#0d0d0d", 6, 0, 2, 4);     // left horn base
  R(c, "#1a0a2e", 4, 0, 2, 2);     // left horn tip
  R(c, "#0d0d0d", 24, 0, 2, 4);    // right horn base
  R(c, "#1a0a2e", 26, 0, 2, 2);    // right horn tip
  R(c, "#1a0a2e", 3, 0, 1, 1);     // left horn point
  R(c, "#1a0a2e", 27, 0, 1, 1);    // right horn point
  // Oni mask
  R(c, "#8b0000", 8, 0, 16, 8);    // red demon mask
  R(c, "#cc0000", 10, 2, 12, 4);   // mask face
  R(c, "#ff0000", 12, 2, 8, 2);    // mask highlight
  // Burning yellow eyes
  R(c, "#ffff00", 10, 2, 4, 2);    // left eye blaze
  R(c, "#ffff00", 18, 2, 4, 2);    // right eye blaze
  R(c, "#ffaa00", 12, 4, 2, 2);    // left eye lower
  R(c, "#ffaa00", 18, 4, 2, 2);    // right eye lower
  R(c, "#ffffff", 10, 2, 2, 1);    // left eye bright
  R(c, "#ffffff", 20, 2, 2, 1);    // right eye bright
  // Fanged mouth
  R(c, "#ffffff", 12, 6, 2, 2);    // left fang
  R(c, "#ffffff", 18, 6, 2, 2);    // right fang
  R(c, "#440000", 14, 6, 4, 2);    // mouth darkness
  R(c, "#330000", 15, 7, 2, 1);    // mouth deep
  // Shogun helmet crest
  R(c, "#ffd700", 14, 0, 4, 2);    // gold crest
  R(c, "#ffaa00", 15, 0, 2, 1);    // crest shadow
  // Heavy shadow armor
  R(c, "#0d0d0d", 6, 8, 20, 14);   // outer armor
  R(c, "#1a1a1a", 8, 8, 16, 12);   // inner armor
  R(c, "#2a2a2a", 10, 10, 12, 8);  // armor detail
  // Glowing demon kanji on chest
  R(c, "#ff0033", 12, 10, 2, 6);   // kanji stroke 1
  R(c, "#ff0033", 14, 12, 4, 2);   // kanji stroke 2
  R(c, "#ff0033", 18, 10, 2, 6);   // kanji stroke 3
  R(c, "#ff4444", 13, 11, 1, 4);   // kanji glow
  R(c, "#ff4444", 19, 11, 1, 4);   // kanji glow
  // Spiked shoulder pauldrons
  R(c, "#333333", 6, 8, 2, 4);     // left pauldron
  R(c, "#444444", 4, 8, 2, 2);     // left spike
  R(c, "#333333", 24, 8, 2, 4);    // right pauldron
  R(c, "#444444", 26, 8, 2, 2);    // right spike
  // Shadow Nodachi (great sword) on back
  R(c, "#d0d0d0", 28, 0, 2, 20);   // blade
  R(c, "#e8e8e8", 28, 0, 2, 4);    // blade edge
  R(c, "#c0c0c0", 28, 4, 2, 14);   // blade mid
  R(c, "#ffd700", 28, 18, 2, 2);   // tsuba (guard)
  R(c, "#5c3a1e", 28, 20, 2, 6);   // handle wrap
  R(c, "#4a2e14", 29, 21, 1, 4);   // wrap shadow
  // Dark energy / shadow aura
  R(c, "#3a1a5e", 4, 14, 2, 4);    // left aura
  R(c, "#2d1450", 2, 16, 2, 2);    // left wisp
  R(c, "#3a1a5e", 26, 14, 2, 4);   // right aura
  R(c, "#2d1450", 28, 16, 2, 2);   // right wisp
  // Armored legs
  R(c, "#0d0d0d", 10, 22, 4, 6);   // left leg
  R(c, "#0d0d0d", 18, 22, 4, 6);   // right leg
  R(c, "#333333", 10, 24, 4, 2);   // left shin guard
  R(c, "#333333", 18, 24, 4, 2);   // right shin guard
  // Armored boots
  R(c, "#222222", 10, 28, 4, 4);   // left boot
  R(c, "#222222", 18, 28, 4, 4);   // right boot
  R(c, "#2a2a2a", 10, 28, 2, 2);   // boot highlight L
  R(c, "#2a2a2a", 18, 28, 2, 2);   // boot highlight R
}

// ============================================================
// CRUSADER 32x32 PIECES
// Templar Knights - white/silver with red Templar crosses
// ============================================================

function drawCrusader32Pawn(c) {
  // Templar foot soldier (32x32)
  // Chain mail coif (hood)
  R(c, "#999999", 10, 0, 12, 6);   // coif main
  R(c, "#aaaaaa", 12, 0, 8, 4);    // coif highlight
  R(c, "#888888", 10, 4, 12, 2);   // coif lower
  R(c, "#777777", 8, 4, 2, 2);     // coif drape left
  R(c, "#777777", 22, 4, 2, 2);    // coif drape right
  R(c, "#bbbbbb", 13, 1, 6, 2);    // coif shine
  // Face
  R(c, "#f0c896", 12, 6, 8, 4);    // face
  R(c, "#111111", 14, 6, 2, 2);    // left eye
  R(c, "#111111", 18, 6, 2, 2);    // right eye
  R(c, "#daa870", 14, 8, 4, 2);    // mouth shadow
  // White tabard with red Templar cross
  R(c, "#eeeeee", 8, 10, 16, 12);  // tabard
  R(c, "#dddddd", 10, 12, 12, 8);  // tabard inner
  R(c, "#dd0000", 14, 10, 4, 12);  // vertical cross
  R(c, "#dd0000", 10, 14, 12, 2);  // horizontal cross
  R(c, "#cc0000", 15, 11, 2, 10);  // cross shadow
  // Chain mail sleeves
  R(c, "#999999", 6, 10, 2, 8);    // left sleeve
  R(c, "#888888", 6, 14, 2, 4);    // left sleeve shadow
  R(c, "#999999", 24, 10, 2, 8);   // right sleeve
  R(c, "#888888", 24, 14, 2, 4);   // right sleeve shadow
  // Sword at side
  R(c, "#d0d0d0", 26, 4, 2, 16);   // blade
  R(c, "#e0e0e0", 26, 4, 2, 2);    // tip
  R(c, "#c0c0c0", 26, 6, 2, 12);   // blade mid
  R(c, "#ffd700", 26, 12, 2, 2);   // crossguard
  R(c, "#ffd700", 28, 12, 2, 2);   // crossguard ext
  R(c, "#8b6914", 26, 14, 2, 4);   // grip
  // Chain mail legs
  R(c, "#999999", 10, 22, 4, 4);   // left leg
  R(c, "#999999", 18, 22, 4, 4);   // right leg
  R(c, "#888888", 11, 23, 2, 2);   // leg shadow L
  R(c, "#888888", 19, 23, 2, 2);   // leg shadow R
  // Boots
  R(c, "#555555", 10, 26, 4, 4);   // left boot
  R(c, "#555555", 18, 26, 4, 4);   // right boot
  R(c, "#666666", 10, 26, 2, 2);   // boot highlight L
  R(c, "#666666", 18, 26, 2, 2);   // boot highlight R
}

function drawCrusader32Rook(c) {
  // Crusader castle / fortified tower (32x32)
  // Banner on top
  R(c, "#eeeeee", 12, 0, 8, 4);    // white banner
  R(c, "#dd0000", 14, 0, 4, 4);    // red cross on banner
  R(c, "#dddddd", 13, 1, 6, 2);    // banner shadow
  // Crenellations (battlements)
  R(c, "#aaaaaa", 4, 4, 4, 4);     // left battlement
  R(c, "#aaaaaa", 12, 4, 8, 2);    // center battlement
  R(c, "#aaaaaa", 24, 4, 4, 4);    // right battlement
  R(c, "#bbbbbb", 4, 6, 24, 2);    // connecting wall
  R(c, "#cccccc", 5, 4, 2, 2);     // battlement highlight L
  R(c, "#cccccc", 25, 4, 2, 2);    // battlement highlight R
  // Tower body (stone blocks)
  R(c, "#cccccc", 6, 8, 20, 14);   // main stone
  R(c, "#bbbbbb", 8, 8, 16, 2);    // stone top
  R(c, "#aaaaaa", 6, 12, 20, 2);   // stone line
  R(c, "#aaaaaa", 6, 18, 20, 2);   // stone line
  R(c, "#dddddd", 8, 9, 6, 2);     // stone highlight
  // Red cross on tower
  R(c, "#dd0000", 14, 10, 4, 8);   // vertical cross
  R(c, "#dd0000", 12, 12, 8, 4);   // horizontal cross
  R(c, "#cc0000", 15, 11, 2, 6);   // cross shadow
  // Arrow slits
  R(c, "#222222", 8, 10, 2, 4);    // left arrow slit
  R(c, "#222222", 22, 10, 2, 4);   // right arrow slit
  R(c, "#333333", 8, 10, 1, 2);    // slit shadow L
  R(c, "#333333", 22, 10, 1, 2);   // slit shadow R
  // Gate/entrance
  R(c, "#555555", 14, 18, 4, 4);   // gate
  R(c, "#444444", 14, 18, 4, 2);   // gate shadow
  R(c, "#666666", 15, 19, 2, 2);   // gate highlight
  // Base (stone foundation)
  R(c, "#999999", 4, 22, 24, 4);   // base
  R(c, "#888888", 6, 24, 20, 2);   // base shadow
  R(c, "#aaaaaa", 6, 22, 16, 2);   // base highlight
  R(c, "#777777", 4, 26, 24, 4);   // foundation
  R(c, "#666666", 4, 28, 24, 2);   // foundation shadow
}

function drawCrusader32Knight(c) {
  // Mounted Templar knight with lance (32x32)
  // White horse head
  R(c, "#dddddd", 4, 6, 8, 6);     // head
  R(c, "#cccccc", 2, 8, 4, 4);     // muzzle
  R(c, "#111111", 4, 8, 2, 2);     // eye
  R(c, "#aaaaaa", 2, 10, 2, 2);    // nostril
  R(c, "#eeeeee", 5, 6, 4, 2);     // head highlight
  // Bridle
  R(c, "#dd0000", 6, 10, 4, 2);    // red bridle
  // Horse armor barding (white with red cross)
  R(c, "#dddddd", 10, 12, 14, 8);  // barding
  R(c, "#cccccc", 12, 14, 10, 4);  // barding shade
  R(c, "#dd0000", 14, 12, 4, 6);   // cross on barding
  R(c, "#dd0000", 12, 14, 8, 2);   // cross horizontal
  R(c, "#eeeeee", 10, 12, 4, 2);   // barding highlight
  // Knight rider in great helm
  R(c, "#aaaaaa", 16, 0, 8, 6);    // great helm
  R(c, "#bbbbbb", 18, 0, 4, 4);    // helm highlight
  R(c, "#222222", 18, 2, 4, 2);    // visor slit
  R(c, "#999999", 16, 6, 8, 6);    // armor body
  R(c, "#dd0000", 18, 8, 4, 2);    // cross on chest
  R(c, "#aaaaaa", 17, 7, 6, 4);    // armor highlight
  // Lance with pennant
  R(c, "#8b6914", 2, 0, 2, 16);    // wooden shaft
  R(c, "#d0d0d0", 2, 0, 2, 4);     // steel tip
  R(c, "#e0e0e0", 2, 0, 2, 2);     // tip bright
  R(c, "#dd0000", 4, 4, 2, 4);     // red pennant
  R(c, "#eeeeee", 4, 6, 2, 2);     // pennant white
  // Horse legs (galloping)
  R(c, "#dddddd", 10, 20, 4, 8);   // front left
  R(c, "#dddddd", 20, 20, 4, 8);   // back right
  R(c, "#cccccc", 11, 22, 2, 4);   // leg shadow
  R(c, "#cccccc", 21, 22, 2, 4);   // leg shadow
  // Hooves
  R(c, "#888888", 10, 28, 4, 2);   // front hoof
  R(c, "#888888", 20, 28, 4, 2);   // back hoof
}

function drawCrusader32Bishop(c) {
  // Templar chaplain / priest (32x32)
  // Mitre bishop hat
  R(c, "#ffffff", 12, 0, 8, 4);    // mitre top
  R(c, "#eeeeee", 14, 0, 4, 2);    // mitre inner
  R(c, "#ffd700", 14, 0, 4, 2);    // gold top
  R(c, "#ffffff", 10, 4, 12, 4);   // mitre body
  R(c, "#ffd700", 10, 4, 12, 2);   // gold band
  R(c, "#dd0000", 14, 2, 4, 2);    // cross on mitre
  R(c, "#eeeeee", 11, 5, 4, 2);    // mitre highlight
  // Face
  R(c, "#f0c896", 12, 8, 8, 4);    // face
  R(c, "#111111", 14, 8, 2, 2);    // left eye
  R(c, "#111111", 18, 8, 2, 2);    // right eye
  R(c, "#daa870", 14, 10, 4, 2);   // chin shadow
  // White robe with red cross
  R(c, "#eeeeee", 8, 12, 16, 10);  // robe
  R(c, "#dddddd", 10, 14, 12, 6);  // robe inner
  R(c, "#dd0000", 14, 12, 4, 10);  // vertical cross
  R(c, "#dd0000", 10, 16, 12, 2);  // horizontal cross
  R(c, "#cc0000", 15, 13, 2, 8);   // cross shadow
  // Golden crozier (bishop staff)
  R(c, "#ffd700", 26, 2, 2, 20);   // staff shaft
  R(c, "#ffd700", 24, 2, 4, 2);    // crook top
  R(c, "#ffd700", 24, 4, 2, 2);    // crook curve
  R(c, "#ffaa00", 26, 6, 2, 2);    // ornament
  R(c, "#ffcc00", 25, 3, 2, 2);    // crook highlight
  // Holy book in hand
  R(c, "#8b4513", 6, 14, 4, 4);    // book
  R(c, "#ffd700", 6, 14, 4, 2);    // gold edges
  R(c, "#6b3510", 6, 16, 4, 2);    // book dark
  R(c, "#f0e6d0", 8, 15, 2, 2);    // page edge
  // Sandals
  R(c, "#8b6914", 10, 22, 4, 6);   // left sandal
  R(c, "#8b6914", 18, 22, 4, 6);   // right sandal
  R(c, "#6b4410", 10, 28, 4, 2);   // sole L
  R(c, "#6b4410", 18, 28, 4, 2);   // sole R
  R(c, "#9b7924", 10, 22, 2, 2);   // sandal highlight L
  R(c, "#9b7924", 18, 22, 2, 2);   // sandal highlight R
}

function drawCrusader32Queen(c) {
  // Templar Grand Master (32x32)
  // Great helm with red plume
  R(c, "#dd0000", 6, 0, 4, 6);     // red plume
  R(c, "#bb0000", 6, 0, 2, 4);     // plume shadow
  R(c, "#ff2222", 7, 0, 2, 2);     // plume highlight
  R(c, "#bbbbbb", 10, 0, 12, 10);  // great helm
  R(c, "#cccccc", 12, 2, 8, 6);    // helm center
  R(c, "#222222", 12, 4, 8, 2);    // visor slit
  R(c, "#dddddd", 12, 0, 8, 2);    // helm top
  R(c, "#ffd700", 14, 0, 4, 2);    // gold crown on helm
  R(c, "#aaaaaa", 10, 6, 12, 4);   // helm lower
  // Plate armor body
  R(c, "#bbbbbb", 8, 10, 16, 10);  // armor
  R(c, "#aaaaaa", 10, 12, 12, 6);  // armor shade
  R(c, "#cccccc", 8, 10, 4, 2);    // pauldron left
  R(c, "#cccccc", 20, 10, 4, 2);   // pauldron right
  R(c, "#dddddd", 9, 10, 2, 2);    // pauldron highlight L
  R(c, "#dddddd", 21, 10, 2, 2);   // pauldron highlight R
  // Red Templar cross on chest
  R(c, "#dd0000", 14, 10, 4, 8);   // vertical cross
  R(c, "#dd0000", 10, 14, 12, 2);  // horizontal cross
  R(c, "#cc0000", 15, 11, 2, 6);   // cross shadow
  // Dual longswords
  R(c, "#d0d0d0", 4, 4, 2, 16);    // left blade
  R(c, "#e0e0e0", 4, 4, 2, 2);     // tip L
  R(c, "#ffd700", 4, 10, 2, 2);    // crossguard L
  R(c, "#8b6914", 4, 12, 2, 4);    // grip L
  R(c, "#d0d0d0", 26, 4, 2, 16);   // right blade
  R(c, "#e0e0e0", 26, 4, 2, 2);    // tip R
  R(c, "#ffd700", 26, 10, 2, 2);   // crossguard R
  R(c, "#8b6914", 26, 12, 2, 4);   // grip R
  // Armored legs
  R(c, "#999999", 10, 20, 4, 6);   // left leg
  R(c, "#999999", 18, 20, 4, 6);   // right leg
  R(c, "#aaaaaa", 10, 20, 2, 4);   // leg highlight L
  R(c, "#aaaaaa", 18, 20, 2, 4);   // leg highlight R
  // Sabatons (foot armor)
  R(c, "#777777", 10, 26, 4, 4);   // left sabaton
  R(c, "#777777", 18, 26, 4, 4);   // right sabaton
  R(c, "#888888", 10, 26, 2, 2);   // sabaton highlight L
  R(c, "#888888", 18, 26, 2, 2);   // sabaton highlight R
}

function drawCrusader32King(c) {
  // Crusader King - crowned helm, royal cape (32x32)
  // Golden crown on great helm
  R(c, "#ffd700", 8, 0, 16, 4);    // crown band
  R(c, "#ffaa00", 10, 0, 12, 2);   // crown inner
  R(c, "#ff0000", 14, 0, 4, 2);    // central ruby
  R(c, "#00aaff", 10, 0, 2, 2);    // left sapphire
  R(c, "#00aaff", 20, 0, 2, 2);    // right sapphire
  R(c, "#ffd700", 8, 0, 2, 4);     // crown point L
  R(c, "#ffd700", 22, 0, 2, 4);    // crown point R
  R(c, "#ffcc00", 9, 0, 2, 2);     // point highlight L
  R(c, "#ffcc00", 22, 0, 2, 2);    // point highlight R
  // Great helm
  R(c, "#bbbbbb", 10, 4, 12, 8);   // helm body
  R(c, "#cccccc", 12, 4, 8, 6);    // helm highlight
  R(c, "#222222", 12, 6, 8, 2);    // visor slit
  R(c, "#ffd700", 12, 8, 8, 2);    // gold trim
  R(c, "#aaaaaa", 10, 8, 12, 4);   // helm lower
  // Royal burgundy cape
  R(c, "#990022", 6, 8, 4, 16);    // left cape
  R(c, "#770018", 6, 10, 2, 12);   // left cape shadow
  R(c, "#990022", 22, 8, 4, 16);   // right cape
  R(c, "#770018", 24, 10, 2, 12);  // right cape shadow
  // Gold cape trim
  R(c, "#ffd700", 6, 8, 4, 2);     // trim top L
  R(c, "#ffd700", 22, 8, 4, 2);    // trim top R
  R(c, "#ffd700", 6, 22, 4, 2);    // trim bottom L
  R(c, "#ffd700", 22, 22, 4, 2);   // trim bottom R
  // Armor body
  R(c, "#bbbbbb", 10, 12, 12, 10); // armor main
  R(c, "#aaaaaa", 12, 14, 8, 6);   // armor shade
  R(c, "#cccccc", 10, 12, 2, 2);   // armor highlight
  // Golden Templar cross on chest
  R(c, "#ffd700", 14, 12, 4, 8);   // vertical cross
  R(c, "#ffd700", 12, 16, 8, 2);   // horizontal cross
  R(c, "#ffaa00", 15, 13, 2, 6);   // cross shadow
  // Royal scepter
  R(c, "#ffd700", 28, 2, 2, 20);   // scepter shaft
  R(c, "#ffd700", 26, 2, 4, 2);    // cross top
  R(c, "#ff0000", 28, 0, 2, 2);    // ruby
  R(c, "#ffcc00", 27, 3, 2, 2);    // scepter highlight
  // Armored legs
  R(c, "#999999", 12, 22, 4, 6);   // left leg
  R(c, "#999999", 16, 22, 4, 6);   // right leg
  R(c, "#aaaaaa", 12, 22, 2, 4);   // leg highlight
  // Sabatons
  R(c, "#777777", 12, 28, 4, 2);   // left sabaton
  R(c, "#777777", 16, 28, 4, 2);   // right sabaton
}

// ============================================================
// AMERICAN 32x32 PIECES
// US Marines - olive drab camo, modern military equipment
// ============================================================

function drawAmerican32Pawn(c) {
  // US Marine with M4 rifle (32x32)
  // Kevlar helmet
  R(c, "#5a7a2e", 10, 0, 12, 6);   // helmet main
  R(c, "#6b8b3a", 12, 2, 8, 2);    // helmet highlight
  R(c, "#4a6a20", 10, 4, 12, 2);   // helmet rim
  R(c, "#3a5a14", 8, 4, 2, 2);     // helmet rim left
  R(c, "#3a5a14", 22, 4, 2, 2);    // helmet rim right
  // Face
  R(c, "#f0c896", 12, 6, 8, 6);    // face
  R(c, "#daa870", 12, 10, 8, 2);   // chin shadow
  R(c, "#111111", 14, 8, 2, 2);    // left eye
  R(c, "#111111", 18, 8, 2, 2);    // right eye
  // Camo uniform body
  R(c, "#556b2f", 8, 12, 16, 10);  // uniform
  R(c, "#6b8b3a", 10, 14, 4, 4);   // camo patch 1
  R(c, "#3a5a14", 16, 14, 4, 4);   // camo patch 2
  R(c, "#4a6a20", 14, 18, 4, 2);   // camo patch 3
  R(c, "#6b8b3a", 20, 16, 2, 4);   // camo patch 4
  // Belt
  R(c, "#8b7355", 8, 20, 16, 2);   // belt
  R(c, "#ffd700", 14, 20, 4, 2);   // buckle
  // M4 rifle
  R(c, "#222222", 24, 4, 2, 16);   // barrel+receiver
  R(c, "#444444", 24, 2, 2, 4);    // barrel
  R(c, "#666666", 24, 2, 2, 2);    // muzzle
  R(c, "#8b6914", 26, 10, 2, 6);   // stock
  R(c, "#333333", 24, 6, 2, 2);    // front sight
  // Pants & boots
  R(c, "#556b2f", 10, 22, 4, 4);   // left pant
  R(c, "#556b2f", 18, 22, 4, 4);   // right pant
  R(c, "#2a1a0a", 10, 26, 4, 4);   // left boot
  R(c, "#2a1a0a", 18, 26, 4, 4);   // right boot
  R(c, "#1a1a1a", 10, 30, 4, 2);   // sole L
  R(c, "#1a1a1a", 18, 30, 4, 2);   // sole R
}

function drawAmerican32Rook(c) {
  // M1 Abrams Tank (32x32)
  // Turret top
  R(c, "#5a7a2e", 10, 0, 12, 4);   // turret top
  R(c, "#4a6a20", 12, 0, 8, 2);    // turret shade
  // Gun barrel
  R(c, "#444444", 0, 2, 12, 2);    // barrel
  R(c, "#555555", 0, 2, 2, 2);     // muzzle
  R(c, "#ffaa00", 0, 2, 2, 2);     // muzzle flash
  R(c, "#333333", 2, 3, 8, 1);     // barrel shadow
  // Turret body
  R(c, "#6b8b3a", 8, 4, 16, 6);    // turret
  R(c, "#556b2f", 10, 6, 12, 2);   // turret shade
  R(c, "#7a9b4a", 9, 4, 6, 2);     // turret highlight
  // Hull
  R(c, "#5a7a2e", 4, 10, 24, 8);   // hull main
  R(c, "#4a6a20", 6, 12, 20, 4);   // hull shade
  // White star emblem
  R(c, "#ffffff", 14, 12, 4, 4);   // star center
  R(c, "#ffffff", 12, 14, 2, 2);   // star point L
  R(c, "#ffffff", 18, 14, 2, 2);   // star point R
  R(c, "#ffffff", 16, 10, 2, 2);   // star point top
  R(c, "#ffffff", 15, 16, 2, 2);   // star point bottom
  // Tracks
  R(c, "#333333", 2, 18, 28, 6);   // track body
  R(c, "#222222", 2, 22, 28, 2);   // track bottom shadow
  // Track wheels
  R(c, "#555555", 4, 20, 4, 2);    // wheel 1
  R(c, "#555555", 10, 20, 4, 2);   // wheel 2
  R(c, "#555555", 16, 20, 4, 2);   // wheel 3
  R(c, "#555555", 22, 20, 4, 2);   // wheel 4
  // Skirt armor
  R(c, "#4a6a20", 2, 18, 2, 4);    // skirt L
  R(c, "#4a6a20", 28, 18, 2, 4);   // skirt R
  // Base shadow
  R(c, "#111111", 2, 24, 28, 4);   // ground shadow
  R(c, "#222222", 4, 24, 24, 2);   // shadow highlight
}

function drawAmerican32Knight(c) {
  // AH-64 Apache Helicopter (32x32)
  // Main rotor blades
  R(c, "#888888", 2, 0, 28, 2);    // rotor blades
  R(c, "#aaaaaa", 8, 0, 4, 2);     // blade highlight L
  R(c, "#aaaaaa", 20, 0, 4, 2);    // blade highlight R
  // Rotor hub
  R(c, "#666666", 14, 2, 4, 2);    // hub
  // Cockpit glass
  R(c, "#66ccff", 12, 4, 8, 6);    // glass
  R(c, "#88ddff", 14, 4, 4, 4);    // glass highlight
  // Cockpit frame
  R(c, "#556b2f", 10, 4, 2, 6);    // frame L
  R(c, "#556b2f", 20, 4, 2, 6);    // frame R
  // Fuselage
  R(c, "#5a7a2e", 8, 10, 16, 6);   // fuselage
  R(c, "#4a6a20", 10, 12, 12, 2);  // fuselage shade
  R(c, "#6b8b3a", 9, 10, 6, 2);    // fuselage highlight
  // Tail boom
  R(c, "#5a7a2e", 22, 8, 8, 4);    // tail
  R(c, "#4a6a20", 26, 6, 4, 4);    // tail end
  // Tail rotor
  R(c, "#888888", 30, 4, 2, 6);    // tail rotor
  R(c, "#aaaaaa", 30, 6, 2, 2);    // rotor highlight
  // Weapon pylons
  R(c, "#333333", 6, 12, 4, 2);    // pylon L
  R(c, "#333333", 22, 12, 4, 2);   // pylon R
  // Hellfire missiles
  R(c, "#cc0000", 4, 12, 2, 2);    // missile L
  R(c, "#cc0000", 26, 12, 2, 2);   // missile R
  R(c, "#ff2222", 4, 12, 1, 1);    // warhead L
  R(c, "#ff2222", 27, 12, 1, 1);   // warhead R
  // Landing skids
  R(c, "#444444", 8, 16, 2, 8);    // skid support L
  R(c, "#444444", 22, 16, 2, 8);   // skid support R
  R(c, "#555555", 6, 22, 8, 2);    // skid L
  R(c, "#555555", 20, 22, 8, 2);   // skid R
  // US Army star
  R(c, "#ffffff", 14, 12, 4, 2);   // star
  R(c, "#ffffff", 15, 11, 2, 1);   // star top
}

function drawAmerican32Bishop(c) {
  // Sniper in ghillie suit (32x32)
  // Ghillie hood (shaggy)
  R(c, "#6b8b3a", 8, 0, 16, 6);    // hood main
  R(c, "#556b2f", 10, 0, 12, 4);   // hood inner
  R(c, "#7a9b4a", 8, 0, 2, 4);     // shaggy bits L
  R(c, "#7a9b4a", 22, 0, 2, 4);    // shaggy bits R
  R(c, "#3a5a14", 12, 4, 8, 2);    // hood shadow
  R(c, "#8bab5a", 6, 2, 2, 4);     // extra shag L
  R(c, "#8bab5a", 24, 2, 2, 4);    // extra shag R
  // Face (camo paint)
  R(c, "#556b2f", 12, 6, 8, 4);    // camo face
  R(c, "#f0c896", 14, 6, 4, 2);    // eyes area
  R(c, "#111111", 14, 6, 2, 2);    // left eye
  R(c, "#111111", 16, 6, 2, 2);    // right eye
  // Ghillie body (layered shaggy)
  R(c, "#556b2f", 6, 10, 20, 12);  // body main
  R(c, "#6b8b3a", 8, 10, 6, 6);    // layer 1
  R(c, "#3a5a14", 16, 12, 6, 6);   // layer 2
  R(c, "#7a9b4a", 6, 10, 2, 6);    // fringe L
  R(c, "#7a9b4a", 24, 10, 2, 6);   // fringe R
  R(c, "#8bab5a", 10, 18, 4, 4);   // hanging strands L
  R(c, "#8bab5a", 18, 16, 4, 4);   // hanging strands R
  // Sniper rifle (M24)
  R(c, "#222222", 26, 2, 2, 18);   // barrel+receiver
  R(c, "#333333", 26, 0, 2, 4);    // barrel end
  R(c, "#666666", 28, 0, 2, 2);    // muzzle
  R(c, "#8b6914", 28, 8, 2, 8);    // wooden stock
  R(c, "#444444", 26, 6, 2, 2);    // scope mount
  R(c, "#66ccff", 28, 6, 2, 2);    // scope lens
  R(c, "#333333", 27, 5, 2, 4);    // scope body
  // Legs hidden in ghillie
  R(c, "#556b2f", 10, 22, 4, 6);   // left leg
  R(c, "#556b2f", 18, 22, 4, 6);   // right leg
  R(c, "#2a1a0a", 10, 28, 4, 2);   // boot L
  R(c, "#2a1a0a", 18, 28, 4, 2);   // boot R
}

function drawAmerican32Queen(c) {
  // 4-Star General (32x32)
  // Officer peaked cap
  R(c, "#3a5a14", 8, 0, 16, 4);    // cap crown
  R(c, "#ffd700", 8, 2, 16, 2);    // gold braid
  R(c, "#556b2f", 10, 4, 12, 2);   // visor
  R(c, "#1a1a1a", 8, 4, 2, 2);     // visor edge L
  R(c, "#1a1a1a", 22, 4, 2, 2);    // visor edge R
  R(c, "#ffd700", 14, 0, 4, 2);    // eagle emblem
  R(c, "#4a6a20", 9, 1, 14, 2);    // cap highlight
  // Face
  R(c, "#f0c896", 12, 6, 8, 6);    // face
  R(c, "#daa870", 12, 10, 8, 2);   // chin shadow
  R(c, "#111111", 14, 8, 2, 2);    // left eye
  R(c, "#111111", 18, 8, 2, 2);    // right eye
  R(c, "#888888", 14, 10, 4, 2);   // jaw shadow
  // Dress uniform jacket
  R(c, "#3a5a14", 8, 12, 16, 10);  // jacket
  R(c, "#2a4a0a", 10, 14, 12, 6);  // jacket shade
  // 4 gold stars on shoulders
  R(c, "#ffd700", 8, 12, 2, 2);    // star 1
  R(c, "#ffd700", 10, 12, 2, 2);   // star 2
  R(c, "#ffd700", 20, 12, 2, 2);   // star 3
  R(c, "#ffd700", 22, 12, 2, 2);   // star 4
  // Medals ribbon rack
  R(c, "#ff0000", 12, 14, 2, 2);   // red
  R(c, "#0000cc", 14, 14, 2, 2);   // blue
  R(c, "#ffd700", 16, 14, 2, 2);   // gold
  R(c, "#00cc00", 18, 14, 2, 2);   // green
  // Gold buttons
  R(c, "#ffd700", 14, 18, 2, 2);   // button 1
  R(c, "#ffd700", 14, 20, 2, 2);   // button 2
  // Sidearm holster
  R(c, "#2a1a0a", 24, 16, 2, 6);   // holster
  R(c, "#333333", 24, 14, 2, 2);   // pistol grip
  // Dress pants
  R(c, "#3a5a14", 10, 22, 4, 4);   // left pant
  R(c, "#3a5a14", 18, 22, 4, 4);   // right pant
  // Gold stripe on pants
  R(c, "#ffd700", 10, 22, 2, 4);   // stripe L
  R(c, "#ffd700", 20, 22, 2, 4);   // stripe R
  // Polished shoes
  R(c, "#111111", 10, 26, 4, 4);   // left shoe
  R(c, "#111111", 18, 26, 4, 4);   // right shoe
  R(c, "#222222", 10, 26, 2, 2);   // shoe shine L
  R(c, "#222222", 18, 26, 2, 2);   // shoe shine R
}

function drawAmerican32King(c) {
  // Supreme Commander with American Flag (32x32)
  // Green beret
  R(c, "#2a8a2a", 10, 0, 12, 4);   // beret
  R(c, "#1a7a1a", 12, 0, 8, 2);    // beret dark
  R(c, "#3a9a3a", 10, 2, 12, 2);   // beret highlight
  // Beret badge
  R(c, "#ffd700", 18, 0, 4, 2);    // badge
  R(c, "#ffd700", 20, 2, 2, 2);    // badge tail
  // Face
  R(c, "#f0c896", 12, 4, 8, 6);    // face
  R(c, "#111111", 14, 6, 2, 2);    // left eye
  R(c, "#111111", 18, 6, 2, 2);    // right eye
  R(c, "#cccccc", 14, 8, 4, 2);    // mustache
  R(c, "#daa870", 12, 8, 2, 2);    // jaw
  // Flag pole
  R(c, "#8b6914", 4, 0, 2, 28);    // pole
  R(c, "#ffd700", 4, 0, 2, 2);     // gold top
  // American flag (waving)
  R(c, "#cc0000", 6, 2, 8, 2);     // red stripe 1
  R(c, "#ffffff", 6, 4, 8, 2);     // white stripe 1
  R(c, "#cc0000", 6, 6, 8, 2);     // red stripe 2
  R(c, "#ffffff", 6, 8, 8, 2);     // white stripe 2
  R(c, "#cc0000", 6, 10, 8, 2);    // red stripe 3
  R(c, "#000088", 6, 2, 4, 4);     // blue canton
  R(c, "#ffffff", 6, 2, 2, 2);     // star 1
  R(c, "#ffffff", 8, 4, 2, 2);     // star 2
  // Dress uniform
  R(c, "#2a4a14", 10, 10, 12, 12); // uniform
  R(c, "#1a3a0a", 12, 12, 8, 8);   // uniform shade
  // 5-star insignia
  R(c, "#ffd700", 12, 12, 2, 2);   // star 1
  R(c, "#ffd700", 14, 10, 2, 2);   // star 2
  R(c, "#ffd700", 16, 10, 2, 2);   // star 3
  R(c, "#ffd700", 18, 12, 2, 2);   // star 4
  R(c, "#ffd700", 16, 14, 2, 2);   // star 5
  // Gold eagle on chest
  R(c, "#ffd700", 14, 16, 4, 4);   // eagle
  R(c, "#ffaa00", 15, 17, 2, 2);   // eagle shadow
  // Pants & polished boots
  R(c, "#2a4a14", 12, 22, 4, 4);   // left pant
  R(c, "#2a4a14", 16, 22, 4, 4);   // right pant
  R(c, "#111111", 12, 26, 4, 4);   // left boot
  R(c, "#111111", 16, 26, 4, 4);   // right boot
  R(c, "#222222", 12, 26, 2, 2);   // boot shine L
  R(c, "#222222", 16, 26, 2, 2);   // boot shine R
}

// ============================================================
// ARAB 32x32 PIECES
// Desert Warriors - keffiyeh, robes, scimitars
// ============================================================

function drawArab32Pawn(c) {
  // Desert warrior with AK-47 (32x32)
  // Keffiyeh (head covering)
  R(c, "#f0e6d0", 10, 0, 12, 8);   // keffiyeh main
  R(c, "#e0d0b8", 12, 0, 8, 2);    // keffiyeh top fold
  R(c, "#cc2222", 10, 2, 12, 2);   // red agal band
  R(c, "#f0e6d0", 10, 4, 12, 4);   // keffiyeh lower
  R(c, "#e0d0b8", 8, 4, 2, 4);     // draping side L
  R(c, "#e0d0b8", 22, 4, 2, 4);    // draping side R
  R(c, "#f5efe0", 13, 1, 6, 1);    // keffiyeh shine
  // Face
  R(c, "#d4a06a", 12, 8, 8, 4);    // face
  R(c, "#111111", 14, 8, 2, 2);    // left eye
  R(c, "#111111", 18, 8, 2, 2);    // right eye
  R(c, "#1a1a1a", 12, 10, 8, 2);   // beard area
  R(c, "#111111", 14, 10, 4, 2);   // thick beard
  // White thobe robe
  R(c, "#f0e6d0", 10, 12, 12, 10); // robe
  R(c, "#e0d0b8", 12, 14, 8, 6);   // robe shade
  R(c, "#d0c0a8", 10, 20, 12, 2);  // hem shadow
  R(c, "#f5efe0", 10, 12, 4, 2);   // robe highlight
  // AK-47
  R(c, "#8b6914", 24, 6, 2, 14);   // wooden body
  R(c, "#333333", 24, 4, 2, 4);    // barrel
  R(c, "#222222", 26, 8, 2, 8);    // magazine
  R(c, "#555555", 24, 2, 2, 2);    // muzzle
  R(c, "#444444", 25, 5, 1, 2);    // front sight
  // Ammo belt
  R(c, "#8b6914", 8, 14, 2, 6);    // belt
  R(c, "#ffd700", 8, 16, 2, 2);    // belt buckle
  // Sandals
  R(c, "#8b6914", 12, 22, 4, 6);   // left sandal
  R(c, "#8b6914", 16, 22, 4, 6);   // right sandal
  R(c, "#6b4410", 12, 28, 4, 2);   // sole L
  R(c, "#6b4410", 16, 28, 4, 2);   // sole R
}

function drawArab32Rook(c) {
  // War Camel with armored rider (32x32)
  // Camel head and neck
  R(c, "#c9a84c", 4, 4, 6, 6);     // head
  R(c, "#b89840", 2, 6, 4, 4);     // muzzle
  R(c, "#111111", 4, 6, 2, 2);     // eye
  R(c, "#d4b860", 2, 8, 2, 2);     // nostril area
  R(c, "#c9a84c", 6, 0, 4, 6);     // neck
  R(c, "#d4b860", 7, 1, 2, 4);     // neck highlight
  // Camel body
  R(c, "#c9a84c", 8, 8, 16, 8);    // body
  R(c, "#b89840", 10, 10, 12, 4);  // body shade
  // Hump
  R(c, "#d4b860", 12, 4, 8, 6);    // hump
  R(c, "#c9a84c", 14, 6, 4, 2);    // hump shade
  // Rider on top
  R(c, "#f0e6d0", 16, 0, 6, 4);    // keffiyeh
  R(c, "#cc2222", 18, 0, 2, 2);    // agal
  R(c, "#d4a06a", 18, 4, 2, 2);    // face
  R(c, "#f0e6d0", 16, 6, 6, 4);    // robe
  R(c, "#e0d0b8", 17, 7, 4, 2);    // robe shade
  // Rider's spear
  R(c, "#8b6914", 24, 0, 2, 12);   // spear shaft
  R(c, "#c0c0c0", 24, 0, 2, 2);    // spear tip
  R(c, "#e0e0e0", 24, 0, 1, 1);    // tip bright
  // Saddle blanket
  R(c, "#cc2222", 10, 6, 10, 2);   // blanket
  R(c, "#ffd700", 14, 6, 2, 2);    // gold trim
  R(c, "#dd3333", 11, 6, 2, 1);    // blanket highlight
  // Supply bags
  R(c, "#8b6914", 8, 10, 4, 4);    // bag L
  R(c, "#a08040", 22, 10, 4, 4);   // bag R
  // Camel legs
  R(c, "#c9a84c", 8, 16, 4, 10);   // front legs
  R(c, "#c9a84c", 20, 16, 4, 10);  // back legs
  R(c, "#b89840", 10, 18, 2, 6);   // leg shade L
  R(c, "#b89840", 22, 18, 2, 6);   // leg shade R
  // Hooves
  R(c, "#6b5030", 8, 26, 4, 4);    // front hooves
  R(c, "#6b5030", 20, 26, 4, 4);   // back hooves
}

function drawArab32Knight(c) {
  // Arabian horseman with scimitar (32x32)
  // Arabian horse head
  R(c, "#3a2a18", 4, 4, 8, 6);     // head
  R(c, "#2a1a08", 2, 6, 4, 4);     // muzzle
  R(c, "#111111", 4, 6, 2, 2);     // eye
  R(c, "#f0e6d0", 2, 8, 2, 2);     // blaze
  R(c, "#4a3a28", 5, 4, 4, 2);     // head highlight
  // Bridle
  R(c, "#cc2222", 6, 8, 4, 2);     // red bridle
  R(c, "#ffd700", 8, 8, 2, 2);     // gold bit
  // Horse body
  R(c, "#3a2a18", 8, 10, 16, 8);   // body
  R(c, "#2a1a08", 10, 12, 12, 4);  // body shade
  // Decorative saddle blanket
  R(c, "#cc2222", 12, 8, 10, 2);   // red blanket
  R(c, "#ffd700", 12, 10, 10, 2);  // gold trim
  R(c, "#cc2222", 12, 10, 2, 2);   // corner L
  R(c, "#cc2222", 20, 10, 2, 2);   // corner R
  // Rider
  R(c, "#f0e6d0", 16, 0, 8, 4);    // keffiyeh
  R(c, "#cc2222", 18, 0, 4, 2);    // agal
  R(c, "#d4a06a", 18, 4, 4, 2);    // face
  R(c, "#111111", 18, 4, 2, 2);    // eye
  R(c, "#f0e6d0", 16, 6, 8, 4);    // robe
  R(c, "#e0d0b8", 17, 7, 6, 2);    // robe shade
  // Raised scimitar
  R(c, "#e0e0e0", 26, 0, 2, 2);    // tip
  R(c, "#c0c0c0", 26, 2, 2, 2);    // upper blade
  R(c, "#c0c0c0", 24, 4, 2, 2);    // curved blade
  R(c, "#c0c0c0", 24, 6, 2, 2);    // blade lower
  R(c, "#ffd700", 24, 8, 2, 2);    // hilt
  R(c, "#8b4513", 24, 10, 2, 2);   // grip
  // Horse legs (galloping)
  R(c, "#3a2a18", 8, 18, 4, 10);   // front L
  R(c, "#3a2a18", 20, 18, 4, 8);   // back R
  R(c, "#3a2a18", 18, 20, 2, 8);   // back L
  // Hooves
  R(c, "#1a1a1a", 8, 28, 4, 2);    // front hoof
  R(c, "#1a1a1a", 18, 28, 4, 2);   // back hoof
  // Flowing tail
  R(c, "#1a1a1a", 24, 14, 4, 4);   // tail
  R(c, "#111111", 26, 16, 2, 2);   // tail tip
}

function drawArab32Bishop(c) {
  // Islamic Scholar / Imam (32x32)
  // Grand turban
  R(c, "#ffffff", 10, 0, 12, 8);   // turban main
  R(c, "#eeeeee", 12, 0, 8, 6);    // turban inner
  R(c, "#dddddd", 14, 2, 4, 2);    // turban folds
  R(c, "#ffffff", 10, 0, 2, 6);    // wrap left
  R(c, "#ffffff", 20, 0, 2, 6);    // wrap right
  R(c, "#f0f0f0", 11, 1, 10, 2);   // turban highlight
  // Emerald jewel on turban
  R(c, "#00cc44", 14, 0, 4, 2);    // emerald
  R(c, "#00ff55", 16, 0, 2, 2);    // emerald glint
  // Face
  R(c, "#d4a06a", 12, 8, 8, 6);    // face
  R(c, "#111111", 14, 8, 2, 2);    // left eye
  R(c, "#111111", 18, 8, 2, 2);    // right eye
  // Long flowing beard
  R(c, "#222222", 12, 12, 8, 4);   // beard top
  R(c, "#111111", 14, 12, 4, 4);   // beard inner
  R(c, "#222222", 14, 16, 4, 2);   // beard tip
  R(c, "#333333", 13, 13, 2, 2);   // beard highlight
  // Green scholarly robe
  R(c, "#228b22", 8, 14, 16, 8);   // robe
  R(c, "#1a7a1a", 10, 16, 12, 4);  // robe shade
  R(c, "#ffd700", 8, 14, 16, 2);   // gold trim collar
  R(c, "#ffd700", 8, 20, 16, 2);   // gold trim hem
  R(c, "#2a9b2a", 9, 15, 6, 2);    // robe highlight
  // Quran / Holy book
  R(c, "#228b22", 24, 12, 4, 6);   // book cover
  R(c, "#ffd700", 24, 12, 4, 2);   // gold pages
  R(c, "#1a6b1a", 24, 14, 4, 2);   // book dark
  R(c, "#f0e6d0", 26, 14, 2, 2);   // page edge
  // Prayer beads in hand
  R(c, "#8b6914", 6, 16, 2, 6);    // beads string
  R(c, "#ffd700", 6, 16, 2, 2);    // bead 1
  R(c, "#ffd700", 6, 20, 2, 2);    // bead 2
  // Sandals
  R(c, "#8b6914", 10, 22, 4, 6);   // left sandal
  R(c, "#8b6914", 18, 22, 4, 6);   // right sandal
  R(c, "#6b4410", 10, 28, 4, 2);   // sole L
  R(c, "#6b4410", 18, 28, 4, 2);   // sole R
}

function drawArab32Queen(c) {
  // Desert Queen / Warrior Princess (32x32)
  // Ornate golden crown headdress
  R(c, "#ffd700", 8, 0, 16, 4);    // crown band
  R(c, "#ffaa00", 10, 0, 12, 2);   // crown inner
  R(c, "#ff0000", 14, 0, 4, 2);    // central ruby
  R(c, "#00cc44", 10, 0, 2, 2);    // emerald L
  R(c, "#00cc44", 20, 0, 2, 2);    // emerald R
  R(c, "#ffd700", 8, 0, 2, 4);     // crown point L
  R(c, "#ffd700", 22, 0, 2, 4);    // crown point R
  R(c, "#ffcc00", 9, 0, 2, 2);     // point shine L
  // Purple silk veil
  R(c, "#9933cc", 8, 4, 16, 6);    // veil
  R(c, "#7722aa", 10, 6, 12, 2);   // veil shade
  R(c, "#aa44dd", 8, 4, 2, 4);     // veil drape L
  R(c, "#aa44dd", 22, 4, 2, 4);    // veil drape R
  // Fierce eyes visible through veil
  R(c, "#d4a06a", 12, 6, 8, 2);    // eye area
  R(c, "#111111", 14, 6, 2, 2);    // left eye
  R(c, "#111111", 18, 6, 2, 2);    // right eye
  R(c, "#000000", 12, 6, 2, 2);    // kohl liner L
  R(c, "#000000", 20, 6, 2, 2);    // kohl liner R
  // Royal purple robe
  R(c, "#9933cc", 8, 10, 16, 12);  // robe
  R(c, "#7722aa", 10, 12, 12, 8);  // robe shade
  // Gold ornamental trim
  R(c, "#ffd700", 8, 10, 16, 2);   // collar
  R(c, "#ffd700", 8, 20, 16, 2);   // hem
  R(c, "#ffd700", 14, 12, 4, 6);   // center embroidery
  R(c, "#ffaa00", 15, 13, 2, 4);   // embroidery shadow
  // Twin curved daggers
  R(c, "#e0e0e0", 4, 10, 2, 8);    // left blade
  R(c, "#c0c0c0", 4, 10, 2, 2);    // tip L
  R(c, "#ffd700", 4, 18, 2, 2);    // left hilt
  R(c, "#e0e0e0", 26, 10, 2, 8);   // right blade
  R(c, "#c0c0c0", 26, 10, 2, 2);   // tip R
  R(c, "#ffd700", 26, 18, 2, 2);   // right hilt
  // Golden slippers
  R(c, "#ffd700", 10, 22, 4, 6);   // left slipper
  R(c, "#ffd700", 18, 22, 4, 6);   // right slipper
  R(c, "#cc9900", 10, 28, 4, 2);   // sole L
  R(c, "#cc9900", 18, 28, 4, 2);   // sole R
}

function drawArab32King(c) {
  // Grand Sultan / Sheikh (32x32)
  // Magnificent turban
  R(c, "#ffffff", 8, 0, 16, 8);    // turban main
  R(c, "#eeeeee", 10, 0, 12, 6);   // turban inner
  R(c, "#dddddd", 12, 2, 8, 2);    // turban wraps
  R(c, "#ffffff", 8, 0, 2, 6);     // wrap L
  R(c, "#ffffff", 22, 0, 2, 6);    // wrap R
  // Gold band on turban
  R(c, "#ffd700", 10, 2, 12, 2);   // gold band
  // Giant ruby center
  R(c, "#ff0000", 14, 0, 4, 2);    // ruby
  R(c, "#ff4444", 16, 0, 2, 2);    // ruby glint
  // Sapphires on sides
  R(c, "#0088ff", 10, 0, 2, 2);    // sapphire L
  R(c, "#0088ff", 20, 0, 2, 2);    // sapphire R
  // Peacock feather
  R(c, "#00aa44", 16, 0, 2, 2);    // feather
  // Face
  R(c, "#d4a06a", 12, 8, 8, 6);    // face
  R(c, "#111111", 14, 8, 2, 2);    // left eye
  R(c, "#111111", 18, 8, 2, 2);    // right eye
  // Royal beard
  R(c, "#111111", 12, 12, 8, 2);   // beard top
  R(c, "#222222", 14, 14, 4, 2);   // beard mid
  R(c, "#222222", 14, 16, 4, 2);   // long beard
  R(c, "#333333", 15, 13, 2, 2);   // beard highlight
  // Royal burgundy robe
  R(c, "#880022", 8, 14, 16, 8);   // robe
  R(c, "#660018", 10, 16, 12, 4);  // robe shade
  // Gold embroidery
  R(c, "#ffd700", 8, 14, 16, 2);   // gold collar
  R(c, "#ffd700", 14, 16, 4, 4);   // central motif
  R(c, "#ffd700", 8, 20, 16, 2);   // gold hem
  R(c, "#ffaa00", 15, 17, 2, 2);   // motif shadow
  // Royal scepter
  R(c, "#ffd700", 26, 4, 2, 18);   // shaft
  R(c, "#ffd700", 24, 4, 6, 2);    // top bar
  R(c, "#ff0000", 26, 2, 2, 2);    // ruby top
  R(c, "#ffd700", 24, 6, 2, 2);    // ornament L
  R(c, "#ffd700", 28, 6, 2, 2);    // ornament R
  // Golden slippers
  R(c, "#ffd700", 10, 22, 4, 6);   // left slipper
  R(c, "#ffd700", 18, 22, 4, 6);   // right slipper
  R(c, "#cc9900", 10, 28, 4, 2);   // sole L
  R(c, "#cc9900", 18, 28, 4, 2);   // sole R (Arab King end)
}

// ============================================================
// SOLDIER (BRITISH) 32x32 PIECES
// British Redcoats - bearskin hats, red coats, muskets
// ============================================================

function drawSoldier32Pawn(c) {
  // British Redcoat soldier (32x32)
  // Bearskin hat
  R(c, "#1a1a2e", 10, 0, 12, 8);   // bearskin main
  R(c, "#12121e", 12, 0, 8, 2);    // top dark
  R(c, "#222238", 11, 1, 10, 4);   // hat highlight
  R(c, "#0e0e1a", 10, 6, 12, 2);   // hat band
  // Face
  R(c, "#ffcc99", 12, 8, 8, 4);    // face
  R(c, "#220000", 14, 8, 2, 2);    // left eye
  R(c, "#220000", 18, 8, 2, 2);    // right eye
  R(c, "#ee9966", 14, 10, 4, 2);   // chin/mouth
  // Red coat
  R(c, "#cc2222", 10, 12, 12, 8);  // coat main
  R(c, "#ffffff", 10, 12, 2, 8);   // white lapel L
  R(c, "#ffffff", 20, 12, 2, 8);   // white lapel R
  R(c, "#ffd700", 14, 14, 2, 2);   // button 1
  R(c, "#ffd700", 14, 16, 2, 2);   // button 2
  R(c, "#dd3333", 12, 12, 8, 2);   // coat highlight
  // Rifle
  R(c, "#888888", 22, 6, 2, 16);   // barrel
  R(c, "#6B4226", 22, 18, 2, 4);   // wooden stock
  R(c, "#aaaaaa", 22, 4, 2, 4);    // bayonet
  R(c, "#999999", 22, 6, 1, 2);    // barrel shine
  // Pants & boots
  R(c, "#2a2a5a", 12, 20, 4, 6);   // left pant
  R(c, "#2a2a5a", 16, 20, 4, 6);   // right pant
  R(c, "#111122", 12, 26, 4, 4);   // left boot
  R(c, "#111122", 16, 26, 4, 4);   // right boot
  R(c, "#1a1a33", 12, 26, 2, 2);   // boot shine L
  R(c, "#1a1a33", 16, 26, 2, 2);   // boot shine R
}

function drawSoldier32Rook(c) {
  // British fortress tower (32x32)
  // Crenellations
  R(c, "#888888", 6, 0, 4, 4);     // left merlon
  R(c, "#888888", 14, 0, 4, 4);    // center merlon
  R(c, "#888888", 22, 0, 4, 4);    // right merlon
  R(c, "#999999", 6, 4, 20, 4);    // parapet wall
  R(c, "#aaaaaa", 7, 0, 2, 2);     // merlon highlight L
  R(c, "#aaaaaa", 15, 0, 2, 2);    // merlon highlight C
  R(c, "#aaaaaa", 23, 0, 2, 2);    // merlon highlight R
  // Tower body
  R(c, "#cc2222", 8, 8, 16, 12);   // red brick main
  R(c, "#aa1111", 10, 8, 12, 2);   // brick top shade
  R(c, "#dd3333", 9, 9, 6, 4);     // brick highlight
  // Cross emblem
  R(c, "#ffffff", 14, 10, 4, 8);   // vertical cross
  R(c, "#ffffff", 12, 12, 8, 4);   // horizontal cross
  // Cannon barrel
  R(c, "#555555", 4, 12, 6, 4);    // cannon
  R(c, "#444444", 2, 14, 4, 2);    // muzzle
  R(c, "#ffff00", 0, 14, 2, 2);    // muzzle flash
  R(c, "#666666", 6, 12, 2, 2);    // cannon mount
  // Base
  R(c, "#666666", 6, 20, 20, 4);   // base stone
  R(c, "#555555", 8, 24, 16, 4);   // middle base
  R(c, "#444444", 10, 28, 12, 4);  // bottom base
  R(c, "#777777", 7, 20, 8, 2);    // base highlight
}

function drawSoldier32Knight(c) {
  // Cavalry horse with red coat rider (32x32)
  // Horse head
  R(c, "#8B6914", 12, 0, 10, 6);   // head
  R(c, "#7a5a10", 10, 4, 6, 4);    // jaw
  R(c, "#8B6914", 8, 6, 6, 4);     // muzzle
  // Horse eye
  R(c, "#000000", 16, 2, 2, 2);    // eye
  // Horse ear
  R(c, "#6B4914", 18, 0, 2, 2);    // ear
  // Mane
  R(c, "#3a2a0a", 20, 0, 2, 6);    // mane
  R(c, "#3a2a0a", 22, 2, 2, 4);    // mane trail
  // Horse mouth
  R(c, "#daa520", 8, 8, 4, 2);     // muzzle color
  R(c, "#000000", 8, 8, 2, 2);     // nostril
  // Rider body (red coat)
  R(c, "#cc2222", 12, 10, 10, 8);  // coat
  R(c, "#ffd700", 16, 12, 2, 4);   // button line
  R(c, "#dd3333", 13, 10, 4, 2);   // coat highlight
  // Rider head
  R(c, "#1a1a2e", 14, 6, 6, 2);    // helmet
  R(c, "#ffcc99", 14, 8, 6, 2);    // face
  // Sword
  R(c, "#cccccc", 22, 8, 2, 12);   // blade
  R(c, "#ffd700", 22, 18, 2, 2);   // guard
  R(c, "#8B4513", 22, 20, 2, 4);   // grip
  R(c, "#dddddd", 22, 8, 2, 2);    // blade tip
  // Horse body
  R(c, "#8B6914", 10, 18, 14, 4);  // body
  R(c, "#7a5a10", 8, 22, 6, 6);    // front legs
  R(c, "#7a5a10", 18, 22, 6, 6);   // back legs
  R(c, "#9a7924", 11, 18, 6, 2);   // body highlight
  // Hooves
  R(c, "#333333", 8, 28, 4, 4);    // front hoof
  R(c, "#333333", 20, 28, 4, 4);   // back hoof
}

function drawSoldier32Bishop(c) {
  // British officer with bicorn hat (32x32)
  // Bicorn hat
  R(c, "#1a1a2e", 6, 2, 8, 4);     // left wing
  R(c, "#1a1a2e", 18, 2, 8, 4);    // right wing
  R(c, "#1a1a2e", 10, 0, 12, 6);   // hat crown
  R(c, "#ffd700", 14, 0, 4, 2);    // gold band
  R(c, "#222238", 11, 1, 10, 2);   // hat highlight
  // Face
  R(c, "#ffcc99", 12, 6, 8, 6);    // face
  R(c, "#220000", 14, 8, 2, 2);    // left eye
  R(c, "#220000", 18, 8, 2, 2);    // right eye
  R(c, "#ee9966", 14, 10, 4, 2);   // mouth
  // Red coat with epaulettes
  R(c, "#cc2222", 10, 12, 12, 10); // coat
  R(c, "#ffd700", 10, 12, 2, 2);   // left epaulette
  R(c, "#ffd700", 20, 12, 2, 2);   // right epaulette
  R(c, "#ffffff", 14, 14, 4, 6);   // front panel
  R(c, "#ffd700", 14, 14, 2, 2);   // button 1
  R(c, "#ffd700", 14, 18, 2, 2);   // button 2
  R(c, "#dd3333", 11, 13, 6, 2);   // coat highlight
  // Pistol
  R(c, "#555555", 22, 14, 4, 2);   // barrel
  R(c, "#555555", 24, 14, 2, 6);   // body
  R(c, "#8B4513", 24, 18, 2, 4);   // wooden grip
  // Pants & boots
  R(c, "#2a2a5a", 12, 22, 4, 4);   // left pant
  R(c, "#2a2a5a", 16, 22, 4, 4);   // right pant
  R(c, "#111122", 12, 26, 4, 4);   // left boot
  R(c, "#111122", 16, 26, 4, 4);   // right boot
}

function drawSoldier32Queen(c) {
  // British officer with plumed hat (32x32)
  // Plumed hat
  R(c, "#1a1a2e", 10, 2, 12, 6);   // hat body
  R(c, "#cc2222", 12, 0, 8, 4);    // red plume
  R(c, "#ff4444", 14, 0, 4, 2);    // plume highlight
  R(c, "#ffd700", 10, 6, 12, 2);   // gold brim
  R(c, "#222238", 11, 3, 10, 2);   // hat body highlight
  // Face
  R(c, "#ffcc99", 12, 8, 8, 4);    // face
  R(c, "#220000", 14, 8, 2, 2);    // left eye
  R(c, "#220000", 18, 8, 2, 2);    // right eye
  // Decorated red coat
  R(c, "#cc2222", 8, 12, 16, 10);  // coat
  R(c, "#ffd700", 8, 12, 16, 2);   // gold trim top
  R(c, "#ffd700", 8, 20, 16, 2);   // gold trim bottom
  R(c, "#ffffff", 14, 14, 4, 6);   // front panel
  R(c, "#ffd700", 14, 14, 2, 2);   // button 1
  R(c, "#ffd700", 14, 16, 2, 2);   // button 2
  R(c, "#ffd700", 14, 18, 2, 2);   // button 3
  R(c, "#dd3333", 9, 13, 6, 2);    // coat highlight
  // Twin pistols
  R(c, "#555555", 6, 14, 2, 6);    // left pistol
  R(c, "#555555", 4, 14, 2, 2);    // left muzzle
  R(c, "#555555", 24, 14, 2, 6);   // right pistol
  R(c, "#555555", 26, 14, 2, 2);   // right muzzle
  // Pants & boots
  R(c, "#2a2a5a", 10, 22, 4, 4);   // left pant
  R(c, "#2a2a5a", 18, 22, 4, 4);   // right pant
  R(c, "#111122", 10, 26, 4, 4);   // left boot
  R(c, "#111122", 18, 26, 4, 4);   // right boot
}

function drawSoldier32King(c) {
  // Chef hat Gordon Ramsay (32x32)
  // Chef hat (toque)
  R(c, "#ffffff", 10, 0, 12, 8);   // hat main
  R(c, "#eeeeee", 12, 0, 8, 2);    // hat top fold
  R(c, "#dddddd", 10, 6, 12, 2);   // hat band
  R(c, "#f0f0f0", 12, 2, 8, 4);    // hat puff
  R(c, "#e0e0e0", 11, 3, 10, 2);   // hat shadow
  // Blonde hair
  R(c, "#daa520", 10, 8, 2, 2);    // hair L
  R(c, "#daa520", 20, 8, 2, 2);    // hair R
  // Angry face
  R(c, "#ffcc99", 10, 8, 12, 6);   // face
  R(c, "#aa6633", 12, 8, 4, 2);    // angry left brow
  R(c, "#aa6633", 16, 8, 4, 2);    // angry right brow
  R(c, "#2244aa", 12, 10, 2, 2);   // left eye
  R(c, "#2244aa", 18, 10, 2, 2);   // right eye
  R(c, "#ee9966", 14, 12, 4, 2);   // nose
  R(c, "#cc0000", 12, 14, 8, 2);   // shouting mouth
  R(c, "#880000", 14, 14, 4, 2);   // mouth inner
  // Chef jacket
  R(c, "#ffffff", 8, 16, 16, 8);   // jacket main
  R(c, "#dddddd", 8, 16, 16, 2);   // jacket collar
  R(c, "#333333", 14, 18, 2, 2);   // button 1
  R(c, "#333333", 14, 20, 2, 2);   // button 2
  R(c, "#333333", 14, 22, 2, 2);   // button 3
  R(c, "#eeeeee", 10, 17, 6, 4);   // jacket highlight
  // Cleaver
  R(c, "#cccccc", 24, 10, 4, 6);   // blade
  R(c, "#aaaaaa", 24, 10, 4, 2);   // blade edge
  R(c, "#dddddd", 24, 10, 2, 2);   // blade shine
  R(c, "#8B4513", 24, 16, 2, 6);   // handle
  R(c, "#6B3510", 25, 17, 1, 4);   // handle shadow
  // Pants & shoes
  R(c, "#333333", 10, 24, 4, 4);   // left pant
  R(c, "#333333", 18, 24, 4, 4);   // right pant
  R(c, "#222222", 10, 28, 4, 4);   // left shoe
  R(c, "#222222", 18, 28, 4, 4);   // right shoe
}

// ============================================================
// MONKEY 32x32 PIECES
// Primate army - various monkey/ape species with weapons
// ============================================================

function drawMonkey32Pawn(c) {
  // Small monkey with banana gun (32x32)
  // Head (round)
  R(c, "#8B5E3C", 10, 2, 10, 8);   // head
  R(c, "#8B5E3C", 12, 0, 6, 2);    // top of head
  // Ears
  R(c, "#DEB887", 8, 4, 2, 4);     // left ear
  R(c, "#DEB887", 20, 4, 2, 4);    // right ear
  R(c, "#8B5E3C", 8, 2, 2, 2);     // ear base L
  R(c, "#8B5E3C", 20, 2, 2, 2);    // ear base R
  // Face
  R(c, "#DEB887", 12, 4, 6, 6);    // face
  R(c, "#111111", 12, 6, 2, 2);    // left eye
  R(c, "#111111", 16, 6, 2, 2);    // right eye
  R(c, "#5C3A1E", 14, 8, 2, 2);    // nose
  R(c, "#aa5533", 12, 8, 6, 2);    // mouth area
  // Body
  R(c, "#8B5E3C", 10, 10, 10, 10); // body
  R(c, "#A0724A", 12, 12, 6, 6);   // belly
  R(c, "#b08454", 13, 13, 4, 4);   // belly highlight
  // Banana gun (right hand)
  R(c, "#FFD700", 20, 8, 6, 2);    // banana body
  R(c, "#FFD700", 22, 10, 4, 2);   // banana curve
  R(c, "#FFC300", 24, 8, 2, 2);    // banana tip
  R(c, "#555555", 24, 6, 2, 4);    // barrel
  R(c, "#444444", 25, 6, 1, 2);    // barrel shadow
  // Arms
  R(c, "#8B5E3C", 8, 12, 2, 6);    // left arm
  R(c, "#8B5E3C", 20, 12, 2, 6);   // right arm
  // Legs
  R(c, "#8B5E3C", 10, 20, 4, 6);   // left leg
  R(c, "#8B5E3C", 16, 20, 4, 6);   // right leg
  // Feet
  R(c, "#5C3A1E", 10, 26, 4, 4);   // left foot
  R(c, "#5C3A1E", 16, 26, 4, 4);   // right foot
  // Tail
  R(c, "#7A4E2D", 6, 16, 2, 2);    // tail 1
  R(c, "#7A4E2D", 4, 14, 2, 2);    // tail 2
  R(c, "#7A4E2D", 2, 12, 2, 2);    // tail 3
  R(c, "#7A4E2D", 2, 10, 2, 4);    // tail curl
}

function drawMonkey32Rook(c) {
  // Gorilla - big blocky powerhouse (32x32)
  // Head
  R(c, "#5C3A1E", 6, 0, 20, 10);   // head main
  R(c, "#4A2E18", 8, 0, 16, 2);    // top dark
  // Brow ridge
  R(c, "#4A2E18", 8, 4, 16, 2);    // brow
  R(c, "#3A2212", 9, 4, 14, 1);    // brow shadow
  // Eyes
  R(c, "#DEB887", 10, 6, 4, 2);    // left eye area
  R(c, "#DEB887", 18, 6, 4, 2);    // right eye area
  R(c, "#ff0000", 10, 6, 2, 2);    // left eye red
  R(c, "#ff0000", 18, 6, 2, 2);    // right eye red
  R(c, "#ff3333", 10, 6, 1, 1);    // eye bright L
  R(c, "#ff3333", 19, 6, 1, 1);    // eye bright R
  // Snout
  R(c, "#DEB887", 12, 8, 8, 4);    // snout
  R(c, "#111111", 14, 8, 2, 2);    // left nostril
  R(c, "#111111", 16, 8, 2, 2);    // right nostril
  R(c, "#aa5533", 14, 10, 4, 2);   // mouth
  // Massive body
  R(c, "#5C3A1E", 4, 12, 24, 10);  // body main
  R(c, "#4A2E18", 6, 12, 20, 2);   // body top
  R(c, "#6B4A30", 10, 14, 12, 6);  // chest
  R(c, "#7a5a40", 12, 15, 8, 4);   // chest highlight
  // Club weapon
  R(c, "#8B4513", 0, 6, 4, 12);    // club shaft
  R(c, "#6B3510", 0, 4, 4, 4);     // club head dark
  R(c, "#555555", 0, 2, 4, 4);     // metal head
  R(c, "#666666", 0, 2, 2, 2);     // metal shine
  // Arms (massive)
  R(c, "#5C3A1E", 2, 12, 4, 8);    // left arm
  R(c, "#5C3A1E", 26, 12, 4, 8);   // right arm
  R(c, "#6B4A30", 3, 14, 2, 4);    // arm highlight L
  R(c, "#6B4A30", 27, 14, 2, 4);   // arm highlight R
  // Legs
  R(c, "#5C3A1E", 8, 22, 6, 6);    // left leg
  R(c, "#5C3A1E", 18, 22, 6, 6);   // right leg
  // Feet
  R(c, "#3A2212", 8, 28, 6, 4);    // left foot
  R(c, "#3A2212", 18, 28, 6, 4);   // right foot
}

function drawMonkey32Knight(c) {
  // Swinging monkey - dynamic pose (32x32)
  // Head
  R(c, "#8B5E3C", 14, 0, 8, 6);    // head
  R(c, "#8B5E3C", 16, 0, 4, 2);    // top
  // Tuft of hair
  R(c, "#5C3A1E", 16, 0, 4, 2);    // hair tuft
  // Ears
  R(c, "#DEB887", 12, 2, 2, 2);    // left ear
  R(c, "#DEB887", 22, 2, 2, 2);    // right ear
  // Face
  R(c, "#DEB887", 16, 2, 4, 4);    // face
  R(c, "#111111", 16, 2, 2, 2);    // left eye
  R(c, "#111111", 18, 2, 2, 2);    // right eye
  R(c, "#5C3A1E", 16, 4, 4, 2);    // nose/mouth
  // Body
  R(c, "#8B5E3C", 12, 6, 10, 10);  // body
  R(c, "#A0724A", 14, 8, 6, 6);    // belly
  R(c, "#b08454", 15, 9, 4, 4);    // belly highlight
  // Vine/rope
  R(c, "#228B22", 8, 0, 2, 14);    // vine
  R(c, "#1a7a1a", 9, 0, 1, 12);    // vine shadow
  R(c, "#228B22", 10, 6, 2, 2);    // vine joint
  // Arm holding vine
  R(c, "#8B5E3C", 10, 6, 4, 4);    // grabbing arm
  // Coconut bomb (right hand)
  R(c, "#8B4513", 22, 8, 6, 6);    // coconut
  R(c, "#6B3510", 24, 8, 2, 2);    // coconut detail
  R(c, "#ff6600", 24, 6, 2, 2);    // fuse spark
  R(c, "#ffff00", 24, 6, 2, 2);    // spark bright
  // Right arm
  R(c, "#8B5E3C", 20, 8, 4, 4);    // right arm
  // Curled tail
  R(c, "#7A4E2D", 8, 12, 2, 2);    // tail 1
  R(c, "#7A4E2D", 6, 10, 2, 2);    // tail 2
  R(c, "#7A4E2D", 4, 8, 2, 2);     // tail 3
  R(c, "#7A4E2D", 4, 6, 2, 4);     // tail curl
  // Legs
  R(c, "#8B5E3C", 12, 16, 4, 8);   // left leg
  R(c, "#8B5E3C", 18, 16, 4, 8);   // right leg
  // Feet
  R(c, "#5C3A1E", 12, 24, 4, 4);   // left foot
  R(c, "#5C3A1E", 18, 24, 4, 4);   // right foot
  // Banana holster
  R(c, "#FFD700", 16, 14, 2, 4);   // banana
}

function drawMonkey32Bishop(c) {
  // Chimp with blowdart - smart looking (32x32)
  // Head
  R(c, "#5C3A1E", 10, 0, 12, 8);   // head
  R(c, "#5C3A1E", 12, 0, 8, 2);    // top
  // Smart eyes (glasses-like)
  R(c, "#DEB887", 12, 4, 8, 4);    // face
  R(c, "#111111", 12, 4, 2, 2);    // left eye
  R(c, "#111111", 18, 4, 2, 2);    // right eye
  R(c, "#333388", 12, 4, 4, 2);    // "glasses" left
  R(c, "#333388", 16, 4, 4, 2);    // "glasses" right
  R(c, "#4444aa", 13, 4, 2, 1);    // lens shine L
  R(c, "#4444aa", 17, 4, 2, 1);    // lens shine R
  // Nose & mouth
  R(c, "#aa6644", 14, 6, 4, 2);    // nose/mouth
  // Ears
  R(c, "#DEB887", 8, 2, 2, 4);     // left ear
  R(c, "#DEB887", 22, 2, 2, 4);    // right ear
  // Body
  R(c, "#5C3A1E", 10, 8, 12, 10);  // body
  R(c, "#7A5E3C", 12, 10, 8, 6);   // belly/chest
  R(c, "#8a6e4c", 13, 11, 6, 4);   // chest highlight
  // Blowdart tube (long!)
  R(c, "#228B22", 22, 2, 10, 2);   // tube
  R(c, "#1a6b1a", 22, 2, 2, 2);    // tube end
  R(c, "#2a9b2a", 24, 2, 6, 1);    // tube shine
  // Holding arm
  R(c, "#5C3A1E", 20, 6, 4, 4);    // right arm
  // Left arm
  R(c, "#5C3A1E", 8, 10, 2, 6);    // left arm
  // Legs
  R(c, "#5C3A1E", 12, 18, 4, 8);   // left leg
  R(c, "#5C3A1E", 16, 18, 4, 8);   // right leg
  R(c, "#3A2212", 12, 26, 4, 4);   // left foot
  R(c, "#3A2212", 16, 26, 4, 4);   // right foot
  // Tail
  R(c, "#7A4E2D", 8, 14, 2, 2);    // tail 1
  R(c, "#7A4E2D", 6, 12, 2, 2);    // tail 2
  R(c, "#7A4E2D", 4, 10, 2, 4);    // tail curl
}

function drawMonkey32Queen(c) {
  // Orangutan - wide, powerful, orange-red (32x32)
  // Wide head with cheek pads
  R(c, "#CC6600", 6, 0, 20, 10);   // head
  R(c, "#DD7711", 4, 2, 4, 6);     // left cheek pad
  R(c, "#DD7711", 24, 2, 4, 6);    // right cheek pad
  R(c, "#cc7711", 5, 3, 2, 4);     // cheek highlight L
  R(c, "#cc7711", 25, 3, 2, 4);    // cheek highlight R
  // Face
  R(c, "#DEB887", 10, 4, 12, 6);   // face
  R(c, "#111111", 12, 4, 2, 2);    // left eye
  R(c, "#111111", 18, 4, 2, 2);    // right eye
  R(c, "#aa6644", 14, 6, 4, 2);    // nose
  R(c, "#884422", 12, 8, 8, 2);    // mouth
  // Long red-orange fur
  R(c, "#CC6600", 6, 10, 20, 10);  // body
  R(c, "#BB5500", 8, 10, 16, 2);   // body top shade
  R(c, "#DEB887", 10, 12, 12, 6);  // belly
  R(c, "#e8c89a", 12, 13, 8, 4);   // belly highlight
  // Long arms with dual bamboo guns
  R(c, "#CC6600", 2, 8, 6, 10);    // left arm
  R(c, "#CC6600", 24, 8, 6, 10);   // right arm
  R(c, "#228B22", 0, 8, 2, 6);     // left bamboo gun
  R(c, "#1a6b1a", 0, 6, 2, 4);     // bamboo dark L
  R(c, "#228B22", 30, 8, 2, 6);    // right bamboo gun
  R(c, "#1a6b1a", 30, 6, 2, 4);    // bamboo dark R
  // Legs
  R(c, "#CC6600", 8, 20, 6, 8);    // left leg
  R(c, "#CC6600", 18, 20, 6, 8);   // right leg
  R(c, "#3A2212", 8, 28, 6, 4);    // left foot
  R(c, "#3A2212", 18, 28, 6, 4);   // right foot
}

function drawMonkey32King(c) {
  // Monkey King - crown, cape, golden staff (32x32)
  // Crown
  R(c, "#FFD700", 10, 0, 12, 6);   // crown band
  R(c, "#FF4444", 12, 2, 2, 2);    // ruby L
  R(c, "#FF4444", 18, 2, 2, 2);    // ruby R
  R(c, "#FFD700", 10, 0, 2, 2);    // crown point L
  R(c, "#FFD700", 14, 0, 2, 2);    // crown point C
  R(c, "#FFD700", 20, 0, 2, 2);    // crown point R
  R(c, "#ffcc00", 11, 0, 2, 2);    // point shine
  R(c, "#ffcc00", 15, 0, 2, 1);    // center shine
  // Head
  R(c, "#5C3A1E", 10, 6, 12, 6);   // head
  R(c, "#DEB887", 12, 8, 8, 4);    // face
  R(c, "#111111", 14, 8, 2, 2);    // left eye
  R(c, "#111111", 18, 8, 2, 2);    // right eye
  R(c, "#aa6644", 14, 10, 4, 2);   // nose/mouth
  // Ears
  R(c, "#DEB887", 8, 6, 2, 4);     // left ear
  R(c, "#DEB887", 22, 6, 2, 4);    // right ear
  // Cape (purple/red royal)
  R(c, "#8B0000", 6, 12, 20, 12);  // cape
  R(c, "#aa1111", 8, 12, 16, 2);   // cape top
  R(c, "#7a0000", 7, 14, 2, 8);    // cape shadow L
  R(c, "#7a0000", 23, 14, 2, 8);   // cape shadow R
  // Body under cape
  R(c, "#5C3A1E", 10, 12, 12, 10); // body
  R(c, "#7A5E3C", 12, 14, 8, 6);   // chest
  R(c, "#8a6e4c", 13, 15, 6, 4);   // chest highlight
  // Golden staff
  R(c, "#FFD700", 24, 4, 2, 20);   // staff shaft
  R(c, "#FFD700", 22, 4, 6, 2);    // staff top cross
  R(c, "#FF4444", 24, 2, 2, 2);    // jewel
  R(c, "#ffcc00", 23, 5, 2, 2);    // staff highlight
  // Arms
  R(c, "#5C3A1E", 8, 14, 2, 6);    // left arm
  R(c, "#5C3A1E", 22, 14, 2, 6);   // right arm
  // Legs under cape
  R(c, "#5C3A1E", 10, 24, 4, 4);   // left leg
  R(c, "#5C3A1E", 18, 24, 4, 4);   // right leg
  R(c, "#3A2212", 10, 28, 4, 4);   // left foot
  R(c, "#3A2212", 18, 28, 4, 4);   // right foot
  // Tail
  R(c, "#7A4E2D", 4, 18, 2, 2);    // tail 1
  R(c, "#7A4E2D", 2, 16, 2, 2);    // tail 2
  R(c, "#7A4E2D", 2, 14, 2, 4);    // tail curl
}
