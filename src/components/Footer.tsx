import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/90">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-background mb-4">Aivy Silk</h3>
            <p className="text-sm text-background/60 mb-4 font-body leading-relaxed">
              Timeless Elegance, Woven with Tradition. Discover authentic handloom sarees curated with love.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Facebook size={16} />
              </a>
              <a href={getWhatsAppUrl('Hello, I have a query.')} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-section text-sm font-semibold uppercase tracking-widest text-background mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/collections" className="hover:text-secondary transition-colors">All Collections</Link></li>
              <li><Link to="/collections?filter=new" className="hover:text-secondary transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections?filter=bestseller" className="hover:text-secondary transition-colors">Best Sellers</Link></li>
              <li><Link to="/collections?filter=Wedding" className="hover:text-secondary transition-colors">Bridal Collection</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-section text-sm font-semibold uppercase tracking-widest text-background mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/#faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
              <li><Link to="/#faq" className="hover:text-secondary transition-colors">Shipping Info</Link></li>
              <li><Link to="/#faq" className="hover:text-secondary transition-colors">Return Policy</Link></li>
              <li><Link to="/#faq" className="hover:text-secondary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-section text-sm font-semibold uppercase tracking-widest text-background mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-center gap-2"><Phone size={14} /> +91 99028 53956</li>
              <li className="flex items-center gap-2"><Mail size={14} /> info@aivysilkbyindu.com</li>
              <li className="text-xs">Mon–Sat | 10 AM – 7 PM IST</li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-background/50 mb-2 font-section uppercase tracking-wider">Newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-background/10 border border-background/20 rounded text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-secondary" />
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded text-sm font-section font-semibold hover:bg-gold-dark transition-colors">Join</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-xs text-background/40">
          © 2024 Aivy Silk by Indu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
