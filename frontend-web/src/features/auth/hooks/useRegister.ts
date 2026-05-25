import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, RegisterDto } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const register = async (data: RegisterDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      
      // Auto login setelah register berhasil
      setAuth(response.user, response.token);
      
      // Redirect ke dashboard (/)
      navigate('/');
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    clearError: () => setError(null),
  };
};
