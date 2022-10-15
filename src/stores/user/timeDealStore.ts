import create from 'zustand';
import type { TimeDealUserDTO, CurrentTimeDealUserDTO } from '../../utils/interface';

interface TimeDealStore {
  timeDealList: TimeDealUserDTO[];
  currentTimeDealList: CurrentTimeDealUserDTO[];
  initTimeDeal: (value: TimeDealUserDTO[]) => void;
  removeTimeDeal: (value: TimeDealUserDTO) => void;
  initCurrentTimeDeal: (value: CurrentTimeDealUserDTO[]) => void;
  addCurrentTimeDeal: (value: CurrentTimeDealUserDTO) => void;
}

const useTimeDealStore = create<TimeDealStore>((set) => ({
  timeDealList: [],
  currentTimeDealList: [],
  initTimeDeal: (value: TimeDealUserDTO[]) => set(() => ({ timeDealList: value })),
  removeTimeDeal: (value: TimeDealUserDTO) =>
    set((state) => ({ timeDealList: [...state.timeDealList.filter((ele) => ele !== value)] })),
  initCurrentTimeDeal: (value: CurrentTimeDealUserDTO[]) =>
    set(() => ({ currentTimeDealList: value })),
  addCurrentTimeDeal: (value: CurrentTimeDealUserDTO) =>
    set((state) => ({
      currentTimeDealList: [...state.currentTimeDealList, value],
    })),
}));

export default useTimeDealStore;
