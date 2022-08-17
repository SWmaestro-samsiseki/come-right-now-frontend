import type { Reservation } from '../utils/interface';

const BASE_URL = 'http://localhost:8080';

async function getReservationList(id: string): Promise<Reservation[]> {
  const response = await fetch(`${BASE_URL}/reservation/store/${id}?status=reserved`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse;
}

async function getRequestList(id: string): Promise<Reservation[]> {
  const response = await fetch(`${BASE_URL}/reservation/store/${id}?status=requested`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse;
}

async function getReservation(id: string): Promise<Reservation[]> {
  const response = await fetch(`${BASE_URL}/reservation/user/${id}?status=reserved`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.ok) {
    const parse = await response.json();
    return [parse];
  } else {
    return [];
  }
}

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
  const limit = 3;
  const term = new Date().getTime() - new Date(time).getTime();
  return term < limit * 60000 ? term : 0;
}

async function getDistance(id: string, latitude: number, longitude: number) {
  const response = await fetch(
    `${BASE_URL}/store/${id}/distance?latitude=${latitude}&longitude=${longitude}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
  const parse = await response.json();
  return parse;
}

export {
  getReservationList,
  getRequestList,
  getReservation,
  getReservationInfo,
  deleteReservation,
  validTime,
  getDistance,
};
