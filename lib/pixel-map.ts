// Builds a small top-down "explorer map" as an SVG data URI, used as the
// placeholder art for gallery screenshots that have not been uploaded yet.
// Output is deterministic per seed, so server and client render the same map.

const WIDTH = 32;
const HEIGHT = 32;

function terrain(height: number, moisture: number) {
  if (height < 0.34) return height < 0.24 ? "#3b62c9" : "#4f7ae0";
  if (height < 0.39) return "#e8dca0";
  if (height > 0.8) return "#f2f2f2";
  if (height > 0.68) return "#8a8a8a";
  return moisture > 0.55 ? "#2f7d24" : moisture > 0.35 ? "#5a9e2f" : "#86b843";
}

function field(x: number, y: number, seed: number, scale: number) {
  return (
    Math.sin(x * scale + seed * 1.7) * 0.5 +
    Math.sin(y * scale * 1.3 + seed * 0.9) * 0.35 +
    Math.sin((x + y) * scale * 0.7 + seed * 2.3) * 0.3 +
    Math.sin((x * 0.6 - y) * scale * 1.9 + seed) * 0.15
  );
}

export function pixelMap(seed: number) {
  const rects: string[] = [];
  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      const height = (field(x, y, seed, 0.22) + 1.3) / 2.6;
      const moisture = (field(y, x, seed + 5, 0.31) + 1.3) / 2.6;
      rects.push(`<rect x='${x}' y='${y}' width='1' height='1' fill='${terrain(height, moisture)}'/>`);
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${WIDTH} ${HEIGHT}' preserveAspectRatio='none' shape-rendering='crispEdges'>${rects.join("")}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
