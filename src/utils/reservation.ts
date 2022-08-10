import type { User } from '../stores/authStore';
import type { StoreInfo } from '../stores/user/responseInfoStore';

const BASE_URL = 'http://localhost:8080';

interface ReservationInfo {
  numberOfPeople: number;
  estimatedTime: Date;
  createdAt: Date;
  reservationStatus: string;
  user: User;
  store: StoreInfo;
}

async function getReservationInfo(id: number): Promise<ReservationInfo> {
  const response = await fetch(`${BASE_URL}/reservation/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse;
}

async function deleteReservation(id: number): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/reservation/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse;
}

function validTime(time: Date): number {
  const limit = 1;
  const term = new Date().getTime() - new Date(time).getTime();
  return term < limit * 60000 ? term : 0;
}

export { getReservationInfo, deleteReservation, validTime };
