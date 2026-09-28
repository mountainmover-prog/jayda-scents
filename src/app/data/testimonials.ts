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
  // Five WhatsApp messages received 28 Sep 2026. All seven customers on this
  // list gave permission to be quoted on the website.
  {
    quote:
      'There’s just something special about a beautiful fragrance, and Jayda Scents truly understands that. ✨❤️ I’ve been getting my perfumes from Jayda Scents, and every scent I’ve tried has been absolutely beautiful — elegant, feminine, long-lasting, and effortlessly luxurious. The kind of fragrance that makes you feel confident and leaves people asking, “What perfume are you wearing?” 😍 If you love smelling amazing and feeling luxurious, Jayda Scents is definitely worth trying. Highly recommended! 🤍✨ 10/10 - my go to perfume plug 🥰',
    name: 'Rachel',
    source: 'whatsapp',
  },
  {
    quote: 'Asante bby imefika. Inanukia atr 🙌',
    name: 'Edyna',
    product: 'Marshmallow Blush',
    source: 'whatsapp',
  },
  {
    quote:
      'Nimeipokea 😍🔥 Wueeh hii perfume imenikamata! Harufu yake ni addictive na inakaa muda mrefu sana 😭❤️ Kila mtu anauliza nimepaka nini 😂 Definitely coming back for more 🤗',
    name: 'Fathiyyah',
    product: 'Club de Nuit Malyka',
    source: 'whatsapp',
  },
  // Fathiyyah sent a second message a minute later. Swap it in for the one above
  // if you would rather lead with this wording:
  // 'Girl 😭🔥 hii perfume ni hatari! Harufu yake ni classy, sweet na inastay
  //  for hours 😍❤️ Nimepata compliments already 😂 definitely nitarudi tena
  //  for another one'
  {
    quote:
      'I bought suger candy with Elysia Marshmallow boujee. I honestly recommend to buy from Jaydascents. The perfumes smell nice and they last. I will be coming for more honestly.',
    name: 'Sabaha',
    product: 'Suger Lollipop · Yum Boujee Marshmallow',
    source: 'whatsapp',
  },
  {
    quote:
      'Elysia lychee fizz. Honestly, this perfume smells amazing 😍❤️ The scent is so nice, fresh and long-lasting. I really love how it stays on me for hours without being too strong. Definitely worth trying 🥰✨ Highly recommend 💯',
    name: 'Lily Spa',
    product: 'Eden Sparkling Lychee',
    source: 'whatsapp',
  },
  {
    quote:
      'Absolutely love the perfumes from Jayda Scents! 😍 The scents are beautiful, elegant, and long-lasting. They smell amazing and stay on for hours without fading. Definitely worth the money! ❤️✨',
    name: 'Muna',
    source: 'whatsapp',
  },
  {
    quote:
      'Jayda Scents is honestly one of the best perfume brands I’ve come across! ❤️✨ The fragrances are absolutely amazing, elegant, and long-lasting. Every scent has a unique and luxurious feel, and you can tell that quality is a top notch. 👌🏽',
    name: 'Rahma',
    source: 'whatsapp',
  },
];
