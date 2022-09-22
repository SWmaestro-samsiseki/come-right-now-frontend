import { TimeDealStoreDTO, TimeDealUserDTO, ErrorDTO } from './interface';

const BASE_URL = 'http://localhost:8080';

async function postTimeDeal(
  duration: number,
  benefit: string,
): Promise<TimeDealStoreDTO | ErrorDTO> {
  try {
    const resposne = await fetch(`${BASE_URL}/time-deal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        duration,
        benefit,
      }),
    });
    if (resposne.ok) {
      const jsonResponse = await resposne.json();
      delete jsonResponse.status;
      delete jsonResponse.id;
      jsonResponse.participants = [];
      return jsonResponse;
    } else {
      return {
        error: true,
        message: '타임딜 게시에 실패했습니다. 잠시뒤에 다시 시도하세요.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 타임딜 게시에 실패했습니다.',
    };
  }
}

async function getTimeDealByUser(
  latitude: number,
  longitude: number,
): Promise<TimeDealUserDTO[] | ErrorDTO> {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(
      `${BASE_URL}/time-deal/user?latitude=${latitude}&longitude=${longitude}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status === 404) {
        return {
          error: true,
          message: '타임딜 항목이 없습니다.',
        };
      } else {
        return {
          error: true,
          message: '서버오류로 인해 타임딜목록을 받아오지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 타임딜목록을 받아오지 못했습니다.',
    };
  }
}

export { postTimeDeal, getTimeDealByUser };
