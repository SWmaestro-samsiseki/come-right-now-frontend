import create from 'zustand';

interface category {
  id: number;
  name: string;
}

interface createReservationDTO {
  estimatedTime: Date;
  numberOfPeople: number;
  storeId: string;
}

interface FindStoreResponse {
  isSuccess: boolean;
  datas: createReservationDTO[];
}

interface request {
  categories: category[];
  selectedCategories: category[];
  people: number;
  time: number;
  latitude: number | null;
  longitude: number | null;
  initCategories: (categories: category[]) => void;
  addCategory: (category: category) => void;
  removeCategory: (category: category) => void;
  plusPeople: () => void;
  minusPeople: () => void;
  plusTime: () => void;
  minusTime: () => void;
  setLatitude: (value: number) => void;
  setLongitude: (value: number) => void;
}

const useRequestStore = create<request>((set) => ({
  categories: [],
  selectedCategories: [],
  people: 1,
  time: 0,
  latitude: null,
  longitude: null,
  initCategories: (categories: category[]) => set(() => ({ categories: [...categories] })),
  addCategory: (category: category) =>
    set((state) => ({ selectedCategories: [...state.selectedCategories, category] })),
  removeCategory: (category: category) =>
    set((state) => ({
      selectedCategories: [...state.selectedCategories.filter((ele) => ele !== category)],
    })),
  plusPeople: () =>
    set((state) => ({ people: state.people < 30 ? state.people + 1 : state.people })),
  minusPeople: () =>
    set((state) => ({ people: state.people > 0 ? state.people - 1 : state.people })),
  plusTime: () => set((state) => ({ time: state.time < 30 ? state.time + 5 : state.time })),
  minusTime: () => set((state) => ({ time: state.time > 0 ? state.time - 5 : state.time })),
  setLatitude: (value: number) => set(() => ({ latitude: value })),
  setLongitude: (value: number) => set(() => ({ longitude: value })),
}));

export type { category, FindStoreResponse, createReservationDTO };
export default useRequestStore;
