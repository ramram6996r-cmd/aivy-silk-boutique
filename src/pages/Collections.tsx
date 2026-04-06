import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, fabrics, occasions } from '@/data/products';
import { X, SlidersHorizontal } from 'lucide-react';

const Collections = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || '';
  const [selectedFabric, setSelectedFabric] = useState(fabrics.includes(initialFilter) ? initialFilter : '');
  const [selectedOccasion, setSelectedOccasion] = useState(occasions.includes(initialFilter) ? initialFilter : '');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedFabric) result = result.filter(p => p.fabric === selectedFabric);
    if (selectedOccasion) result = result.filter(p => p.occasion === selectedOccasion);
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    return result;
  }, [selectedFabric, selectedOccasion, sortBy]);

  const activeFilters = [selectedFabric, selectedOccasion].filter(Boolean);

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
                <button onClick={() => { if (f === selectedFabric) setSelectedFabric(''); else setSelectedOccasion(''); }}><X size={12} /></button>
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
              <h4 className="font-section font-semibold text-sm uppercase tracking-wider mb-3">Fabric</h4>
              <div className="space-y-2">
                {fabrics.map(f => (
                  <button key={f} onClick={() => setSelectedFabric(selectedFabric === f ? '' : f)} className={`block w-full text-left px-3 py-2 rounded text-sm font-body transition-colors ${selectedFabric === f ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-section font-semibold text-sm uppercase tracking-wider mb-3">Occasion</h4>
              <div className="space-y-2">
                {occasions.map(o => (
                  <button key={o} onClick={() => setSelectedOccasion(selectedOccasion === o ? '' : o)} className={`block w-full text-left px-3 py-2 rounded text-sm font-body transition-colors ${selectedOccasion === o ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} products</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-section">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collections;
