import { testimonials } from '../data/testimonials';
import { useLang } from '../i18n/LanguageContext';

/**
 * Renders nothing at all while there is no real feedback to show — an empty
 * "what customers say" heading is worse than no section.
 */
export function Testimonials() {
  const { t } = useLang();
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl text-center text-charcoal mb-2 uppercase">
          {t('testimonialsTitle')}
        </h2>
        <div className="w-12 h-px bg-gold mx-auto mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.slice(0, 6).map((item, i) => (
            <figure
              key={`${item.name}-${i}`}
              className="bg-bone border border-rule/60 rounded-lg p-7 flex flex-col"
            >
              <span aria-hidden="true" className="font-display text-4xl text-gold leading-none mb-3">
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
