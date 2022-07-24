import create from 'zustand';

interface Auth {
  authoried: boolean;
  userType: string;
  setAuth: (value: boolean) => void;
  setUserType: (type: string) => void;
}

const useAuthStore = create<Auth>((set) => ({
  authoried: true,
  userType: 'USER',
  setAuth: (value: boolean) => set(() => ({ authoried: !value })),
  setUserType: (type: string) => set(() => ({ userType: type })),
}));

export default useAuthStore;
