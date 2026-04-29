import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import heroKanjivaram from '@/assets/hero-kanjivaram.jpg';
import heroBridal from '@/assets/hero-bridal.jpg';
import heroCotton from '@/assets/hero-cotton.jpg';
import heroBanarasi from '@/assets/hero-banarasi.jpg';
import heroNew from '@/assets/hero-newarrivals.jpg';

const slides = [
  { title: 'Kanjivaram Elegance', subtitle: 'Handwoven traditions from Tamil Nadu', cta: 'Explore Collection', link: '/collections?filter=Silk', image: heroKanjivaram },
  { title: 'Bridal Collection', subtitle: 'Your dream wedding saree awaits', cta: 'Shop Bridal', link: '/collections?filter=Wedding', image: heroBridal },
  { title: 'Everyday Cotton', subtitle: 'Comfort meets elegance for daily wear', cta: 'Shop Cotton', link: '/collections?filter=Cotton', image: heroCotton },
  { title: 'Banarasi Heritage', subtitle: 'Centuries of weaving excellence', cta: 'Discover Banarasi', link: '/collections?filter=Silk', image: heroBanarasi },
  { title: 'New Arrivals', subtitle: 'Freshly curated for the season', cta: 'View New Arrivals', link: '/collections', image: heroNew },
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
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
            loading={current === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center justify-center text-center px-4 z-10">
        <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="font-section text-background/80 text-sm uppercase tracking-[0.3em] mb-4">Aivy Silk by Indu</p>
          <h2 className="font-heading text-h1 md:text-[4.5rem] text-background font-bold leading-tight mb-4 drop-shadow-lg">{slides[current].title}</h2>
          <p className="font-body text-background/90 text-lg md:text-xl mb-8 max-w-lg mx-auto drop-shadow-md">{slides[current].subtitle}</p>
          <Link to={slides[current].link} className="inline-block px-8 py-3.5 bg-background text-foreground font-section font-semibold text-sm uppercase tracking-wider rounded hover:bg-secondary hover:text-secondary-foreground transition-colors">
            {slides[current].cta}
          </Link>
        </motion.div>
      </div>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors z-10"><ChevronLeft size={20} /></button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors z-10"><ChevronRight size={20} /></button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-background' : 'w-2 bg-background/40'}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
