import { useEffect } from 'react';
import useSocketStore from '../../stores/socketStore';

function SearchPage() {
  const { socket } = useSocketStore();
  useEffect(() => {
    if (socket) {
      socket.on('availableSeat', (data) => {
        console.log(data);
      });
    }
  });
  return <div>탐색중입니다.</div>;
}

export default SearchPage;
