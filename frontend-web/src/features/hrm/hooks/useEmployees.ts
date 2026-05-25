import { useEffect } from 'react';
import { useEmployeeStore } from '../store/employee.store';
import { employeeService } from '../services/employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../types/employee.types';

export const useEmployees = () => {
  const {
    employees,
    selectedEmployee,
    isLoading,
    error,
    setEmployees,
    setSelectedEmployee,
    setLoading,
    setError,
    addEmployee,
    updateEmployee: updateEmployeeInStore,
    removeEmployee,
  } = useEmployeeStore();

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeService.getById(id);
      setSelectedEmployee(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch employee');
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (data: CreateEmployeeDto) => {
    setLoading(true);
    setError(null);
    try {
      const newEmployee = await employeeService.create(data);
      addEmployee(newEmployee);
      return newEmployee;
    } catch (err: any) {
      setError(err.message || 'Failed to create employee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: string, data: UpdateEmployeeDto) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await employeeService.update(id, data);
      updateEmployeeInStore(id, updated);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update employee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await employeeService.delete(id);
      removeEmployee(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete employee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    selectedEmployee,
    isLoading,
    error,
    fetchEmployees,
    fetchEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    setSelectedEmployee,
  };
};
