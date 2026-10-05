import { useState } from 'react';
import { Link } from 'react-router';
import { testimonials, Testimonial } from '../data/testimonials';
import { findProduct } from '../data/products';
import { ratingByCustomer } from '../data/reviews';
import { useLang } from '../i18n/LanguageContext';
import { Stars } from './Stars';

/**
 * Renders nothing at all while there is no real feedback to show — an empty
 * "what customers say" heading is worse than no section.
 *
 * The column count follows the number of quotes so a single one is never left
 * stranded in a three-wide row with two gaps beside it. From three quotes up the
 * cards flow into newspaper-style columns: the quotes vary from one line to a
 * paragraph, and a fixed grid would leave tall gaps beside the short ones.
 */
export function Testimonials() {
  const { t } = useLang();
  const items = testimonials.slice(0, 9);
  if (items.length === 0) return null;

  const columns =
    items.length === 1
      ? 'columns-1 max-w-xl mx-auto'
      : items.length === 2
      ? 'columns-1 md:columns-2 max-w-4xl mx-auto'
      : 'columns-1 md:columns-2 lg:columns-3';

  return (
    <section className="py-20 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl text-center text-charcoal mb-3 uppercase">
          {t('testimonialsTitle')}
        </h2>
        {/*
          The subheading is doing a job, not filling space. One quote is a
          paragraph of English, the next is six words of Swahili with emojis.
          Without a line saying these are untouched, that reads as carelessness
          rather than as eight different people. Saying so is also something a
          page of invented reviews would never risk.
        */}
        <p className="text-center text-sm text-muted max-w-xl mx-auto mb-5">
          {t('testimonialsSub')}
        </p>
        <div className="w-12 h-px bg-gold mx-auto mb-12" />

        <div className={`gap-6 lg:gap-8 ${columns}`}>
          {items.map((item, i) => (
            <TestimonialCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Longer than this and the quote is clamped with a "Read more" toggle.
 *
 * Measured in characters rather than by reading the rendered height, which
 * would mean drawing the card, measuring it, then changing it — a visible
 * flicker on every card on every load. The exact number is not precious; it is
 * about six lines in a column on a laptop, which is where the cards started
 * looking lopsided beside Edyna's six words.
 */
const CLAMP_ABOVE = 260;

function TestimonialCard({ item }: { item: Testimonial }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const long = item.quote.length > CLAMP_ABOVE;

  // The stars belong to the person who wrote the words, not to a product: this
  // is the rating they themselves gave, averaged over everything they rated.
  // Null for anyone who sent kind words but never gave a number, and then the
  // card simply leads with the quote.
  const rating = ratingByCustomer(item.name);

  // Names come from the catalogue, never from the free text, so a link can
  // never name one perfume and open another. A slug that no longer matches a
  // live product drops out instead of rendering a dead link.
  const linked = (item.slugs ?? [])
    .map((slug) => findProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <figure className="relative overflow-hidden break-inside-avoid mb-6 lg:mb-8 bg-bone border border-rule/60 rounded-lg p-7 flex flex-col">
      {/*
        The quotation mark used to sit in the flow at the top of the card. In a
        serif face its ink occupies only the top third of its line box, so it
        was reserving about 55px and filling a third of it — the empty band
        above every quote. Out of the flow it costs no height at all, and at a
        tenth opacity it reads as paper texture rather than as an element.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1 right-4 font-display text-[6rem] leading-none text-bronze/10"
      >
        &ldquo;
      </span>

      {rating && (
        <div className="relative mb-4">
          <Stars summary={rating} size="sm" showCount={false} />
        </div>
      )}

      <blockquote
        className={`relative text-charcoal/80 leading-relaxed flex-1 ${
long && !open ? 'line-clamp-6' : ''
        }`}
      >
        {item.quote}
      </blockquote>

      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative self-start mt-3 text-[11px] tracking-[0.16em] uppercase text-bronze hover:text-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
        >
          {open ? t('readLess') : t('readMore')}
        </button>
      )}

      <figcaption className="relative mt-6 pt-4 border-t border-rule/60">
        <span className="block text-sm text-charcoal">{item.name}</span>
        {(item.area || linked.length > 0 || item.product) && (
          <span className="block text-[10px] tracking-[0.16em] uppercase mt-1 text-muted">
            {item.area && <span>{item.area}</span>}
            {item.area && (linked.length > 0 || item.product) && <span className="mx-1">·</span>}
            {linked.length > 0
              ? linked.map((p, i) => (
                  <span key={p.slug}>
                    {i > 0 && <span className="mx-1">·</span>}
                    <Link
                      to={`/product/${p.slug}`}
                      className="text-bronze underline underline-offset-2 decoration-rule hover:decoration-bronze hover:text-charcoal transition-colors"
                    >
                      {p.name}
                    </Link>
                  </span>
                ))
              : item.product}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
