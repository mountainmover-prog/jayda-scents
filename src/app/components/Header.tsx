import { Link, NavLink } from 'react-router';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { bodyMists } from '../data/products';
import { useLang } from '../i18n/LanguageContext';
import { StringKey } from '../i18n/strings';
import { LanguageToggle } from './LanguageToggle';

const navItems: { to: string; key: StringKey }[] = [
  { to: '/', key: 'navHome' },
  { to: '/shop', key: 'navShop' },
  { to: '/women', key: 'navWomen' },
  { to: '/men', key: 'navMen' },
  { to: '/unisex', key: 'navUnisex' },
  // only surfaces once there are mists in the catalogue
  ...(bodyMists.length > 0 ? [{ to: '/body-mists', key: 'navBodyMists' as StringKey }] : []),
];

export function Header() {
  const { getCartCount } = useCart();
  const { t } = useLang();
  const cartCount = getCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-xs tracking-[0.16em] uppercase transition-colors pb-1 ${
      isActive
        ? 'text-cream after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gold'
        : 'text-cream hover:text-gold after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold hover:after:w-full after:transition-all'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-ink border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Jayda Scents" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle className="hidden sm:flex" />
            <button
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-cream"
              aria-label={t('search')}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/cart"
              className="p-2 hover:bg-white/5 rounded-full transition-colors relative text-cream"
              aria-label={t('cart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-ink text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors text-cream"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t('menu')}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 py-4">
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.16em] uppercase transition-colors ${
                      isActive ? 'text-gold' : 'text-cream hover:text-gold'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </NavLink>
              ))}
              <LanguageToggle className="pt-2 sm:hidden" />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
