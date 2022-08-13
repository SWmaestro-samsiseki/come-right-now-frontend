import styled from 'styled-components';
import { useEffect } from 'react';
import useSocket from '../../utils/useSocket';
import useResponseInfoStore from '../../stores/user/responseInfoStore';
import { getReservationInfo } from '../../utils/reservation';
import SearchMap from '../../components/user/SearchMap';
import SearchStoreList from '../../components/user/SearchStoreList';

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function SearchPage() {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { addResponse } = useResponseInfoStore();

  useEffect(() => {
    socket.on('server.available-seat.user', (reservationId: number) => {
      console.log('가게의 수락이벤트를 받는데 성공했습니다.');
      getReservationInfo(reservationId).then((res) => {
        const response = {
          id: reservationId,
          numberOfPeople: res.numberOfPeople,
          estimatedTime: res.estimatedTime,
          createdAt: res.createdAt,
          reservationStatus: res.reservationStatus,
          store: res.store,
        };
        addResponse(response);
      });
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
