import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some beautiful fragrances to get started</p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl tracking-wider mb-8">SHOPPING CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.perfume.id} className="flex gap-6 border-b pb-6">
                {/* Product Image */}
                <div className="w-24 h-32 bg-gray-100 rounded overflow-hidden flex-shrink-0">
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
                      <p className="text-xs text-gray-500 tracking-wider mb-1">
                        {item.perfume.brand}
                      </p>
                      <h3 className="text-sm mb-1">{item.perfume.name}</h3>
                      <p className="text-xs text-gray-600">{item.perfume.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.perfume.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.perfume.id, item.quantity - 1)}
                        className="w-8 h-8 border hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.perfume.id, item.quantity + 1)}
                        className="w-8 h-8 border hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-sm">₱{(item.perfume.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-gray-600 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-lg tracking-wider mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₱${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-gray-500">
                    Add ₱{(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-6">
                  <span className="tracking-wider">TOTAL</span>
                  <span className="text-lg">₱{total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-800 transition-colors mb-3">
                CHECKOUT
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="w-full py-4 text-sm tracking-wider hover:bg-gray-100 transition-colors"
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