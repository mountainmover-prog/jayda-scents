import { Link, useNavigate } from 'react-router';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { lineId } from '../types';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatPrice } from '../utils/format';

export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-rule" />
          <h2 className="font-display text-2xl text-charcoal mb-2">Your cart is empty</h2>
          <p className="text-muted font-light mb-6">Add a fragrance to get started</p>
          <Link
            to="/shop"
            className="inline-block border border-gold text-charcoal px-8 py-3 text-xs tracking-[0.16em] hover:bg-gold hover:text-ink transition-colors uppercase"
          >
            Shop now
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl text-charcoal mb-2">SHOPPING CART</h1>
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
                  <div className="w-24 h-28 bg-cream rounded overflow-hidden flex-shrink-0">
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
                        aria-label={`Remove ${product.name}`}
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
                          aria-label="Decrease quantity"
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
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 text-charcoal" />
                        </button>
                        {atMax && (
                          <span className="text-xs text-muted">all we have in stock</span>
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
              Clear cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-cream p-6 rounded-lg sticky top-28">
              <h2 className="font-display text-lg text-charcoal mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Delivery</span>
                  <span className="text-charcoal">Arranged at checkout</span>
                </div>
              </div>

              <div className="border-t border-rule pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-display text-base text-charcoal tracking-wide">TOTAL</span>
                  <span className="font-display text-lg text-gold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-muted">
                  Delivery is added once we confirm your area. Payment by mobile money.
                </p>
              </div>

              <button className="w-full bg-ink text-cream py-4 text-xs tracking-[0.16em] hover:bg-charcoal transition-colors mb-3 uppercase">
                Checkout
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="w-full py-4 text-xs tracking-[0.16em] text-charcoal hover:text-gold transition-colors uppercase"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
