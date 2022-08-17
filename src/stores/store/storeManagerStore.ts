import create from 'zustand';
import ReservationItem from '../../components/user/ReservationItem';
import type { ReservationInStore } from '../../utils/interface';

interface StoreManager {
  reservationList: ReservationInStore[];
  requestList: ReservationInStore[];
  addReservation: (value: ReservationInStore) => void;
  removeReservation: (value: ReservationInStore | number) => void;
  updateReservation: (id: number, time: Date) => void;
  addRequest: (value: ReservationInStore) => void;
  removeRequest: (value: ReservationInStore) => void;
}

const useStoreManagerStore = create<StoreManager>((set) => ({
  reservationList: [],
  requestList: [],
  addReservation: (value: ReservationInStore) =>
    set((state) => ({ reservationList: [...state.reservationList, value] })),
  removeReservation: (value: ReservationInStore | number) => {
    if (value instanceof ReservationItem)
      set((state) => ({
        reservationList: [...state.reservationList.filter((ele) => ele !== value)],
      }));
    else {
      set((state) => ({
        reservationList: [...state.reservationList.filter((ele) => ele.id !== value)],
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
              estimatedTime: time,
              createdAt: ele.createdAt,
              reservationStatus: ele.reservationStatus,
              user: ele.user,
            };
          } else return ele;
        }),
      ],
    })),
  addRequest: (value: ReservationInStore) =>
    set((state) => ({ requestList: [...state.requestList, value] })),
  removeRequest: (value: ReservationInStore) =>
    set((state) => ({ requestList: [...state.requestList.filter((ele) => ele !== value)] })),
}));

export default useStoreManagerStore;
