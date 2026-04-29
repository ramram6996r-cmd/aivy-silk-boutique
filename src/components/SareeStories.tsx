import { Link } from 'react-router-dom';
import kanjivaram from '@/assets/cat-kanjivaram.jpg';
import banarasi from '@/assets/cat-banarasi.jpg';
import cotton from '@/assets/cat-cotton.jpg';
import bridal from '@/assets/cat-bridal.jpg';

const STORIES = [
  {
    img: kanjivaram,
    name: 'Kanjivaram Silk',
    tag: 'Heirloom of the South',
    why: 'Woven on pure mulberry silk with real zari, every Kanjivaram is a piece your daughter will inherit.',
    psych: 'Worn by 9 out of 10 South Indian brides — a symbol of prosperity that never loses value.',
    to: '/collections?filter=Kanjivaram',
  },
  {
    img: banarasi,
    name: 'Banarasi Silk',
    tag: 'Mughal Royalty Reborn',
    why: 'Hand-woven in the lanes of Varanasi with intricate brocade — a single saree takes 15–30 days to weave.',
    psych: 'The drape that turns heads at every reception. Felt luxurious, looks priceless.',
    to: '/collections?filter=Banarasi',
  },
  {
    img: cotton,
    name: 'Handloom Cotton',
    tag: 'Effortless Everyday Grace',
    why: 'Breathable, light, and ethically woven by artisans — perfect for Indian summers and long workdays.',
    psych: 'Comfort that quietly says "I have refined taste" — minimal, elegant, unforgettable.',
    to: '/collections?filter=Cotton',
  },
  {
    img: bridal,
    name: 'Bridal Couture',
    tag: 'Your Once-in-a-Lifetime Drape',
    why: 'Crafted with heavy zari, statement borders, and rich palettes designed to photograph beautifully.',
    psych: 'You only get married once — wear the saree your future self will thank you for.',
    to: '/collections?filter=Wedding',
  },
];

const SareeStories = () => (
  <section className="px-4 py-12 bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <p className="font-section text-secondary text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">
          The Stories Behind the Weaves
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-burgundy">
          Best of Our Sarees
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
          Every drape has a story. Discover what makes each weave a treasure worth owning.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STORIES.map(s => (
          <Link
            key={s.name}
            to={s.to}
            className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-luxury transition-all border border-border/50"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-section text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">
                  {s.tag}
                </p>
                <h3 className="font-heading text-lg font-bold">{s.name}</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="font-section text-[10px] uppercase tracking-wider text-burgundy font-bold mb-1">
                  Why It's Special
                </p>
                <p className="text-xs text-foreground/80 leading-relaxed">{s.why}</p>
              </div>
              <div className="pt-2 border-t border-border/50">
                <p className="font-section text-[10px] uppercase tracking-wider text-emerald font-bold mb-1">
                  ✦ Why You'll Love It
                </p>
                <p className="text-xs text-muted-foreground italic leading-relaxed">{s.psych}</p>
              </div>
              <span className="inline-block text-xs font-section font-bold text-secondary group-hover:underline">
                Explore Collection →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default SareeStories;
