import create from 'zustand';

interface Auth {
  authoried: boolean;
  userType: string;
  setAuth: () => void;
  setUserType: (type: string) => void;
}

const useAuthStore = create<Auth>((set) => ({
  authoried: false,
  userType: '',
  setAuth: () => set((state) => ({ authoried: !state.authoried })),
  setUserType: (type: string) => set(() => ({ userType: type })),
}));

export default useAuthStore;
