import { useAuthStore } from '../../features/auth/store/auth.store';

export const useAuth = () => {
  const { user, token, setAuth, logout } = useAuthStore();

  const isAuthenticated = !!token;

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
  };
};
