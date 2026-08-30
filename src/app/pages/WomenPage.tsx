import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { perfumes } from '../data/perfumes';
import { SlidersHorizontal } from 'lucide-react';

export function WomenPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter((perfume) => {
      // Only women and unisex perfumes
      if (perfume.gender !== 'women' && perfume.gender !== 'unisex') {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && perfume.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (priceRange === 'under150' && perfume.price >= 150) {
        return false;
      }
      if (priceRange === '150to200' && (perfume.price < 150 || perfume.price > 200)) {
        return false;
      }
      if (priceRange === 'over200' && perfume.price <= 200) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, priceRange]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl tracking-wider mb-2">WOMEN'S FRAGRANCES</h1>
            <p className="text-sm text-gray-600">{filteredPerfumes.length} products</p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 border hover:bg-gray-50 transition-colors lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm">Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-8 sticky top-24">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm tracking-wider mb-4">CATEGORY</h3>
                <div className="space-y-2">
                  {['all', 'floral', 'woody', 'fresh', 'oriental'].map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm tracking-wider mb-4">PRICE</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceRange === 'all'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">All Prices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="under150"
                      checked={priceRange === 'under150'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Under ₱150</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="150to200"
                      checked={priceRange === '150to200'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">₱150 - ₱200</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="over200"
                      checked={priceRange === 'over200'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Over ₱200</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredPerfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPerfumes.map((perfume) => (
                  <ProductCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}