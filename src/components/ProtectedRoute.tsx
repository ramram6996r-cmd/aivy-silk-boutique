import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-section text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/aivy1027" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
