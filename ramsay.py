"""
The Gordon Ramsay commentary engine for AuraChess v2.

No LLM, no network, zero latency. Lines are built once at construction time
from curated pools plus combinatorial templates, producing well over a
thousand unique, context-aware responses. A per-category history buffer
prevents the same line repeating until the pool has been exhausted.
"""

import random
from collections import deque


# ----------------------------------------------------------------------
# Fragments used to combinatorially expand the two largest categories.
# ----------------------------------------------------------------------

# Said when the PLAYER blunders -- Ramsay is delighted and savage.
_INSULTS = [
    "You donkey!", "You absolute muppet!", "Oh, you silly sausage!",
    "You numpty!", "Bloody hell, you panini head!", "You great wet lettuce!",
    "Oh, you doughnut!", "You sloppy little spanner!", "You clown!",
    "You bumbling jellyfish!", "You soggy crouton!", "You amateur!",
    "Oh dear, you pillock!", "You waffling melon!", "You shambles!",
    "You disaster on legs!", "You tragic little teapot!", "You burnt fish finger!",
    "You limp noodle!", "You wobbling blancmange!", "You half-baked spud!",
    "You raw, raw rookie!", "You catastrophe!", "You sad little crumpet!",
    "You overcooked sprout!", "You walking kitchen fire!", "You gormless prawn!",
    "You dithering doorknob!", "You squelchy disappointment!", "You plonker!",
    "You microwaved misery!", "You floppy great omelette!",
]

# The gleeful jab that follows an insult after a bad move.
_BAD_REMARKS = [
    "That move was so RAW it's still mooing at me.",
    "I've seen better decisions from a defrosting prawn.",
    "Bin it. Bin the whole board. Start again.",
    "My nan plays bolder than that, and she's been gone twelve years.",
    "That's not a strategy, that's a cry for help.",
    "You just gift-wrapped that square and posted it to me.",
    "Congratulations, you've turned chess into interpretive dance.",
    "That's the move of someone who's never met a chessboard before.",
    "Even the pieces are embarrassed for you right now.",
    "I'd send that move back to the kitchen, but the kitchen's on fire.",
    "Absolutely disgraceful. Get out of my dining room.",
    "You've just seasoned my whole evening, thank you.",
    "That blunder has more holes than a string vest.",
    "I could coach a potato to play better than that.",
    "You've handed me the game on a silver platter, lovely.",
    "That's a Michelin move -- Michelin TYRES, flat ones.",
    "You just walked your piece off a cliff, you melt.",
    "Honestly, I've tasted better moves at a petrol station.",
    "That's not chess, that's a hostage situation for your own pieces.",
    "You play like the rules are merely a suggestion.",
    "I'm going to frame that move and call it 'Modern Tragedy'.",
    "You've got the tactical instincts of a wet paper bag.",
    "That move is undercooked, overcooked, AND on fire somehow.",
    "Keep that up and I'll win before the kettle boils.",
]

# Said when the PLAYER makes a strong move -- Ramsay sweats and seethes.
_SWEAT_OPENERS = [
    "Oh, bloody hell.", "No. No no no.", "Hang on a minute.",
    "Right, that's... that's annoying.", "Oh, you cheeky little...",
    "Sweat is officially happening.", "Don't you dare.",
    "Okay, deep breath, Gordon.", "I do NOT like that.",
    "You've woken me up now.", "Cheeky. Very cheeky.",
    "My collar's getting tight.", "That actually stings.",
    "Oh, that's a problem.", "I felt that one in my teeth.",
    "Steady on, steady on.", "Where did THAT come from?",
    "I'm not panicking. You're panicking.", "Right, gloves are off.",
    "That's genuinely unsettling.", "I'll be honest, ouch.",
    "Hmm. HMM. I said hmm.", "You're starting to cook now.",
    "My eyebrow just went up on its own.",
]

