import { Star } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { RatingSummary } from '../data/reviews';

/**
 * Five stars, filled to the average: 4.5 shows four full stars and a half.
 * Each star is an outline with a bronze copy clipped to the filled fraction
 * laid over it, so partial values need no separate half-star artwork.
 *
 * `summary` may be null, for a product nobody has rated yet. The five outlines
 * are still drawn, so every card in a grid keeps the same shape, but nothing is
 * filled in and no number is printed beside them. The absence of a figure is
 * what says "not rated": the component never asserts a score for a perfume
 * nobody has reviewed.
 *
 * Screen readers do get the words. A row of empty outlines is meaningless read
 * aloud, so the accessible name says "No reviews yet" even though the sighted
 * label is gone.
 */
export function Stars({
  summary,
  size = 'md',
  showCount = true,
}: {
  summary: RatingSummary | null;
  size?: 'sm' | 'md';
  showCount?: boolean;
}) {
  const { t } = useLang();
  const px = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-[11px]' : 'text-xs';

  const countText = summary
    ? summary.count === 1
      ? t('reviewCountOne')
      : t('reviewCountMany', { n: summary.count })
    : '';

  return (
    <span
      className="inline-flex items-center gap-2"
      role="img"
      aria-label={
        summary ? t('ratedAria', { r: summary.average, n: countText }) : t('noReviewsYet')
      }
    >
      <span className="inline-flex gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = summary ? Math.max(0, Math.min(1, summary.average - i)) : 0;
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
      {showCount && summary && (
        <span className={`${textSize} text-muted`} aria-hidden="true">
          {`${summary.average.toFixed(1)} · ${countText}`}
        </span>
      )}
    </span>
  );
}
