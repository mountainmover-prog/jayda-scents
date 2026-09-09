import { useLang } from '../i18n/LanguageContext';
import { Lang } from '../i18n/strings';

const OPTIONS: { code: Lang; label: string; full: string }[] = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'sw', label: 'SW', full: 'Kiswahili' },
];

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div className={`flex items-center ${className}`} role="group" aria-label="Language">
      {OPTIONS.map((o, i) => (
        <span key={o.code} className="flex items-center">
          {i > 0 && <span className="text-cream/25 text-[10px] px-1">/</span>}
          <button
            onClick={() => setLang(o.code)}
            aria-label={o.full}
            aria-pressed={lang === o.code}
            className={`text-[11px] tracking-[0.16em] transition-colors ${
              lang === o.code ? 'text-gold' : 'text-cream/50 hover:text-cream'
            }`}
          >
            {o.label}
          </button>
        </span>
      ))}
    </div>
  );
}
