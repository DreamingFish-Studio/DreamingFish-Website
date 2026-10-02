// 16×10 pixel-art fish facing left; the eye is a gap in the body.
const FISH_PATH =
  "M4 1h4v1h-4z" +
  "M2 2h8v1h-8zM13 2h2v1h-2z" +
  "M1 3h10v1h-10zM12 3h3v1h-3z" +
  "M1 4h2v1h-2zM4 4h9v1h-9z" +
  "M1 5h12v1h-12z" +
  "M1 6h10v1h-10zM12 6h3v1h-3z" +
  "M2 7h8v1h-8zM13 7h2v1h-2z" +
  "M4 8h4v1h-4z";

export function PixelFish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 10" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={FISH_PATH} />
    </svg>
  );
}
