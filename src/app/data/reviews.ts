/**
 * Star ratings, one row per real customer review.
 *
 * Stars appear on a product only when this list holds at least one rating for
 * it, and every number on the site (the average, the count, the stars) is
 * worked out from these rows. Nothing is typed in anywhere else.
 *
 * Only add a row when a customer has actually given a rating. A kind message
 * is not a star rating: only add a row once the customer has given a number
 * for a specific product. Made-up ratings are the fastest way to lose a customer who spots them,
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

export const reviews: Review[] = [
  // All seven customers gave 5 stars for what they bought (told to us 28 Sep 2026).
  // Rachel, Muna and Rahma praised the shop rather than one perfume, so their
  // rows carry the same quote on each product they told us they bought.
  {
    slug: 'paris-corner-marshmallow-blush',
    rating: 5,
    name: 'Edyna',
    quote:
      'Asante bby imefika. Inanukia atr 🙌',
    source: 'whatsapp',
  },
  {
    slug: 'armaf-club-de-nuit-malyka',
    rating: 5,
    name: 'Fathiyyah',
    quote:
      'Nimeipokea 😍🔥 Wueeh hii perfume imenikamata! Harufu yake ni addictive na inakaa muda mrefu sana 😭❤️ Kila mtu anauliza nimepaka nini 😂 Definitely coming back for more 🤗',
    source: 'whatsapp',
  },
  {
    slug: 'elysia-eden-sparkling-lychee',
    rating: 5,
    name: 'Lily Spa',
    quote:
      'Elysia lychee fizz. Honestly, this perfume smells amazing 😍❤️ The scent is so nice, fresh and long-lasting. I really love how it stays on me for hours without being too strong. Definitely worth trying 🥰✨ Highly recommend 💯',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'aro-fac-suger-lollipop',
    rating: 5,
    name: 'Sabaha',
    quote:
      'I bought suger candy with Elysia Marshmallow boujee. I honestly recommend to buy from Jaydascents. The perfumes smell nice and they last. I will be coming for more honestly.',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'elysia-yum-boujee-marshmallow',
    rating: 5,
    name: 'Sabaha',
    quote:
      'I bought suger candy with Elysia Marshmallow boujee. I honestly recommend to buy from Jaydascents. The perfumes smell nice and they last. I will be coming for more honestly.',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'prefer-love-vanilla-voyage',
    rating: 5,
    name: 'Rachel',
    quote:
      'There’s just something special about a beautiful fragrance, and Jayda Scents truly understands that. ✨❤️ I’ve been getting my perfumes from Jayda Scents, and every scent I’ve tried has been absolutely beautiful — elegant, feminine, long-lasting, and effortlessly luxurious. The kind of fragrance that makes you feel confident and leaves people asking, “What perfume are you wearing?” 😍 If you love smelling amazing and feeling luxurious, Jayda Scents is definitely worth trying. Highly recommended! 🤍✨ 10/10 - my go to perfume plug 🥰',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'armaf-yum-yum',
    rating: 5,
    name: 'Rachel',
    quote:
      'There’s just something special about a beautiful fragrance, and Jayda Scents truly understands that. ✨❤️ I’ve been getting my perfumes from Jayda Scents, and every scent I’ve tried has been absolutely beautiful — elegant, feminine, long-lasting, and effortlessly luxurious. The kind of fragrance that makes you feel confident and leaves people asking, “What perfume are you wearing?” 😍 If you love smelling amazing and feeling luxurious, Jayda Scents is definitely worth trying. Highly recommended! 🤍✨ 10/10 - my go to perfume plug 🥰',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'aro-fac-suger-lollipop',
    rating: 5,
    name: 'Muna',
    quote:
      'Absolutely love the perfumes from Jayda Scents! 😍 The scents are beautiful, elegant, and long-lasting. They smell amazing and stay on for hours without fading. Definitely worth the money! ❤️✨',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'elysia-vanilla-candy-rock-sugar',
    rating: 5,
    name: 'Muna',
    quote:
      'Absolutely love the perfumes from Jayda Scents! 😍 The scents are beautiful, elegant, and long-lasting. They smell amazing and stay on for hours without fading. Definitely worth the money! ❤️✨',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'armaf-club-de-nuit-iconic',
    rating: 5,
    name: 'Rahma',
    quote:
      'Jayda Scents is honestly one of the best perfume brands I’ve come across! ❤️✨ The fragrances are absolutely amazing, elegant, and long-lasting. Every scent has a unique and luxurious feel, and you can tell that quality is a top notch. 👌🏽',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  // Mika, 28 Sep 2026: 5 stars on everything he bought. Hawas Fire, Hawas Malibu and
  // El Bapura oil are not in the catalogue yet, so their praise is on the home page only.
  {
    slug: 'armaf-club-de-nuit-iconic',
    rating: 5,
    name: 'Mika',
    quote: 'I bought Club De Nuit Iconic from Jayda Scents. It smells great and lasts long.',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'afnan-supremacy-collectors-edition',
    rating: 5,
    name: 'Mika',
    quote: 'I also bought Supremacy Collector. Very elegant fragrance.',
    date: '2026-09-28',
    source: 'whatsapp',
  },
  {
    slug: 'clive-dorris-now-black',
    rating: 5,
    name: 'Mika',
    quote: 'Thank you for the Now Black perfume. Combined Now Black with Hawas Fire. Best combo ever! 🔥',
    date: '2026-09-28',
    source: 'whatsapp',
  },
];

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
