import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import { registerSchema, RegisterFormData } from '../validation/registerSchema';

export default function RegisterForm() {
  const { register, loading, error } = useRegister();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error saat user mengetik
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Validasi form
    const validation = registerSchema.safeParse(formData);
    
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    try {
      // Kirim data tanpa confirmPassword
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (err) {
      // Error sudah di-handle di useRegister hook
      console.error('Registration error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Server Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
            validationErrors.username ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
          }`}
          placeholder="johndoe"
          disabled={loading}
        />
        {validationErrors.username && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
            validationErrors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
          }`}
          placeholder="john@example.com"
          disabled={loading}
        />
        {validationErrors.email && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
        )}
      </div>

      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Depan <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
              validationErrors.firstName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
            }`}
            placeholder="John"
            disabled={loading}
          />
          {validationErrors.firstName && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Belakang <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
              validationErrors.lastName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
            }`}
            placeholder="Doe"
            disabled={loading}
          />
          {validationErrors.lastName && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
          )}
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
              validationErrors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
            }`}
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {validationErrors.password && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Konfirmasi Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
              validationErrors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
            }`}
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {validationErrors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Mendaftar...
          </span>
        ) : (
          'Daftar'
        )}
      </button>

      {/* Login Link */}
      <div className="text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-purple-600 hover:text-pink-500 font-medium transition-colors">
          Login di sini
        </Link>
      </div>
    </form>
  );
}
