import { Instagram } from 'lucide-react';

const InstagramCTA = () => (
  <section className="px-4 py-10 bg-background">
    <div className="container mx-auto rounded-2xl bg-gradient-to-r from-burgundy via-burgundy-dark to-burgundy text-white p-6 md:p-10 text-center shadow-luxury">
      <Instagram className="mx-auto text-secondary mb-3" size={32} />
      <p className="font-section text-secondary text-[11px] uppercase tracking-[0.3em] font-bold mb-2">Follow the Drape</p>
      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">@aivysilkbyindu</h3>
      <p className="text-white/85 text-sm md:text-base max-w-xl mx-auto mb-5">Behind the looms, styling tips, and first looks at every new arrival.</p>
      <a
        href="https://instagram.com/aivysilkbyindu"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-2.5 bg-secondary text-secondary-foreground font-section text-xs font-bold uppercase tracking-wider rounded hover:scale-105 transition-transform"
      >
        Follow on Instagram
      </a>
    </div>
  </section>
);

export default InstagramCTA;
