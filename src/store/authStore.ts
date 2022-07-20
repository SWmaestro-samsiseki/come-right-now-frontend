import create from 'zustand';

interface Auth {
  authoried: boolean;
  setAuth: () => void;
}

const useAuthStore = create<Auth>((set) => ({
  authoried: false,
  setAuth: () => set((state) => ({ authoried: !state.authoried })),
}));

export default useAuthStore;
