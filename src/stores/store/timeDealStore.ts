import create from 'zustand';
import type { TimeDealDTO } from '../../utils/interface';

interface TimeDealStore {
  timeDealList: TimeDealDTO[];
  initTimeDeal: (value: TimeDealDTO[]) => void;
  addTimeDeal: (value: TimeDealDTO) => void;
  removeTimeDeal: (value: TimeDealDTO) => void;
}

const useTimeDealStore = create<TimeDealStore>((set) => ({
  timeDealList: [],
  initTimeDeal: (value: TimeDealDTO[]) => set(() => ({ timeDealList: value })),
  addTimeDeal: (value: TimeDealDTO) =>
    set((state) => ({ timeDealList: [...state.timeDealList, value] })),
  removeTimeDeal: (value: TimeDealDTO) =>
    set((state) => ({ timeDealList: [...state.timeDealList.filter((ele) => ele !== value)] })),
}));

export default useTimeDealStore;
