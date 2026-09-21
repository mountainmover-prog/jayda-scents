/**
 * The shop's questions and answers, in both languages.
 *
 * This is policy the customer will hold you to, so it lives here as plain
 * content rather than buried in the page markup — edit the words, not the
 * component. Keep `en` and `sw` in step; if you change one, change the other.
 *
 * The `id` on each section is a real anchor: /faq#delivery scrolls straight to
 * delivery and opens its answers, which is what makes the link worth pasting
 * into a WhatsApp reply.
 */
export type Lang = 'en' | 'sw';
type Bilingual = Record<Lang, string>;

export interface FaqItem {
  q: Bilingual;
  a: Bilingual;
}

export interface FaqSection {
  id: string;
  title: Bilingual;
  items: FaqItem[];
}

export const faqSections: FaqSection[] = [
  {
    id: 'ordering',
    title: { en: 'Ordering & payment', sw: 'Kuagiza na kulipa' },
    items: [
      {
        q: {
          en: 'Are delivery charges included in the price?',
          sw: 'Gharama ya usafirishaji imo kwenye bei?',
        },
        a: {
          en: 'No. The price covers the fragrance only. Delivery is paid by you and the cost depends on where you are. We tell you the exact amount on WhatsApp before you pay anything.',
          sw: 'Hapana. Bei ni ya manukato tu. Usafirishaji hulipwa na wewe na gharama hutegemea ulipo. Tutakuambia kiasi kamili kwa WhatsApp kabla ya kulipa chochote.',
        },
      },
      {
        q: { en: 'How do I pay?', sw: 'Nalipa vipi?' },
        a: {
          en: 'By mobile money to our Lipa namba, which is shown at checkout together with the exact total. It accepts payment from M-Pesa, Mixx by Yas, Airtel Money or any bank app. Send your order first, then pay and share the confirmation code with us on WhatsApp.',
          sw: 'Kwa mobile money kwenda Lipa namba yetu, inayoonekana wakati wa kumaliza oda pamoja na jumla kamili. Inakubali malipo kutoka M-Pesa, Mixx by Yas, Airtel Money au app yoyote ya benki. Tuma oda kwanza, kisha lipa na utupe namba ya uthibitisho kwa WhatsApp.',
        },
      },
      {
        q: {
          en: 'Can I send feedback after using the perfume?',
          sw: 'Naweza kutoa maoni baada ya kutumia manukato?',
        },
        a: {
          en: 'Please do. We ask for it. Send us a message on WhatsApp and tell us how it wore. It is how we decide what to stock next.',
          sw: 'Tafadhali fanya hivyo. Tunayahitaji. Tutumie ujumbe WhatsApp na utuambie yalikaa vipi. Hivi ndivyo tunavyoamua tuweke bidhaa gani baadaye.',
        },
      },
    ],
  },
  {
    id: 'delivery',
    title: { en: 'Delivery', sw: 'Usafirishaji' },
    items: [
      {
        q: { en: 'How long does delivery take?', sw: 'Usafirishaji huchukua muda gani?' },
        a: {
          en: 'In Zanzibar, the same day. In Dar es Salaam, usually the next day. It depends on what time you order and on the ferry schedule. For upcountry we agree the timing with you on WhatsApp.',
          sw: 'Zanzibar, siku hiyo hiyo. Dar es Salaam, mara nyingi siku inayofuata. Hutegemea saa uliyoagiza na ratiba ya kivuko. Kwa mikoa ya ndani tutakubaliana muda kwa WhatsApp.',
        },
      },
      {
        q: { en: 'Which areas do you deliver to?', sw: 'Mnasafirisha maeneo gani?' },
        a: {
          en: 'Zanzibar, Dar es Salaam and upcountry.',
          sw: 'Zanzibar, Dar es Salaam na mikoa ya ndani.',
        },
      },
      {
        q: { en: 'Who brings the order?', sw: 'Nani analeta oda?' },
        a: {
          en: 'In Zanzibar outside Nungwi, by public transport and boda. In Dar es Salaam, by courier.',
          sw: 'Zanzibar nje ya Nungwi, kwa usafiri wa umma na bodaboda. Dar es Salaam, kwa kampuni ya usafirishaji.',
        },
      },
    ],
  },
  {
    id: 'returns',
    title: { en: 'Returns & care', sw: 'Marejesho na matumizi' },
    items: [
      {
        q: { en: 'Do you accept returns?', sw: 'Mnakubali marejesho?' },
        a: {
          en: 'No. We do not take returns on perfume once it has been sold. Before your order goes out we confirm the exact brand and bottle with you more than once, on purpose. It is how we make sure you get what you meant to buy. Please check every detail while we are still talking.',
          sw: 'Hapana. Hatupokei marejesho ya manukato yaliyokwisha nunuliwa. Kabla oda yako kutoka, tunathibitisha chapa na chupa kamili na wewe zaidi ya mara moja, kwa makusudi. Ndivyo tunavyohakikisha unapata ulichokusudia. Tafadhali angalia kila kitu wakati bado tunawasiliana.',
        },
      },
      {
        q: { en: 'What if the bottle arrives damaged?', sw: 'Je, chupa ikifika imevunjika?' },
        a: {
          en: 'It very rarely happens. Every package is marked as glass and to be handled with care. If a bottle does arrive broken, tell us straight away with a photo. The claim sits with the courier rather than with us, but we will raise it with them and help you through it.',
          sw: 'Hutokea mara chache sana. Kila kifurushi tunaandika kuwa ni kioo na kishikwe kwa uangalifu. Kama chupa itafika imevunjika, tuambie mara moja na picha. Madai yanakuwa kwa kampuni ya usafirishaji na sio kwetu, lakini tutayafikisha kwao na tutakusaidia.',
        },
      },
      {
        q: { en: 'What if my skin reacts?', sw: 'Nifanye nini kama ngozi yangu itaathirika?' },
        a: {
          en: 'Fragrance can irritate sensitive skin. If you get a reaction, stop using it, wash the area with soap and water, and see a pharmacist or doctor if it does not settle. Spraying onto clothing rather than skin lowers the chance of a reaction, and if you know your skin is sensitive, test a small patch first.',
          sw: 'Manukato yanaweza kuathiri ngozi nyeti. Ukipata athari, acha kutumia, osha eneo hilo kwa maji na sabuni, na muone mfamasia au daktari kama haitapungua. Kupulizia kwenye nguo badala ya ngozi hupunguza uwezekano wa athari, na kama unajua ngozi yako ni nyeti, jaribu eneo dogo kwanza.',
        },
      },
    ],
  },
];
