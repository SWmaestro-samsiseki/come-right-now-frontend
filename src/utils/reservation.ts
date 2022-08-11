import type { Reservation } from '../utils/interface';

const BASE_URL = 'http://localhost:8080';

async function getReservationInfo(id: number): Promise<Reservation> {
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
  // TODO: 개발이 끝나면 10분으로 변경하기
  const limit = 1;
  const term = new Date().getTime() - new Date(time).getTime();
  return term < limit * 60000 ? term : 0;
}

export { getReservationInfo, deleteReservation, validTime };
