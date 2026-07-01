import type { Config } from 'tailwindcss';

/**
 * AHOC design tokens — "editorial gallery" system.
 * Light/ivory base, ink text, with the brand used minimally: maroon as the
 * single accent and gold as a rare spark. Colours are CSS variables (see
 * globals.css) so sections can be re-themed without a rebuild.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // neutral base
        paper: 'var(--color-paper)', // warm off-white  #F6F1E7
        'paper-2': 'var(--color-paper-2)', // #EFE8D9
        line: 'var(--color-line)', // hairline border  #DED3C0
        ink: 'var(--color-ink)', // near-black text  #231317
        // brand accents (used sparingly)
        maroon: 'var(--color-maroon)', // Brown Coffee  #512934
        gold: 'var(--color-gold)', // Marigold      #E0A63C
        cream: 'var(--color-cream)', // Dust Storm    #E3D0BB
      },
      fontFamily: {
        // Archivo = body/UI (Acumin stand-in). Archivo Black = display/wordmark.
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        ethiopic: ['var(--font-ethiopic)', 'sans-serif'],
      },
      borderRadius: {
        // "The Arch" — used only in the monogram now.
        arch: '1000px 1000px 14px 14px',
      },
      maxWidth: {
        shell: '1360px',
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