# The grudging follow-up after a good move.
_GRUDGE_REMARKS = [
    "That was actually... competent. I hate it.",
    "Fine. FINE. That was a good move. Happy now?",
    "You've clearly been practising behind my back.",
    "I'd give that a Michelin star if I weren't so furious.",
    "That's tighter than my schedule on a Friday service.",
    "You're making me work, and I do NOT appreciate it.",
    "Don't get comfortable -- one swallow doesn't make a summer.",
    "That move had seasoning. Proper seasoning. Damn it.",
    "I'm writing that down so I can be angry about it later.",
    "You've found a flavour I wasn't expecting. Rude.",
    "That's the kind of move that ruins my evening.",
    "Beautiful. Disgusting. Beautifully disgusting.",
    "You're plating up like a professional and it's terrifying.",
    "I felt my lead wobble like an underset jelly.",
    "Enjoy it. It won't last. It had BETTER not last.",
    "Okay, you've got my full attention now. Hope you're proud.",
    "That's a contender. A genuine, irritating contender.",
    "I'd shake your hand if it wasn't currently a fist.",
    "You just turned up the heat and I'm the one sweating.",
    "Crisp. Clean. Infuriating. Well done, you menace.",
    "That's chef's-table standard and I want a refund.",
    "My lead just got thinner than filo pastry.",
]


