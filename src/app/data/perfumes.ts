import { Perfume } from '../types';

export const perfumes: Perfume[] = [
  {
    id: '1',
    name: 'Lumière d\'Or',
    brand: 'MAISON BELLE',
    price: 195,
    description: 'An opulent fragrance that captures the essence of golden sunlight with warm amber and precious woods.',
    image: 'https://images.unsplash.com/photo-1770301410072-f6ef6dad65b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZ29sZHxlbnwxfHx8fDE3NzE0OTU3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'oriental',
    gender: 'unisex',
    type: 'edp',
    size: '100ml',
    notes: {
      top: ['Bergamot', 'Saffron', 'Pink Pepper'],
      heart: ['Jasmine', 'Amber', 'Rose'],
      base: ['Sandalwood', 'Vanilla', 'Musk']
    }
  },
  {
    id: '2',
    name: 'Rose Élégante',
    brand: 'FLEUR DE VIE',
    price: 165,
    description: 'A romantic composition celebrating the timeless beauty of rose petals with a modern twist.',
    image: 'https://images.unsplash.com/photo-1508771400123-e194ad75c0e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVyZnVtZSUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzcxNDkwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'floral',
    gender: 'women',
    type: 'edp',
    size: '75ml',
    notes: {
      top: ['Lychee', 'Mandarin', 'Red Berries'],
      heart: ['Bulgarian Rose', 'Peony', 'Magnolia'],
      base: ['White Musk', 'Cedar', 'Patchouli']
    }
  },
  {
    id: '3',
    name: 'Noir Mystique',
    brand: 'OMBRE PARFUM',
    price: 225,
    description: 'A mysterious and sophisticated blend for those who embrace the night with confidence.',
    image: 'https://images.unsplash.com/photo-1554948419-1939083b12cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZXJmdW1lJTIwYm90dGxlJTIwYmxhY2t8ZW58MXx8fHwxNzcxNTY5NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'woody',
    gender: 'men',
    type: 'oil',
    size: '100ml',
    notes: {
      top: ['Black Pepper', 'Cardamom', 'Grapefruit'],
      heart: ['Leather', 'Vetiver', 'Tobacco'],
      base: ['Oud', 'Tonka Bean', 'Amber']
    }
  },
  {
    id: '4',
    name: 'Blanc Pur',
    brand: 'ESSENCE DIVINE',
    price: 185,
    description: 'Pure elegance in a bottle. A clean, crisp fragrance that embodies modern minimalism.',
    image: 'https://images.unsplash.com/photo-1761778304143-4c89e7dd2457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBlcmZ1bWUlMjBib3R0bGUlMjB3aGl0ZXxlbnwxfHx8fDE3NzE1MzA5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'fresh',
    gender: 'unisex',
    type: 'edp',
    size: '50ml',
    notes: {
      top: ['White Tea', 'Neroli', 'Mint'],
      heart: ['Lily of the Valley', 'Green Notes', 'Freesia'],
      base: ['White Musk', 'Cedarwood', 'Iris']
    }
  },
  {
    id: '5',
    name: 'Jardin Secret',
    brand: 'FLEUR DE VIE',
    price: 155,
    description: 'Step into a secret garden where blooming flowers dance in the warm afternoon sun.',
    image: 'https://images.unsplash.com/photo-1763986665850-6e66549aa8e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBwZXJmdW1lJTIwYm90dGxlJTIwZ2xhc3N8ZW58MXx8fHwxNzcxNTY5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'floral',
    gender: 'women',
    type: 'oil',
    size: '75ml',
    notes: {
      top: ['Orange Blossom', 'Pear', 'Lemon'],
      heart: ['Gardenia', 'Tuberose', 'Ylang-Ylang'],
      base: ['Sandalwood', 'Vanilla', 'Benzoin']
    }
  },
  {
    id: '6',
    name: 'Ambre Précieux',
    brand: 'MAISON BELLE',
    price: 205,
    description: 'A warm, intoxicating amber composition that evokes timeless luxury and sophistication.',
    image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGUlMjB2aW50YWdlfGVufDF8fHx8MTc3MTU2OTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'oriental',
    gender: 'unisex',
    type: 'oil',
    size: '100ml',
    notes: {
      top: ['Cinnamon', 'Clove', 'Orange'],
      heart: ['Amber', 'Labdanum', 'Incense'],
      base: ['Patchouli', 'Vanilla', 'Musk']
    }
  },
  {
    id: '7',
    name: 'Cristal Aqua',
    brand: 'ESSENCE DIVINE',
    price: 145,
    description: 'Fresh as morning dew, this aquatic fragrance brings the clarity of crystal-clear waters.',
    image: 'https://images.unsplash.com/photo-1621275155732-2bff82c64fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwcGVyZnVtZSUyMGJvdHRsZSUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcxNTY5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'fresh',
    gender: 'unisex',
    type: 'edp',
    size: '50ml',
    notes: {
      top: ['Sea Salt', 'Cucumber', 'Mint'],
      heart: ['Water Lily', 'Marine Notes', 'Jasmine'],
      base: ['Driftwood', 'Ambergris', 'Musk']
    }
  },
  {
    id: '8',
    name: 'Bois Sauvage',
    brand: 'OMBRE PARFUM',
    price: 215,
    description: 'An untamed woody fragrance that captures the raw essence of wild forests.',
    image: 'https://images.unsplash.com/photo-1767458770505-4daf3e3a3f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb24lMjBsdXh1cnl8ZW58MXx8fHwxNzcxNTY5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'woody',
    gender: 'men',
    type: 'edp',
    size: '100ml',
    notes: {
      top: ['Pine', 'Juniper', 'Bergamot'],
      heart: ['Cedar', 'Cypress', 'Vetiver'],
      base: ['Oakmoss', 'Leather', 'Amber']
    }
  }
];
