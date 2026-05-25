import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-700 to-pink-500 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
              S
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
              Buat Akun Baru
            </h1>
            <p className="text-sm text-gray-500">Enterprise ERP-BPM System</p>
          </div>

          {/* Form */}
          <RegisterForm />

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Dengan mendaftar, Anda menyetujui{' '}
              <a href="#" className="text-purple-600 hover:text-pink-500 transition-colors">
                Syarat & Ketentuan
              </a>{' '}
              dan{' '}
              <a href="#" className="text-purple-600 hover:text-pink-500 transition-colors">
                Kebijakan Privasi
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © 2026 PT Sarastya Agility Innovations. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
