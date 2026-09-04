import { CollectionPage } from '../components/CollectionPage';
import { bodyMists } from '../data/products';

export function BodyMistsPage() {
  return (
    <CollectionPage
      title="BODY MISTS"
      intro="Lighter than a perfume and made to be reapplied through the day."
      products={bodyMists}
      showGenderFilter
    />
  );
}
