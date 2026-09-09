import { CollectionPage } from '../components/CollectionPage';
import { products } from '../data/products';
import { useLang } from '../i18n/LanguageContext';

export function ShopPage() {
  const { t } = useLang();
  return <CollectionPage title={t('collShop')} products={products} showGenderFilter />;
}
