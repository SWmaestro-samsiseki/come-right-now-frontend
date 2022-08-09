import type { User } from '../authStore';
import create from 'zustand';

interface ReservationInfo {
  numberOfPeople: number;
  estimatedTime: Date;
  createdAt: Date;
  reservationStatus: string;
  user: User;
  reservationId: number;
}

interface StoreManager {
  reservationList: ReservationInfo[];
  requestList: ReservationInfo[];
  addReservation: (value: ReservationInfo) => void;
  addRequest: (value: ReservationInfo) => void;
  removeRequest: (value: ReservationInfo) => void;
}

const useStoreManagerStore = create<StoreManager>((set) => ({
  reservationList: [],
  requestList: [],
  addReservation: (value: ReservationInfo) =>
    set((state) => ({ reservationList: [...state.reservationList, value] })),
  addRequest: (value: ReservationInfo) =>
    set((state) => ({ requestList: [...state.requestList, value] })),
  removeRequest: (value: ReservationInfo) =>
    set((state) => ({ requestList: [...state.requestList.filter((ele) => ele !== value)] })),
}));

export type { ReservationInfo };
export default useStoreManagerStore;
