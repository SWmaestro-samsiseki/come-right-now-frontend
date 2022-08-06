import { io, Socket } from 'socket.io-client';

const BASE_URL = 'http://localhost:8080';

const socket: { [key: string]: Socket } = {};
const useSocket = (token: string): [Socket] => {
  if (!socket[token]) {
    socket[token] = io(BASE_URL, {
      extraHeaders: {
        auth: token,
      },
    });
  }

  return [socket[token]];
};

export default useSocket;
