import { Link } from 'react-router';
import { useLang } from '../i18n/LanguageContext';

export function Hero() {
  const { t } = useLang();

  return (
    <div className="relative h-[70vh] min-h-[500px] bg-ink overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1767458770505-4daf3e3a3f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb24lMjBsdXh1cnl8ZW58MXx8fHwxNzcxNTY5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(rgba(11,9,7,0.65), rgba(11,9,7,0.45))' }}
      />
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl text-cream tracking-wide mb-6 leading-[1.15] uppercase">
            {t('heroTitle')}
          </h1>
          <p className="text-base md:text-lg text-cream/80 font-body font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('heroSub')}
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gold text-ink px-10 py-3 text-xs tracking-[0.16em] hover:bg-gold-light transition-colors duration-300 uppercase"
          >
            {t('heroCta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
