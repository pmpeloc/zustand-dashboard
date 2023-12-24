import { StateCreator } from 'zustand';

export interface ConfirmSlice {
  isConfirmed: boolean;
  setIsConfirmed: (isConfirmed: boolean) => void;
}

export const createConfirmSlice: StateCreator<ConfirmSlice> = (set) => ({
  isConfirmed: false,
  setIsConfirmed: (isConfirmed: boolean) => set({ isConfirmed }),
});
