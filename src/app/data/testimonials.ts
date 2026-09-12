/**
 * Real customer feedback only.
 *
 * Every entry here must be something a real customer actually said. Copy it from
 * the WhatsApp message, the Instagram comment or the TikTok reply it came from,
 * and keep their words — light tidying of spelling is fine, rewriting is not.
 *
 * Quotes are NOT translated. A customer who writes in a mix of Swahili and
 * English is quoted in that mix on both language settings, because a translated
 * quote is no longer a quote. It also happens to be how the shop's customers
 * actually talk.
 *
 * Invented reviews are the fastest way to lose a customer who spots them, and in
 * many places they are illegal. An empty list is honest; a made-up one is not.
 *
 * While this list is empty the testimonials section does not render at all.
 *
 * To add one:
 *   { quote: 'exactly what they wrote', name: 'Amina', area: 'Masaki', source: 'whatsapp' }
 *
 * `area`, `product` and `source` are optional. `source` is never shown on the
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
  {
    quote: 'Asante bby imefika. Inanukia atr 🙌',
    name: 'Edyna',
    product: 'Marshmallow Blush',
    source: 'whatsapp',
  },
  // Second customer, on Club de Nuit Malyka. Her words are ready to go — the
  // only thing missing is the name she is happy to be credited under, so this
  // stays commented out rather than going up as "Anonymous".
  //
  // {
  //   quote:
  //     'Nimeipokea 😍🔥 Wueeh hii perfume imenikamata! Harufu yake ni addictive na inakaa muda mrefu sana 😭❤️ Kila mtu anauliza nimepaka nini 😂 Definitely coming back for more 🤗',
  //   name: '',
  //   product: 'Club de Nuit Malyka',
  //   source: 'whatsapp',
  // },
  //
  // She sent a second message a minute later, if you prefer this one:
  // 'Girl 😭🔥 hii perfume ni hatari! Harufu yake ni classy, sweet na inastay
  //  for hours 😍❤️ Nimepata compliments already 😂 definitely nitarudi tena
  //  for another one'
];
