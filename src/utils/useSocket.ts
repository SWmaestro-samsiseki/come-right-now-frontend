import type { FindStoreResponse } from '../stores/user/requestStore';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import useAuthStore from '../stores/authStore';
import useRequestStore from '../stores/user/requestStore';
import { addRequest } from './request';

const BASE_URL = 'http://localhost:8080';
const socket: { [key: string]: Socket } = {};

interface SocketHooks {
  socket: Socket;
  emitFindStore: () => void;
}

const useSocket = (token: string): SocketHooks => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { selectedCategories, people, time, latitude, longitude } = useRequestStore();

  const emitFindStore = useCallback(() => {
    socket[token].emit(
      'user.find-store.server',
      {
        categories: selectedCategories.map((ele) => ele.id),
        numberOfPeople: people,
        delayMinutes: time,
        userId: user?.id,
        longitude: longitude,
        latitude: latitude,
      },
      (response: FindStoreResponse) => {
        if (response.isSuccess) {
          console.log(response.datas);
          addRequest(response.datas)
            .then((res) => {
              if (res.status >= 400 && res.status < 500) {
                console.log(res.statusText);
              } else {
                //
              }
            })
            .catch((err) => console.log(err));
          navigate('/search', { replace: true });
        } else {
          // TODO: emit 실패시 SweetAlert2를 이용한 경고창 띄우기
        }
      },
    );
  }, [socket[token]]);

  if (!socket[token]) {
    socket[token] = io(BASE_URL, {
      extraHeaders: {
        auth: token,
      },
    });
  }

  return { socket: socket[token], emitFindStore };
};

export default useSocket;
