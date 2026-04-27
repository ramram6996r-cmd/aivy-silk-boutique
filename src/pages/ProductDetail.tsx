import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductBySlug, FirestoreProduct } from '@/lib/products';
import { useStore } from '@/context/StoreContext';
import { formatPrice, getProductWhatsAppUrl } from '@/lib/whatsapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, ShieldCheck, Award, Lock, MessageCircle, ShoppingBag, ChevronRight, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useStore();
  const [product, setProduct] = useState<FirestoreProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let mounted = true;
    if (!slug) return;
    setLoading(true);
    fetchProductBySlug(slug)
      .then(p => { if (mounted) setProduct(p); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center"><Loader2 className="animate-spin text-primary mx-auto" /></div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-h2">Product Not Found</h1>
          <Link to="/collections" className="text-primary underline mt-4 inline-block">Back to Collections</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const original = product.discountPrice && product.discountPrice > product.price ? product.discountPrice : undefined;
  const discount = original ? Math.round((1 - product.price / original) * 100) : 0;
  const whatsappUrl = getProductWhatsAppUrl(product.name, product.price, window.location.href);
  const cover = product.images?.[activeImage];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-section">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-primary">Collections</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image gallery */}
          <div>
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              {cover ? (
                <img src={cover} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                      <span className="text-4xl">🪷</span>
                    </div>
                    <p className="text-muted-foreground font-section uppercase tracking-widest text-sm">{product.fabric}</p>
                  </div>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {product.images.map((url, i) => (
                  <button key={url} onClick={() => setActiveImage(i)} className={`w-16 h-20 rounded overflow-hidden flex-shrink-0 border-2 ${i === activeImage ? 'border-primary' : 'border-transparent'}`}>
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="font-section text-secondary text-xs uppercase tracking-[0.3em] mb-2">{product.fabric}{product.occasion ? ` • ${product.occasion}` : ''}</p>
            <h1 className="font-heading text-h2 font-bold mb-3">{product.name}</h1>

            {product.rating ? (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.floor(product.rating || 0) ? 'fill-secondary text-secondary' : 'text-muted'} />)}</div>
                <span className="text-sm font-medium">{product.rating}</span>
                {product.reviewCount ? <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span> : null}
              </div>
            ) : null}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-heading text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {original && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(original)}</span>
                  <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-bold">-{discount}%</span>
                </>
              )}
            </div>

            {product.description && <p className="text-muted-foreground font-body leading-relaxed mb-6">{product.description}</p>}

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock ? 'bg-accent' : 'bg-destructive'}`} />
              <span className="text-sm font-section">{product.stock ? 'In Stock' : 'Out of Stock'}</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-section font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">−</button>
                <span className="px-4 py-2 border-x border-border text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted">+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button onClick={() => { for (let i = 0; i < quantity; i++) addToCart({ id: product.id, name: product.name, slug: product.slug, price: product.price, images: product.images, fabric: product.fabric }); }} className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-lg font-section font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3.5 bg-accent text-accent-foreground rounded-lg font-section font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <MessageCircle size={18} /> Buy via WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 py-6 border-t border-border">
              {[
                { icon: ShieldCheck, label: 'Authentic Handloom' },
                { icon: Award, label: 'Quality Checked' },
                { icon: Lock, label: 'Secure Checkout' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 text-xs text-muted-foreground font-section">
                  <b.icon size={14} className="text-accent" /> {b.label}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="w-full bg-muted rounded-lg">
                <TabsTrigger value="description" className="flex-1 font-section text-xs">Description</TabsTrigger>
                <TabsTrigger value="fabric" className="flex-1 font-section text-xs">Fabric & Care</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1 font-section text-xs">Shipping & Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="text-sm text-muted-foreground font-body leading-relaxed mt-4">{product.details || product.description}</TabsContent>
              <TabsContent value="fabric" className="text-sm text-muted-foreground font-body leading-relaxed mt-4">{product.care || 'Handle with care. Dry clean recommended.'}</TabsContent>
              <TabsContent value="shipping" className="text-sm text-muted-foreground font-body leading-relaxed mt-4 space-y-3">
                <p>Free shipping on orders above ₹5,000. Standard delivery: 5-7 business days. Express delivery available for metro cities.</p>
                <p className="text-xs text-muted-foreground/80">Due to the exclusive nature of our collections, returns and exchanges are not available.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
