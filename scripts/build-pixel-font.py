"""Subset the Minecraft AE pixel font to the characters the site actually uses.

The full font (public/dreamhaven/assets/fonts/minecraft.ttf) is ~16 MB. The
pages only need the glyphs that appear in their source, so this script scans
app/, components/, lib/ and the static DreamHaven page, and writes a small WOFF2
next to the other web fonts.

Re-run after changing site copy:  python scripts/build-pixel-font.py
Requires: pip install fonttools brotli
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SOURCE_FONT = ROOT / "public" / "dreamhaven" / "assets" / "fonts" / "minecraft.ttf"
OUTPUT_FONT = ROOT / "public" / "fonts" / "DreamingFish-Pixel.woff2"
SOURCE_DIRS = ["app", "components", "lib", "public/dreamhaven"]
EXTRA_CHARS = "".join(chr(code) for code in range(0x20, 0x7F)) + "·—…！？：，。、（）《》“”‘’「」←→↑↓×"


def collect_characters() -> set[str]:
    chars = set(EXTRA_CHARS)
    for directory in SOURCE_DIRS:
        for path in (ROOT / directory).rglob("*"):
            if path.suffix in {".ts", ".tsx", ".html", ".js"}:
                chars.update(path.read_text(encoding="utf-8"))
    return {char for char in chars if char.isprintable()}


def main() -> None:
    font = TTFont(SOURCE_FONT)
    available = font.getBestCmap()
    wanted = collect_characters()
    unicodes = sorted(ord(char) for char in wanted if ord(char) in available)

    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = []
    options.name_IDs = ["*"]
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    OUTPUT_FONT.parent.mkdir(parents=True, exist_ok=True)
    font.save(OUTPUT_FONT)

    missing = sorted(char for char in wanted if ord(char) not in available and not char.isspace())
    print(f"{len(unicodes)} glyphs -> {OUTPUT_FONT.relative_to(ROOT)} ({OUTPUT_FONT.stat().st_size / 1024:.1f} KB)")
    if missing:
        print("not in source font (falls back to HarmonyOS Sans):", "".join(missing))


if __name__ == "__main__":
    main()
