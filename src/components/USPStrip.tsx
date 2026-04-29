import { Truck, ShieldCheck, Award, MessageCircle } from 'lucide-react';

const ITEMS = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹2,999' },
  { icon: ShieldCheck, title: 'Authentic Weaves', desc: '100% genuine handloom' },
  { icon: Award, title: 'Curated by Indu', desc: 'Personally handpicked' },
  { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Help in seconds' },
];

const USPStrip = () => (
  <section className="px-4 py-6 bg-muted/40 border-y border-border">
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
      {ITEMS.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon size={20} />
          </div>
          <div>
            <p className="font-section text-sm font-bold leading-tight">{title}</p>
            <p className="text-xs text-muted-foreground leading-tight">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default USPStrip;
