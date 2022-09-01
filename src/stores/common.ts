import create from 'zustand';

interface common {
  isLoad: boolean;
  setLoad: (value: boolean) => void;
}

const useCmmonStore = create<common>((set) => ({
  isLoad: false,
  setLoad: (value: boolean) => set(() => ({ isLoad: value })),
}));

export default useCmmonStore;
