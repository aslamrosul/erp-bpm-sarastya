import { useEffect } from 'react';
import { useDepartmentStore } from '../store/department.store';
import { departmentService } from '../services/department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../types/department.types';

export const useDepartments = () => {
  const {
    departments,
    selectedDepartment,
    isLoading,
    error,
    setDepartments,
    setSelectedDepartment,
    setLoading,
    setError,
    addDepartment,
    updateDepartment: updateDepartmentInStore,
    removeDepartment,
  } = useDepartmentStore();

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await departmentService.getAll();
      setDepartments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const createDepartment = async (data: CreateDepartmentDto) => {
    setLoading(true);
    setError(null);
    try {
      const newDepartment = await departmentService.create(data);
      addDepartment(newDepartment);
      return newDepartment;
    } catch (err: any) {
      setError(err.message || 'Failed to create department');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDepartment = async (id: string, data: UpdateDepartmentDto) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await departmentService.update(id, data);
      updateDepartmentInStore(id, updated);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update department');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await departmentService.delete(id);
      removeDepartment(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete department');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    selectedDepartment,
    isLoading,
    error,
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    setSelectedDepartment,
  };
};
