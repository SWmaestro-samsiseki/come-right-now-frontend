import create from 'zustand';
import type { TimeDealUserDTO } from '../../utils/interface';

interface TimeDealStore {
  timeDealList: TimeDealUserDTO[];
  initTimeDeal: (value: TimeDealUserDTO[]) => void;
  removeTimeDeal: (value: TimeDealUserDTO) => void;
}

const useTimeDealStore = create<TimeDealStore>((set) => ({
  timeDealList: [],
  initTimeDeal: (value: TimeDealUserDTO[]) => set(() => ({ timeDealList: value })),
  removeTimeDeal: (value: TimeDealUserDTO) =>
    set((state) => ({ timeDealList: [...state.timeDealList.filter((ele) => ele !== value)] })),
}));

export default useTimeDealStore;
