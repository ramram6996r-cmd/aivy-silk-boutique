import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import BrandValues from '@/components/BrandValues';
import FeaturedProducts from '@/components/FeaturedProducts';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <HeroSlider />
    <BrandValues />
    <FeaturedProducts />

    {/* Saree Education CTA */}
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-burgundy-gradient rounded-2xl p-10 md:p-16 text-center text-primary-foreground">
          <p className="font-section text-primary-foreground/70 text-xs uppercase tracking-[0.3em] mb-3">The Art of Handloom</p>
          <h2 className="font-heading text-h2 font-bold mb-4">Discover the Legacy of Indian Weaving</h2>
          <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            From the rich Kanjivaram silks of Tamil Nadu to the intricate Banarasi brocades of Varanasi — each saree tells a story of centuries-old craftsmanship, passed down through generations of master weavers.
          </p>
          <a href="/collections" className="inline-block px-8 py-3.5 bg-secondary text-secondary-foreground font-section font-semibold text-sm uppercase tracking-wider rounded hover:bg-gold-dark transition-colors">
            Explore Our Heritage
          </a>
        </div>
      </div>
    </section>

    <ReviewsSection />
    <FAQSection />
    <Footer />

    {/* WhatsApp FAB */}
    <a href={getWhatsAppUrl('Hello! I need help with my order.')} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-luxury flex items-center justify-center hover:scale-110 transition-transform z-40">
      <MessageCircle size={26} />
    </a>
  </div>
);

export default Index;
