import useSocket from '../../utils/useSocket';
import type { ReservationInUser } from '../../utils/interface';
import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  height: 72px;
  border: 1px solid black;
`;

function SearchStoreItem({ item }: { item: ReservationInUser }) {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);

  function test() {
    socket.emit(
      'user.make-reservation.server',
      { storeId: item.store.id, reservationId: item.reservationId },
      (response: boolean) => {
        if (response) {
          console.log('예약에 성공했습니다.');
        } else {
          console.log('예약에 실패했습니다.');
        }
      },
    );
  }

  return (
    <ItemContainer>
      <button onClick={test}>예약</button>
    </ItemContainer>
  );
}

export default SearchStoreItem;
