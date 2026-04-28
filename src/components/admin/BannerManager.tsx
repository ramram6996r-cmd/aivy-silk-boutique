import { useEffect, useState, FormEvent } from 'react';
import { Banner, fetchBanners, createBanner, updateBanner, deleteBanner } from '@/lib/banners';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';

const empty = {
  title: '',
  subtitle: '',
  discount: '',
  ctaText: 'Shop Now',
  ctaLink: '/collections',
  bgColor: '#800020',
  active: true,
  order: 1,
};

const PRESET_COLORS = ['#800020', '#C9A251', '#0F4C3A', '#1A2238', '#B8475A', '#8B6F47'];

const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      setBanners(await fetchBanners());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setError(''); setShowForm(true); };
  const openEdit = (b: Banner) => {
    setEditing(b);
    setForm({
      title: b.title, subtitle: b.subtitle || '', discount: b.discount || '',
      ctaText: b.ctaText || 'Shop Now', ctaLink: b.ctaLink || '/collections',
      bgColor: b.bgColor || '#800020', active: b.active, order: b.order,
    });
    setError('');
    setShowForm(true);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const data = { ...form, order: Number(form.order) };
      if (editing) await updateBanner(editing.id, data);
      else await createBanner(data);
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    await deleteBanner(id);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold">Offer Banners</h2>
          <p className="text-sm text-muted-foreground font-section">{banners.length} total · shown on homepage</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-section text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
      ) : banners.length === 0 ? (
        <div className="bg-background border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground font-section">No banners yet. Add offer banners to show on the homepage.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map(b => (
            <div key={b.id} className="rounded-lg overflow-hidden border border-border bg-background">
              <div className="p-5 flex items-center justify-between gap-4 text-white" style={{ background: b.bgColor || '#800020' }}>
                <div>
                  {b.discount && <p className="font-section text-secondary text-[10px] uppercase tracking-[0.3em] font-bold mb-1">{b.discount}</p>}
                  <h4 className="font-heading text-lg font-bold">{b.title}</h4>
                  {b.subtitle && <p className="text-white/80 text-xs mt-1">{b.subtitle}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(b)} className="p-2 bg-white/20 hover:bg-white/30 rounded"><Pencil size={14} /></button>
                  <button onClick={() => remove(b.id)} className="p-2 bg-white/20 hover:bg-destructive rounded"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="px-5 py-2 text-xs text-muted-foreground font-section flex gap-4">
                <span>Order: {b.order}</span>
                <span className={b.active ? 'text-accent' : 'text-destructive'}>{b.active ? '● Active' : '○ Hidden'}</span>
                <span>→ {b.ctaLink}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-background rounded-lg shadow-luxury w-full max-w-xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg font-bold">{editing ? 'Edit Banner' : 'Add Banner'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-muted rounded"><X size={18} /></button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Discount Text</label>
                <input value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} placeholder="FLAT 30% OFF" className="w-full px-3 py-2 border border-border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Title *</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Festive Edit" className="w-full px-3 py-2 border border-border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Subtitle</label>
                <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Handpicked silks for the season" className="w-full px-3 py-2 border border-border rounded text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">CTA Text</label>
                  <input value={form.ctaText} onChange={e => setForm({ ...form, ctaText: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">CTA Link</label>
                  <input value={form.ctaLink} onChange={e => setForm({ ...form, ctaLink: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-2">Background Color</label>
                <div className="flex gap-2 flex-wrap">
                  {PRESET_COLORS.map(c => (
                    <button key={c} type="button" onClick={() => setForm({ ...form, bgColor: c })} className={`w-9 h-9 rounded-full border-2 ${form.bgColor === c ? 'border-foreground scale-110' : 'border-transparent'} transition-transform`} style={{ background: c }} />
                  ))}
                  <input type="color" value={form.bgColor} onChange={e => setForm({ ...form, bgColor: e.target.value })} className="w-9 h-9 rounded cursor-pointer" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-3 py-2 border border-border rounded text-sm" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm font-section">
                    <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                    Active (show on site)
                  </label>
                </div>
              </div>

              {/* Preview */}
              <div>
                <p className="text-xs font-section uppercase tracking-wider text-muted-foreground mb-2">Preview</p>
                <div className="rounded-xl p-5 text-white" style={{ background: form.bgColor }}>
                  {form.discount && <p className="text-secondary text-[10px] uppercase tracking-[0.3em] font-bold mb-1">{form.discount}</p>}
                  <h4 className="font-heading text-lg font-bold">{form.title || 'Title'}</h4>
                  {form.subtitle && <p className="text-white/80 text-xs mt-1">{form.subtitle}</p>}
                </div>
              </div>

              {error && <p className="text-sm text-destructive font-section">{error}</p>}

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-section border border-border rounded hover:bg-muted">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-section font-semibold bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editing ? 'Save Changes' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManager;
