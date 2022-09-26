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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  try {
    const response = await fetch(
      `${BASE_URL}/time-deal/user?latitude=${latitude}&longitude=${longitude}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
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

async function requestTimeDealByUser(timeDealId: number): Promise<boolean | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/participant`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        timeDealId: timeDealId,
      }),
    });
    if (response.ok) {
      return true;
    } else {
      if (response.status === 400) {
        return {
          error: true,
          message: '종료된 타임딜입니다.',
        };
      } else if (response.status === 404) {
        return {
          error: true,
          message: '존재하지 않은 타임딜입니다.',
        };
      } else {
        return {
          error: true,
          message: '서버오류로 인해 타임딜을 신청하지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 타임딜을 신청하지 못했습니다.',
    };
  }
}

export { postTimeDeal, getTimeDealByUser, requestTimeDealByUser };
