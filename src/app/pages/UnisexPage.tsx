import { CollectionPage } from '../components/CollectionPage';
import { perfumes } from '../data/products';
import { useLang } from '../i18n/LanguageContext';

export function UnisexPage() {
  const { t } = useLang();
  const list = perfumes.filter((p) => p.gender === 'unisex');
  return <CollectionPage title={t('collUnisex')} products={list} />;
}
