import type { User } from '../stores/authStore';
import type { StoreInfo } from '../stores/user/responseInfoStore';

const BASE_URL = 'http://localhost:8080';

interface ReservationInfo {
  peopleNumber: number;
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

export { getReservationInfo, deleteReservation };
