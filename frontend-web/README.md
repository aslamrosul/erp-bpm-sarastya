# 🌐 ERPBPM Frontend Web - React Application

Modern web application untuk sistem ERPBPM menggunakan React 18, Vite, dan TailwindCSS.

---

## 📋 Deskripsi

Frontend web application dengan fitur:
- 🔐 Authentication & Authorization
- 📊 Interactive Dashboard dengan KPI cards
- 👥 Employee Management (HRM)
- 📁 Project Management dengan Kanban & Gantt
- ✅ Task Management
- 📈 Reports & Analytics
- 🎨 Modern UI dengan Radix UI & shadcn/ui

---

## 🏗️ Arsitektur

### Feature-Based Structure

```
src/
├── app/                    # Application Core
│   ├── layouts/           # Layout components
│   ├── router/            # Route configuration
│   └── App.tsx            # Root component
│
├── features/              # Feature Modules
│   ├── auth/             # Authentication
│   │   ├── pages/        # Login, Register
│   │   ├── services/     # Auth API calls
│   │   ├── store/        # Zustand store
│   │   └── types/        # TypeScript types
│   │
│   ├── dashboard/        # Dashboard
│   ├── hrm/              # Human Resource Management
│   ├── project-management/  # Projects & Tasks
│   └── reports/          # Reports & Analytics
│
└── shared/               # Shared Resources
    ├── components/       # Reusable components
    ├── hooks/            # Custom hooks
    ├── services/         # API client
    ├── utils/            # Utility functions
    └── constants/        # Constants & configs
```

### State Management

- **Zustand** - Global state management
- **React Query** - Server state (optional)
- **Context API** - Theme, Auth context

---

## 🛠️ Tech Stack

### Core

- **Framework**: React 18.3
- **Build Tool**: Vite 6.3
- **Language**: TypeScript (via JSDoc)
- **Styling**: TailwindCSS 4.1
- **Routing**: React Router v7

### UI Components

- **Radix UI** - Headless UI primitives
- **shadcn/ui** - Pre-built components
- **Lucide React** - Icon library
- **Recharts** - Charts & graphs
- **React DnD** - Drag and drop

### State & Data

- **Zustand** - State management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Utilities

- **date-fns** - Date manipulation
- **clsx** - Conditional classnames
- **tailwind-merge** - Merge Tailwind classes

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+ atau 20+
- npm, pnpm, atau yarn
- Backend API running

### 1. Install Dependencies

```bash
cd frontend-web

# Using npm
npm install

# Using pnpm (recommended)
pnpm install

# Using yarn
yarn install
```

### 2. Environment Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Development
VITE_API_URL=http://localhost:5000

# Production
# VITE_API_URL=https://your-backend.onrender.com
```

### 3. Run Development Server

```bash
npm run dev
```

Application akan berjalan di: `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`

---

## 📁 Project Structure

```
frontend-web/
├── public/                # Static assets
├── src/
│   ├── app/
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx      # Main app layout
│   │   ├── router/
│   │   │   ├── routes.tsx          # Route definitions
│   │   │   ├── ProtectedRoute.tsx  # Auth guard
│   │   │   └── PublicRoute.tsx     # Public routes
│   │   └── App.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   └── LoginPage.tsx
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── store/
│   │   │   │   └── auth.store.ts
│   │   │   └── types/
│   │   │       └── auth.types.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   │   └── DashboardPage.tsx
│   │   │   └── components/
│   │   │       ├── KPICard.tsx
│   │   │       └── StatsCard.tsx
│   │   │
│   │   ├── hrm/
│   │   │   ├── pages/
│   │   │   │   ├── EmployeesPage.tsx
│   │   │   │   └── EmployeeDetailPage.tsx
│   │   │   └── components/
│   │   │       └── EmployeeForm.tsx
│   │   │
│   │   └── project-management/
│   │       ├── pages/
│   │       │   ├── ProjectsPage.tsx
│   │       │   └── ProjectManagementPage.tsx
│   │       ├── kanban/
│   │       │   ├── KanbanBoard.tsx
│   │       │   └── KanbanTaskCard.tsx
│   │       └── gantt/
│   │           └── GanttChart.tsx
│   │
│   └── shared/
│       ├── components/
│       │   ├── buttons/
│       │   │   └── Button.tsx
│       │   ├── cards/
│       │   │   └── Card.tsx
│       │   └── badges/
│       │       └── Badge.tsx
│       ├── services/
│       │   └── api.ts              # Axios instance
│       ├── utils/
│       │   └── date.utils.ts       # Date helpers
│       └── constants/
│           └── index.ts            # App constants
│
├── .env                   # Environment variables
├── .env.example          # Environment template
├── index.html            # HTML entry point
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

