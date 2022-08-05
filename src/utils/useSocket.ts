import { useEffect, useState } from 'react';
import useAuthStore from '../stores/authStore';
import { io, Socket } from 'socket.io-client';

const BASE_URL = 'http://localhost:8080';

const useSocket = (token: string) => {
  const { userType } = useAuthStore();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  if (!socket) {
    const newSocket = io(BASE_URL, {
      extraHeaders: {
        auth: token,
      },
    });
    setSocket(newSocket);
  }

  useEffect(() => {
    if (socket && userType === 'STORE') {
      socket.on('requestSeat', (data) => {
        console.log(data);
      });
    }
  }, [socket, userType]);

  return [socket];
};

export default useSocket;
