import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/products';
import { CATEGORIES, getSubcategories } from '@/data/categories';
import { X, SlidersHorizontal, Loader2 } from 'lucide-react';

const Collections = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || '';
  const { data: products = [], isLoading: loading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialFilter);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedSubcategory) {
      result = result.filter(p =>
        p.subcategory === selectedSubcategory ||
        p.fabric === selectedSubcategory ||
        p.occasion === selectedSubcategory,
      );
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    return result;
  }, [products, selectedCategory, selectedSubcategory, sortBy]);

  const activeFilters = [selectedCategory, selectedSubcategory].filter(Boolean);
  const subOptions = selectedCategory ? getSubcategories(selectedCategory) : [];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <p className="font-section text-secondary text-xs uppercase tracking-[0.3em] mb-2">Our Collection</p>
          <h1 className="font-heading text-h2 font-bold">Saree Collections</h1>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-section">
              <SlidersHorizontal size={14} /> Filters
            </button>
            {activeFilters.map(f => (
              <span key={f} className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-section">
                {f}
                <button onClick={() => { if (f === selectedCategory) setSelectedCategory(''); else setSelectedSubcategory(''); }}><X size={12} /></button>
              </span>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 border border-border rounded-lg text-sm font-section bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="relevance">Sort: Relevance</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 flex-shrink-0 space-y-6`}>
            <div>
              <h4 className="font-section font-semibold text-sm uppercase tracking-wider mb-3">Category</h4>
              <div className="space-y-2">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => { setSelectedCategory(selectedCategory === c ? '' : c); setSelectedSubcategory(''); }} className={`block w-full text-left px-3 py-2 rounded text-sm font-body transition-colors ${selectedCategory === c ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            {subOptions.length > 0 && (
              <div>
                <h4 className="font-section font-semibold text-sm uppercase tracking-wider mb-3">Type</h4>
                <div className="space-y-2">
                  {subOptions.map(s => (
                    <button key={s} onClick={() => setSelectedSubcategory(selectedSubcategory === s ? '' : s)} className={`block w-full text-left px-3 py-2 rounded text-sm font-body transition-colors ${selectedSubcategory === s ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">{filtered.length} products</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground font-section">No products found. {products.length === 0 ? 'Add products from the admin panel to get started.' : 'Try adjusting your filters.'}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collections;
