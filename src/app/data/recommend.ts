import { Product } from '../types';
import { products, priceFrom, totalStock } from './products';

/**
 * "You may also like": the products most like this one, best first.
 *
 * Scent family counts most, because someone looking at a gourmand is most
 * likely to want another gourmand. Brand comes next, then who it is made for.
 * A men's fragrance never suggests a women's one and the reverse; unisex sits
 * comfortably beside either. Sold-out products are left out, since a
 * suggestion you cannot buy is a dead end.
 *
 * Ties break on price, closest first, so a TZS 30,000 bottle suggests others
 * near that price rather than a 250,000 extrait. The last tiebreak is the slug,
 * which keeps the order identical on every visit.
 *
 * Products with no family yet (the four newest) still get sensible neighbours
 * from brand and gender alone.
 */
export function recommendationsFor(product: Product, limit = 4): Product[] {
  const myPrice = priceFrom(product);

  const score = (p: Product) => {
    let s = 0;
    if (product.family && p.family && p.family === product.family) s += 3;
    if (p.brand === product.brand) s += 2;
    if (p.gender === product.gender) s += 2;
    else if (p.gender === 'unisex' || product.gender === 'unisex') s += 1;
    else s -= 5; // men's beside women's, or the reverse
    return s;
  };
  const distance = (p: Product) => Math.abs(Math.log(priceFrom(p) / myPrice));

  return products
    .filter((p) => p.slug !== product.slug && totalStock(p) > 0)
    .map((p) => ({ p, s: score(p), d: distance(p) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.d - b.d || a.p.slug.localeCompare(b.p.slug))
    .slice(0, limit)
    .map((x) => x.p);
}
