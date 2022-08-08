import type { category } from '../stores/user/requestStore';
import type { createReservationDTO } from '../stores/user/requestStore';

const BASE_URL = 'http://localhost:8080';

async function fetchCategories(): Promise<Array<category>> {
  const response = await fetch(`${BASE_URL}/category`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse;
}

async function addRequest(datas: createReservationDTO[]): Promise<Response> {
  const response = await fetch(`${BASE_URL}/reservation`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datas),
  });
  return response;
}

export { fetchCategories, addRequest };
