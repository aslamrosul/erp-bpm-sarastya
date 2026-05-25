# ERPBPM Frontend Web

React + TypeScript + Vite application

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Shadcn/ui
- Zustand (State Management)
- React Router
- Axios

## Setup

```bash
cd frontend-web
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Project Structure

```
src/
├── app/
│   ├── router/          # Route configurations
│   ├── providers/       # Context providers
│   ├── store/          # Zustand stores
│   └── layouts/        # Layout components
├── shared/
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom hooks
│   ├── services/       # API services
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── features/           # Feature modules
│   ├── auth/
│   ├── dashboard/
│   ├── bpm/
│   ├── crm/
│   └── hrm/
└── assets/            # Static assets
```
