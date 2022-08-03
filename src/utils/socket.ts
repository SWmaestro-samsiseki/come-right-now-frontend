import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:8080';

function initSocket(userType: string) {
  const token = localStorage.getItem('token') as string;

  const socket = io(BASE_URL, {
    extraHeaders: {
      auth: token,
    },
  });
  socket.on('connect', () => {
    console.log('connected');
  });

  if (userType === 'STORE') {
    // socket.on('requestSeat', (data) => {
    //   console.log(data);
    // });
  }

  return socket;
}

export default initSocket;
