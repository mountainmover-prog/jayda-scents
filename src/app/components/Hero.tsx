import { Link } from 'react-router';
import { useLang } from '../i18n/LanguageContext';
import { products } from '../data/products';

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
          {/*
            Sizing is set by min-height, not padding, so the target is a
            guaranteed 56px on phones — above the 44pt/48dp minimum — rather
            than the 40px the old px-10 py-3 produced at every width. It is
            slightly smaller on desktop, where a pointer is more precise than a
            thumb.

            The pressed state is a scale, not a colour. Bronze, the only darker
            gold in the palette, gives 4.33:1 against cream and 4.01:1 against
            ink — both under AA — so pressing it would briefly make the label
            harder to read. Staying on gold-light holds 12.6:1 throughout and
            the shrink is the tactile cue instead.

            The focus ring is cream and offset outward onto the dark scrim
            (15.1:1) — a gold ring on a gold button would be invisible.

            Tracking is 0.08em here, half the 0.16em used elsewhere. The house
            spacing is fine on a two-word label; on a five-word one at 12px it
            pushes the letters apart faster than the eye groups them into words,
            and the button grows wide enough to crowd a 360px screen. This is
            the one place the label is long, so it is the one place that steps
            down.

            The count comes from the catalogue, not from the copy, so it cannot
            fall out of step with what is actually on the shop.
          */}
          <Link
            to="/shop"
            className="inline-flex items-center justify-center text-center bg-gold text-ink min-h-[56px] md:min-h-[52px] px-8 md:px-12 py-3 text-xs md:text-sm tracking-[0.08em] uppercase transition duration-200 hover:bg-gold-light active:bg-gold-light active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            {t('heroCta', { n: products.length })}
          </Link>
        </div>
      </div>
    </div>
  );
}
