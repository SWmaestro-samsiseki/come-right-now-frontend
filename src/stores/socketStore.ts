import { Socket } from 'socket.io-client';
import create from 'zustand';

interface SocketStore {
  socket: Socket | undefined;
  setSocket: (socket: Socket) => void;
}

const useSocketStore = create<SocketStore>((set) => ({
  socket: undefined,
  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
}));

export default useSocketStore;
