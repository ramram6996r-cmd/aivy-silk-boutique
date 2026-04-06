import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { title: 'Kanjivaram Elegance', subtitle: 'Handwoven traditions from Tamil Nadu', cta: 'Explore Collection', link: '/collections?filter=Silk', bg: 'from-primary/90 to-primary/70' },
  { title: 'Bridal Collection', subtitle: 'Your dream wedding saree awaits', cta: 'Shop Bridal', link: '/collections?filter=Wedding', bg: 'from-accent/90 to-accent/70' },
  { title: 'Everyday Cotton', subtitle: 'Comfort meets elegance for daily wear', cta: 'Shop Cotton', link: '/collections?filter=Cotton', bg: 'from-navy/90 to-navy/70' },
  { title: 'Banarasi Heritage', subtitle: 'Centuries of weaving excellence', cta: 'Discover Banarasi', link: '/collections?filter=Silk', bg: 'from-secondary/90 to-gold-dark/90' },
  { title: 'New Arrivals', subtitle: 'Freshly curated for the season', cta: 'View New Arrivals', link: '/collections', bg: 'from-primary/80 to-accent/70' },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(p => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent(p => (p + 1) % slides.length);

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].bg}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3))]" />
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="font-section text-background/80 text-sm uppercase tracking-[0.3em] mb-4">Aivy Silk by Indu</p>
          <h2 className="font-heading text-h1 md:text-[4.5rem] text-background font-bold leading-tight mb-4">{slides[current].title}</h2>
          <p className="font-body text-background/80 text-lg md:text-xl mb-8 max-w-lg mx-auto">{slides[current].subtitle}</p>
          <Link to={slides[current].link} className="inline-block px-8 py-3.5 bg-background text-foreground font-section font-semibold text-sm uppercase tracking-wider rounded hover:bg-secondary hover:text-secondary-foreground transition-colors">
            {slides[current].cta}
          </Link>
        </motion.div>
      </div>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors"><ChevronLeft size={20} /></button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors"><ChevronRight size={20} /></button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'w-8 bg-background' : 'bg-background/40'}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
