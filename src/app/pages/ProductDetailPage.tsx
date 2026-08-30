import { useParams, useNavigate } from 'react-router';
import { perfumes } from '../data/perfumes';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const perfume = perfumes.find((p) => p.id === id);

  if (!perfume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-sm hover:text-gray-600 transition-colors"
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm hover:text-gray-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={perfume.image}
              alt={perfume.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-xs text-gray-500 tracking-wider mb-2">{perfume.brand}</p>
              <h1 className="text-3xl md:text-4xl mb-4">{perfume.name}</h1>
              <p className="text-2xl mb-4">₱{perfume.price}</p>
              <p className="text-gray-600 leading-relaxed">{perfume.description}</p>
            </div>

            {/* Size */}
            <div className="mb-6">
              <p className="text-sm tracking-wider mb-2">SIZE</p>
              <div className="inline-block px-4 py-2 border border-black">
                <span className="text-sm">{perfume.size}</span>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8 space-y-4">
              <div>
                <p className="text-sm tracking-wider mb-2">TOP NOTES</p>
                <p className="text-sm text-gray-600">{perfume.notes.top.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm tracking-wider mb-2">HEART NOTES</p>
                <p className="text-sm text-gray-600">{perfume.notes.heart.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm tracking-wider mb-2">BASE NOTES</p>
                <p className="text-sm text-gray-600">{perfume.notes.base.join(', ')}</p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              {addedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
            </button>

            {/* Additional Info */}
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <div className="flex justify-between py-3 border-b">
                <span>Category</span>
                <span className="capitalize">{perfume.category}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span>Gender</span>
                <span className="capitalize">{perfume.gender}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span>Free Shipping</span>
                <span>On orders over ₱100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}