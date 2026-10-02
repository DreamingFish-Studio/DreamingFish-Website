"""Generate the small pixel-art SVG textures used by the home page.

Textures are 16x16 "block" tiles drawn with crisp rects, plus a sparse star
field. Output is deterministic (fixed seeds), so re-running only changes files
when this script changes.

Run:  python scripts/build-textures.py
"""

import random
from pathlib import Path

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "textures"


def tile(name: str, width: int, height: int, pixel) -> None:
    rects = []
    for y in range(height):
        for x in range(width):
            color = pixel(x, y)
            if color:
                rects.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{color}"/>')
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}" shape-rendering="crispEdges">{"".join(rects)}</svg>'
    )
    (OUTPUT_DIR / f"{name}.svg").write_text(svg, encoding="utf-8")


def noise_tile(name: str, palette: list[str], weights: list[int], seed: int) -> None:
    rng = random.Random(seed)
    grid = [[rng.choices(palette, weights)[0] for _ in range(16)] for _ in range(16)]
    tile(name, 16, 16, lambda x, y: grid[y][x])


def grass_side(seed: int) -> None:
    rng = random.Random(seed)
    dirt = ["#866043", "#79553a", "#966c4a", "#5c3f2a", "#b9855c"]
    grass = ["#5d9b2d", "#6db33b", "#7fc24a", "#4f8a26"]
    depth = [rng.choice([2, 3, 3, 4, 4, 5]) for _ in range(16)]
    cells = [[rng.choices(dirt, [5, 5, 4, 2, 1])[0] for _ in range(16)] for _ in range(16)]

    def pixel(x: int, y: int):
        return rng.choice(grass) if y < depth[x] else cells[y][x]

    tile("grass-side", 16, 16, pixel)


def oak_planks(seed: int) -> None:
    rng = random.Random(seed)
    tones = ["#a2824e", "#9c7a47", "#b8945f", "#8f6e3f"]
    grid = [[rng.choice(tones) for _ in range(16)] for _ in range(16)]

    def pixel(x: int, y: int):
        if y % 4 == 3:
            return "#6b5230"
        if (y // 4) % 2 == 0 and x == 7 or (y // 4) % 2 == 1 and x == 15:
            return "#7d6038"
        return grid[y][x]

    tile("oak", 16, 16, pixel)


def stars(seed: int) -> None:
    rng = random.Random(seed)
    size = 480
    rects = []
    for _ in range(70):
        x, y = rng.randrange(size), rng.randrange(size)
        s = rng.choice([1, 2, 2, 2, 3])
        opacity = rng.choice([0.35, 0.5, 0.7, 0.9])
        rects.append(f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="#fff" opacity="{opacity}"/>')
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" '
        f'shape-rendering="crispEdges">{"".join(rects)}</svg>'
    )
    (OUTPUT_DIR / "stars.svg").write_text(svg, encoding="utf-8")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    noise_tile("stone", ["#7d7d7d", "#747474", "#868686", "#6a6a6a", "#909090"], [6, 5, 4, 2, 1], seed=11)
    noise_tile("dirt", ["#866043", "#79553a", "#966c4a", "#5c3f2a", "#b9855c"], [5, 5, 4, 2, 1], seed=23)
    grass_side(seed=37)
    oak_planks(seed=41)
    stars(seed=53)
    print("textures ->", OUTPUT_DIR)


if __name__ == "__main__":
    main()
