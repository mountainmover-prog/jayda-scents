import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { WHATSAPP_NUMBER } from '../config/shop';
import { bodyMists } from '../data/products';
import { useLang } from '../i18n/LanguageContext';

/**
 * Rendered once from RootLayout, so it sits under every page. It used to live
 * inside HomePage, which meant the contact link and the social icons existed
 * only on the front page — no use to anyone reading a product.
 */
export function Footer() {
  const { t } = useLang();

  return (
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
            <h3 className="font-display text-lg text-cream mb-4 uppercase">{t('footerService')}</h3>
            <ul className="space-y-2 text-sm text-cream/60 font-light">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('footerContact')}
                </a>
              </li>
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
  );
}
