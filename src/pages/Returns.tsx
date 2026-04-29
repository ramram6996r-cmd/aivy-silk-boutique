import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Info } from 'lucide-react';

const Returns = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <section className="container mx-auto px-4 py-12 max-w-3xl">
      <p className="font-section text-secondary text-xs uppercase tracking-[0.3em] font-bold mb-2">Policies</p>
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Return & Exchange Policy</h1>

      <div className="rounded-xl border border-border p-6 bg-muted/30 mb-6 flex gap-3">
        <Info className="text-primary shrink-0 mt-0.5" size={20} />
        <p className="text-sm">
          As each saree and jewellery piece is curated and handpicked,
          <strong> we do not accept returns or exchanges</strong> once the order is placed.
          Please review product details carefully before purchase.
        </p>
      </div>

      <div className="space-y-5 text-sm leading-relaxed text-foreground/90">
        <div>
          <h2 className="font-heading text-lg font-bold mb-1">Before You Order</h2>
          <p>Refer to the photos, fabric details, color notes, and measurements on each product page. Reach us on WhatsApp at <strong>+91 99028 53956</strong> for video calls, additional images, or any clarifications.</p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold mb-1">Damaged or Wrong Item</h2>
          <p>In the rare case you receive a damaged or incorrect product, share an unboxing video and photos within <strong>24 hours</strong> of delivery on WhatsApp. We will arrange a replacement at no extra cost.</p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold mb-1">Order Cancellation</h2>
          <p>Orders can be cancelled only before they are dispatched. Once shipped, cancellation is not possible.</p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold mb-1">Color & Texture Note</h2>
          <p>Slight variation in color may occur due to screen settings and natural fabric properties. This is not considered a defect.</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Returns;
