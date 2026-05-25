import { useState } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuthStore();

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.login({ username, password });
      setAuth(result.user, result.token);
      return result;
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
