import { useEffect } from 'react';
import { usePositionStore } from '../store/position.store';
import { positionService } from '../services/position.service';
import { CreatePositionDto, UpdatePositionDto } from '../types/position.types';

export const usePositions = () => {
  const {
    positions,
    selectedPosition,
    isLoading,
    error,
    setPositions,
    setSelectedPosition,
    setLoading,
    setError,
    addPosition,
    updatePosition: updatePositionInStore,
    removePosition,
  } = usePositionStore();

  const fetchPositions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await positionService.getAll();
      setPositions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch positions');
    } finally {
      setLoading(false);
    }
  };

  const createPosition = async (data: CreatePositionDto) => {
    setLoading(true);
    setError(null);
    try {
      const newPosition = await positionService.create(data);
      addPosition(newPosition);
      return newPosition;
    } catch (err: any) {
      setError(err.message || 'Failed to create position');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePosition = async (id: string, data: UpdatePositionDto) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await positionService.update(id, data);
      updatePositionInStore(id, updated);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update position');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePosition = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await positionService.delete(id);
      removePosition(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete position');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return {
    positions,
    selectedPosition,
    isLoading,
    error,
    fetchPositions,
    createPosition,
    updatePosition,
    deletePosition,
    setSelectedPosition,
  };
};
