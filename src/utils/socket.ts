import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:8080';

function initSocket() {
  const socket = io(BASE_URL);

  socket.on('connect', () => {
    console.log('connected');
  });

  return socket;
}

const socket = initSocket();

export default socket;
