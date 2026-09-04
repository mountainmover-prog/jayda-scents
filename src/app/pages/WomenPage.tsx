import { CollectionPage } from '../components/CollectionPage';
import { perfumes } from '../data/products';

export function WomenPage() {
  const list = perfumes.filter((p) => p.gender === 'women' || p.gender === 'unisex');
  return <CollectionPage title="WOMEN'S FRAGRANCES" products={list} />;
}
