import { testimonials } from '../data/testimonials';
import { useLang } from '../i18n/LanguageContext';

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
        <h2 className="font-display text-2xl md:text-3xl text-center text-charcoal mb-2 uppercase">
          {t('testimonialsTitle')}
        </h2>
        <div className="w-12 h-px bg-gold mx-auto mb-12" />

        <div className={`gap-6 lg:gap-8 ${columns}`}>
          {items.map((item, i) => (
            <figure
              key={`${item.name}-${i}`}
              className="break-inside-avoid mb-6 lg:mb-8 bg-bone border border-rule/60 rounded-lg p-7 flex flex-col"
            >
              <span aria-hidden="true" className="font-display text-4xl text-bronze leading-none mb-3">
                &ldquo;
              </span>
              <blockquote className="text-charcoal/80 font-light leading-relaxed flex-1">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-rule/60">
                <span className="block text-sm text-charcoal">{item.name}</span>
                {(item.area || item.product) && (
                  <span className="block text-[10px] tracking-[0.16em] text-muted uppercase mt-1">
                    {[item.area, item.product].filter(Boolean).join(' · ')}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
