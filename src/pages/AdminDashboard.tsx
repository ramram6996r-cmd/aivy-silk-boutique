import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  removeImageFromProduct,
  slugify,
  FirestoreProduct,
} from '@/lib/products';
import { CATEGORIES, CATEGORY_TREE } from '@/data/categories';
import { Plus, Pencil, Trash2, X, Upload, LogOut, Loader2 } from 'lucide-react';
import logo from '@/assets/logo.jpg';

const emptyForm = {
  name: '',
  category: 'Sarees',
  subcategory: '',
  price: 0,
  discountPrice: 0,
  description: '',
  details: '',
  care: '',
  fabric: '',
  occasion: '',
  color: '',
  stock: true,
  badge: '' as '' | 'new' | 'bestseller',
};

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<FirestoreProduct | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const list = await fetchProducts();
      setProducts(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFiles([]);
    setError('');
    setShowForm(true);
  };

  const openEdit = (p: FirestoreProduct) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: p.category || 'Sarees',
      subcategory: p.subcategory || '',
      price: p.price,
      discountPrice: p.discountPrice || 0,
      description: p.description || '',
      details: p.details || '',
      care: p.care || '',
      fabric: p.fabric || '',
      occasion: p.occasion || '',
      color: p.color || '',
      stock: p.stock,
      badge: (p.badge || '') as '' | 'new' | 'bestseller',
    });
    setFiles([]);
    setError('');
    setShowForm(true);
  };

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        slug: slugify(form.name),
        price: Number(form.price),
        discountPrice: Number(form.discountPrice) || 0,
        badge: form.badge || null,
      };
      if (editing) {
        await updateProduct(editing.id, payload, files);
      } else {
        await createProduct(payload, files);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    await deleteProduct(id);
    await load();
  };

  const removeImg = async (url: string) => {
    if (!editing) return;
    await removeImageFromProduct(editing.id, url, editing.images);
    const updated = { ...editing, images: editing.images.filter(u => u !== url) };
    setEditing(updated);
    await load();
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Aivy Silk" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <h1 className="font-heading text-lg font-bold text-primary leading-tight">Admin Dashboard</h1>
              <p className="text-[10px] text-muted-foreground font-section uppercase tracking-widest">{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm font-section border border-border rounded-lg hover:bg-muted">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-2xl font-bold">Products</h2>
            <p className="text-sm text-muted-foreground font-section">{products.length} total</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-section text-sm font-semibold hover:opacity-90">
            <Plus size={16} /> Add Product
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
        ) : products.length === 0 ? (
          <div className="bg-background border border-dashed border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground font-section">No products yet. Add your first product to get started.</p>
          </div>
        ) : (
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="text-left text-xs font-section uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3 hidden md:table-cell">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Stock</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map(p => (
                  <tr key={p.id} className="text-sm">
                    <td className="px-4 py-3">
                      {p.images?.[0] ? (
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">—</div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{p.subcategory || p.category}</td>
                    <td className="px-4 py-3 font-medium">₹{p.price?.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`text-xs px-2 py-1 rounded ${p.stock ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'}`}>
                        {p.stock ? 'In stock' : 'Out'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 hover:bg-muted rounded" aria-label="Edit"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded" aria-label="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-background rounded-lg shadow-luxury w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg font-bold">{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-muted rounded"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Product Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value, subcategory: '' })} className="w-full px-3 py-2 border border-border rounded text-sm bg-background">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Subcategory</label>
                  <select value={form.subcategory} onChange={e => setForm({ ...form, subcategory: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm bg-background">
                    <option value="">— Select —</option>
                    {Object.entries(CATEGORY_TREE[form.category as keyof typeof CATEGORY_TREE] || {}).map(([group, items]) => (
                      <optgroup key={group} label={group}>
                        {(items as readonly string[]).map(i => <option key={i} value={i}>{i}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Price (₹) *</label>
                  <input required type="number" min="0" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-3 py-2 border border-border rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Original Price (₹)</label>
                  <input type="number" min="0" value={form.discountPrice} onChange={e => setForm({ ...form, discountPrice: Number(e.target.value) })} className="w-full px-3 py-2 border border-border rounded text-sm" placeholder="Optional" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Fabric</label>
                  <input value={form.fabric} onChange={e => setForm({ ...form, fabric: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Occasion</label>
                  <input value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Color</label>
                  <input value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Short Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-border rounded text-sm" />
              </div>

              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Details</label>
                <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} rows={3} className="w-full px-3 py-2 border border-border rounded text-sm" />
              </div>

              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Care Instructions</label>
                <textarea value={form.care} onChange={e => setForm({ ...form, care: e.target.value })} rows={2} className="w-full px-3 py-2 border border-border rounded text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Badge</label>
                  <select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value as '' | 'new' | 'bestseller' })} className="w-full px-3 py-2 border border-border rounded text-sm bg-background">
                    <option value="">None</option>
                    <option value="new">New</option>
                    <option value="bestseller">Bestseller</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm font-section">
                    <input type="checkbox" checked={form.stock} onChange={e => setForm({ ...form, stock: e.target.checked })} />
                    In stock
                  </label>
                </div>
              </div>

              {editing && editing.images?.length > 0 && (
                <div>
                  <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-2">Existing Images</label>
                  <div className="flex flex-wrap gap-2">
                    {editing.images.map(url => (
                      <div key={url} className="relative">
                        <img src={url} alt="" className="w-20 h-20 object-cover rounded border border-border" />
                        <button type="button" onClick={() => removeImg(url)} className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center"><X size={10} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-1">Upload Images</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded cursor-pointer hover:bg-muted text-sm font-section">
                    <Upload size={14} /> Choose files
                    <input type="file" multiple accept="image/*" onChange={handleFiles} className="hidden" />
                  </label>
                  <span className="text-xs text-muted-foreground">{files.length} selected</span>
                </div>
              </div>

              {error && <p className="text-sm text-destructive font-section">{error}</p>}

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-section border border-border rounded hover:bg-muted">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-section font-semibold bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
