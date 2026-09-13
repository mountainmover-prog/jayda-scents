export type Category = 'perfume' | 'body-mist';
/**
 * Concentration, as printed on the box. `edt` and `extrait` were added when the
 * Armaf Club de Nuit Intense Man box turned out to read EAU DE TOILETTE and the
 * Afnan 9PM Night Out box extrait de parfum — the two ends of the strength
 * range, and the difference a customer paying TZS 250,000 is paying for.
 */
export type ProductType = 'edp' | 'edt' | 'extrait' | 'oil' | 'mist';
export type Gender = 'men' | 'women' | 'unisex';

/** One sellable size of a product. Price lives here, not on the product. */
export interface Variant {
  sku: string;
  sizeLabel: string;
  sizeMl: number;
  priceTzs: number;
  /** Only set when the price genuinely dropped. Renders as a struck-through price. */
  wasPriceTzs?: number;
  stock: number;
}

export interface Product {
  /** Primary key and URL segment. Immutable once live. */
  slug: string;
  name: string;
  brand: string;
  category: Category;
  type: ProductType;
  gender: Gender;
  /** Main accord — amber, gourmand, floral, woody… Empty when not established. */
  family: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  shortDescription: string;
  longDescription: string;
  /** Paths under /public. First one is the card image. */
  images: string[];
  featured: boolean;
  variants: Variant[];
}

export interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}

/** Cart lines are identified by product + size, so 50ml and 100ml are separate lines. */
export const lineId = (slug: string, sku: string) => `${slug}:${sku}`;
