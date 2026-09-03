import { Link } from 'react-router';
import { Perfume } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatPrice, formatType } from '../utils/format';

interface ProductCardProps {
  perfume: Perfume;
}

export function ProductCard({ perfume }: ProductCardProps) {
  return (
    <Link to={`/product/${perfume.id}`} className="group">
      <div className="relative overflow-hidden bg-cream rounded-lg aspect-[3/4]">
        <ImageWithFallback
          src={perfume.image}
          alt={perfume.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-muted tracking-[0.16em] uppercase">{perfume.brand}</p>
          <span className="text-rule">·</span>
          <p className="text-[10px] text-bronze tracking-[0.16em] uppercase">{formatType(perfume.type)}</p>
        </div>
        <h3 className="font-display text-lg text-charcoal mt-1">{perfume.name}</h3>
        <p className="text-sm text-gold mt-1 tracking-wide">{formatPrice(perfume.price)}</p>
      </div>
    </Link>
  );
}
