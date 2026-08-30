import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { perfumes } from '../data/perfumes';
import { Link } from 'react-router';

export function HomePage() {
  const featuredPerfumes = perfumes.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl tracking-wider text-center mb-12">
            SHOP BY CATEGORY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/women"
              className="relative h-64 bg-gray-200 rounded-lg overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1508771400123-e194ad75c0e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVyZnVtZSUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzcxNDkwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080)',
                }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="relative h-full flex items-center justify-center">
                <h3 className="text-2xl text-white tracking-wider">WOMEN</h3>
              </div>
            </Link>
            <Link
              to="/men"
              className="relative h-64 bg-gray-200 rounded-lg overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1554948419-1939083b12cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZXJmdW1lJTIwYm90dGxlJTIwYmxhY2t8ZW58MXx8fHwxNzcxNTY5NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080)',
                }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="relative h-full flex items-center justify-center">
                <h3 className="text-2xl text-white tracking-wider">MEN</h3>
              </div>
            </Link>
            <Link
              to="/unisex"
              className="relative h-64 bg-gray-200 rounded-lg overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1761778304143-4c89e7dd2457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBlcmZ1bWUlMjBib3R0bGUlMjB3aGl0ZXxlbnwxfHx8fDE3NzE1MzA5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080)',
                }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="relative h-full flex items-center justify-center">
                <h3 className="text-2xl text-white tracking-wider">UNISEX</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl tracking-wider">FEATURED COLLECTION</h2>
            <Link to="/shop" className="text-sm tracking-wider hover:text-gray-600 transition-colors">
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
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="tracking-wider mb-4">ABOUT</h3>
              <p className="text-sm text-gray-400">
                Discover luxury fragrances from the world's finest perfume houses.
              </p>
            </div>
            <div>
              <h3 className="tracking-wider mb-4">CUSTOMER SERVICE</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Contact Us</li>
                <li>Shipping & Returns</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="tracking-wider mb-4">SHOP</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Gift Sets</li>
              </ul>
            </div>
            <div>
              <h3 className="tracking-wider mb-4">NEWSLETTER</h3>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe to receive updates and exclusive offers.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-sm"
              />
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            © 2026 ALIZA ATELIER. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}