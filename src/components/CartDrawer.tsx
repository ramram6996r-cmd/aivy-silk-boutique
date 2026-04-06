import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice, getCartWhatsAppUrl } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal } = useStore();

  const handleWhatsAppCheckout = () => {
    const items = cart.map(i => ({ name: i.product.name, price: i.product.price, quantity: i.quantity }));
    window.open(getCartWhatsAppUrl(items), '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/50 z-50" onClick={() => setCartOpen(false)} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-luxury flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-heading text-lg font-semibold">Shopping Bag</h2>
                <span className="text-sm text-muted-foreground">({cart.length})</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:text-primary transition-colors"><X size={20} /></button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-section">Your bag is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-20 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center text-xs text-muted-foreground font-section">Saree</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-sm font-semibold truncate">{item.product.name}</h4>
                      <p className="text-sm text-primary font-semibold mt-1">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted"><Minus size={14} /></button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted"><Plus size={14} /></button>
                        <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-section font-semibold">Subtotal</span>
                  <span className="font-heading text-xl font-bold text-primary">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Free shipping on orders above ₹5,000</p>
                <button onClick={handleWhatsAppCheckout} className="w-full py-3.5 bg-accent text-accent-foreground rounded-lg font-section font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <MessageCircle size={18} /> Checkout via WhatsApp
                </button>
                <button onClick={() => setCartOpen(false)} className="w-full py-3 border border-border rounded-lg font-section text-sm font-medium hover:bg-muted transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
