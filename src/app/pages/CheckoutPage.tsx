import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Check, Copy, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { lineId } from '../types';
import { formatPrice } from '../utils/format';
import {
  LIPA_NAMBA,
  LIPA_NAME,
  WHATSAPP_NUMBER,
  DELIVERY_NOTE,
  isCheckoutConfigured,
} from '../config/shop';

const label = 'block text-[10px] tracking-[0.16em] text-muted mb-2 uppercase';
const input =
  'w-full px-4 py-3 bg-white border border-rule text-sm text-charcoal ' +
  'placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors';

export function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

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
          <h2 className="font-display text-2xl text-charcoal mb-2">Nothing to check out</h2>
          <Link
            to="/shop"
            className="inline-block border border-gold text-charcoal px-8 py-3 text-xs tracking-[0.16em] hover:bg-gold hover:text-ink transition-colors uppercase mt-4"
          >
            Shop now
          </Link>
        </div>
      </div>
    );
  }

  /** The message that lands in your WhatsApp. Kept plain so it reads well on a phone. */
  const buildMessage = () => {
    const lines = cartItems.map(
      (i) =>
        `• ${i.product.name} (${i.product.brand}) — ${i.variant.sizeLabel} × ${i.quantity} — ${formatPrice(
          i.variant.priceTzs * i.quantity
        )}`
    );
    return [
      '*New order — Jayda Scents*',
      '',
      ...lines,
      '',
      `*Total: ${formatPrice(total)}*`,
      '',
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Area: ${area.trim()}`,
      ...(note.trim() ? [`Note: ${note.trim()}`] : []),
      '',
      `Paying to Lipa namba ${LIPA_NAMBA} (${LIPA_NAME}).`,
      'I will send the confirmation code here once paid.',
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
          <h2 className="font-display text-3xl text-charcoal mb-3">Order sent</h2>
          <p className="text-charcoal/70 font-light mb-2">
            Pay {formatPrice(total)} to Lipa namba <strong>{LIPA_NAMBA}</strong>, then send us the
            confirmation code on WhatsApp.
          </p>
          <p className="text-sm text-muted font-light mb-8">
            We confirm delivery cost for your area before anything is sent.
          </p>
          <button
            onClick={() => {
              clearCart();
              navigate('/shop');
            }}
            className="inline-block bg-ink text-cream px-8 py-3 text-xs tracking-[0.16em] hover:bg-charcoal transition-colors uppercase"
          >
            Back to shop
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
          Back to cart
        </button>

        <h1 className="font-display text-3xl text-charcoal mb-2">CHECKOUT</h1>
        <div className="w-12 h-px bg-gold mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── Your details ─────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="font-display text-lg text-charcoal mb-1">Your details</h2>
              <p className="text-sm text-muted font-light mb-6">
                So we know who is paying and where it is going.
              </p>
            </div>

            <div>
              <label className={label} htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                className={input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amina Hassan"
              />
            </div>

            <div>
              <label className={label} htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                className={input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712 345 678"
                inputMode="tel"
              />
            </div>

            <div>
              <label className={label} htmlFor="area">
                Delivery area
              </label>
              <input
                id="area"
                className={input}
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Masaki, Dar es Salaam"
              />
              <p className="text-xs text-muted mt-2 font-light">{DELIVERY_NOTE}</p>
            </div>

            <div>
              <label className={label} htmlFor="note">
                Anything else <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                id="note"
                className={`${input} min-h-[80px] resize-y`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Landmark, preferred delivery time, gift wrapping…"
              />
            </div>

            {touched && detailsMissing && (
              <p className="text-sm text-destructive">
                Please fill in your name, phone number and delivery area.
              </p>
            )}
          </div>

          {/* ── Order and payment ────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-cream p-6 rounded-lg sticky top-28">
              <h2 className="font-display text-lg text-charcoal mb-5">Your order</h2>

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
                  <span className="font-display text-base text-charcoal tracking-wide">TOTAL</span>
                  <span className="font-display text-lg text-gold">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted mt-2 font-light">Delivery added separately.</p>
              </div>

              {configured ? (
                <>
                  <p className="text-[10px] tracking-[0.16em] text-muted mb-2 uppercase">
                    Pay by mobile money
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
                      aria-label="Copy Lipa namba"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-muted font-light mb-1">
                    Pay from any network or bank — M-Pesa, Mixx by Yas, Airtel Money or your bank
                    app.
                  </p>
                  <p className="text-xs text-muted font-light mb-6">
                    Send your order first, then pay and share the confirmation code on WhatsApp.
                  </p>

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
                    Send order on WhatsApp
                  </a>
                </>
              ) : (
                <div className="border border-rule bg-bone px-4 py-5 text-center">
                  <p className="text-sm text-charcoal mb-1">Checkout is not ready yet</p>
                  <p className="text-xs text-muted font-light">
                    Ordering opens as soon as our payment number is live. Reach us on WhatsApp in
                    the meantime.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
