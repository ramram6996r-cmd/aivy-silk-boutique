import { motion } from 'framer-motion';
import { Sparkles, Gift, Truck } from 'lucide-react';

const pillars = [
  { icon: Sparkles, title: 'Authentic Handloom', desc: 'Every saree is sourced directly from master weavers across India.' },
  { icon: Gift, title: 'Curated Collections', desc: 'Hand-picked selections for every occasion, style, and celebration.' },
  { icon: Truck, title: 'Doorstep Delivery', desc: 'Safe and swift delivery to your doorstep, anywhere in India.' },
];

const BrandValues = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <p.icon size={28} className="text-secondary" />
            </div>
            <h3 className="font-heading text-h3 font-semibold mb-2">{p.title}</h3>
            <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BrandValues;
