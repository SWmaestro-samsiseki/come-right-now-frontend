import create from 'zustand';
import type { ReservationDTO } from '../../utils/interface';

interface StandStore {
  standList: ReservationDTO[];
  addStand: (value: ReservationDTO) => void;
  removeStand: (value: ReservationDTO) => void;
}

const useStandStore = create<StandStore>((set) => ({
  standList: [],
  addStand: (value: ReservationDTO) => set((state) => ({ standList: [...state.standList, value] })),
  removeStand: (value: ReservationDTO) =>
    set((state) => ({ standList: [...state.standList.filter((ele) => ele !== value)] })),
}));

export default useStandStore;