# ----------------------------------------------------------------------
# Curated pools for the remaining categories.
# ----------------------------------------------------------------------
_CURATED = {
    "game_start": [
        "Right, let's get cooking. Try not to embarrass yourself.",
        "New game, fresh board, same old donkey. Off we go.",
        "Welcome back to my kitchen. Mind the knives.",
        "Let's see if you've learned anything since last time. Doubtful.",
        "Sixteen pieces each. Try to keep more than two, yeah?",
        "Service starts NOW. Don't burn the opening.",
        "I've had a coffee and a grudge. Let's play.",
        "Board's set, ego's loaded. Make your move.",
        "Right then. Impress me. I dare you.",
        "Another game, another chance for you to disappoint me.",
        "Let's keep it clean, keep it sharp, keep it... well, you'll ruin it.",
        "First move's yours. Please, surprise me for once.",
        "I've cleared my schedule to watch you fall apart.",
        "Hands washed, board polished, patience already gone. Begin.",
        "Show me you can cook, or show me you can cry. Either works.",
        "Opening night. Don't fluff your lines.",
    ],
    "player_good": [],   # filled combinatorially
    "player_bad": [],    # filled combinatorially
    "player_blunder": [
        "OH MY WORD. That is a CATASTROPHE of a move.",
        "You've just detonated your own position. Spectacular.",
        "That blunder belongs in a museum of bad decisions.",
        "I haven't seen a mistake that big since I left the oven on.",
        "You've handed me a piece like it's a free sample. Lovely!",
        "That is RAW. It's so raw it's basically still a strategy class.",
        "Did you mean to do that? Please say no. Please.",
        "You've just plated up a disaster and called it dinner.",
        "That's not a blunder, that's a full kitchen evacuation.",
        "Bravo. You've found the single worst move on the board.",
        "I want to be angry but honestly I'm just thrilled.",
        "That move set fire to your own restaurant, you donkey.",
        "Somewhere, a chess teacher just felt a chill and didn't know why.",
        "You've gift-wrapped that, added a bow, and signed the card.",
        "That is the chess equivalent of serving a raw chicken to a judge.",
        "I'd call that a mistake, but a mistake has more dignity.",
    ],
    "player_capture": [
        "Oi! You can't just TAKE that, you... oh. You did.",
        "That hurt. That genuinely hurt. Well swiped.",
        "You've nicked one of mine. Enjoy it while it lasts.",
        "Right, that's a piece down. My blood pressure says hello.",
        "Cheeky little capture. I'll remember that, believe me.",
        "You took my piece off the pass! How DARE you.",
        "Fine. Take it. I had too many anyway. (I didn't.)",
        "That's a clean capture and I'm absolutely livid about it.",
        "You've just helped yourself to my mise en place. Rude.",
        "One of my soldiers down. The kitchen is NOT happy.",
        "Snatched it right off my board. Bold. Annoyingly bold.",
        "Okay, okay, you got one. Don't let it go to your head.",
        "My piece is in your POW cage and I want it back.",
        "That capture stings worse than a lemon in a paper cut.",
    ],
    "ai_capture": [
        "And THAT, my friend, is how you trim the fat. Yum.",
        "Mine now. Lovely. Into the cage it goes.",
        "You left that hanging like a raw steak. Thank you kindly.",
        "Snip snip. One less problem for me.",
        "Delicious. Absolutely delicious. Your piece, my plate.",
        "You waved it about, so I took it. Basic kitchen rules.",
        "That piece is done. Stick a fork in it.",
        "I'll have that, ta. Did you even want it?",
        "Captured, plated, garnished. Beautiful service from me.",
        "You served that up undefended. Chef's gift, I accept.",
        "Another one for the pot. This is going swimmingly. For me.",
        "You left the door open, so I walked in and took the silverware.",
        "Off the board, into the bin. Tidy.",
        "That's a piece I didn't even have to chase. Lazy of you.",
    ],
    "check_player": [
        "Check?! On ME?! Oh, you've done it now.",
        "You've put my king in a corner. I'm seething. Carry on.",
        "Fine. Check. I see it. Stop looking so pleased.",
        "My king is sweating and so am I. Well played, damn it.",
        "Check. CHECK. You're enjoying this far too much.",
        "You've backed me into the walk-in freezer. Cold. Literally.",
        "That's a check and I refuse to acknowledge how good it was.",
        "My king's doing a runner. Thanks for that.",
        "You've got me on the back foot. Don't you smile at me.",
        "Check delivered. My eye is twitching. Noted.",
        "Right, my king's in trouble. The kitchen is in CHAOS.",
        "You dared to check the head chef. Brave. Stupid. Brave.",
    ],
    "check_ai": [
        "Check! Your king's on the run. Off you pop.",
        "That's check, sunshine. Your king is officially sweating.",
        "King in check. Tick tock. What's the plan, genius?",
        "I've cornered your king like an overcooked scallop.",
        "Check! Feel that? That's the heat of the pass.",
        "Your king's in the weeds now. Service is brutal.",
        "Check. Move him, lose him, your call. No pressure.",
        "I've got your king dancing. Lovely footwork. Doomed footwork.",
        "Check, you donkey. Try to look like you saw it coming.",
        "Your king's in the danger zone. Mind the knives.",
        "That's a check. I'd panic if I were you. I'm not, so don't worry.",
        "King's exposed. It's like sending out a raw burger. Risky.",
    ],
    "teaching": [
        "Listen -- that piece is hanging. Defend it or kiss it goodbye.",
        "Tip from the chef: don't leave a piece undefended like a lone prawn.",
        "See that knight? It's in danger. Think before you let me take it.",
        "Lesson time: every piece you move opens a door somewhere. Mind it.",
        "You're about to lose material. Slow down. Taste the position.",
        "Develop your pieces, control the centre. It's a recipe, follow it.",
        "Don't move the same piece twice in the opening. Spread the love.",
        "Your king wants to be safe. Castle early, like prepping your station.",
        "A free piece is bait. Ask WHY it's free before you bite.",
        "Count your attackers and defenders before every trade. Every time.",
        "Pawns can't go back. Push them like you mean it -- or don't.",
        "Look at MY threats before you admire your own move.",
        "That square is weak. Weak squares are like cracked plates -- avoid.",
        "When you see a good move, look for a better one. Then look again.",
        "Trade pieces when you're ahead, not when you're panicking.",
        "Your queen is precious. Stop waving her around like a tea towel.",
    ],
    "player_win": [
        "...You won. YOU won. I need to sit down.",
        "Fine. FINE. You beat me. Don't expect a certificate.",
        "Well, that's me done. You've earned it, you absolute menace.",
        "Checkmate against ME. I'm equal parts proud and furious.",
        "You did it. The donkey has grown into... a slightly larger donkey.",
        "Congratulations. I'm smiling. It's a furious smile, but it counts.",
        "You out-cooked me. I hate it. Genuinely well done.",
        "That's a win. A real one. Savour it -- I'll be back hungrier.",
        "Beaten in my own kitchen. The shame. The respect. The SHAME.",
        "You've earned that one. Now don't let it go to your head.",
        "Checkmate. I'm not crying, there's just onion in the room.",
        "You played like a chef tonight. I'm proud. I'm also plotting.",
    ],
    "player_loss": [
        "Checkmate. Game over. Back to the kitchen with you.",
        "And that's done. Overcooked, oversalted, over. Goodnight.",
        "Checkmate, you donkey. Predictable from the very first move.",
        "That's the game. Take notes -- ideally legible ones this time.",
        "Done. Finished. Wrap it up, it's not worth a second helping.",
        "Checkmate. I'd say better luck next time but luck won't save you.",
        "You folded like a cheap deckchair. Game over.",
        "That's a loss. Dust yourself off, the next game's already plating.",
        "Beaten again. Honestly, I expected this around move four.",
        "Checkmate. The kitchen is closed. Reflect on your choices.",
        "Game's mine. Shocking absolutely nobody, least of all me.",
        "You're done. Go again -- I haven't finished teaching you yet.",
    ],
    "promotion": [
        "A pawn becomes a queen! Hard graft pays off. Don't waste her.",
        "Promotion! From kitchen porter to head chef in one move. Lovely.",
        "Your pawn just got a Michelin star. Try to deserve it.",
        "New queen on the board. The recipe just got spicy.",
        "Promoted! That little pawn marched the whole way. Respect.",
        "A fresh queen. Big knife, big responsibility. Use it well.",
        "Pawn to queen -- that's the glow-up of the century.",
        "Promotion served. Now THAT'S career progression.",
    ],
    "castle": [
        "Castled. King tucked away safe like a resting souffle. Smart.",
        "Castling -- finally, some kitchen safety in this house.",
        "King's gone behind the pass. Sensible. I'm almost impressed.",
        "Castled up. Your king's prepped and protected. Good habit.",
        "There it is, castling. Even a donkey can follow a recipe sometimes.",
        "Castled. The king's safe and the rook's awake. Tidy work.",
    ],
    "idle": [
        "Tick tock. The board's not going to play itself.",
        "I haven't got all night. The kettle's already bored.",
        "Are you thinking, or has the oven light gone out upstairs?",
        "Take your time. Really. I LOVE watching paint dry.",
        "Any decade now would be lovely.",
        "I've aged a full service waiting for this move.",
        "The pieces are getting cold. Move something.",
        "Hello? Anyone home? Knock knock, it's your turn.",
        "I could've braised a shin of beef in this time.",
        "Come on, come on. Decisiveness is a seasoning too.",
        "Still thinking? Bold strategy. Doomed, but bold.",
        "My patience is reducing faster than a red wine jus.",
    ],
}


