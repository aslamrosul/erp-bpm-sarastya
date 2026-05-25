import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/auth.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    // Redirect ke login jika tidak ada token
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
