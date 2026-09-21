/**
 * Star ratings, one row per real customer review.
 *
 * Stars appear on a product only when this list holds at least one rating for
 * it, and every number on the site (the average, the count, the stars) is
 * worked out from these rows. Nothing is typed in anywhere else.
 *
 * Only add a row when a customer has actually given a rating. A kind message
 * is not a star rating: Edyna and Fathiyyah wrote lovely things (they are on
 * the home page as testimonials), but neither gave a number, so neither is
 * here. Ask them for one when you ask permission to quote them, and add it
 * then. Made-up ratings are the fastest way to lose a customer who spots them,
 * and in many places they are illegal.
 *
 * Every product page has a "Tell us how it wears" link that opens WhatsApp
 * with the product name and "Stars out of 5:" already typed, so reviews
 * arrive in a shape that drops straight into a row.
 *
 * To add one:
 *   { slug: 'lattafa-yara', rating: 5, name: 'Amina', quote: 'Lasts all day.', date: '2026-09-21', source: 'whatsapp' },
 *
 * `slug` is the product's ID from the catalogue (the end of its web address).
 * `quote`, `date` and `source` are optional. `source` is never shown.
 */
import { products } from './products';

export interface Review {
  slug: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** First name, or how they are happy to be credited. */
  name: string;
  /** Their words, as they wrote them. Not translated. */
  quote?: string;
  /** YYYY-MM-DD */
  date?: string;
  source?: 'whatsapp' | 'instagram' | 'tiktok' | 'in-person';
}

export const reviews: Review[] = [];

export interface RatingSummary {
  /** Mean of the ratings, to one decimal place. */
  average: number;
  count: number;
}

export function reviewsFor(slug: string): Review[] {
  return reviews
    .filter((r) => r.slug === slug)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

/** Null when the product has no ratings, so callers render nothing at all. */
export function ratingFor(slug: string): RatingSummary | null {
  const rs = reviews.filter((r) => r.slug === slug);
  if (rs.length === 0) return null;
  const average = rs.reduce((n, r) => n + r.rating, 0) / rs.length;
  return { average: Math.round(average * 10) / 10, count: rs.length };
}

// A slug that matches nothing would sit here silently and never show, so say
// so in the browser console. Costs nothing on a list this size.
{
  const known = new Set(products.map((p) => p.slug));
  for (const r of reviews) {
    if (!known.has(r.slug)) console.warn(`reviews.ts: "${r.slug}" is not a live product`);
  }
}
