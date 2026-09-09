import { CollectionPage } from '../components/CollectionPage';
import { bodyMists } from '../data/products';
import { useLang } from '../i18n/LanguageContext';

export function BodyMistsPage() {
  const { t } = useLang();
  return (
    <CollectionPage
      title={t('collMists')}
      intro={t('bodyMistsIntro')}
      products={bodyMists}
      showGenderFilter
    />
  );
}
