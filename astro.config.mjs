// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  // Brand typefaces (see src/styles/typography.css for how they map to Tailwind).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-cormorant-garamond',
      weights: [400, 500],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Garamond', 'Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Niramit',
      cssVariable: '--font-niramit',
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
