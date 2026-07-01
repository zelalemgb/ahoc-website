import type { Config } from 'tailwindcss';

/**
 * AHOC design tokens.
 * Heritage core + the elevated system (see docs/BRAND.md).
 * Colours are exposed as CSS variables in globals.css so they can be
 * themed (e.g. light/dark sections) without rebuilding Tailwind.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // heritage core
        maroon: 'var(--color-maroon)', // Brown Coffee  #512934
        plum: 'var(--color-plum)', // Midnight Coffee #2E141C
        tan: 'var(--color-tan)', // Café au Lait  #A38054
        cream: 'var(--color-cream)', // Dust Storm    #E3D0BB
        // elevated system
        gold: 'var(--color-gold)', // Marigold      #E0A63C
        green: 'var(--color-green)', // Meskel Green  #1E7A50
        lapis: 'var(--color-lapis)', // Timket Lapis  #1F5673
        vermilion: 'var(--color-vermilion)', // Berbere   #D9482B
        ivory: 'var(--color-ivory)', // Injera Ivory  #F5EEE2
        ink: 'var(--color-ink)', // Coffee Ink    #241318
        stone: 'var(--color-stone)', // Stone         #8A7A6B
      },
      fontFamily: {
        // Fraunces = expressive display voice, Archivo = neutral body,
        // Noto Serif Ethiopic = Amharic (Ge'ez).
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        ethiopic: ['var(--font-ethiopic)', 'serif'],
      },
      borderRadius: {
        // "The Arch" — the signature arch-top-window motif.
        arch: '1000px 1000px 14px 14px',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