---

## 🎨 UI Components

### Button Component

```jsx
import { Button } from '@/shared/components/buttons/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
Sizes: `sm`, `md`, `lg`

### Card Component

```jsx
import { Card } from '@/shared/components/cards/Card';

<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
</Card>
```

### Badge Component

```jsx
import { Badge } from '@/shared/components/badges/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>
```

---

## 🔐 Authentication

### Login Flow

```jsx
import { useAuthStore } from '@/features/auth/store/auth.store';

function LoginPage() {
  const login = useAuthStore(state => state.login);
  
  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Redirect to dashboard
    } catch (error) {
      // Handle error
    }
  };
}
```

### Protected Routes

```jsx
import { ProtectedRoute } from '@/app/router/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

### Auth Store (Zustand)

```javascript
// features/auth/store/auth.store.ts
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    const response = await authService.login(email, password);
    set({ 
      user: response.user, 
      token: response.token,
      isAuthenticated: true 
    });
  },
  
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  }
}));
```

---

## 📡 API Integration

### API Client Setup

```javascript
// shared/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Service Example

```javascript
// features/hrm/services/employee.service.ts
import api from '@/shared/services/api';

export const employeeService = {
  getAll: async () => {
    const response = await api.get('/api/employees');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/api/employees/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/api/employees', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/api/employees/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    await api.delete(`/api/employees/${id}`);
  }
};
```

---

## 🎯 Features

### Dashboard

- KPI cards (Employees, Projects, Tasks)
- Recent activities
- Quick actions
- Charts & graphs

### HRM (Human Resource Management)

- Employee list dengan search & filter
- Employee detail view
- Create/Edit employee form
- Department & Position management

### Project Management

- Project list & grid view
- Kanban board (drag & drop)
- Gantt chart timeline
- Project members management

### Task Management

- Task list dengan filter by status
- Task detail & comments
- Priority & status management
- Assign to team members

---

## 🎨 Styling

### TailwindCSS

```jsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800">Title</h2>
  <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
    Action
  </button>
</div>
```

### Custom Utilities

```javascript
// shared/utils/cn.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  "base-class",
  isActive && "active-class",
  "override-class"
)} />
```

---

## 🧪 Testing

### Run Tests

```bash
npm run test
```

### Component Testing

```jsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
```

---

## 📦 Build & Deploy

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Render

1. Connect GitHub repository
2. Set Root Directory: `frontend-web`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Add Environment Variable: `VITE_API_URL`

Lihat [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)

---

## 🔧 Configuration

### Vite Config

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

### Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B2D8B',
        secondary: '#4A5568'
      }
    }
  },
  plugins: []
};
```

---

## 🐛 Troubleshooting

### API Connection Error

- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check CORS settings in backend

### Build Errors

```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install
```

### Hot Reload Not Working

```bash
# Restart dev server
npm run dev
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 🤝 Contributing

1. Follow React best practices
2. Use TypeScript types (JSDoc)
3. Follow component structure
4. Add comments for complex logic
5. Test before commit

---

**Frontend Web by ERPBPM Team**
