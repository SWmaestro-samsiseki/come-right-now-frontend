import create from 'zustand';
import type { ReservationDTO } from '../../utils/interface';

interface ReservationStore {
  reservationList: ReservationDTO[];
  addReservation: (value: ReservationDTO) => void;
  removeReservation: (value: ReservationDTO | number) => void;
  updateReservation: (id: number, time: Date) => void;
}

const useReservationStore = create<ReservationStore>((set) => ({
  reservationList: [],
  addReservation: (value: ReservationDTO) =>
    set((state) => ({ reservationList: [...state.reservationList, value] })),
  removeReservation: (value: ReservationDTO | number) => {
    if (typeof value === 'number')
      set((state) => ({
        reservationList: [...state.reservationList.filter((ele) => ele.id !== value)],
      }));
    else {
      set((state) => ({
        reservationList: [...state.reservationList.filter((ele) => ele !== value)],
      }));
    }
  },
  updateReservation: (id: number, time: Date) =>
    set((state) => ({
      reservationList: [
        ...state.reservationList.map((ele) => {
          if (ele.id === id) {
            return {
              id: ele.id,
              numberOfPeople: ele.numberOfPeople,
              departureTime: ele.departureTime,
              estimatedTime: time,
              createdAt: ele.createdAt,
              reservationStatus: ele.reservationStatus,
              user: ele.user,
              store: ele.store,
            };
          } else return ele;
        }),
      ],
    })),
}));

export default useReservationStore;
