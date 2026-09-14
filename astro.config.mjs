import { defineConfig } from 'astro/config';
import { devQuoteApiPlugin } from './scripts/dev-quote-api-plugin.mjs';

export default defineConfig({
  site: 'https://www.chlopakioddzwieku.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [devQuoteApiPlugin()],
  },
});
