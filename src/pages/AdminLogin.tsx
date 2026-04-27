import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/logo.jpg';

const AdminLogin = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/admin-dashboard', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/admin-dashboard', { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(msg.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-background rounded-lg shadow-luxury p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="Aivy Silk" className="h-14 w-14 rounded-full object-cover mx-auto mb-3" />
          <h1 className="font-heading text-2xl font-bold text-primary">Admin Portal</h1>
          <p className="font-section text-xs text-muted-foreground uppercase tracking-widest mt-1">Aivy Silk by Indu</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-section uppercase tracking-wider text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-destructive font-section">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-section font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
