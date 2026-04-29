import { Link } from 'react-router-dom';
import wedding from '@/assets/occ-wedding.jpg';
import festive from '@/assets/occ-festive.jpg';
import office from '@/assets/occ-office.jpg';
import casual from '@/assets/occ-casual.jpg';
import party from '@/assets/occ-party.jpg';
import reception from '@/assets/occ-reception.jpg';

const OCCASIONS = [
  { name: 'Wedding', img: wedding },
  { name: 'Festive', img: festive },
  { name: 'Office', img: office },
  { name: 'Casual', img: casual },
  { name: 'Party', img: party },
  { name: 'Reception', img: reception },
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
            className="group relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-luxury transition-all"
          >
            <img
              src={o.img}
              alt={o.name}
              loading="lazy"
              width={512}
              height={512}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
              <span className="font-section text-[11px] md:text-xs font-bold uppercase tracking-wider text-white">
                {o.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default OccasionShop;
