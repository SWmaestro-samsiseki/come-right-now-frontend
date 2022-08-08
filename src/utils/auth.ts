import type { User } from '../stores/authStore';

const BASE_URL = 'http://localhost:8080';

interface LoginOutputDTO {
  isSuccess: boolean;
  message: string;
  accessToken: string;
  userType: string;
}

async function authValid(): Promise<string> {
  const token = localStorage.getItem('token');
  if (token !== null) {
    const response = await fetch(`${BASE_URL}/account/validation`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const parse = await response.json();
    if (parse.statusCode === 200) {
      return parse.userType;
    } else return '';
  }
  return '';
}

async function login(id: string, pw: string): Promise<LoginOutputDTO> {
  const response = await fetch(`${BASE_URL}/account/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: id,
      password: pw,
    }),
  });
  const parse = await response.json();
  return parse;
}

async function fetchUserInfo(): Promise<User> {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/user/my-info`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const parse = await response.json();
  return parse;
}

export { authValid, login, fetchUserInfo };
