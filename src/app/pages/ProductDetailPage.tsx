import { useParams, useNavigate } from 'react-router';
import { perfumes } from '../data/perfumes';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { formatPrice, formatType } from '../utils/format';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const perfume = perfumes.find((p) => p.id === id);

  if (!perfume) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-charcoal mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-sm text-gold hover:text-bronze transition-colors"
          >
            ← Back to shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(perfume);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted hover:text-charcoal transition-colors mb-8 uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-[3/4] bg-cream rounded-lg overflow-hidden">
            <ImageWithFallback
              src={perfume.image}
              alt={perfume.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[10px] text-muted tracking-[0.16em] uppercase">{perfume.brand}</p>
                <span className="text-rule">·</span>
                <p className="text-[10px] text-bronze tracking-[0.16em] uppercase">{formatType(perfume.type)}</p>
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-4">{perfume.name}</h1>
              <p className="text-xl text-gold mb-4 tracking-wide">{formatPrice(perfume.price)}</p>
              <p className="text-charcoal/70 font-light leading-relaxed">{perfume.description}</p>
            </div>

            {/* Size */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.16em] text-muted mb-3 uppercase">SIZE</p>
              <div className="inline-block px-5 py-2 border border-gold">
                <span className="text-sm text-charcoal">{perfume.size}</span>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-10 space-y-5">
              <div>
                <p className="text-[10px] tracking-[0.16em] text-gold mb-2 uppercase">TOP NOTES</p>
                <p className="text-sm text-charcoal/70 font-light">{perfume.notes.top.join(', ')}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.16em] text-gold mb-2 uppercase">HEART NOTES</p>
                <p className="text-sm text-charcoal/70 font-light">{perfume.notes.heart.join(', ')}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.16em] text-gold mb-2 uppercase">BASE NOTES</p>
                <p className="text-sm text-charcoal/70 font-light">{perfume.notes.base.join(', ')}</p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-ink text-cream py-4 text-xs tracking-[0.16em] hover:bg-charcoal transition-colors flex items-center justify-center gap-2 uppercase"
            >
              <ShoppingBag className="w-5 h-5" />
              {addedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
            </button>

            {/* Additional Info */}
            <div className="mt-10 space-y-0 text-sm">
              <div className="flex justify-between py-3 border-b border-rule">
                <span className="text-muted tracking-wide">Type</span>
                <span className="text-charcoal">{formatType(perfume.type)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-rule">
                <span className="text-muted tracking-wide">Category</span>
                <span className="text-charcoal capitalize">{perfume.category}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-rule">
                <span className="text-muted tracking-wide">Gender</span>
                <span className="text-charcoal capitalize">{perfume.gender}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-rule">
                <span className="text-muted tracking-wide">Free Shipping</span>
                <span className="text-charcoal">On orders over {formatPrice(100)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
