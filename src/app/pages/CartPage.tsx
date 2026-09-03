import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
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
          <p className="text-muted font-light mb-6">Add some beautiful fragrances to get started</p>
          <Link
            to="/shop"
            className="inline-block border border-gold text-charcoal px-8 py-3 text-xs tracking-[0.16em] hover:bg-gold hover:text-ink transition-colors uppercase"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl text-charcoal mb-8">SHOPPING CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.perfume.id} className="flex gap-6 border-b border-rule pb-6">
                {/* Product Image */}
                <div className="w-24 h-32 bg-cream rounded overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.perfume.image}
                    alt={item.perfume.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-[10px] text-muted tracking-[0.16em] mb-1 uppercase">
                        {item.perfume.brand}
                      </p>
                      <h3 className="font-display text-base text-charcoal mb-1">{item.perfume.name}</h3>
                      <p className="text-xs text-muted">{item.perfume.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.perfume.id)}
                      className="text-muted hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.perfume.id, item.quantity - 1)}
                        className="w-8 h-8 border border-rule hover:border-gold transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3 text-charcoal" />
                      </button>
                      <span className="text-sm w-8 text-center text-charcoal">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.perfume.id, item.quantity + 1)}
                        className="w-8 h-8 border border-rule hover:border-gold transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3 text-charcoal" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-sm text-gold tracking-wide">{formatPrice(item.perfume.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-muted hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-6 rounded-lg sticky top-28">
              <h2 className="font-display text-lg text-charcoal mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-charcoal">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-muted">
                    Add {formatPrice(100 - subtotal)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-rule pt-4 mb-6">
                <div className="flex justify-between mb-6">
                  <span className="font-display text-base text-charcoal tracking-wide">TOTAL</span>
                  <span className="font-display text-lg text-gold">{formatPrice(total)}</span>
                </div>
              </div>

              <button className="w-full bg-ink text-cream py-4 text-xs tracking-[0.16em] hover:bg-charcoal transition-colors mb-3 uppercase">
                CHECKOUT
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="w-full py-4 text-xs tracking-[0.16em] text-charcoal hover:text-gold transition-colors uppercase"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
