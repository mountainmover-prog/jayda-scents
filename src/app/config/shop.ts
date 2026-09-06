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

/** Shown under the Lipa namba on the checkout page. Keep it short. */
export const DELIVERY_NOTE =
  'Delivery is arranged once we have your area — we will confirm the cost on WhatsApp before you pay.';

export const isCheckoutConfigured = (): boolean =>
  LIPA_NAMBA.trim().length > 0 && WHATSAPP_NUMBER.trim().length > 0;
