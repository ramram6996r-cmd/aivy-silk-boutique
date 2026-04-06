import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/whatsapp';
import { motion } from 'framer-motion';

const badgeStyles: Record<string, string> = {
  new: 'bg-accent text-accent-foreground',
  bestseller: 'bg-primary text-primary-foreground',
  limited: 'bg-secondary text-secondary-foreground',
};

const badgeLabels: Record<string, string> = {
  new: 'New',
  bestseller: 'Best Seller',
  limited: 'Limited Edition',
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-luxury transition-shadow duration-300"
    >
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-[3/4] bg-muted overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="text-2xl">🪷</span>
            </div>
            <p className="text-xs text-muted-foreground font-section uppercase tracking-wider">{product.fabric}</p>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
            <button onClick={(e) => { e.preventDefault(); addToCart(product); }} className="w-10 h-10 rounded-full bg-background shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <ShoppingBag size={16} />
            </button>
            <Link to={`/product/${product.slug}`} className="w-10 h-10 rounded-full bg-background shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <Eye size={16} />
            </Link>
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-section font-bold uppercase tracking-wider ${badgeStyles[product.badge]}`}>
            {badgeLabels[product.badge]}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-destructive text-destructive-foreground rounded text-[10px] font-bold">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Wishlist */}
      <button onClick={() => toggleWishlist(product.id)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-background" style={discount > 0 ? { top: '2.5rem' } : {}}>
        <Heart size={14} className={isWishlisted ? 'fill-primary text-primary' : 'text-foreground/60'} />
      </button>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] text-muted-foreground font-section uppercase tracking-widest mb-1">{product.fabric} • {product.occasion}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-heading text-sm font-semibold leading-tight hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <Star size={12} className="fill-secondary text-secondary" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-heading font-bold text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
