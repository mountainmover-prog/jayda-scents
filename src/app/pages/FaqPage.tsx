import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { MessageCircle } from 'lucide-react';
import { faqSections } from '../data/faq';
import { WHATSAPP_NUMBER } from '../config/shop';
import { useLang } from '../i18n/LanguageContext';

/**
 * Answers are native <details> elements: keyboard-operable and screen-reader
 * friendly with no state to manage, and they still work if the JavaScript has
 * not finished loading.
 *
 * A hash in the URL does two things — scrolls to that section and opens its
 * answers. /faq#delivery is meant to be pasted into a WhatsApp reply, so the
 * person who taps it should land on the answer, not on a row of closed headings
 * they have to hunt through.
 */
export function FaqPage() {
  const { lang, t } = useLang();
  const { hash } = useLocation();
  const target = hash.replace('#', '');
  const [openSection, setOpenSection] = useState(target);

  useEffect(() => {
    if (!target) return;
    setOpenSection(target);
    // wait for the section to be laid out before scrolling to it
    const id = window.requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(id);
  }, [target]);

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h1 className="font-display text-3xl md:text-4xl text-charcoal uppercase">{t('faqTitle')}</h1>
        <div className="w-12 h-px bg-gold mt-3 mb-6" />
        <p className="text-charcoal/70 font-light leading-relaxed max-w-xl">{t('faqIntro')}</p>

        <div className="mt-14 flex flex-col gap-14">
          {faqSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-display text-xl md:text-2xl text-charcoal uppercase mb-5">
                {section.title[lang]}
              </h2>

              <div className="border-t border-rule">
                {section.items.map((item) => (
                  <details
                    key={item.q.en}
                    open={openSection === section.id}
                    className="group border-b border-rule"
                  >
                    <summary className="flex items-start justify-between gap-4 py-5 cursor-pointer list-none text-charcoal marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                      <span className="font-light leading-snug">{item.q[lang]}</span>
                      <span
                        aria-hidden="true"
                        className="mt-1 flex-none text-gold transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 pr-8 text-charcoal/70 font-light leading-relaxed">
                      {item.a[lang]}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 bg-cream/60 border border-rule rounded-lg p-7">
          <h2 className="font-display text-lg text-charcoal uppercase mb-2">{t('faqStillStuck')}</h2>
          <p className="text-charcoal/70 font-light leading-relaxed mb-5">{t('faqStillStuckText')}</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink text-cream px-7 py-3 text-xs tracking-[0.16em] uppercase hover:bg-charcoal transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            {t('faqAskOnWhatsApp')}
          </a>
        </div>
      </div>
    </div>
  );
}
