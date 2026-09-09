import { CollectionPage } from '../components/CollectionPage';
import { perfumes } from '../data/products';
import { useLang } from '../i18n/LanguageContext';

export function MenPage() {
  const { t } = useLang();
  const list = perfumes.filter((p) => p.gender === 'men' || p.gender === 'unisex');
  return <CollectionPage title={t('collMen')} products={list} />;
}
