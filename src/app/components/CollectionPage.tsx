import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, ProductType } from '../types';
import { priceFrom } from '../data/products';
import { formatPrice, formatType } from '../utils/format';

/** Price bands in TZS. Adjust here if the range shifts. */
const BANDS: { key: string; label: string; test: (p: number) => boolean }[] = [
  { key: 'all', label: 'All prices', test: () => true },
  { key: 'under30', label: `Under ${formatPrice(30000)}`, test: (p) => p < 30000 },
  {
    key: '30to40',
    label: `${formatPrice(30000)} – ${formatPrice(40000)}`,
    test: (p) => p >= 30000 && p <= 40000,
  },
  { key: 'over40', label: `Over ${formatPrice(40000)}`, test: (p) => p > 40000 },
];

interface CollectionPageProps {
  title: string;
  intro?: string;
  products: Product[];
  /** Show the women/men/unisex filter. Off on the gendered pages. */
  showGenderFilter?: boolean;
}

function Radio({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="w-4 h-4 accent-gold"
      />
      <span className="text-sm text-charcoal capitalize">{label}</span>
    </label>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.16em] text-gold mb-4 uppercase">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function CollectionPage({
  title,
  intro,
  products,
  showGenderFilter = false,
}: CollectionPageProps) {
  const [type, setType] = useState('all');
  const [family, setFamily] = useState('all');
  const [gender, setGender] = useState('all');
  const [band, setBand] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // only offer filters that actually apply to what is in this collection
  const families = useMemo(
    () => ['all', ...Array.from(new Set(products.map((p) => p.family).filter(Boolean))).sort()],
    [products]
  );
  const types = useMemo(
    () => ['all', ...Array.from(new Set(products.map((p) => p.type)))],
    [products]
  );

  const filtered = useMemo(() => {
    const bandTest = BANDS.find((b) => b.key === band)?.test ?? (() => true);
    return products.filter((p) => {
      if (type !== 'all' && p.type !== type) return false;
      if (family !== 'all' && p.family !== family) return false;
      if (gender !== 'all' && p.gender !== gender && p.gender !== 'unisex') return false;
      return bandTest(priceFrom(p));
    });
  }, [products, type, family, gender, band]);

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-charcoal mb-2">{title}</h1>
            <div className="w-12 h-px bg-gold mb-2" />
            {intro && <p className="text-sm text-charcoal/70 font-light max-w-xl mb-2">{intro}</p>}
            <p className="text-sm text-muted">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            </p>
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
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-8 sticky top-28">
              {types.length > 2 && (
                <FilterGroup title="Type">
                  {types.map((t) => (
                    <Radio
                      key={t}
                      name="type"
                      value={t}
                      checked={type === t}
                      onChange={setType}
                      label={t === 'all' ? 'All' : formatType(t as ProductType)}
                    />
                  ))}
                </FilterGroup>
              )}

              {families.length > 2 && (
                <FilterGroup title="Scent family">
                  {families.map((f) => (
                    <Radio
                      key={f}
                      name="family"
                      value={f}
                      checked={family === f}
                      onChange={setFamily}
                      label={f}
                    />
                  ))}
                </FilterGroup>
              )}

              {showGenderFilter && (
                <FilterGroup title="For">
                  {['all', 'women', 'men', 'unisex'].map((g) => (
                    <Radio
                      key={g}
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={setGender}
                      label={g}
                    />
                  ))}
                </FilterGroup>
              )}

              <FilterGroup title="Price">
                {BANDS.map((b) => (
                  <Radio
                    key={b.key}
                    name="price"
                    value={b.key}
                    checked={band === b.key}
                    onChange={setBand}
                    label={b.label}
                  />
                ))}
              </FilterGroup>

              <button
                onClick={() => {
                  setType('all');
                  setFamily('all');
                  setGender('all');
                  setBand('all');
                }}
                className="text-xs text-muted hover:text-gold transition-colors tracking-[0.16em] uppercase"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filtered.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted">Nothing matches those filters yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
