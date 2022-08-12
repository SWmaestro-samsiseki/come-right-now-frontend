import create from 'zustand';
import type { ReservationInUser } from '../../utils/interface';

interface Reservation {
  reservation: ReservationInUser | undefined;
  addReservation: (value: ReservationInUser) => void;
}

const useReservationStore = create<Reservation>((set) => ({
  reservation: undefined,
  addReservation: (value: ReservationInUser) => set(() => ({ reservation: value })),
}));

export default useReservationStore;
