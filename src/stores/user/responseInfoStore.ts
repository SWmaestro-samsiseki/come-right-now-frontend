import create from 'zustand';
import type { ReservationInUser } from '../../utils/interface';

interface ResponseInfo {
  responses: ReservationInUser[];
  addResponse: (value: ReservationInUser) => void;
}

const useResponseInfoStore = create<ResponseInfo>((set) => ({
  responses: [],
  addResponse: (value: ReservationInUser) =>
    set((state) => ({ responses: [value, ...state.responses] })),
}));

export default useResponseInfoStore;
