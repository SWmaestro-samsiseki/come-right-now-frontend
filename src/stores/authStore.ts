import create from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  bitrh: string;
  creditRate: number;
}

interface Store {
  id: string;
  email: string;
  masterName: string;
  storeName: string;
  businessName: string;
  storeType: string;
  address: string;
  latitude: number;
  longitude: number;
  storePhone: string;
  masterPhone: string;
  introduce: string;
  storeImage: string;
  mainMenu1: string;
  mainMenu2: string;
  mainMenu3: string;
  menuImage: string;
  offDays: string[];
  starRate: number;
}

interface Auth {
  authoried: boolean;
  userType: string;
  user: User | Store | null;
  setAuth: (value: boolean) => void;
  setUserType: (type: string) => void;
  setUser: (value: User | Store) => void;
}

const useAuthStore = create<Auth>((set) => ({
  authoried: false,
  userType: '',
  user: null,
  setAuth: (value: boolean) => set(() => ({ authoried: value })),
  setUserType: (type: string) => set(() => ({ userType: type })),
  setUser: (value: User | Store) => set(() => ({ user: value })),
}));

export type { User, Store };
export default useAuthStore;
