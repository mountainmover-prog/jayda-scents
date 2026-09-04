export type Category = 'perfume' | 'body-mist';
export type ProductType = 'edp' | 'oil' | 'mist';
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
