import create from 'zustand';

interface Response {
  businessName: string;
  storeImage: string;
  storeType: string;
  starRate: number;
  address: string;
  latitude: number;
  longitude: number;
  storePhone: string;
  openAt: Date;
  closeAt: Date;
  mainMenu1: string;
  mainMenu2: string;
  mainMenu3: string;
  mainMenuImage: string;
}

interface response {
  responses: Response[];
  addResponse: (value: Response) => void;
}

const useResponseStore = create<response>((set) => ({
  responses: [
    {
      businessName: '삼겹멘숀',
      storeImage: '',
      storeType: '삼겹살집',
      starRate: 4.5,
      address: '한밭대학교',
      latitude: 0,
      longitude: 0,
      storePhone: '010-1234-5678',
      openAt: new Date(),
      closeAt: new Date(),
      mainMenu1: '삼겹살',
      mainMenu2: '물냉면',
      mainMenu3: '곱창',
      mainMenuImage: '',
    },
  ],
  addResponse: (value: Response) => set((state) => ({ responses: [value, ...state.responses] })),
}));

export type { Response };
export default useResponseStore;
