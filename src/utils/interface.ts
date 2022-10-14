interface ErrorDTO {
  error: boolean;
  message: string;
}

interface SocketResponseDTO {
  isSuccess: boolean;
  message?: string;
}

interface LoginOutputDTO {
  isSuccess: boolean;
  message: string;
  accessToken: string;
  userType: string;
}

interface MiniTimeDealDTO {
  benefit: string;
  endTime: Date;
  id: number;
  status: string;
}

interface MiniUserDTO {
  birthDate: string;
  creditRate: number;
  id: string;
  name: string;
  phone: string;
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
    openAt: Date;
    closeAt: Date;
  }[];
}

interface ReservationDTO {
  id: number;
  numberOfPeople: number;
  departureTime: Date;
  estimatedTime: Date;
  createdAt: Date;
  reservationStatus: string;
  user: UserAuth;
  store: StoreInfo;
}

interface TimeDealStoreDTO {
  id: number;
  status: string;
  endTime: Date;
  benefit: string;
  participants: { id: number; status: string; user: MiniUserDTO }[];
}

interface TimeDealUserDTO {
  id: number;
  status: string;
  endTime: Date;
  benefit: string;
  store: StoreInfo;
}

interface CurrentTimeDealUserDTO {
  id: number;
  benefit: string;
  endTime: Date;
  storeId: string;
  businessName: string;
  storeImage: string;
  latitude: number;
  longitude: number;
  distance: number;
  participantId: number;
}

interface HistoryUserDTO {
  arrivalTime: Date;
  createdAt: Date;
  departureTime: Date;
  estimatedTime: Date;
  id: number;
  numberOfPeople: number;
  resevationStatus: string;
  store: StoreInfo;
  user: UserAuth;
}

interface CheckInUserDTO {
  id: number;
  status: string;
  timeDeal: MiniTimeDealDTO;
  user: MiniUserDTO;
}

export type {
  ErrorDTO,
  SocketResponseDTO,
  LoginOutputDTO,
  UserAuth,
  StoreAuth,
  Category,
  StoreInfo,
  ReservationDTO,
  TimeDealStoreDTO,
  TimeDealUserDTO,
  CurrentTimeDealUserDTO,
  HistoryUserDTO,
  MiniUserDTO,
  CheckInUserDTO,
};
