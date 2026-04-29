import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <p className="font-section text-secondary text-xs uppercase tracking-[0.3em] font-bold mb-2">Get in Touch</p>
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Questions about a saree, custom orders, or styling advice — we're here to help. Reach us anytime via WhatsApp for the fastest response.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border p-6 bg-card">
          <h2 className="font-heading text-lg font-bold mb-4">Reach Us Directly</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3"><Phone className="text-primary mt-0.5" size={18} /> <span><strong>+91 99028 53956</strong><br /><span className="text-muted-foreground text-xs">Calls & WhatsApp</span></span></li>
            <li className="flex items-start gap-3"><Mail className="text-primary mt-0.5" size={18} /> <span><strong>info@aivysilkbyindu.com</strong><br /><span className="text-muted-foreground text-xs">We reply within 24 hours</span></span></li>
            <li className="flex items-start gap-3"><Clock className="text-primary mt-0.5" size={18} /> <span><strong>Mon – Sat</strong><br /><span className="text-muted-foreground text-xs">10:00 AM – 7:00 PM IST</span></span></li>
            <li className="flex items-start gap-3"><MapPin className="text-primary mt-0.5" size={18} /> <span><strong>India</strong><br /><span className="text-muted-foreground text-xs">Shipping pan-India</span></span></li>
          </ul>
        </div>

        <div className="rounded-xl border border-border p-6 bg-gradient-to-br from-primary to-primary/80 text-white flex flex-col justify-between">
          <div>
            <MessageCircle className="text-secondary mb-3" size={32} />
            <h2 className="font-heading text-xl font-bold mb-2">Chat on WhatsApp</h2>
            <p className="text-white/85 text-sm mb-6">The fastest way to reach Indu and the team. Get instant replies on availability, prices, and styling.</p>
          </div>
          <a
            href={getWhatsAppUrl('Hello! I have a question about Aivy Silk.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-fit px-6 py-3 bg-secondary text-secondary-foreground font-section text-xs font-bold uppercase tracking-wider rounded hover:scale-105 transition-transform"
          >
            Open WhatsApp Chat
          </a>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Contact;
