import { Link } from 'react-router';
import { Perfume } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  perfume: Perfume;
}

export function ProductCard({ perfume }: ProductCardProps) {
  return (
    <Link to={`/product/${perfume.id}`} className="group">
      <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[3/4]">
        <ImageWithFallback
          src={perfume.image}
          alt={perfume.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-3">
        <p className="text-xs text-gray-500 tracking-wider">{perfume.brand}</p>
        <h3 className="text-sm">{perfume.name}</h3>
        <p className="text-sm">₱{perfume.price}</p>
      </div>
    </Link>
  );
}