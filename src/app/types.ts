export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  category: 'floral' | 'woody' | 'fresh' | 'oriental';
  gender: 'men' | 'women' | 'unisex';
  size: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
}
