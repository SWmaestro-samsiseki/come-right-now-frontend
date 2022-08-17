import create from 'zustand';
import type { ReservationInUser } from '../../utils/interface';

interface Reservation {
  reservation: ReservationInUser | undefined;
  addReservation: (value: ReservationInUser) => void;
  removeReservation: () => void;
  updateReservation: (item: ReservationInUser, time: Date) => void;
}

const useReservationStore = create<Reservation>((set) => ({
  reservation: undefined,
  addReservation: (value: ReservationInUser) => set(() => ({ reservation: value })),
  removeReservation: () => set(() => ({ reservation: undefined })),
  updateReservation: (item: ReservationInUser, time: Date) =>
    set(() => ({
      reservation: {
        id: item.id,
        numberOfPeople: item.numberOfPeople,
        estimatedTime: time,
        createdAt: item.createdAt,
        reservationStatus: item.reservationStatus,
        store: item.store,
      },
    })),
}));

export default useReservationStore;
