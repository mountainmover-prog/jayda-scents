import { imageManifest, ImageInfo } from '../data/imageManifest';

/**
 * Where the smaller WebP copies of a photo live, and how wide each one is.
 * Shared by the page components and by vite.config.ts, which writes the hero
 * preload into index.html. Keeping one definition matters: a preload that
 * lists different files from the <img> downloads the hero twice.
 */
export const infoFor = (src: string): ImageInfo | undefined => imageManifest[src];

const webpPath = (src: string, width: number, suffix = '') =>
  src.replace(/\.jpg$/, `${suffix}-${width}.webp`);

export const webpSrcSet = (src: string, widths: number[], suffix = '') =>
  widths.map((w) => `${webpPath(src, w, suffix)} ${w}w`).join(', ');

/**
 * The hero, as the browser needs it. Phones get a square crop from the middle
 * of the banner (the only part a narrow screen ever shows), drawn about as wide
 * as the hero is tall. Wider screens get the full banner, which object-cover
 * draws a little wider than the window, hence 1600px for tablets.
 */
export const HERO_SRC = '/images/hero-jayda.jpg';
export const HERO_MOBILE_MEDIA = '(max-width: 767px)';
export const HERO_MOBILE_SIZES = '70vh';
export const HERO_WIDE_MEDIA = '(min-width: 768px)';
export const HERO_WIDE_SIZES = '(max-width: 1279px) 1600px, 100vw';

export function heroSources() {
  const info = infoFor(HERO_SRC);
  if (!info) return null;
  return {
    info,
    mobile: info.mobile ? webpSrcSet(HERO_SRC, info.mobile.webp, '-mobile') : null,
    wide: webpSrcSet(HERO_SRC, info.webp),
  };
}
