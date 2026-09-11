/**
 * Real customer feedback only.
 *
 * Every entry here must be something a real customer actually said. Copy it from
 * the WhatsApp message, the Instagram comment or the TikTok reply it came from,
 * and keep their words — light tidying of spelling is fine, rewriting is not.
 *
 * Invented reviews are the fastest way to lose a customer who spots them, and in
 * many places they are illegal. An empty list is honest; a made-up one is not.
 *
 * While this list is empty the testimonials section does not render at all, so
 * the shop simply does not have that section yet.
 *
 * To add one:
 *   { quote: 'exactly what they wrote', name: 'Amina', area: 'Masaki', source: 'whatsapp' }
 *
 * `area` and `product` are optional. `source` is optional and is not shown on the
 * site — it is there so you can find the original message again later.
 */
export interface Testimonial {
  /** Their words, as they wrote them. */
  quote: string;
  /** First name, or how they are happy to be credited. */
  name: string;
  /** Neighbourhood or town — Masaki, Mikocheni, Zanzibar. Optional. */
  area?: string;
  /** Which fragrance they bought, if they said. Optional. */
  product?: string;
  /** Where it came from, for your records only. Not displayed. */
  source?: 'whatsapp' | 'instagram' | 'tiktok' | 'in-person';
}

export const testimonials: Testimonial[] = [
  // Nothing here yet — add real messages as they come in.
];
