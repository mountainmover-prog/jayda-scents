import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { perfumes } from '../data/perfumes';
import { SlidersHorizontal } from 'lucide-react';
import { formatPrice } from '../utils/format';

const typeOptions = [
  { value: 'all', label: 'All' },
  { value: 'edp', label: 'Eau de Parfum' },
  { value: 'oil', label: 'Perfume Oil' },
];

export function MenPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter((perfume) => {
      if (perfume.gender !== 'men' && perfume.gender !== 'unisex') {
        return false;
      }

      if (selectedType !== 'all' && perfume.type !== selectedType) {
        return false;
      }

      if (selectedCategory !== 'all' && perfume.category !== selectedCategory) {
        return false;
      }

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
  }, [selectedType, selectedCategory, priceRange]);

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-charcoal mb-2">MEN'S FRAGRANCES</h1>
            <div className="w-12 h-px bg-gold mb-2" />
            <p className="text-sm text-muted">{filteredPerfumes.length} products</p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-rule hover:border-gold transition-colors lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 text-charcoal" />
            <span className="text-xs text-charcoal tracking-[0.16em] uppercase">Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-8 sticky top-28">
              {/* Type Filter */}
              <div>
                <h3 className="text-[10px] tracking-[0.16em] text-gold mb-4 uppercase">TYPE</h3>
                <div className="space-y-2">
                  {typeOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={option.value}
                        checked={selectedType === option.value}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-sm text-charcoal">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] tracking-[0.16em] text-gold mb-4 uppercase">CATEGORY</h3>
                <div className="space-y-2">
                  {['all', 'floral', 'woody', 'fresh', 'oriental'].map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-sm text-charcoal capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] tracking-[0.16em] text-gold mb-4 uppercase">PRICE</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="price" value="all" checked={priceRange === 'all'} onChange={(e) => setPriceRange(e.target.value)} className="w-4 h-4 accent-gold" />
                    <span className="text-sm text-charcoal">All Prices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="price" value="under150" checked={priceRange === 'under150'} onChange={(e) => setPriceRange(e.target.value)} className="w-4 h-4 accent-gold" />
                    <span className="text-sm text-charcoal">Under {formatPrice(150)}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="price" value="150to200" checked={priceRange === '150to200'} onChange={(e) => setPriceRange(e.target.value)} className="w-4 h-4 accent-gold" />
                    <span className="text-sm text-charcoal">{formatPrice(150)} – {formatPrice(200)}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="price" value="over200" checked={priceRange === 'over200'} onChange={(e) => setPriceRange(e.target.value)} className="w-4 h-4 accent-gold" />
                    <span className="text-sm text-charcoal">Over {formatPrice(200)}</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="text-xs text-muted hover:text-gold transition-colors tracking-[0.16em] uppercase"
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
                <p className="text-muted">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
