import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, ProductType } from '../types';
import { priceFrom } from '../data/products';
import { formatPrice, formatType } from '../utils/format';
import { useLang } from '../i18n/LanguageContext';

/** Price bands in TZS. Adjust the numbers here if the range shifts. */
const BAND_TESTS: { key: string; test: (p: number) => boolean }[] = [
  { key: 'all', test: () => true },
  { key: 'under30', test: (p) => p < 30000 },
  { key: '30to40', test: (p) => p >= 30000 && p <= 40000 },
  { key: 'over40', test: (p) => p > 40000 },
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
  /** Single-word values (families, genders) read better capitalised.
   *  Full phrases must not be — "Chini ya" is not "Chini Ya". */
  capitalise = false,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  label: string;
  capitalise?: boolean;
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
      <span className={`text-sm text-charcoal ${capitalise ? 'capitalize' : ''}`}>{label}</span>
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
  const { t, lang } = useLang();
  const bands = [
    { key: 'all', label: t('allPrices') },
    { key: 'under30', label: t('under', { v: formatPrice(30000) }) },
    { key: '30to40', label: `${formatPrice(30000)} – ${formatPrice(40000)}` },
    { key: 'over40', label: t('over', { v: formatPrice(40000) }) },
  ];

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
    const bandTest = BAND_TESTS.find((b) => b.key === band)?.test ?? (() => true);
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
            <h1 className="font-display text-3xl text-charcoal mb-2 uppercase">{title}</h1>
            <div className="w-12 h-px bg-gold mb-2" />
            {intro && <p className="text-sm text-charcoal/70 font-light max-w-xl mb-2">{intro}</p>}
            <p className="text-sm text-muted">
              {filtered.length} {filtered.length === 1 ? t('product') : t('products')}
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-rule hover:border-gold transition-colors lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 text-charcoal" />
            <span className="text-xs text-charcoal tracking-[0.16em] uppercase">{t('filters')}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-8 sticky top-28">
              {types.length > 2 && (
                <FilterGroup title={t('filterType')}>
                  {types.map((ty) => (
                    <Radio
                      key={ty}
                      name="type"
                      value={ty}
                      checked={type === ty}
                      onChange={setType}
                      label={ty === 'all' ? t('all') : formatType(ty as ProductType, lang)}
                    />
                  ))}
                </FilterGroup>
              )}

              {families.length > 2 && (
                <FilterGroup title={t('filterFamily')}>
                  {families.map((f) => (
                    <Radio
                      key={f}
                      name="family"
                      value={f}
                      checked={family === f}
                      onChange={setFamily}
                      label={f === 'all' ? t('all') : f}
                      capitalise
                    />
                  ))}
                </FilterGroup>
              )}

              {showGenderFilter && (
                <FilterGroup title={t('filterFor')}>
                  {(['all', 'women', 'men', 'unisex'] as const).map((g) => (
                    <Radio
                      key={g}
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={setGender}
                      label={g === 'all' ? t('all') : t(g)}
                      capitalise
                    />
                  ))}
                </FilterGroup>
              )}

              <FilterGroup title={t('filterPrice')}>
                {bands.map((b) => (
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
                {t('clearFilters')}
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
                <p className="text-muted">{t('noMatch')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
