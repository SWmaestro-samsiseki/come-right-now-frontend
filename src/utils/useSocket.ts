import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const BASE_URL = 'http://localhost:8080';
const socket: { [key: string]: Socket } = {};

interface SocketHooks {
  socket: Socket;
  acceptReservation: (userId: string, reservationId: number) => void;
}

const useSocket = (token: string): SocketHooks => {
  const acceptReservation = useCallback(
    (userId: string, reservationId: number) => {
      socket[token].emit(
        'store.accept-seat.server',
        {
          userId,
          reservationId,
        },
        (response: { isSuccess: boolean; message?: object }) => {
          if (response.isSuccess) {
            console.log(response.isSuccess, ': 자리요청 수락에 성공했습니다.');
          } else {
            console.log(response.isSuccess, ': 자리요청 수락에 실패했습니다.');
            console.log(response.message);
          }
        },
      );
    },
    [socket[token]],
  );

  if (!socket[token]) {
    socket[token] = io(BASE_URL, {
      extraHeaders: {
        auth: token,
      },
    });
  }

  return { socket: socket[token], acceptReservation };
};

export default useSocket;
