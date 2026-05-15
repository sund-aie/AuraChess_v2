"""
Procedural sound effects for AuraChess v2.

Every effect is synthesised at startup with the standard library only
(no numpy, no asset files required). If a matching file exists under
assets/sounds/<name>.ogg or .wav it is loaded instead, so custom audio
can be dropped in without touching code.
"""

import math
import os
import random
from array import array

import pygame

SAMPLE_RATE = 44100
SOUND_DIR = os.path.join("assets", "sounds")

EFFECT_NAMES = ("select", "drag", "drop", "move", "capture",
                "attack", "death", "invalid", "check", "win", "lose")


def _envelope(i, n, attack=0.01, release=0.5):
    """Simple attack/decay envelope, 0..1, for sample i of n."""
    a = int(n * attack)
    if i < a and a > 0:
        return i / a
    pos = (i - a) / max(1, n - a)
    return max(0.0, (1.0 - pos)) ** (1.0 / max(0.05, release) * 0.6)


def _tone(freq, dur, vol=0.4, release=0.5, drift=0.0, harmonic=0.3):
    n = int(SAMPLE_RATE * dur)
    out = []
    for i in range(n):
        t = i / SAMPLE_RATE
        f = freq + drift * t
        val = math.sin(2 * math.pi * f * t)
        val += harmonic * math.sin(4 * math.pi * f * t)
        out.append(val * vol * _envelope(i, n, release=release))
    return out


def _noise(dur, vol=0.4, release=0.4, lowpass=0.5):
    n = int(SAMPLE_RATE * dur)
    out = []
    prev = 0.0
    rng = random.Random(1234)
    for i in range(n):
        raw = rng.uniform(-1.0, 1.0)
        prev = prev + lowpass * (raw - prev)        # crude low-pass
        out.append(prev * vol * _envelope(i, n, release=release))
    return out


def _mix(*layers):
    length = max(len(layer) for layer in layers)
    out = [0.0] * length
    for layer in layers:
        for i, v in enumerate(layer):
            out[i] += v
    return out


def _build_effects():
    fx = {}
    fx["select"] = _tone(620, 0.10, vol=0.25, release=0.6)
    fx["drag"] = _tone(330, 0.08, vol=0.22, release=0.7, harmonic=0.1)
    fx["drop"] = _mix(_tone(180, 0.12, vol=0.34, release=0.4),
                      _noise(0.06, vol=0.12))
    fx["move"] = _mix(_tone(240, 0.09, vol=0.30, release=0.45),
                      _noise(0.04, vol=0.10))
    fx["capture"] = _mix(_noise(0.22, vol=0.42, lowpass=0.7),
                         _tone(150, 0.18, vol=0.34, release=0.35,
                               drift=-260))
    fx["attack"] = _mix(_tone(420, 0.14, vol=0.34, release=0.3,
                              drift=-900),
                        _noise(0.10, vol=0.26))
    fx["death"] = _mix(_tone(330, 0.40, vol=0.36, release=0.7,
                             drift=-520),
                       _noise(0.30, vol=0.20, release=0.8))
    fx["invalid"] = _mix(_tone(110, 0.10, vol=0.34, release=0.4),
                         _tone(104, 0.10, vol=0.30, release=0.4))
    fx["check"] = _mix(_tone(880, 0.16, vol=0.30, release=0.5),
                       _tone(1170, 0.16, vol=0.22, release=0.5))
    fx["win"] = (_tone(523, 0.14, vol=0.30) + _tone(659, 0.14, vol=0.30)
                 + _tone(784, 0.14, vol=0.30)
                 + _tone(1047, 0.30, vol=0.32, release=0.7))
    fx["lose"] = (_tone(440, 0.18, vol=0.30, harmonic=0.1)
                  + _tone(370, 0.18, vol=0.30, harmonic=0.1)
                  + _tone(294, 0.40, vol=0.30, release=0.7, harmonic=0.1))
    return fx


class SoundFX:
    """Owns the mixer and all effect playback."""

    def __init__(self):
        self.enabled = False
        self.muted = False
        self.sounds = {}
        self.channels = 1
        try:
            if pygame.mixer.get_init() is None:
                pygame.mixer.init(SAMPLE_RATE, -16, 1, 512)
            init = pygame.mixer.get_init()
            if init:
                self.channels = init[2]
                self.enabled = True
        except pygame.error:
            self.enabled = False
        if self.enabled:
            self._load_all()

    def _to_sound(self, samples):
        buf = array('h')
        for s in samples:
            v = int(max(-1.0, min(1.0, s)) * 32767)
            buf.append(v)
            if self.channels == 2:
                buf.append(v)
        return pygame.mixer.Sound(buffer=buf.tobytes())

    def _load_all(self):
        synth = _build_effects()
        for name in EFFECT_NAMES:
            custom = self._find_custom(name)
            try:
                if custom:
                    self.sounds[name] = pygame.mixer.Sound(custom)
                else:
                    self.sounds[name] = self._to_sound(synth[name])
            except (pygame.error, ValueError):
                pass

    @staticmethod
    def _find_custom(name):
        for ext in (".ogg", ".wav"):
            path = os.path.join(SOUND_DIR, name + ext)
            if os.path.isfile(path):
                return path
        return None

    def play(self, name, volume=1.0):
        if not self.enabled or self.muted:
            return
        snd = self.sounds.get(name)
        if snd is None:
            return
        try:
            snd.set_volume(volume)
            snd.play()
        except pygame.error:
            pass

    def toggle_mute(self):
        self.muted = not self.muted
        return self.muted
