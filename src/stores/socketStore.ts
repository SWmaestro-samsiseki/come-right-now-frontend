import { Socket } from 'socket.io-client';
import create from 'zustand';

interface SocketInter {
  socket: Socket | undefined;
  setSocket: (socket: Socket) => void;
}

const useSocketStore = create<SocketInter>((set) => ({
  socket: undefined,
  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
}));

export default useSocketStore;
