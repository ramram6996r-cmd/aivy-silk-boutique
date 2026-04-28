import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBanners } from '@/lib/banners';
import { Sparkles } from 'lucide-react';

const FALLBACKS = [
  { id: 'f1', title: 'Festive Edit', subtitle: 'Handpicked silks for the season', discount: 'FLAT 20% OFF', ctaText: 'Shop Now', ctaLink: '/collections', bgColor: '#800020', active: true, order: 1 },
];

const OfferBanner = ({ position = 0, single = false }: { position?: number; single?: boolean }) => {
  const { data: list = [] } = useQuery({ queryKey: ['banners'], queryFn: fetchBanners });
  const active = (list.length ? list : FALLBACKS).filter(b => b.active);
  if (!active.length) return null;

  if (single) {
    const b = active[position % active.length];
    return (
      <section className="px-4 py-6">
        <div className="container mx-auto">
          <Link to={b.ctaLink || '/collections'} className="block rounded-xl overflow-hidden shadow-md group" style={{ background: b.bgColor || '#800020' }}>
            <div className="px-6 md:px-10 py-6 md:py-8 flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/15 items-center justify-center">
                  <Sparkles className="text-secondary" size={22} />
                </div>
                <div>
                  {b.discount && <p className="font-section text-secondary text-xs uppercase tracking-[0.3em] font-bold mb-1">{b.discount}</p>}
                  <h3 className="font-heading text-lg md:text-2xl font-bold leading-tight">{b.title}</h3>
                  {b.subtitle && <p className="text-white/80 text-xs md:text-sm mt-1">{b.subtitle}</p>}
                </div>
              </div>
              {b.ctaText && (
                <span className="hidden md:inline-block px-5 py-2.5 bg-secondary text-secondary-foreground rounded font-section text-xs font-bold uppercase tracking-wider group-hover:scale-105 transition-transform">
                  {b.ctaText}
                </span>
              )}
            </div>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
        {active.slice(0, 3).map(b => (
          <Link key={b.id} to={b.ctaLink || '/collections'} className="rounded-xl p-5 text-white shadow-sm hover:shadow-luxury transition-shadow" style={{ background: b.bgColor || '#800020' }}>
            {b.discount && <p className="font-section text-secondary text-[10px] uppercase tracking-[0.25em] font-bold mb-1">{b.discount}</p>}
            <h4 className="font-heading text-base md:text-lg font-bold leading-tight">{b.title}</h4>
            {b.subtitle && <p className="text-white/75 text-xs mt-1">{b.subtitle}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OfferBanner;
