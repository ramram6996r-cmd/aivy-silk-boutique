export const WHATSAPP_NUMBER = '919902853956';

export const getWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const getProductWhatsAppUrl = (name: string, price: number, url: string) =>
  getWhatsAppUrl(`Hello, I want to order:\nProduct: ${name}\nPrice: ₹${price.toLocaleString('en-IN')}\nLink: ${url}`);

export const getCartWhatsAppUrl = (items: { name: string; price: number; quantity: number }[]) => {
  const lines = items.map(i => `• ${i.name} x${i.quantity} — ₹${(i.price * i.quantity).toLocaleString('en-IN')}`);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return getWhatsAppUrl(`Hello, I'd like to order:\n\n${lines.join('\n')}\n\nTotal: ₹${total.toLocaleString('en-IN')}`);
};

export const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;
