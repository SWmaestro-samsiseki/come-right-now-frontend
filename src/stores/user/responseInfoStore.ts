import create from 'zustand';
import type { ReservationInUser } from '../../utils/interface';

interface ResponseInfo {
  responses: ReservationInUser[];
  addResponse: (value: ReservationInUser) => void;
  resetResponse: () => void;
}

const useResponseInfoStore = create<ResponseInfo>((set) => ({
  responses: [],
  addResponse: (value: ReservationInUser) =>
    set((state) => ({ responses: [...state.responses, value] })),
  resetResponse: () => set(() => ({ responses: [] })),
}));

export default useResponseInfoStore;
