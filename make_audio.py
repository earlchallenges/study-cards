"""Make Kokoro (Heart voice) MP3s for every card in a chapter page.

Needs the Kokoro server from ~/speak-selection running on 127.0.0.1:5123.
Usage: python3 make_audio.py ch8-breasts.html ch8
Writes audio/<name>/tNN.mp3 (term) and dNN.mp3 (definition).
"""
import re, subprocess, sys, urllib.request
from pathlib import Path

page, name = sys.argv[1], sys.argv[2]
html = Path(page).read_text()
cards = re.findall(r"\{ term: '((?:[^'\\]|\\.)*)'.*?def: '((?:[^'\\]|\\.)*)'", html)

# exact pronunciations (IPA) for words Kokoro gets wrong on its own
IPA = {
    "Galactocele": "/ɡəlˈæktəsˌil/",
    "NSAIDs": "/ˈɛnsɛdz/",
}


def speakable(text):
    t = text.replace("\\'", "'")
    t = re.sub(r"(\d+)–(\d+)%", r"\1 to \2 percent", t)
    t = re.sub(r"less than (\d+)%", r"less than \1 percent", t)
    t = t.replace("2×", "two times").replace(" vs. ", " versus ").replace("(SERM)", "")
    for word, ipa in IPA.items():
        t = re.sub(rf"\b{word}\b", lambda m: f"[{m.group(0)}]({ipa})", t, flags=re.I)
    return t


out = Path("audio") / name
out.mkdir(parents=True, exist_ok=True)
for n, (term, definition) in enumerate(cards, 1):
    for kind, text in (("t", term), ("d", definition)):
        req = urllib.request.Request("http://127.0.0.1:5123/tts?speed=1", data=speakable(text).encode(), method="POST")
        wav = urllib.request.urlopen(req, timeout=120).read()
        mp3 = out / f"{kind}{n:02d}.mp3"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "wav", "-i", "pipe:0", "-ac", "1", "-b:a", "64k", str(mp3)],
                       input=wav, check=True)
print(f"{len(cards)} cards -> {out}")
