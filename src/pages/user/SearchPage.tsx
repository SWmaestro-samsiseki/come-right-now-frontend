import { useEffect } from 'react';
import useSocket from '../../utils/useSocket';

function SearchPage() {
  const token = localStorage.getItem('token') as string;
  const [socket] = useSocket(token);

  useEffect(() => {
    socket.on('server.available-seat.user', () => {
      // TODO: 지윤이랑 이벤트명세 확정하고 콜백함수 구현하기
    });
    return () => {
      socket.off('server.available-seat.user');
    };
  }, [socket]);

  return <div>탐색중입니다.</div>;
}

export default SearchPage;
