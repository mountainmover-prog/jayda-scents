import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { dictionaries, Lang, StringKey } from './strings';

const STORAGE_KEY = 'jayda-lang';

/** Their saved choice wins; otherwise follow the phone or browser; otherwise English. */
function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'sw') return saved;
  } catch {
    /* private mode or storage blocked — fall through to detection */
  }
  const langs = typeof navigator !== 'undefined' ? navigator.languages ?? [navigator.language] : [];
  return langs.some((l) => l?.toLowerCase().startsWith('sw')) ? 'sw' : 'en';
}

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** t('onlyNLeft', { n: 2 }) — {placeholders} are replaced from vars. */
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* not fatal — the choice just won't survive a reload */
    }
  };

  const t = (key: StringKey, vars?: Record<string, string | number>) => {
    let s: string = dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
    }
    return s;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (ctx === undefined) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
};
