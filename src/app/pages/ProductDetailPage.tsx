import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { findProduct } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatPrice, formatType } from '../utils/format';
import { useLang } from '../i18n/LanguageContext';

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, lang } = useLang();
  const product = findProduct(slug);

  const [variantIndex, setVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-charcoal mb-4">{t('notFound')}</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-sm text-gold hover:text-bronze transition-colors"
          >
            ← {t('backToShop')}
          </button>
        </div>
      </div>
    );
  }

  const variant = product.variants[variantIndex];
  const soldOut = variant.stock === 0;
  const lowStock = variant.stock > 0 && variant.stock <= 3;
  const hasNotes =
    product.notes.top.length > 0 ||
    product.notes.heart.length > 0 ||
    product.notes.base.length > 0;

  const handleAddToCart = () => {
    if (soldOut) return;
    addToCart(product, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const Note = ({ label, items }: { label: string; items: string[] }) =>
    items.length === 0 ? null : (
      <div>
        <p className="text-[10px] tracking-[0.16em] text-gold mb-2 uppercase">{label}</p>
        <p className="text-sm text-charcoal/70 font-light">{items.join(', ')}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted hover:text-charcoal transition-colors mb-8 uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden">
            <ImageWithFallback
              src={product.images[0]}
              alt={product.name}
              className="object-contain w-full h-full p-10"
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[10px] text-muted tracking-[0.16em] uppercase">{product.brand}</p>
                <span className="text-rule">·</span>
                <p className="text-[10px] text-bronze tracking-[0.16em] uppercase">
                  {formatType(product.type, lang)}
                </p>
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gold mb-4 tracking-wide">
                {formatPrice(variant.priceTzs)}
                {variant.wasPriceTzs && (
                  <span className="ml-3 text-sm text-muted line-through">
                    {formatPrice(variant.wasPriceTzs)}
                  </span>
                )}
              </p>
              <p className="text-charcoal/70 font-light leading-relaxed">
                {product.longDescription || product.shortDescription}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-[10px] tracking-[0.16em] text-muted mb-3 uppercase">{t('size')}</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.sku}
                    onClick={() => setVariantIndex(i)}
                    disabled={v.stock === 0}
                    className={`px-5 py-2 border text-sm transition-colors ${
                      i === variantIndex
                        ? 'border-gold bg-gold text-ink'
                        : 'border-rule text-charcoal hover:border-gold'
                    } ${v.stock === 0 ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                  >
                    {v.sizeLabel}
                  </button>
                ))}
              </div>
              {lowStock && (
                <p className="text-xs text-bronze mt-3">{t('onlyNLeft', { n: variant.stock })}</p>
              )}
            </div>

            {hasNotes && (
              <div className="mb-10 space-y-5">
                <Note label={t('topNotes')} items={product.notes.top} />
                <Note label={t('heartNotes')} items={product.notes.heart} />
                <Note label={t('baseNotes')} items={product.notes.base} />
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={soldOut}
              className="w-full bg-ink text-cream py-4 text-xs tracking-[0.16em] hover:bg-charcoal transition-colors flex items-center justify-center gap-2 uppercase disabled:bg-rule disabled:text-muted disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-5 h-5" />
              {soldOut ? t('soldOut') : added ? t('addedToCart') : t('addToCart')}
            </button>

            <div className="mt-10 text-sm">
              <div className="flex justify-between py-3 border-b border-rule">
                <span className="text-muted tracking-wide">{t('labelType')}</span>
                <span className="text-charcoal">{formatType(product.type, lang)}</span>
              </div>
              {product.family && (
                <div className="flex justify-between py-3 border-b border-rule">
                  <span className="text-muted tracking-wide">{t('labelFamily')}</span>
                  <span className="text-charcoal capitalize">{product.family}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-b border-rule">
                <span className="text-muted tracking-wide">{t('labelFor')}</span>
                <span className="text-charcoal capitalize">{t(product.gender)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-rule">
                <span className="text-muted tracking-wide">{t('labelDelivery')}</span>
                <span className="text-charcoal text-right">{t('deliveryShort')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
