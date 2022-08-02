import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:8080';

function initSocket() {
  const token = localStorage.getItem('token') as string;

  const socket = io(BASE_URL, {
    extraHeaders: {
      auth: token,
    },
  });
  socket.on('connect', () => {
    console.log('connected');
  });

  return socket;
}

export default initSocket;
