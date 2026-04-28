import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/products';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface Props {
  title: string;
  eyebrow?: string;
  filter?: 'bestseller' | 'new' | 'discounted' | 'all';
  limit?: number;
  viewAllLink?: string;
}

const MarketplaceGrid = ({ title, eyebrow, filter = 'all', limit = 10, viewAllLink = '/collections' }: Props) => {
  const { data: list = [], isLoading } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  let products = list;
  if (filter === 'bestseller') products = list.filter(p => p.badge === 'bestseller');
  else if (filter === 'new') products = list.filter(p => p.badge === 'new');
  else if (filter === 'discounted') products = list.filter(p => p.discountPrice && p.discountPrice > p.price);
  products = products.slice(0, limit);

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-5">
          <div>
            {eyebrow && <p className="font-section text-secondary text-[10px] uppercase tracking-[0.3em] mb-1 font-bold">{eyebrow}</p>}
            <h2 className="font-heading text-xl md:text-2xl font-bold">{title}</h2>
          </div>
          <Link to={viewAllLink} className="text-xs md:text-sm font-section font-semibold text-primary hover:underline uppercase tracking-wider">View all →</Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketplaceGrid;
