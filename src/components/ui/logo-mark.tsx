/* eslint-disable @next/next/no-img-element */

/**
 * AHOC arch monogram — the official logo file (public/logo-mark.png).
 * The mark is maroon-on-transparent, so it's used on light surfaces. A
 * light/mono version is needed for dark surfaces (e.g. the footer).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-mark.png"
      alt=""
      width={466}
      height={761}
      className={className}
      decoding="async"
    />
  );
}
