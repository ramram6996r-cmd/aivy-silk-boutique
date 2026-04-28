import { Link } from 'react-router-dom';

const TILES = [
  { name: 'Kanjivaram', img: '🌺', color: 'from-burgundy/90 to-burgundy-dark' },
  { name: 'Banarasi', img: '✨', color: 'from-gold-dark to-gold' },
  { name: 'Silk', img: '🪷', color: 'from-emerald to-emerald/80' },
  { name: 'Cotton', img: '🌿', color: 'from-navy to-navy/80' },
  { name: 'Designer', img: '💎', color: 'from-burgundy to-burgundy/80' },
  { name: 'Jewelry', img: '👑', color: 'from-gold to-gold-dark' },
];

const CategoryTiles = () => (
  <section className="px-4 py-6 bg-background">
    <div className="container mx-auto">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {TILES.map(t => (
          <Link
            key={t.name}
            to={`/collections?category=${encodeURIComponent(t.name)}`}
            className={`group rounded-xl bg-gradient-to-br ${t.color} aspect-square flex flex-col items-center justify-center text-white text-center p-2 hover:scale-105 transition-transform shadow-sm hover:shadow-luxury`}
          >
            <span className="text-3xl md:text-4xl mb-1">{t.img}</span>
            <span className="font-section text-[10px] md:text-xs uppercase tracking-wider font-semibold">{t.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryTiles;
