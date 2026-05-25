import { create } from 'zustand';
import { Position } from '../types/position.types';

interface PositionStore {
  positions: Position[];
  selectedPosition: Position | null;
  isLoading: boolean;
  error: string | null;
  setPositions: (positions: Position[]) => void;
  setSelectedPosition: (position: Position | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addPosition: (position: Position) => void;
  updatePosition: (id: string, position: Position) => void;
  removePosition: (id: string) => void;
}

export const usePositionStore = create<PositionStore>((set) => ({
  positions: [],
  selectedPosition: null,
  isLoading: false,
  error: null,
  setPositions: (positions) => set({ positions }),
  setSelectedPosition: (position) => set({ selectedPosition: position }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addPosition: (position) =>
    set((state) => ({ positions: [...state.positions, position] })),
  updatePosition: (id, position) =>
    set((state) => ({
      positions: state.positions.map((p) => (p.id === id ? position : p)),
    })),
  removePosition: (id) =>
    set((state) => ({
      positions: state.positions.filter((p) => p.id !== id),
    })),
}));
