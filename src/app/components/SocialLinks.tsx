import { Instagram } from 'lucide-react';
import { INSTAGRAM_URL, TIKTOK_URL } from '../config/shop';

/** lucide-react has no TikTok glyph, so this is the official mark as a path. */
function TikTokIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.68a5.67 5.67 0 0 0-.77-.05A5.66 5.66 0 1 0 15.54 15.3V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48z" />
    </svg>
  );
}

const links = [
  { url: INSTAGRAM_URL, label: 'Instagram', Icon: Instagram },
  { url: TIKTOK_URL, label: 'TikTok', Icon: TikTokIcon },
].filter((l) => l.url.trim().length > 0);

export function SocialLinks({ className = '' }: { className?: string }) {
  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ url, label, Icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-9 h-9 border border-cream/20 rounded-full flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-colors"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
