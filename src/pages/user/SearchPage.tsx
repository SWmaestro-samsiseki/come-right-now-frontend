import styled from 'styled-components';
import { useEffect } from 'react';
import useSocket from '../../utils/useSocket';
import SearchMap from '../../components/user/SearchMap';
import SearchStoreList from '../../components/user/SearchStoreList';

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
`;

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

  return (
    <SearchContainer>
      <SearchMap />
      <SearchStoreList />
    </SearchContainer>
  );
}

export default SearchPage;
