import { CollectionPage } from '../components/CollectionPage';
import { perfumes } from '../data/products';

export function MenPage() {
  const list = perfumes.filter((p) => p.gender === 'men' || p.gender === 'unisex');
  return <CollectionPage title="MEN'S FRAGRANCES" products={list} />;
}
