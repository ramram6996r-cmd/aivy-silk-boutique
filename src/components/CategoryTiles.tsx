import { Link } from 'react-router-dom';
import catKanjivaram from '@/assets/cat-kanjivaram.jpg';
import catBanarasi from '@/assets/cat-banarasi.jpg';
import catSilk from '@/assets/cat-silk.jpg';
import catCotton from '@/assets/cat-cotton.jpg';
import catDesigner from '@/assets/cat-designer.jpg';
import catBridal from '@/assets/cat-bridal.jpg';
import catJewellery from '@/assets/cat-jewellery.jpg';

const SAREES = [
  { name: 'Kanjivaram', desc: 'Heritage silk, woven gold borders', img: catKanjivaram },
  { name: 'Banarasi', desc: 'Royal brocade from Varanasi', img: catBanarasi },
  { name: 'Pure Silk', desc: 'Lustrous temple-border classics', img: catSilk },
  { name: 'Cotton', desc: 'Breezy, breathable everyday drapes', img: catCotton },
  { name: 'Designer', desc: 'Modern embroidery, festive ready', img: catDesigner },
  { name: 'Bridal', desc: 'Statement reds for your big day', img: catBridal },
];

const Card = ({ name, desc, img }: { name: string; desc: string; img: string }) => (
  <Link
    to={`/collections?category=${encodeURIComponent(name)}`}
    className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-luxury transition-all"
  >
    <div className="aspect-[4/5] overflow-hidden bg-muted">
      <img
        src={img}
        alt={`${name} sarees`}
        loading="lazy"
        width={768}
        height={960}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
      <h3 className="font-heading text-base md:text-lg font-bold leading-tight">{name}</h3>
      <p className="text-[11px] md:text-xs text-white/85 mt-0.5 leading-snug">{desc}</p>
    </div>
  </Link>
);

const CategoryTiles = () => (
  <section className="px-4 py-10 bg-background">
    <div className="container mx-auto">
      {/* Sarees */}
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="font-section text-secondary text-[10px] uppercase tracking-[0.3em] mb-1 font-bold">The Wardrobe</p>
          <h2 className="font-heading text-xl md:text-2xl font-bold">Shop Sarees by Weave</h2>
        </div>
        <Link to="/collections" className="text-xs font-section font-semibold text-primary hover:underline uppercase tracking-wider">View all →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {SAREES.map(c => <Card key={c.name} {...c} />)}
      </div>

      {/* Jewellery */}
      <div className="mt-12 mb-3 flex items-end justify-between">
        <div>
          <p className="font-section text-secondary text-[10px] uppercase tracking-[0.3em] mb-1 font-bold">Adorn Yourself</p>
          <h2 className="font-heading text-xl md:text-2xl font-bold">Jewellery Collection</h2>
        </div>
        <Link to="/collections?category=Jewellery" className="text-xs font-section font-semibold text-primary hover:underline uppercase tracking-wider">View all →</Link>
      </div>
      <Link
        to="/collections?category=Jewellery"
        className="group relative overflow-hidden rounded-xl block shadow-sm hover:shadow-luxury transition-all"
      >
        <div className="aspect-[16/6] overflow-hidden bg-muted">
          <img
            src={catJewellery}
            alt="Traditional Indian jewellery"
            loading="lazy"
            width={1920}
            height={720}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-6 md:p-12 text-white max-w-xl">
          <p className="font-section text-secondary text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Handcrafted</p>
          <h3 className="font-heading text-2xl md:text-4xl font-bold mb-2">Temple Gold & Stone Sets</h3>
          <p className="text-white/85 text-sm md:text-base mb-4">Necklaces, jhumkas, and bridal sets curated to pair with our sarees.</p>
          <span className="inline-block w-fit px-5 py-2.5 bg-secondary text-secondary-foreground rounded font-section text-xs font-bold uppercase tracking-wider">Explore Jewellery</span>
        </div>
      </Link>
    </div>
  </section>
);

export default CategoryTiles;
