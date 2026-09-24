import { Star } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { RatingSummary } from '../data/reviews';

/**
 * Five stars, filled to the average: 4.5 shows four full stars and a half.
 * Each star is an outline with a gold copy clipped to the filled fraction
 * laid over it, so partial values need no separate half-star artwork.
 *
 * Screen readers get one sentence ("Rated 4.5 out of 5 from 2 reviews")
 * instead of five meaningless icons.
 */
export function Stars({
  summary,
  size = 'md',
  showCount = true,
}: {
  summary: RatingSummary;
  size?: 'sm' | 'md';
  showCount?: boolean;
}) {
  const { t } = useLang();
  const px = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const countText =
    summary.count === 1 ? t('reviewCountOne') : t('reviewCountMany', { n: summary.count });

  return (
    <span
      className="inline-flex items-center gap-2"
      role="img"
      aria-label={t('ratedAria', { r: summary.average, n: countText })}
    >
      <span className="inline-flex gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, summary.average - i));
          return (
            <span key={i} className={`relative inline-block ${px}`}>
              <Star className={`absolute inset-0 ${px} text-rule`} strokeWidth={1.5} />
              {fill > 0 && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                  <Star className={`${px} text-bronze fill-bronze`} strokeWidth={1.5} />
                </span>
              )}
            </span>
          );
        })}
      </span>
      {showCount && (
        <span className={`${size === 'sm' ? 'text-[11px]' : 'text-xs'} text-muted`} aria-hidden="true">
          {summary.average.toFixed(1)} · {countText}
        </span>
      )}
    </span>
  );
}
