import { Link } from 'react-router-dom';

const OCCASIONS = [
  { name: 'Wedding', emoji: '💍', tint: 'bg-burgundy/10 text-burgundy' },
  { name: 'Festive', emoji: '🪔', tint: 'bg-secondary/15 text-secondary' },
  { name: 'Office', emoji: '💼', tint: 'bg-navy/10 text-navy' },
  { name: 'Casual', emoji: '☀️', tint: 'bg-emerald/10 text-emerald' },
  { name: 'Party', emoji: '🥂', tint: 'bg-burgundy/10 text-burgundy' },
  { name: 'Reception', emoji: '✨', tint: 'bg-secondary/15 text-secondary' },
];

const OccasionShop = () => (
  <section className="px-4 py-8 bg-background">
    <div className="container mx-auto">
      <div className="mb-4">
        <p className="font-section text-secondary text-[10px] uppercase tracking-[0.3em] mb-1 font-bold">Find Your Drape</p>
        <h2 className="font-heading text-xl md:text-2xl font-bold">Shop by Occasion</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {OCCASIONS.map(o => (
          <Link
            key={o.name}
            to={`/collections?filter=${encodeURIComponent(o.name)}`}
            className={`${o.tint} rounded-xl p-4 flex flex-col items-center justify-center aspect-square hover:scale-105 transition-transform shadow-sm`}
          >
            <span className="text-3xl md:text-4xl mb-1">{o.emoji}</span>
            <span className="font-section text-[11px] md:text-xs font-bold uppercase tracking-wider">{o.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default OccasionShop;
