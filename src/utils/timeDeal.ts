import { TimeDealStoreDTO, ErrorDTO } from './interface';

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

export { postTimeDeal };
