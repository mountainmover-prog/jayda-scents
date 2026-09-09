import { Link } from 'react-router';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { SocialLinks } from '../components/SocialLinks';
import { featuredProducts, products, bodyMists } from '../data/products';
import { useLang } from '../i18n/LanguageContext';
import { StringKey } from '../i18n/strings';

const categories: { to: string; key: StringKey; image: string }[] = [
  {
    to: '/women',
    key: 'navWomen',
    image:
      'url(https://images.unsplash.com/photo-1508771400123-e194ad75c0e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVyZnVtZSUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzcxNDkwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080)',
  },
  {
    to: '/men',
    key: 'navMen',
    image:
      'url(https://images.unsplash.com/photo-1554948419-1939083b12cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZXJmdW1lJTIwYm90dGxlJTIwYmxhY2t8ZW58MXx8fHwxNzcxNTY5NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080)',
  },
  {
    to: '/unisex',
    key: 'navUnisex',
    image:
      'url(https://images.unsplash.com/photo-1761778304143-4c89e7dd2457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBlcmZ1bWUlMjBib3R0bGUlMjB3aGl0ZXxlbnwxfHx8fDE3NzE1MzA5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080)',
  },
];

export function HomePage() {
  const { t } = useLang();
  // featured flags come from the catalogue; fall back to the first few if none are set
  const featured = (featuredProducts.length ? featuredProducts : products).slice(0, 4);

  return (
    <div className="min-h-screen bg-bone">
      <Hero />

      <section className="py-20 bg-bone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl text-center text-charcoal mb-2 uppercase">
            {t('shopBy')}
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.to} to={cat.to} className="relative h-72 rounded-lg overflow-hidden group">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: cat.image }}
                />
                <div
                  className="absolute inset-0 transition-all duration-300 group-hover:bg-ink/60"
                  style={{ background: 'rgba(11,9,7,0.45)' }}
                />
                <div className="relative h-full flex flex-col items-center justify-center">
                  <h3 className="font-display text-2xl text-cream tracking-wide uppercase">
                    {t(cat.key)}
                  </h3>
                  <span className="mt-2 text-[10px] tracking-[0.16em] text-gold uppercase">
                    {t('explore')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-charcoal uppercase">
                {t('featured')}
              </h2>
              <div className="w-12 h-px bg-gold mt-2" />
            </div>
            <Link
              to="/shop"
              className="text-[10px] tracking-[0.16em] text-charcoal hover:text-gold transition-colors uppercase"
            >
              {t('viewAll')} →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-ink text-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="font-display text-lg text-cream mb-4 uppercase">{t('footerAbout')}</h3>
              <p className="text-sm text-cream/60 font-light leading-relaxed">
                {t('footerAboutText')}
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-cream mb-4 uppercase">
                {t('footerService')}
              </h3>
              <ul className="space-y-2 text-sm text-cream/60 font-light">
                <li>{t('footerContact')}</li>
                <li>{t('footerDeliveryReturns')}</li>
                <li>{t('footerFaq')}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg text-cream mb-4 uppercase">{t('footerShop')}</h3>
              <ul className="space-y-2 text-sm text-cream/60 font-light">
                <li>
                  <Link to="/shop" className="hover:text-gold transition-colors">
                    {t('footerAllFragrances')}
                  </Link>
                </li>
                <li>
                  <Link to="/women" className="hover:text-gold transition-colors">
                    {t('footerForWomen')}
                  </Link>
                </li>
                <li>
                  <Link to="/men" className="hover:text-gold transition-colors">
                    {t('footerForMen')}
                  </Link>
                </li>
                {bodyMists.length > 0 && (
                  <li>
                    <Link to="/body-mists" className="hover:text-gold transition-colors">
                      {t('navBodyMists')}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg text-cream mb-4 uppercase">{t('footerFollow')}</h3>
              <p className="text-sm text-cream/60 font-light mb-4">{t('footerFollowText')}</p>
              <SocialLinks />
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-cream/10">
            <p className="text-xs text-cream/50 font-light leading-relaxed max-w-3xl mb-6">
              {t('deliveryPolicy')}
            </p>
            <p className="text-center text-sm text-cream/40 font-light">
              © 2026 Jayda Scents. {t('rightsReserved')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
