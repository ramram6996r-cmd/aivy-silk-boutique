import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import USPStrip from '@/components/USPStrip';
import CategoryTiles from '@/components/CategoryTiles';
import OccasionShop from '@/components/OccasionShop';
import OfferBanner from '@/components/OfferBanner';
import MarketplaceGrid from '@/components/MarketplaceGrid';
import SareeStories from '@/components/SareeStories';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const Index = () => (
  <div className="min-h-screen bg-muted/20">
    <Header />
    <HeroSlider />

    {/* Trust strip */}
    <USPStrip />

    {/* Sarees by weave + Jewellery banner with images & descriptions */}
    <CategoryTiles />

    {/* Single top deal banner */}
    <OfferBanner single position={0} />

    {/* Trending / Best sellers */}
    <MarketplaceGrid title="Trending Now" eyebrow="Best Sellers" filter="bestseller" limit={10} />

    {/* Shop by occasion */}
    <OccasionShop />

    {/* Deals of the day */}
    <MarketplaceGrid title="Deals of the Day" eyebrow="Limited Time" filter="discounted" limit={10} />

    {/* New arrivals */}
    <MarketplaceGrid title="New Arrivals" eyebrow="Just In" filter="new" limit={10} />

    {/* All products */}
    <MarketplaceGrid title="Explore All" eyebrow="Full Collection" filter="all" limit={10} />

    {/* Best of our sarees — story cards */}
    <SareeStories />

    <ReviewsSection />
    <FAQSection />
    <Footer />

    <a href={getWhatsAppUrl('Hello! I need help with my order.')} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-luxury flex items-center justify-center hover:scale-110 transition-transform z-40">
      <MessageCircle size={26} />
    </a>
  </div>
);

export default Index;
