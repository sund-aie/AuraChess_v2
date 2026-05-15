"""
Theme definitions for AuraChess v2: factions (piece styling) and terrains
(board styling). Everything is pure data so the renderer stays generic.

Colours are (r, g, b) tuples.
"""

# ----------------------------------------------------------------------
# Factions -- control the palette and headgear of a side's pieces.
#
# palette keys:
#   body    -- main robe / uniform colour
#   shade   -- darker shading tone
#   light   -- highlight tone
#   metal   -- armour / weapon accent
#   skin    -- face colour
#   accent  -- emblem / trim colour
#   gear    -- headgear style id used by sprites.py
# ----------------------------------------------------------------------
FACTIONS = {
    "Classic": {
        "blurb": "Timeless carved chessmen.",
        "white": {"body": (238, 232, 214), "shade": (190, 180, 158),
                  "light": (255, 252, 240), "metal": (205, 198, 176),
                  "skin": (238, 232, 214), "accent": (150, 120, 70),
                  "gear": "classic"},
        "black": {"body": (60, 58, 64), "shade": (32, 30, 36),
                  "light": (104, 100, 110), "metal": (140, 138, 150),
                  "skin": (60, 58, 64), "accent": (180, 150, 90),
                  "gear": "classic"},
    },
    "British Soldiers": {
        "blurb": "Red coats and bearskin hats.",
        "white": {"body": (196, 40, 44), "shade": (132, 24, 28),
                  "light": (240, 96, 86), "metal": (224, 200, 120),
                  "skin": (235, 190, 158), "accent": (250, 230, 140),
                  "gear": "bearskin"},
        "black": {"body": (40, 46, 92), "shade": (20, 24, 56),
                  "light": (86, 96, 158), "metal": (210, 188, 110),
                  "skin": (210, 165, 130), "accent": (236, 214, 130),
                  "gear": "bearskin"},
    },
    "US Marines": {
        "blurb": "Woodland camo and combat helmets.",
        "white": {"body": (122, 132, 96), "shade": (74, 82, 56),
                  "light": (168, 176, 130), "metal": (90, 96, 78),
                  "skin": (232, 188, 150), "accent": (216, 200, 120),
                  "gear": "helmet"},
        "black": {"body": (66, 72, 60), "shade": (38, 42, 34),
                  "light": (110, 118, 96), "metal": (54, 58, 50),
                  "skin": (150, 110, 84), "accent": (190, 174, 100),
                  "gear": "helmet"},
    },
    "Arabs": {
        "blurb": "Flowing robes and proud turbans.",
        "white": {"body": (240, 236, 224), "shade": (196, 188, 166),
                  "light": (255, 254, 248), "metal": (220, 188, 96),
                  "skin": (214, 168, 122), "accent": (66, 122, 96),
                  "gear": "turban"},
        "black": {"body": (52, 44, 70), "shade": (30, 24, 44),
                  "light": (96, 84, 124), "metal": (224, 192, 100),
                  "skin": (168, 122, 86), "accent": (200, 150, 70),
                  "gear": "turban"},
    },
    "Ninjas": {
        "blurb": "Shadow clans, masked and silent.",
        "white": {"body": (118, 124, 140), "shade": (78, 82, 96),
                  "light": (170, 176, 192), "metal": (210, 214, 224),
                  "skin": (228, 200, 170), "accent": (188, 60, 70),
                  "gear": "hood"},
        "black": {"body": (38, 40, 50), "shade": (20, 21, 28),
                  "light": (78, 82, 100), "metal": (150, 156, 172),
                  "skin": (90, 80, 78), "accent": (150, 40, 52),
                  "gear": "hood"},
    },
    "Crusaders": {
        "blurb": "Plate armour and holy crosses.",
        "white": {"body": (222, 224, 230), "shade": (162, 166, 178),
                  "light": (252, 252, 255), "metal": (200, 204, 214),
                  "skin": (234, 190, 158), "accent": (188, 44, 48),
                  "gear": "greathelm"},
        "black": {"body": (74, 78, 88), "shade": (44, 46, 54),
                  "light": (120, 126, 140), "metal": (158, 162, 174),
                  "skin": (170, 128, 96), "accent": (60, 70, 150),
                  "gear": "greathelm"},
    },
    "Monkeys": {
        "blurb": "A chaotic troop of primates.",
        "white": {"body": (208, 168, 120), "shade": (158, 122, 80),
                  "light": (238, 206, 162), "metal": (180, 150, 110),
                  "skin": (244, 214, 178), "accent": (228, 140, 70),
                  "gear": "ears"},
        "black": {"body": (96, 74, 56), "shade": (60, 46, 34),
                  "light": (140, 112, 84), "metal": (120, 98, 72),
                  "skin": (158, 122, 92), "accent": (210, 120, 60),
                  "gear": "ears"},
    },
}

FACTION_NAMES = list(FACTIONS.keys())

# ----------------------------------------------------------------------
# Terrains -- control the board squares and their procedural overlay.
#
# overlay ids are interpreted by board_art.py.
# ----------------------------------------------------------------------
TERRAINS = {
    "Classic": {
        "blurb": "Polished tournament marble.",
        "light": (236, 218, 185), "dark": (132, 100, 68),
        "overlay": "marble", "edge": (40, 30, 22),
    },
    "Desert": {
        "blurb": "Cracked dunes and drifting sand.",
        "light": (226, 196, 138), "dark": (170, 132, 82),
        "overlay": "sand", "edge": (96, 70, 38),
    },
    "Forest": {
        "blurb": "Mossy stones beneath the canopy.",
        "light": (150, 168, 110), "dark": (74, 94, 58),
        "overlay": "moss", "edge": (28, 40, 22),
    },
    "Volcanic": {
        "blurb": "Black rock laced with glowing embers.",
        "light": (96, 78, 78), "dark": (44, 34, 36),
        "overlay": "embers", "edge": (16, 10, 10),
    },
    "Snow": {
        "blurb": "Frosted slabs and packed ice.",
        "light": (236, 240, 248), "dark": (158, 176, 200),
        "overlay": "frost", "edge": (96, 110, 130),
    },
    "Battlefield": {
        "blurb": "Camo netting over churned earth.",
        "light": (138, 134, 96), "dark": (86, 84, 60),
        "overlay": "camo", "edge": (34, 32, 22),
    },
}

TERRAIN_NAMES = list(TERRAINS.keys())

# Kill styles -- how a captured piece leaves the board.
KILL_STYLES = {
    "Vanish": "Fade away into nothing.",
    "Shatter": "Burst apart in fragments.",
    "Topple": "Fall over and slide off.",
}
KILL_STYLE_NAMES = list(KILL_STYLES.keys())


def faction_palette(faction_name, color):
    """Return the palette dict for one side of a faction."""
    return FACTIONS[faction_name][color]
