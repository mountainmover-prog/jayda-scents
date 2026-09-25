import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { SITE_URL } from '../config/shop';
import { findProduct } from '../data/products';
import { useLang } from '../i18n/LanguageContext';

/**
 * Per-page title, description and canonical tag, set after each navigation.
 *
 * The canonical is always the address of the page itself, on SITE_URL, with
 * the ?query and #hash stripped. So /faq#delivery, /shop?utm_source=whatsapp,
 * the www spelling and the same page still reachable on an old host all point
 * Google at one URL.
 * Google's guidance allows a canonical set by JavaScript as long as the raw
 * HTML carries no different one, which is why index.html has none.
 *
 * Cart, checkout and a product that does not exist are marked noindex: they
 * are useless as search results. Adding noindex from JavaScript is reliable;
 * it is removing one that search engines may not see, which is why the
 * site-wide noindex had to come out of index.html itself.
 */

const SHOP = 'Jayda Scents';

const TITLES: Record<string, { en: string; sw: string }> = {
  '/': { en: `${SHOP} | Eau de parfum in Zanzibar and Dar es Salaam`, sw: `${SHOP} | Manukato Zanzibar na Dar es Salaam` },
  '/shop': { en: `All fragrances | ${SHOP}`, sw: `Manukato yote | ${SHOP}` },
  '/women': { en: `Women's fragrances | ${SHOP}`, sw: `Manukato ya wanawake | ${SHOP}` },
  '/men': { en: `Men's fragrances | ${SHOP}`, sw: `Manukato ya wanaume | ${SHOP}` },
  '/unisex': { en: `Unisex fragrances | ${SHOP}`, sw: `Manukato ya wote | ${SHOP}` },
  '/body-mists': { en: `Body mists | ${SHOP}`, sw: `Body mist | ${SHOP}` },
  '/faq': { en: `Questions & answers | ${SHOP}`, sw: `Maswali na majibu | ${SHOP}` },
  '/cart': { en: `Cart | ${SHOP}`, sw: `Kikapu | ${SHOP}` },
  '/checkout': { en: `Checkout | ${SHOP}`, sw: `Malipo | ${SHOP}` },
};
const PRIVATE = new Set(['/cart', '/checkout']);

function upsert(selector: string, create: () => HTMLElement): HTMLElement {
  return document.head.querySelector<HTMLElement>(selector) ?? document.head.appendChild(create());
}
const meta = (name: string) =>
  upsert(`meta[name="${name}"]`, () => Object.assign(document.createElement('meta'), { name }));

/** Cut at a word boundary under 160 characters, which is what results show. */
function clip(text: string, max = 160) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '') + '…';
}

export function Seo() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
    const defaultDescription = meta('description').dataset.default ??= meta('description').getAttribute('content') ?? '';

    let title = TITLES[path]?.[lang] ?? TITLES['/'][lang];
    let description = defaultDescription;
    let indexable = !PRIVATE.has(path);

    const slug = path.match(/^\/product\/([^/]+)$/)?.[1];
    if (slug) {
      const p = findProduct(slug);
      if (p) {
        title = `${p.name} by ${p.brand} | ${SHOP}`;
        description = clip(p.shortDescription || p.longDescription || defaultDescription);
      } else {
        indexable = false;
      }
    }

    document.title = title;
    meta('description').setAttribute('content', description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    const robots = document.head.querySelector('meta[name="robots"]');
    if (indexable) {
      upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }))
        .setAttribute('href', SITE_URL + path);
      robots?.remove();
    } else {
      canonical?.remove();
      meta('robots').setAttribute('content', 'noindex');
    }
  }, [pathname, lang]);

  return null;
}
