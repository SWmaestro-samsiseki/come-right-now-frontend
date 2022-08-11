import create from 'zustand';
import type { ReservationInUser } from '../../utils/interface';

interface Reservation {
  reservation: ReservationInUser | undefined;
}

const useReservationStore = create<Reservation>((set) => ({
  reservation: undefined,
}));

export default useReservationStore;
