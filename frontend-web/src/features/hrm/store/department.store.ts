import { create } from 'zustand';
import { Department } from '../types/department.types';

interface DepartmentStore {
  departments: Department[];
  selectedDepartment: Department | null;
  isLoading: boolean;
  error: string | null;
  setDepartments: (departments: Department[]) => void;
  setSelectedDepartment: (department: Department | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addDepartment: (department: Department) => void;
  updateDepartment: (id: string, department: Department) => void;
  removeDepartment: (id: string) => void;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  selectedDepartment: null,
  isLoading: false,
  error: null,
  setDepartments: (departments) => set({ departments }),
  setSelectedDepartment: (department) => set({ selectedDepartment: department }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addDepartment: (department) =>
    set((state) => ({ departments: [...state.departments, department] })),
  updateDepartment: (id, department) =>
    set((state) => ({
      departments: state.departments.map((d) => (d.id === id ? department : d)),
    })),
  removeDepartment: (id) =>
    set((state) => ({
      departments: state.departments.filter((d) => d.id !== id),
    })),
}));
