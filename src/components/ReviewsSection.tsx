import { Star, CheckCircle } from 'lucide-react';
import { reviews } from '@/data/reviews';
import { motion } from 'framer-motion';

const ReviewsSection = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="font-section text-secondary text-xs uppercase tracking-[0.3em] mb-2">What Our Customers Say</p>
        <h2 className="font-heading text-h2 font-bold">Customer Reviews</h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-secondary text-secondary" />)}</div>
          <span className="font-heading font-bold text-lg">4.8/5</span>
          <span className="text-muted-foreground text-sm">from 200+ reviews</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background p-6 rounded-lg border border-border">
            <div className="flex gap-1 mb-3">{[...Array(r.rating)].map((_, j) => <Star key={j} size={14} className="fill-secondary text-secondary" />)}</div>
            <p className="text-sm text-foreground/80 font-body leading-relaxed mb-4">"{r.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-section font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
              {r.verified && (
                <span className="flex items-center gap-1 text-accent text-xs font-section"><CheckCircle size={12} /> Verified</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
