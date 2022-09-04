import create from 'zustand';
import type { ReservationDTO } from '../../utils/interface';

interface Reservation {
  reservation: ReservationDTO | null;
  addReservation: (value: ReservationDTO) => void;
  removeReservation: () => void;
  updateReservation: (item: ReservationDTO, time: Date) => void;
}

const useReservationStore = create<Reservation>((set) => ({
  reservation: null,
  addReservation: (value: ReservationDTO) => set(() => ({ reservation: value })),
  removeReservation: () => set(() => ({ reservation: null })),
  updateReservation: (item: ReservationDTO, time: Date) =>
    set(() => ({
      reservation: {
        id: item.id,
        numberOfPeople: item.numberOfPeople,
        departureTime: item.departureTime,
        estimatedTime: time,
        createdAt: item.createdAt,
        reservationStatus: item.reservationStatus,
        user: item.user,
        store: item.store,
      },
    })),
}));

export default useReservationStore;
