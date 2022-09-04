import create from 'zustand';
import type { ReservationDTO } from '../../utils/interface';

interface ResponseInfo {
  responses: ReservationDTO[];
  addResponse: (value: ReservationDTO) => void;
  resetResponse: () => void;
}

const useResponseInfoStore = create<ResponseInfo>((set) => ({
  responses: [],
  addResponse: (value: ReservationDTO) =>
    set((state) => ({ responses: [...state.responses, value] })),
  resetResponse: () => set(() => ({ responses: [] })),
}));

export default useResponseInfoStore;
