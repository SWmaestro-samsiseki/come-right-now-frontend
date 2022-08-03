import create from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  bitrh: string;
  creditRate: number;
}

interface Auth {
  authoried: boolean;
  userType: string;
  user: User | null;
  setAuth: (value: boolean) => void;
  setUserType: (type: string) => void;
  setUser: (value: User) => void;
}

const useAuthStore = create<Auth>((set) => ({
  authoried: false,
  userType: '',
  user: null,
  setAuth: (value: boolean) => set(() => ({ authoried: value })),
  setUserType: (type: string) => set(() => ({ userType: type })),
  setUser: (value: User) => set(() => ({ user: value })),
}));

export type { User };
export default useAuthStore;