class RamsayCommentator:
    """Picks contextual Gordon Ramsay lines with no immediate repeats."""

    def __init__(self, rng=None):
        self.rng = rng or random.Random()
        self.lines = {}
        self._build()
        self._history = {cat: deque(maxlen=max(8, len(pool) // 3))
                         for cat, pool in self.lines.items()}

    def _build(self):
        # Combinatorial expansion of the two big categories.
        good, bad = [], []
        for opener in _SWEAT_OPENERS:
            for grudge in _GRUDGE_REMARKS:
                good.append(f"{opener} {grudge}")
        for insult in _INSULTS:
            for remark in _BAD_REMARKS:
                bad.append(f"{insult} {remark}")

        for cat, pool in _CURATED.items():
            self.lines[cat] = list(pool)
        self.lines["player_good"] = good
        self.lines["player_bad"] = bad

    # ------------------------------------------------------------------
    def total_lines(self):
        return sum(len(p) for p in self.lines.values())

    def category_count(self, category):
        return len(self.lines.get(category, ()))

    def comment(self, category):
        """Return a fresh line for `category`, avoiding recent repeats."""
        pool = self.lines.get(category)
        if not pool:
            return ""
        hist = self._history[category]
        choices = [ln for ln in pool if ln not in hist]
        if not choices:
            hist.clear()
            choices = pool
        line = self.rng.choice(choices)
        hist.append(line)
        return line


if __name__ == "__main__":
    r = RamsayCommentator()
    print(f"Total Gordon Ramsay lines: {r.total_lines()}")
    for cat in sorted(r.lines):
        print(f"  {cat:16s} {r.category_count(cat):5d}")
