import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/auth.store';

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = useAuthStore((state) => state.token);

  if (token) {
    // Redirect ke dashboard jika sudah login
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
