import { Link, useNavigate } from 'react-router';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { lineId } from '../types';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatPrice } from '../utils/format';
import { useLang } from '../i18n/LanguageContext';

export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLang();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-rule" />
          <h2 className="font-display text-2xl text-charcoal mb-2">{t('cartEmpty')}</h2>
          <p className="text-muted font-light mb-6">{t('cartEmptySub')}</p>
          <Link
            to="/shop"
            className="inline-block border border-gold text-charcoal px-8 py-3 text-xs tracking-[0.16em] hover:bg-gold hover:text-ink transition-colors uppercase"
          >
            {t('heroCta')}
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl text-charcoal mb-2 uppercase">{t('cartTitle')}</h1>
        <div className="w-12 h-px bg-gold mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              const { product, variant } = item;
              const atMax = item.quantity >= variant.stock;
              return (
                <div
                  key={lineId(product.slug, variant.sku)}
                  className="flex gap-6 border-b border-rule pb-6"
                >
                  <div className="w-24 h-28 bg-white rounded overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      className="object-contain w-full h-full p-2"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="text-[10px] text-muted tracking-[0.16em] mb-1 uppercase">
                          {product.brand}
                        </p>
                        <h3 className="font-display text-base text-charcoal mb-1">{product.name}</h3>
                        <p className="text-xs text-muted">
                          {variant.sizeLabel} · {formatPrice(variant.priceTzs)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.slug, variant.sku)}
                        className="text-muted hover:text-destructive transition-colors"
                        aria-label={`${t('remove')} ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(product.slug, variant.sku, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-rule hover:border-gold transition-colors flex items-center justify-center"
                          aria-label={t('decrease')}
                        >
                          <Minus className="w-3 h-3 text-charcoal" />
                        </button>
                        <span className="text-sm w-8 text-center text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.slug, variant.sku, item.quantity + 1)
                          }
                          disabled={atMax}
                          className="w-8 h-8 border border-rule hover:border-gold transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label={t('increase')}
                        >
                          <Plus className="w-3 h-3 text-charcoal" />
                        </button>
                        {atMax && (
                          <span className="text-xs text-muted">{t('atMax')}</span>
                        )}
                      </div>

                      <p className="text-sm text-gold tracking-wide">
                        {formatPrice(variant.priceTzs * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={clearCart}
              className="text-sm text-muted hover:text-destructive transition-colors"
            >
              {t('clearCart')}
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-cream p-6 rounded-lg sticky top-28">
              <h2 className="font-display text-lg text-charcoal mb-6 uppercase">{t('orderSummary')}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{t('subtotal')}</span>
                  <span className="text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{t('delivery')}</span>
                  <span className="text-charcoal">{t('deliveryNotIncluded')}</span>
                </div>
              </div>

              <div className="border-t border-rule pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-display text-base text-charcoal tracking-wide uppercase">{t('total')}</span>
                  <span className="font-display text-lg text-gold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{t('deliveryPolicy')}</p>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-ink text-cream py-4 text-xs tracking-[0.16em] hover:bg-charcoal transition-colors mb-3 uppercase text-center"
              >
                {t('checkout')}
              </Link>

              <button
                onClick={() => navigate('/shop')}
                className="w-full py-4 text-xs tracking-[0.16em] text-charcoal hover:text-gold transition-colors uppercase"
              >
                {t('continueShopping')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
