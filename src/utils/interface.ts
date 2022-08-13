interface LoginOutputDTO {
  isSuccess: boolean;
  message: string;
  accessToken: string;
  userType: string;
}

interface UserAuth {
  id: string;
  email: string;
  name: string;
  phone: string;
  bitrh: string;
  creditRate: number;
}

interface StoreAuth {
  id: string;
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
  storeImage: string | null;
  businessNumber: string;
  mainMenu1: string | null;
  mainMenu2: string | null;
  mainMenu3: string | null;
  menuImage: string | null;
  starRate: number;
  businessHours: {
    id: number;
    businessDay: string;
    openAt: string;
    closeAt: string;
  }[];
  account: {
    email: string;
  };
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface StoreInfo {
  id: string;
  businessName: string;
  storeType: string;
  address: string;
  latitude: number;
  longitude: number;
  storePhone: string;
  introduce: string;
  storeImage: string | null;
  mainMenu1: string | null;
  mainMenu2: string | null;
  mainMenu3: string | null;
  menuImage: string | null;
  starRate: number;
  todayOpenAt: Date;
  todayCloseAt: Date;
  businessHours: {
    id: number;
    businessDay: string;
    openAt: string;
    closeAt: string;
  }[];
}

interface Reservation {
  id: number;
  numberOfPeople: number;
  estimatedTime: Date;
  createdAt: Date;
  reservationStatus: string;
  user: UserAuth;
  store: StoreInfo;
}

interface ReservationInUser {
  id: number;
  numberOfPeople: number;
  estimatedTime: Date;
  createdAt: Date;
  reservationStatus: string;
  store: StoreInfo;
}

interface ReservationInStore {
  id: number;
  numberOfPeople: number;
  estimatedTime: Date;
  createdAt: Date;
  reservationStatus: string;
  user: UserAuth;
}

export type {
  LoginOutputDTO,
  UserAuth,
  StoreAuth,
  Category,
  StoreInfo,
  Reservation,
  ReservationInUser,
  ReservationInStore,
};
