import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { perfumes } from '../data/perfumes';
import { Link } from 'react-router';

export function HomePage() {
  const featuredPerfumes = perfumes.slice(0, 4);

  return (
    <div className="min-h-screen bg-bone">
      <Hero />

      {/* Categories Section */}
      <section className="py-20 bg-bone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl text-center text-charcoal mb-2">
            SHOP BY CATEGORY
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/women"
              className="relative h-72 bg-charcoal rounded-lg overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1508771400123-e194ad75c0e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVyZnVtZSUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzcxNDkwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080)',
                }}
              >
                <div className="absolute inset-0 bg-ink/50" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center">
                <h3 className="font-display text-2xl text-cream tracking-wide">WOMEN</h3>
                <span className="mt-2 text-[10px] tracking-[0.16em] text-gold uppercase">Explore</span>
              </div>
            </Link>
            <Link
              to="/men"
              className="relative h-72 bg-charcoal rounded-lg overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1554948419-1939083b12cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZXJmdW1lJTIwYm90dGxlJTIwYmxhY2t8ZW58MXx8fHwxNzcxNTY5NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080)',
                }}
              >
                <div className="absolute inset-0 bg-ink/50" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center">
                <h3 className="font-display text-2xl text-cream tracking-wide">MEN</h3>
                <span className="mt-2 text-[10px] tracking-[0.16em] text-gold uppercase">Explore</span>
              </div>
            </Link>
            <Link
              to="/unisex"
              className="relative h-72 bg-charcoal rounded-lg overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1761778304143-4c89e7dd2457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBlcmZ1bWUlMjBib3R0bGUlMjB3aGl0ZXxlbnwxfHx8fDE3NzE1MzA5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080)',
                }}
              >
                <div className="absolute inset-0 bg-ink/50" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center">
                <h3 className="font-display text-2xl text-cream tracking-wide">UNISEX</h3>
                <span className="mt-2 text-[10px] tracking-[0.16em] text-gold uppercase">Explore</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-bone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-charcoal">FEATURED COLLECTION</h2>
              <div className="w-12 h-px bg-gold mt-2" />
            </div>
            <Link
              to="/shop"
              className="text-[10px] tracking-[0.16em] text-charcoal hover:text-gold transition-colors uppercase"
            >
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPerfumes.map((perfume) => (
              <ProductCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="font-display text-lg text-cream mb-4">ABOUT</h3>
              <p className="text-sm text-cream/60 font-light leading-relaxed">
                Discover luxury fragrances from the world's finest perfume houses.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-cream mb-4">CUSTOMER SERVICE</h3>
              <ul className="space-y-2 text-sm text-cream/60 font-light">
                <li>Contact Us</li>
                <li>Shipping & Returns</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg text-cream mb-4">SHOP</h3>
              <ul className="space-y-2 text-sm text-cream/60 font-light">
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Gift Sets</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg text-cream mb-4">NEWSLETTER</h3>
              <p className="text-sm text-cream/60 font-light mb-4">
                Subscribe to receive updates and exclusive offers.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-transparent border border-cream/20 text-sm text-cream font-light placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-cream/10 text-center text-sm text-cream/40 font-light">
            © 2026 Jayda Scents. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
