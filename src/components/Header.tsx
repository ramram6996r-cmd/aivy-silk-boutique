import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import logo from '@/assets/logo.jpg';

const megaMenuData = {
  'By Fabric': ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen', 'Kanjivaram', 'Banarasi'],
  'By Occasion': ['Wedding', 'Party Wear', 'Festive', 'Casual', 'Office Wear'],
  'By Price': ['Under ₹2000', '₹2000–₹5000', '₹5000–₹10000', 'Premium'],
};

const Header = () => {
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gold-gradient text-foreground text-center py-2 px-4 text-sm font-section tracking-wide">
        ✨ Free Shipping on Orders Above ₹5000 | Easy Returns Within 7 Days ✨
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-luxury' : 'bg-background'}`}>
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Aivy Silk by Indu" className="h-12 w-12 rounded-full object-cover" />
            <div className="hidden sm:block">
              <h1 className="font-heading text-lg font-bold text-primary leading-tight">Aivy Silk</h1>
              <p className="text-xs text-muted-foreground font-section tracking-widest uppercase">By Indu</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-section text-sm font-medium tracking-wide uppercase">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
              <Link to="/collections" className="flex items-center gap-1 hover:text-primary transition-colors">
                Collections <ChevronDown size={14} />
              </Link>
              {megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border border-border rounded-lg shadow-luxury p-8 min-w-[600px] animate-fade-in">
                  <div className="grid grid-cols-3 gap-8">
                    {Object.entries(megaMenuData).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="font-heading text-primary font-semibold mb-3 text-base">{category}</h3>
                        <ul className="space-y-2">
                          {items.map(item => (
                            <li key={item}>
                              <Link to={`/collections?filter=${encodeURIComponent(item)}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/collections" className="hover:text-primary transition-colors">New Arrivals</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 hover:text-primary transition-colors relative hidden sm:block">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>
              )}
            </Link>
            <button onClick={() => setCartOpen(true)} className="p-2 hover:text-primary transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-border py-4 px-4 animate-fade-in">
            <div className="container mx-auto">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input type="text" placeholder="Search for sarees, fabrics, occasions..." className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" autoFocus />
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <nav className="flex flex-col p-4 space-y-3 font-section text-sm">
              <Link to="/" onClick={() => setMobileOpen(false)} className="py-2 hover:text-primary">Home</Link>
              <Link to="/collections" onClick={() => setMobileOpen(false)} className="py-2 hover:text-primary">Collections</Link>
              <Link to="/collections" onClick={() => setMobileOpen(false)} className="py-2 hover:text-primary">New Arrivals</Link>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="py-2 hover:text-primary">Wishlist</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
