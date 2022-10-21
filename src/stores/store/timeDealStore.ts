import create from 'zustand';
import type { MiniUserDTO, TimeDealStoreDTO } from '../../utils/interface';

interface TimeDealStore {
  timeDealList: TimeDealStoreDTO[];
  initTimeDeal: (value: TimeDealStoreDTO[]) => void;
  addTimeDeal: (value: TimeDealStoreDTO) => void;
  removeTimeDeal: (value: TimeDealStoreDTO) => void;
  addParticipant: (timeDealId: number, checkInId: number, value: MiniUserDTO) => void;
  removeParticipant: (timeDealId: number, participantId: number) => void;
}

const useTimeDealStore = create<TimeDealStore>((set) => ({
  timeDealList: [],
  initTimeDeal: (value: TimeDealStoreDTO[]) => set(() => ({ timeDealList: value })),
  addTimeDeal: (value: TimeDealStoreDTO) =>
    set((state) => ({ timeDealList: [value, ...state.timeDealList] })),
  removeTimeDeal: (value: TimeDealStoreDTO) =>
    set((state) => ({
      timeDealList: [...state.timeDealList.filter((ele) => ele.id !== value.id)],
    })),
  addParticipant: (id: number, checkInId: number, value: MiniUserDTO) =>
    set((state) => ({
      timeDealList: state.timeDealList.map((item) => {
        if (item.id === id) {
          item.participants.push({ id: checkInId, status: 'ARRIVED', user: value });
          return item;
        } else {
          return item;
        }
      }),
    })),
  removeParticipant: (timeDealId: number, participantId: number) =>
    set((state) => ({
      timeDealList: state.timeDealList.map((item) => {
        if (item.id === timeDealId) {
          item.participants = item.participants.filter((ele) => ele.id !== participantId);
          return item;
        } else {
          return item;
        }
      }),
    })),
}));

export default useTimeDealStore;
