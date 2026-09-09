import { CollectionPage } from '../components/CollectionPage';
import { perfumes } from '../data/products';
import { useLang } from '../i18n/LanguageContext';

export function WomenPage() {
  const { t } = useLang();
  const list = perfumes.filter((p) => p.gender === 'women' || p.gender === 'unisex');
  return <CollectionPage title={t('collWomen')} products={list} />;
}
