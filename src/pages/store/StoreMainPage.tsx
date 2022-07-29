import { useEffect } from 'react';
import socket from '../../utils/socket';

function StoreMainPage() {
  useEffect(() => {
    socket.on(socket.id, (data) => {
      console.log(data);
    });
  });
  return <div>사장 메인 페이지</div>;
}

export default StoreMainPage;
