import { useEffect } from 'react';
import socket from '../../utils/socket';

function SearchPage() {
  useEffect(() => {
    socket.on('availableSeat', (data) => {
      console.log(data);
    });
  });
  return <div>탐색중입니다.</div>;
}

export default SearchPage;
