import type { ErrorDTO, ReservationDTO } from '../utils/interface';

const BASE_URL = 'http://devserver.jigeumgo.com';

async function getReservationList(id: string): Promise<ReservationDTO[]> {
  const response = await fetch(`${BASE_URL}/reservation/store/${id}?status=reserved`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse;
}

async function getRequestList(id: string): Promise<ReservationDTO[]> {
  const response = await fetch(`${BASE_URL}/reservation/store/${id}?status=requested`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse;
}

function getReservation(id: string): Promise<ReservationDTO | ErrorDTO> {
  return fetch(`${BASE_URL}/reservation/user/${id}?status=reserved`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return {
          error: true,
          message: '예약내역이 없습니다.',
        };
      }
      return response.json();
    })
    .catch(() => {
      return {
        error: true,
        message: '서버오류로 인해 예약내역을 가져오지 못했습니다.',
      };
    });
}

async function getReservationInfo(id: number): Promise<ReservationDTO | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/reservation/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      return {
        error: true,
        message: '예약내역이 없습니다.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버 오류로 인해 예약정보를 가져오지 못했습니다.',
    };
  }
}

async function deleteReservation(id: number): Promise<boolean | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/reservation/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      return true;
    } else {
      return {
        error: true,
        message: '예약내역이 없습니다.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 예약취소에 실패했습니다.',
    };
  }
}

function calTermTime(time: Date): number {
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

async function getHistoryByUser(id: string): Promise<ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (response.ok) {
      return await response.json();
    } else {
      return {
        error: true,
        message: '서버오류로 인해 예약내역을 가져오지 못했습니다.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 예약내역을 가져오지 못했습니다.',
    };
  }
}

export {
  getReservationList,
  getRequestList,
  getReservation,
  getReservationInfo,
  deleteReservation,
  calTermTime,
  getDistance,
  getHistoryByUser,
};
