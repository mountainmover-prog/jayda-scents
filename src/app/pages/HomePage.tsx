import { Link } from 'react-router';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { Testimonials } from '../components/Testimonials';
import { featuredProducts, products } from '../data/products';
import { useLang } from '../i18n/LanguageContext';
import { StringKey } from '../i18n/strings';

const categories: { to: string; key: StringKey; image: string }[] = [
  { to: '/women', key: 'navWomen', image: 'url(/images/category-women.jpg)' },
  { to: '/men', key: 'navMen', image: 'url(/images/category-men.jpg)' },
  { to: '/unisex', key: 'navUnisex', image: 'url(/images/category-unisex.jpg)' },
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

      <Testimonials />

    </div>
  );
}
