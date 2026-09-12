import { Link } from 'react-router';
import { useLang } from '../i18n/LanguageContext';

/**
 * The backdrop is built from the shop's own bottles, not stock photography, so
 * what a visitor sees first is what they can actually buy.
 *
 * Two separate layers do the darkening, and the distinction matters. The linear
 * one sits over the whole panel. The radial one is centred on the viewport, so
 * it travels with the text rather than with the photograph — `bg-cover` crops the
 * sides on a narrower window, which pulls the bottles inward and would otherwise
 * put them straight behind the headline. Anchoring the scrim to the text is what
 * keeps it readable at every width instead of only on a wide desktop.
 */
export function Hero() {
  const { t } = useLang();

  return (
    <div className="relative h-[70vh] min-h-[500px] bg-ink overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-jayda.jpg)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(rgba(11,9,7,0.34), rgba(11,9,7,0.20))' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(62% 55% at 50% 45%, rgba(11,9,7,0.88) 0%, rgba(11,9,7,0.78) 38%, rgba(11,9,7,0.45) 68%, rgba(11,9,7,0.10) 88%, rgba(11,9,7,0) 100%)',
        }}
      />
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1
            className="font-display text-4xl md:text-6xl text-cream tracking-wide mb-6 leading-[1.15] uppercase"
            style={{ textShadow: '0 2px 20px rgba(11,9,7,0.8)' }}
          >
            {t('heroTitle')}
          </h1>
          <p
            className="text-base md:text-lg text-cream/95 font-body font-light mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ textShadow: '0 1px 16px rgba(11,9,7,0.9)' }}
          >
            {t('heroSub')}
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gold text-ink px-10 py-3 text-xs tracking-[0.16em] hover:bg-gold-light transition-colors duration-300 uppercase"
          >
            {t('heroCta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
