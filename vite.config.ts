import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { SITE_URL } from './src/app/config/shop'
import { products } from './src/app/data/products'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

/**
 * Everything that has to name the site's own address, built from SITE_URL in
 * src/app/config/shop.ts so there is exactly one place to change it.
 *
 * - index.html: %SITE_URL% becomes the real address, because link-preview
 *   images must be absolute URLs.
 * - robots.txt: lets search engines in and points them at the sitemap.
 * - sitemap.xml: every live product and page. It is built from the same
 *   products.ts as the shop, so a product added to the catalogue is in the
 *   sitemap on the next build and a removed one drops out.
 */
function siteMeta() {
  const pages = ['/', '/shop', '/women', '/men', '/unisex', '/faq']
    .concat(products.map((p) => `/product/${p.slug}`))
  return {
    name: 'site-meta',
    transformIndexHtml(html: string) {
      return html.split('%SITE_URL%').join(SITE_URL)
    },
    generateBundle() {
      // @ts-ignore rollup plugin context
      const emit = (fileName: string, source: string) => this.emitFile({ type: 'asset', fileName, source })
      emit('robots.txt', `User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /checkout\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
      emit('sitemap.xml',
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        pages.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc></url>`).join('\n') +
        '\n</urlset>\n')
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    siteMeta(),
    react(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
