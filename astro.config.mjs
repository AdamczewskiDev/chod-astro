import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.chlopakioddzwieku.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
