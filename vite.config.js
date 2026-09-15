import { defineConfig } from 'vite';
import { minify } from 'html-minifier-terser';

export default defineConfig({
  base: '/instituto-df-cerrado/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssMinify: true,
    minify: 'esbuild'
  },
  plugins: [
    {
      name: 'minify-html',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        async handler(html) {
          return minify(html, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            minifyCSS: true,
            minifyJS: true
          });
        }
      }
    }
  ]
});
