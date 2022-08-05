import type { category } from '../stores/user/requestStore';

const BASE_URL = 'http://localhost:8080';

interface findStoreDTO {
  categories: number[];
  numberOfPeople: number;
  arrivedAt: Date;
  userId: string | undefined;
  longitude: number | null;
  latitude: number | null;
}

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

export type { findStoreDTO };
export { fetchCategories };
