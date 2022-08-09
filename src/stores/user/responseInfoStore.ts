import create from 'zustand';

interface StoreInfo {
  storeId: string;
  masterName: string;
  storeName: string;
  storeType: string;
  latitude: number;
  longitude: number;
  storePhone: string;
  masterPhone: string;
  introduce: string;
  storeImage: string;
  businessNumber: string;
  mainMenu1: string;
  mainMenu2: string;
  mainMenu3: string;
  starRate: number;
  address: string;
  openAt: Date;
  closeAt: Date;
  reservationId: number;
}

interface ResponseInfo {
  responses: StoreInfo[];
  addResponse: (value: StoreInfo) => void;
}

const useResponseInfoStore = create<ResponseInfo>((set) => ({
  responses: [],
  addResponse: (value: StoreInfo) => {
    // TODO: 로그값 확인하고 지우기
    console.log(value);
    set((state) => ({ responses: [value, ...state.responses] }));
  },
}));

export type { StoreInfo };
export default useResponseInfoStore;
