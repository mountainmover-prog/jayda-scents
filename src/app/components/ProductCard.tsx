import { Link } from 'react-router';
import { Product } from '../types';
import { priceFrom, totalStock } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatPrice, formatType } from '../utils/format';
import { useLang } from '../i18n/LanguageContext';
import { ratingFor } from '../data/reviews';
import { Stars } from './Stars';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLang();
  const from = priceFrom(product);
  const multipleSizes = product.variants.length > 1;
  const soldOut = totalStock(product) === 0;
  // Nothing at all when unrated: an empty row of stars reads as "rated zero".
  const rating = ratingFor(product.slug);

  return (
    <Link to={`/product/${product.slug}`} className="group">
      {/* tall card, but product shots are square 1200x1200 — contain, don't crop the bottle */}
      <div className="relative overflow-hidden bg-white rounded-lg aspect-[3/4]">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 50vw"
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
        {/* h2, not h3: on a phone the filter headings are behind the Filters button and
            are not in the page, so an h3 here jumped straight from the h1 and left a
            screen reader with a broken outline. Styling unchanged. */}
        <h2 className="font-display text-lg text-charcoal mt-1">{product.name}</h2>
        {rating && (
          <div className="mt-1">
            <Stars summary={rating} size="sm" />
          </div>
        )}
        <p className="text-sm text-bronze mt-1 tracking-wide">
          {multipleSizes && <span className="text-muted">{t('from')} </span>}
          {formatPrice(from)}
        </p>
      </div>
    </Link>
  );
}
