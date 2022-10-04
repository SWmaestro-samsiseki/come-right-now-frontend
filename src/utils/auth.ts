import type { ErrorDTO, LoginOutputDTO, UserAuth, StoreAuth } from '../utils/interface';

const BASE_URL = 'http://devserver.jigeumgo.com';

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

function login(id: string, pw: string): Promise<LoginOutputDTO | ErrorDTO> {
  return fetch(`${BASE_URL}/account/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: id,
      password: pw,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return {
          error: true,
          message: '아이디나 비밀번호가 틀렸습니다.',
        };
      }
      return response.json();
    })
    .catch(() => {
      return {
        error: true,
        message: '서버오류로 인해 로그인에 실패했습니다.',
      };
    });
}

async function fetchUserInfo(): Promise<UserAuth> {
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

async function fetchStoreInfo(): Promise<StoreAuth> {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/store/my-info`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const parse = await response.json();
  return parse;
}

export { authValid, login, fetchUserInfo, fetchStoreInfo };
