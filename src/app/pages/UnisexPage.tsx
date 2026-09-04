import { CollectionPage } from '../components/CollectionPage';
import { perfumes } from '../data/products';

export function UnisexPage() {
  const list = perfumes.filter((p) => p.gender === 'unisex');
  return <CollectionPage title="UNISEX FRAGRANCES" products={list} />;
}
