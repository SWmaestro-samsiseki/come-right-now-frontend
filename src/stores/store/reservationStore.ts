import create from 'zustand';

interface Reservation {
  userName: string;
  phone: string;
  creditRate: number;
  peopleNumber: number;
  estimatedTime: Date;
}

interface Request {
  numberOfPeople: number;
  arrivedAt: Date;
  userId: string;
  userName: string;
  userPhone: string;
  creditRate: number;
}

interface StoreManager {
  reservationList: Reservation[];
  requestList: Request[];
  addReservation: (value: Reservation) => void;
  addRequest: (value: Request) => void;
}

const useReservationStore = create<StoreManager>((set) => ({
  reservationList: [],
  requestList: [],
  addReservation: (value: Reservation) =>
    set((state) => ({ reservationList: [...state.reservationList, value] })),
  addRequest: (value: Request) => set((state) => ({ requestList: [...state.requestList, value] })),
}));

export default useReservationStore;
