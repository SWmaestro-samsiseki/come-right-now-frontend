import type { category } from '../stores/requestStore';
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

export { fetchCategories };
