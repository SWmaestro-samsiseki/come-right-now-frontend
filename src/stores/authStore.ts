import create from 'zustand';
import type { UserAuth, StoreAuth } from '../utils/interface';

interface Auth {
  authoried: boolean;
  userType: string;
  user: UserAuth | StoreAuth | null;
  setAuth: (value: boolean) => void;
  setUserType: (type: string) => void;
  setUser: (value: UserAuth | StoreAuth) => void;
}

const useAuthStore = create<Auth>((set) => ({
  authoried: false,
  userType: '',
  user: null,
  setAuth: (value: boolean) => set(() => ({ authoried: value })),
  setUserType: (type: string) => set(() => ({ userType: type })),
  setUser: (value: UserAuth | StoreAuth) => set(() => ({ user: value })),
}));

export default useAuthStore;
