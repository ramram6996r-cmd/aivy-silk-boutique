import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const featured = products.filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 4);

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="font-section text-secondary text-xs uppercase tracking-[0.3em] mb-2">Handpicked for You</p>
          <h2 className="font-heading text-h2 font-bold">Featured Collection</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/collections" className="inline-block px-8 py-3 border-2 border-primary text-primary font-section font-semibold text-sm uppercase tracking-wider rounded hover:bg-primary hover:text-primary-foreground transition-colors">
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
