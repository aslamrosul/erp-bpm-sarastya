import { create } from 'zustand';
import { Employee } from '../types/employee.types';

interface EmployeeStore {
  employees: Employee[];
  selectedEmployee: Employee | null;
  isLoading: boolean;
  error: string | null;
  setEmployees: (employees: Employee[]) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Employee) => void;
  removeEmployee: (id: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  selectedEmployee: null,
  isLoading: false,
  error: null,
  setEmployees: (employees) => set({ employees }),
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
  updateEmployee: (id, employee) =>
    set((state) => ({
      employees: state.employees.map((e) => (e.id === id ? employee : e)),
    })),
  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((e) => e.id !== id),
    })),
}));
