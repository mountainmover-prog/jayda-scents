import { Link } from 'react-router';
import { Product } from '../types';
import { priceFrom, totalStock } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatPrice, formatType } from '../utils/format';
import { useLang } from '../i18n/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLang();
  const from = priceFrom(product);
  const multipleSizes = product.variants.length > 1;
  const soldOut = totalStock(product) === 0;

  return (
    <Link to={`/product/${product.slug}`} className="group">
      {/* tall card, but product shots are square 1200x1200 — contain, don't crop the bottle */}
      <div className="relative overflow-hidden bg-white rounded-lg aspect-[3/4]">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          className="object-contain w-full h-full p-6 group-hover:scale-105 transition-transform duration-500"
        />
        {soldOut && (
          <div className="absolute inset-0 bg-bone/75 flex items-center justify-center">
            <span className="text-[10px] tracking-[0.16em] text-charcoal uppercase">
              {t('soldOut')}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-muted tracking-[0.16em] uppercase">{product.brand}</p>
          <span className="text-rule">·</span>
          <p className="text-[10px] text-bronze tracking-[0.16em] uppercase">
            {formatType(product.type, lang)}
          </p>
        </div>
        <h3 className="font-display text-lg text-charcoal mt-1">{product.name}</h3>
        <p className="text-sm text-gold mt-1 tracking-wide">
          {multipleSizes && <span className="text-muted">{t('from')} </span>}
          {formatPrice(from)}
        </p>
      </div>
    </Link>
  );
}
