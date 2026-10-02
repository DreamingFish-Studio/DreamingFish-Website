export function SectionHead({ eyebrow, index }: { eyebrow: string; index: number }) {
  return (
    <div className="section-head" data-reveal>
      <p className="eyebrow"><i aria-hidden="true" />{eyebrow}</p>
      <span className="chapter" aria-hidden="true">{String(index).padStart(2, "0")}<small>/08</small></span>
    </div>
  );
}
