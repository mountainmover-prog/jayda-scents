import { CollectionPage } from '../components/CollectionPage';
import { products } from '../data/products';

export function ShopPage() {
  return <CollectionPage title="SHOP" products={products} showGenderFilter />;
}
