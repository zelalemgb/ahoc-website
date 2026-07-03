/**
 * AHOC arch monogram — the official logo mark, as a recolourable inline SVG.
 * Defaults to the primary lockup (maroon arch, cream letters). Pass `bg`/`fg`
 * for variants (e.g. on a dark surface). Uses the brand's Archivo Black.
 */
export function LogoMark({
  className,
  bg = 'var(--color-maroon)',
  fg = 'var(--color-paper)',
}: {
  className?: string;
  bg?: string;
  fg?: string;
}) {
  return (
    <svg
      viewBox="0 0 122 190"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 190 V58 C0 26 27 0 61 0 C95 0 122 26 122 58 V190 Z" fill={bg} />
      <g
        fill={fg}
        fontFamily="var(--font-display), 'Archivo Black', system-ui, sans-serif"
        fontWeight={900}
        letterSpacing="-1"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <text x="61" y="93" fontSize="60">
          AH
        </text>
        <text x="61" y="150" fontSize="60">
          OC
        </text>
      </g>
    </svg>
  );
}
