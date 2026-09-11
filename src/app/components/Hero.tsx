import { Link } from 'react-router';
import { useLang } from '../i18n/LanguageContext';

/**
 * The backdrop is built from the shop's own bottles, not stock photography, so
 * what a visitor sees first is what they can actually buy. The image already
 * carries its own darkening through the middle, which is why the overlay here is
 * light — it only guards the type against unusually bright crops on wide screens.
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
        style={{ background: 'linear-gradient(rgba(11,9,7,0.45), rgba(11,9,7,0.25))' }}
      />
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1
            className="font-display text-4xl md:text-6xl text-cream tracking-wide mb-6 leading-[1.15] uppercase"
            style={{ textShadow: '0 2px 18px rgba(11,9,7,0.55)' }}
          >
            {t('heroTitle')}
          </h1>
          <p
            className="text-base md:text-lg text-cream/90 font-body font-light mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ textShadow: '0 1px 14px rgba(11,9,7,0.75)' }}
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
