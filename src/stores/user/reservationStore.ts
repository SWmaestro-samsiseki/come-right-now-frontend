import type { StoreInfo } from './responseInfoStore';
import create from 'zustand';

interface ReservationInfo {
  numberOfPeople: number;
  estimatedTime: Date;
  createdAt: Date;
  reservationStatus: string;
  store: StoreInfo;
}

interface Reservation {
  reservation: ReservationInfo | undefined;
}

const useReservationStore = create<Reservation>((set) => ({
  reservation: undefined,
}));

export default useReservationStore;
