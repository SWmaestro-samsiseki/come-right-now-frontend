import create from 'zustand';
import type { ReservationInStore } from '../../utils/interface';

interface StoreManager {
  reservationList: ReservationInStore[];
  requestList: ReservationInStore[];
  addReservation: (value: ReservationInStore) => void;
  addRequest: (value: ReservationInStore) => void;
  removeRequest: (value: ReservationInStore) => void;
}

const useStoreManagerStore = create<StoreManager>((set) => ({
  reservationList: [],
  requestList: [],
  addReservation: (value: ReservationInStore) =>
    set((state) => ({ reservationList: [...state.reservationList, value] })),
  addRequest: (value: ReservationInStore) =>
    set((state) => ({ requestList: [...state.requestList, value] })),
  removeRequest: (value: ReservationInStore) =>
    set((state) => ({ requestList: [...state.requestList.filter((ele) => ele !== value)] })),
}));

export default useStoreManagerStore;
