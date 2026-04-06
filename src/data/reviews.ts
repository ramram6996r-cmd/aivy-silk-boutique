export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  { id: '1', name: 'Priya Sharma', city: 'Mumbai', rating: 5, text: 'Absolutely stunning Kanjivaram saree! The quality is exceptional and the gold zari work is breathtaking. Worth every penny.', date: '2024-12-15', verified: true },
  { id: '2', name: 'Anita Reddy', city: 'Hyderabad', rating: 5, text: 'Ordered for my daughter\'s wedding. The saree was even more beautiful in person. Aivy Silk has become my go-to boutique!', date: '2024-11-28', verified: true },
  { id: '3', name: 'Meera Krishnan', city: 'Chennai', rating: 4, text: 'Beautiful cotton handloom sarees at great prices. Very comfortable for daily wear. Quick delivery through WhatsApp ordering!', date: '2024-11-10', verified: true },
  { id: '4', name: 'Deepika Nair', city: 'Bangalore', rating: 5, text: 'The Banarasi collection is to die for! Personal attention from Indu madam makes the experience truly special.', date: '2024-10-22', verified: true },
  { id: '5', name: 'Kavitha Menon', city: 'Kochi', rating: 5, text: 'I\'ve ordered multiple times and every single saree has exceeded my expectations. Authentic handloom quality guaranteed.', date: '2024-10-05', verified: true },
];
