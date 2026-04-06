export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  fabric: string;
  occasion: string;
  color: string;
  description: string;
  details: string;
  care: string;
  images: string[];
  badge?: 'new' | 'bestseller' | 'limited';
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Kanjivaram Silk Saree',
    slug: 'royal-kanjivaram-silk',
    price: 12500,
    originalPrice: 18000,
    fabric: 'Silk',
    occasion: 'Wedding',
    color: 'Maroon',
    description: 'Exquisite Kanjivaram silk saree with intricate gold zari work, perfect for bridal occasions and grand celebrations.',
    details: 'Pure Kanjivaram silk with real gold zari. Handwoven by master artisans from Tamil Nadu. Includes unstitched blouse piece.',
    care: 'Dry clean only. Store in muslin cloth. Avoid direct sunlight.',
    images: [],
    badge: 'bestseller',
    inStock: true,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: '2',
    name: 'Banarasi Brocade Silk Saree',
    slug: 'banarasi-brocade-silk',
    price: 8500,
    originalPrice: 12000,
    fabric: 'Silk',
    occasion: 'Wedding',
    color: 'Red',
    description: 'Stunning Banarasi brocade saree featuring traditional motifs and rich gold zari borders.',
    details: 'Pure Banarasi silk with brocade weaving. Handcrafted in Varanasi. Includes matching blouse piece.',
    care: 'Dry clean only. Store flat in a cool, dry place.',
    images: [],
    badge: 'new',
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Elegant Cotton Handloom Saree',
    slug: 'elegant-cotton-handloom',
    price: 2800,
    originalPrice: 3500,
    fabric: 'Cotton',
    occasion: 'Casual',
    color: 'White',
    description: 'Lightweight and breathable cotton handloom saree, ideal for everyday elegance and office wear.',
    details: 'Pure handloom cotton with temple border design. Woven by traditional artisans. Includes blouse piece.',
    care: 'Hand wash in cold water. Mild detergent. Dry in shade.',
    images: [],
    inStock: true,
    rating: 4.6,
    reviewCount: 56,
  },
  {
    id: '4',
    name: 'Chiffon Party Wear Saree',
    slug: 'chiffon-party-wear',
    price: 4200,
    originalPrice: 5500,
    fabric: 'Chiffon',
    occasion: 'Party Wear',
    color: 'Navy',
    description: 'Flowing chiffon saree with sequin work and elegant drape, perfect for cocktail parties and evening events.',
    details: 'Premium chiffon with sequin and thread embroidery. Pre-stitched blouse included.',
    care: 'Dry clean recommended. Handle with care.',
    images: [],
    badge: 'new',
    inStock: true,
    rating: 4.7,
    reviewCount: 43,
  },
  {
    id: '5',
    name: 'Linen Handwoven Saree',
    slug: 'linen-handwoven',
    price: 3200,
    fabric: 'Linen',
    occasion: 'Office Wear',
    color: 'Beige',
    description: 'Minimalist linen saree with subtle geometric patterns, perfect for the modern working woman.',
    details: 'Pure handwoven linen with contrast border. Lightweight and comfortable. Includes blouse piece.',
    care: 'Hand wash or gentle machine wash. Iron while damp.',
    images: [],
    inStock: true,
    rating: 4.5,
    reviewCount: 31,
  },
  {
    id: '6',
    name: 'Georgette Designer Saree',
    slug: 'georgette-designer',
    price: 5800,
    originalPrice: 7500,
    fabric: 'Georgette',
    occasion: 'Festive',
    color: 'Green',
    description: 'Luxurious georgette saree with heavy embroidery work, a perfect choice for festive celebrations.',
    details: 'Pure georgette with stone and resham work. Designer pallu with rich detailing. Includes stitched blouse.',
    care: 'Dry clean only. Store carefully.',
    images: [],
    badge: 'bestseller',
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: '7',
    name: 'Bridal Kanjivaram Gold Saree',
    slug: 'bridal-kanjivaram-gold',
    price: 25000,
    originalPrice: 35000,
    fabric: 'Silk',
    occasion: 'Wedding',
    color: 'Gold',
    description: 'The ultimate bridal Kanjivaram saree with heavy gold zari and traditional temple motifs.',
    details: 'Premium Kanjivaram silk with 60% real gold zari. Certified handloom product. Heritage weaving.',
    care: 'Professional dry clean only. Store in silk bag.',
    images: [],
    badge: 'limited',
    inStock: true,
    rating: 5.0,
    reviewCount: 34,
  },
  {
    id: '8',
    name: 'Tussar Silk Printed Saree',
    slug: 'tussar-silk-printed',
    price: 4500,
    fabric: 'Silk',
    occasion: 'Casual',
    color: 'Yellow',
    description: 'Natural tussar silk saree with hand-painted Madhubani art, celebrating Indian folk traditions.',
    details: 'Pure tussar silk with hand-painted motifs. Each piece is unique. Includes matching blouse material.',
    care: 'Dry clean only. Keep away from moisture.',
    images: [],
    inStock: true,
    rating: 4.7,
    reviewCount: 22,
  },
];

export const fabrics = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen'];
export const occasions = ['Wedding', 'Party Wear', 'Festive', 'Casual', 'Office Wear'];
export const colors = ['Maroon', 'Red', 'White', 'Navy', 'Beige', 'Green', 'Gold', 'Yellow'];
