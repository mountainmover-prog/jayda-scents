import { Link } from 'react-router';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm">A</span>
            </div>
            <span className="text-xl tracking-wider">ALIZA ATELIER</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm hover:text-gray-600 transition-colors">
              HOME
            </Link>
            <Link to="/shop" className="text-sm hover:text-gray-600 transition-colors">
              SHOP
            </Link>
            <Link to="/women" className="text-sm hover:text-gray-600 transition-colors">
              WOMEN
            </Link>
            <Link to="/men" className="text-sm hover:text-gray-600 transition-colors">
              MEN
            </Link>
            <Link to="/unisex" className="text-sm hover:text-gray-600 transition-colors">
              UNISEX
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/shop"
                className="text-sm hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                to="/women"
                className="text-sm hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                WOMEN
              </Link>
              <Link
                to="/men"
                className="text-sm hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                MEN
              </Link>
              <Link
                to="/unisex"
                className="text-sm hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                UNISEX
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}