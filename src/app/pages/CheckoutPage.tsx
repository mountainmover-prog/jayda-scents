import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Check, Copy, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { lineId } from '../types';
import { formatPrice } from '../utils/format';
import { useLang } from '../i18n/LanguageContext';
import { dictionaries } from '../i18n/strings';
import { LIPA_NAMBA, LIPA_NAME, WHATSAPP_NUMBER, isCheckoutConfigured } from '../config/shop';

const labelCls = 'block text-[10px] tracking-[0.16em] text-muted mb-2 uppercase';
const inputCls =
  'w-full px-4 py-3 bg-white border border-rule text-sm text-charcoal ' +
  'placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors';

export function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [note, setNote] = useState('');
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const total = getCartTotal();
  const configured = isCheckoutConfigured();
  const detailsMissing = !name.trim() || !phone.trim() || !area.trim();

  if (cartItems.length === 0 && !sent) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-rule" />
          <h2 className="font-display text-2xl text-charcoal mb-2">{t('nothingToCheckout')}</h2>
          <Link
            to="/shop"
            className="inline-block border border-gold text-charcoal px-8 py-3 text-xs tracking-[0.16em] hover:bg-gold hover:text-ink transition-colors uppercase mt-4"
          >
            {t('heroCta')}
          </Link>
        </div>
      </div>
    );
  }

  /**
   * The message that lands in your WhatsApp. Written in the language the customer
   * was shopping in, so you can answer them the same way. The delivery line is in
   * here on purpose — it puts the rule on the record before money moves.
   */
  const buildMessage = () => {
    const d = dictionaries[lang];
    const lines = cartItems.map(
      (i) =>
        `• ${i.product.name} (${i.product.brand}) — ${i.variant.sizeLabel} × ${i.quantity} — ${formatPrice(
          i.variant.priceTzs * i.quantity
        )}`
    );
    const isSw = lang === 'sw';
    return [
      isSw ? '*Oda mpya — Jayda Scents*' : '*New order — Jayda Scents*',
      '',
      ...lines,
      '',
      `*${d.total}: ${formatPrice(total)}*`,
      '',
      `${d.fullName}: ${name.trim()}`,
      `${d.phoneNumber}: ${phone.trim()}`,
      `${d.deliveryArea}: ${area.trim()}`,
      ...(note.trim() ? [`${d.anythingElse}: ${note.trim()}`] : []),
      '',
      d.deliveryPolicyMessage,
      '',
      isSw
        ? `Nitalipa kwenda Lipa namba ${LIPA_NAMBA} (${LIPA_NAME}).`
        : `Paying to Lipa namba ${LIPA_NAMBA} (${LIPA_NAME}).`,
      isSw
        ? 'Nitatuma namba ya uthibitisho hapa baada ya kulipa.'
        : 'I will send the confirmation code here once paid.',
    ].join('\n');
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;

  const copyNamba = async () => {
    try {
      await navigator.clipboard.writeText(LIPA_NAMBA);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the number is on screen anyway */
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-6">
            <Check className="w-7 h-7 text-ink" />
          </div>
          <h2 className="font-display text-3xl text-charcoal mb-3">{t('orderSent')}</h2>
          <p className="text-charcoal/70 font-light mb-3">
            {t('orderSentPay', { v: formatPrice(total), n: LIPA_NAMBA })}
          </p>
          <p className="text-sm text-muted font-light mb-8">{t('orderSentDelivery')}</p>
          <button
            onClick={() => {
              clearCart();
              navigate('/shop');
            }}
            className="inline-block bg-ink text-cream px-8 py-3 text-xs tracking-[0.16em] hover:bg-charcoal transition-colors uppercase"
          >
            {t('backToShop')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted hover:text-charcoal transition-colors mb-8 uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToCart')}
        </button>

        <h1 className="font-display text-3xl text-charcoal mb-2 uppercase">{t('checkoutTitle')}</h1>
        <div className="w-12 h-px bg-gold mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="font-display text-lg text-charcoal mb-1">{t('yourDetails')}</h2>
              <p className="text-sm text-muted font-light mb-6">{t('yourDetailsSub')}</p>
            </div>

            <div>
              <label className={labelCls} htmlFor="name">
                {t('fullName')}
              </label>
              <input
                id="name"
                className={inputCls}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amina Hassan"
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="phone">
                {t('phoneNumber')}
              </label>
              <input
                id="phone"
                className={inputCls}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712 345 678"
                inputMode="tel"
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="area">
                {t('deliveryArea')}
              </label>
              <input
                id="area"
                className={inputCls}
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Masaki, Dar es Salaam"
              />
              {/* the delivery rule, stated before they commit */}
              <div className="mt-3 border-l-2 border-gold bg-cream/60 px-4 py-3">
                <p className="text-xs text-charcoal/80 font-light leading-relaxed">
                  {t('deliveryPolicy')}
                </p>
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="note">
                {t('anythingElse')}{' '}
                <span className="normal-case tracking-normal">{t('optional')}</span>
              </label>
              <textarea
                id="note"
                className={`${inputCls} min-h-[80px] resize-y`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t('notePlaceholder')}
              />
            </div>

            {touched && detailsMissing && (
              <p className="text-sm text-destructive">{t('fillInDetails')}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-cream p-6 rounded-lg sticky top-28">
              <h2 className="font-display text-lg text-charcoal mb-5">{t('yourOrder')}</h2>

              <div className="space-y-3 mb-5">
                {cartItems.map((i) => (
                  <div
                    key={lineId(i.product.slug, i.variant.sku)}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-charcoal/80">
                      {i.product.name}
                      <span className="text-muted">
                        {' '}
                        · {i.variant.sizeLabel} × {i.quantity}
                      </span>
                    </span>
                    <span className="text-charcoal whitespace-nowrap">
                      {formatPrice(i.variant.priceTzs * i.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-rule pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-display text-base text-charcoal tracking-wide uppercase">
                    {t('total')}
                  </span>
                  <span className="font-display text-lg text-gold">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted mt-2 font-light">{t('deliveryPolicyShort')}</p>
              </div>

              {configured ? (
                <>
                  <p className="text-[10px] tracking-[0.16em] text-muted mb-2 uppercase">
                    {t('payByMobile')}
                  </p>
                  <div className="border border-gold bg-bone px-4 py-3 mb-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-xl text-charcoal tracking-wide">
                        {LIPA_NAMBA}
                      </p>
                      <p className="text-xs text-muted">{LIPA_NAME}</p>
                    </div>
                    <button
                      onClick={copyNamba}
                      className="text-xs text-muted hover:text-gold transition-colors flex items-center gap-1"
                      aria-label={t('copy')}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? t('copied') : t('copy')}
                    </button>
                  </div>
                  <p className="text-xs text-muted font-light mb-1">{t('anyNetwork')}</p>
                  <p className="text-xs text-muted font-light mb-6">{t('sendFirst')}</p>

                  {/* href is always present so this stays a real, focusable link;
                      an incomplete form is blocked in the handler instead. */}
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={detailsMissing}
                    onClick={(e) => {
                      if (detailsMissing) {
                        e.preventDefault();
                        setTouched(true);
                        return;
                      }
                      setSent(true);
                    }}
                    className={`w-full py-4 text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-colors ${
                      detailsMissing
                        ? 'bg-rule text-muted cursor-not-allowed'
                        : 'bg-ink text-cream hover:bg-charcoal'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t('sendOnWhatsapp')}
                  </a>
                </>
              ) : (
                <div className="border border-rule bg-bone px-4 py-5 text-center">
                  <p className="text-sm text-charcoal mb-1">{t('notReady')}</p>
                  <p className="text-xs text-muted font-light">{t('notReadySub')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
