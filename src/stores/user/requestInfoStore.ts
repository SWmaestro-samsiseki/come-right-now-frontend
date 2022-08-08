import create from 'zustand';

// TODO: 카테고리에 대한 이미지 경로 추가
interface Category {
  id: number;
  name: string;
}

interface RequestInfo {
  categories: Category[];
  selectedCategories: Category[];
  people: number;
  time: number;
  latitude: number | null;
  longitude: number | null;
  initCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
  plusPeople: () => void;
  minusPeople: () => void;
  plusTime: () => void;
  minusTime: () => void;
  setLatitude: (value: number) => void;
  setLongitude: (value: number) => void;
}

const useRequestInfoStore = create<RequestInfo>((set) => ({
  categories: [],
  selectedCategories: [],
  people: 1,
  time: 0,
  latitude: null,
  longitude: null,
  initCategories: (categories: Category[]) => set(() => ({ categories: [...categories] })),
  addCategory: (category: Category) =>
    set((state) => ({ selectedCategories: [...state.selectedCategories, category] })),
  removeCategory: (category: Category) =>
    set((state) => ({
      selectedCategories: [...state.selectedCategories.filter((ele) => ele !== category)],
    })),
  plusPeople: () =>
    set((state) => ({ people: state.people < 30 ? state.people + 1 : state.people })),
  minusPeople: () =>
    set((state) => ({ people: state.people > 1 ? state.people - 1 : state.people })),
  plusTime: () => set((state) => ({ time: state.time < 30 ? state.time + 5 : state.time })),
  minusTime: () => set((state) => ({ time: state.time > 0 ? state.time - 5 : state.time })),
  setLatitude: (value: number) => set(() => ({ latitude: value })),
  setLongitude: (value: number) => set(() => ({ longitude: value })),
}));

export type { Category };
export default useRequestInfoStore;
