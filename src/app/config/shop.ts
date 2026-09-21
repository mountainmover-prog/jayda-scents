// ─────────────────────────────────────────────────────────────────────────────
//  FILL IN THE TWO EMPTY VALUES BELOW.
//
//  Until both are filled, the checkout button on the site is disabled and shows
//  "not ready yet" instead. That is deliberate — showing a customer the wrong
//  Lipa namba means their money goes somewhere you can't get it back from.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Your mobile-money Lipa namba — digits only, no spaces.
 * Mixx by Yas, on TIPS, so it accepts payment from any network and any bank.
 */
export const LIPA_NAMBA = '45407565';

/**
 * WhatsApp number in international format — digits only, no + and no spaces.
 * +255 657 553 256 → '255657553256'.
 */
export const WHATSAPP_NUMBER = '255657553256';

/**
 * The name the customer sees on their payment confirmation. It must match the
 * name registered to the Lipa namba, or the payment looks wrong at the moment
 * it matters most.
 */
export const LIPA_NAME = 'SALHA SULEIMAN SAIDI';

/**
 * Social links shown in the footer. Leave a value empty and that icon simply
 * does not appear — no dead links.
 * Full URLs, e.g. 'https://www.instagram.com/jaydascents'
 */
export const INSTAGRAM_URL = 'https://www.instagram.com/unapologetic_baybe';
export const TIKTOK_URL = 'https://www.tiktok.com/@jaydascents';

/**
 * The site's public address, no trailing slash. CHANGE THIS WHEN YOU MOVE HOSTS.
 *
 * It is the single source for the canonical tag on every page, the absolute
 * address of the link-preview image, and every URL in sitemap.xml. They all
 * have to name the same host: a canonical pointing at bolt.host after the move
 * would tell Google the real shop is on the old address.
 */
export const SITE_URL = 'https://mountainmover-prog-j-0gtp.bolt.host';

export const isCheckoutConfigured = (): boolean =>
  LIPA_NAMBA.trim().length > 0 && WHATSAPP_NUMBER.trim().length > 0;
