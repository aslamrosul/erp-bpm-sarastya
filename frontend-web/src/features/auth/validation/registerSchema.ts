import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username minimal 3 karakter')
    .max(20, 'Username maksimal 20 karakter')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh huruf, angka, dan underscore'),
  
  email: z
    .string()
    .email('Email tidak valid')
    .min(1, 'Email wajib diisi'),
  
  firstName: z
    .string()
    .min(2, 'Nama depan minimal 2 karakter')
    .max(50, 'Nama depan maksimal 50 karakter'),
  
  lastName: z
    .string()
    .min(2, 'Nama belakang minimal 2 karakter')
    .max(50, 'Nama belakang maksimal 50 karakter'),
  
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung minimal 1 huruf kecil')
    .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka'),
  
  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
