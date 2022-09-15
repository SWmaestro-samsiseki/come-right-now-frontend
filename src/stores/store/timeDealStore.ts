import create from 'zustand';
import type { TimeDealStoreDTO } from '../../utils/interface';

interface TimeDealStore {
  timeDealList: TimeDealStoreDTO[];
  initTimeDeal: (value: TimeDealStoreDTO[]) => void;
  addTimeDeal: (value: TimeDealStoreDTO) => void;
  removeTimeDeal: (value: TimeDealStoreDTO) => void;
}

const useTimeDealStore = create<TimeDealStore>((set) => ({
  timeDealList: [],
  initTimeDeal: (value: TimeDealStoreDTO[]) => set(() => ({ timeDealList: value })),
  addTimeDeal: (value: TimeDealStoreDTO) => {
    set((state) => ({ timeDealList: [...state.timeDealList, value] })), console.log(value);
  },
  removeTimeDeal: (value: TimeDealStoreDTO) =>
    set((state) => ({ timeDealList: [...state.timeDealList.filter((ele) => ele !== value)] })),
}));

export default useTimeDealStore;
