# Auth Feature

Feature authentication yang mencakup login dan register.

## 📁 Struktur

```
features/auth/
├── components/
│   ├── LoginForm.tsx          # Form login
│   └── RegisterForm.tsx       # Form register ✨ NEW
├── hooks/
│   ├── useLogin.ts            # Hook untuk login
│   └── useRegister.ts         # Hook untuk register ✨ NEW
├── pages/
│   ├── LoginPage.tsx          # Halaman login
│   └── RegisterPage.tsx       # Halaman register ✨ NEW
├── services/
│   └── auth.service.ts        # Service untuk API auth
├── store/
│   └── auth.store.ts          # Zustand store untuk auth state
├── types/
│   └── auth.types.ts          # TypeScript types
├── validation/
│   ├── loginSchema.ts         # Validasi login
│   └── registerSchema.ts      # Validasi register ✨ NEW
└── README.md                  # Dokumentasi ini
```

## 🚀 Fitur

### Login
- ✅ Form login dengan username & password
- ✅ Validasi form
- ✅ Error handling
- ✅ Loading state
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Link ke register

### Register ✨ NEW
- ✅ Form register lengkap (username, email, nama, password)
- ✅ Validasi form dengan Zod
  - Username: 3-20 karakter, hanya huruf, angka, underscore
  - Email: format email valid
  - Nama: minimal 2 karakter
  - Password: minimal 8 karakter, harus ada huruf besar, kecil, dan angka
  - Confirm password: harus sama dengan password
- ✅ Show/hide password toggle
- ✅ Real-time validation feedback
- ✅ Error handling
- ✅ Loading state
- ✅ Auto login setelah register berhasil
- ✅ Redirect ke dashboard
- ✅ Link ke login

## 📝 Cara Penggunaan

### Register Page

```typescript
// Akses halaman register
navigate('/register');

// Atau via link
<Link to="/register">Daftar</Link>
```

### useRegister Hook

```typescript
import { useRegister } from '@/features/auth/hooks/useRegister';

function MyComponent() {
  const { register, loading, error, clearError } = useRegister();

  const handleRegister = async () => {
    try {
      await register({
        username: 'johndoe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'SecurePass123',
      });
      // Auto redirect ke dashboard
    } catch (err) {
      // Error sudah di-handle di hook
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </div>
  );
}
```

### Register Validation

```typescript
import { registerSchema } from '@/features/auth/validation/registerSchema';

// Validasi data
const result = registerSchema.safeParse({
  username: 'johndoe',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'SecurePass123',
  confirmPassword: 'SecurePass123',
});

if (result.success) {
  // Data valid
  console.log(result.data);
} else {
  // Ada error
  console.log(result.error.errors);
}
```

## 🔐 Auth Store

```typescript
import { useAuthStore } from '@/features/auth/store/auth.store';

function MyComponent() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  // Set auth (auto save to localStorage)
  setAuth(user, token);

  // Logout (auto remove from localStorage)
  logout();

  return <div>Welcome {user?.firstName}</div>;
}
```

## 🎨 UI Components

### RegisterForm
Form register yang lengkap dengan:
- Input fields untuk semua data
- Real-time validation
- Show/hide password
- Error messages
- Loading state
- Link ke login

### Styling
- Tailwind CSS
- Responsive design
- Accessible (ARIA labels, keyboard navigation)
- Modern UI dengan gradient dan shadows

## 🔄 Flow Register

```
1. User mengisi form register
   ↓
2. Client-side validation (Zod)
   ↓
3. POST /auth/register
   ↓
4. Server response (token + user)
   ↓
5. Save to auth store & localStorage
   ↓
6. Auto redirect ke /dashboard
```

## 🧪 Testing

```bash
# Manual testing
1. Buka http://localhost:5173/register
2. Isi form dengan data valid
3. Submit
4. Cek redirect ke dashboard
5. Cek localStorage untuk token

# Test validasi
1. Username < 3 karakter → error
2. Email invalid → error
3. Password < 8 karakter → error
4. Password tanpa huruf besar → error
5. Confirm password tidak sama → error
```

## 📦 Dependencies

- `zustand` - State management
- `zod` - Schema validation
- `react-router-dom` - Routing
- `tailwindcss` - Styling

## 🔗 API Endpoints

### POST /auth/register
```typescript
// Request
{
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// Response
{
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}
```

## 🚧 TODO / Future Improvements

- [ ] Email verification
- [ ] Social login (Google, Facebook)
- [ ] Password strength meter
- [ ] Terms & conditions checkbox
- [ ] Captcha
- [ ] OTP verification
- [ ] Profile picture upload
- [ ] Multi-step registration

## 📚 References

- [Zod Documentation](https://zod.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Router Documentation](https://reactrouter.com/)
