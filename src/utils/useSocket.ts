import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import useAuthStore from '../stores/authStore';
import useRequestInfoStore from '../stores/user/requestInfoStore';

const BASE_URL = 'http://localhost:8080';
const socket: { [key: string]: Socket } = {};

interface SocketHooks {
  socket: Socket;
  emitFindStore: () => void;
  acceptReservation: (id: number) => void;
}

const useSocket = (token: string): SocketHooks => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { selectedCategories, people, time, latitude, longitude } = useRequestInfoStore();

  const emitFindStore = useCallback(() => {
    socket[token].emit(
      'user.find-store.server',
      {
        categories: selectedCategories.map((ele) => ele.id),
        numberOfPeople: people,
        delayMinutes: time,
        longitude: longitude,
        latitude: latitude,
      },
      (response: boolean) => {
        if (response) {
          navigate('/search', { replace: true });
        } else {
          // TODO: 이벤트 전송에 실패했다는 알림
        }
      },
    );
  }, [socket[token]]);

  const acceptReservation = useCallback(
    (id: number) => {
      socket[token].emit('server.available-seat.user', {
        storeId: user?.id,
        reservationId: id,
      });
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

  return { socket: socket[token], emitFindStore, acceptReservation };
};

export default useSocket;
