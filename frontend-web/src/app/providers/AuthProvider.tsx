import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../../features/auth/store/auth.store';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // Check token validity on mount
    if (token) {
      // Validate token with backend
    }
  }, [token]);

  return <>{children}</>;
}
