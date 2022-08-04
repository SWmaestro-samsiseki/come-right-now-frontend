import useReservationStore from '../../stores/store/reservationStore';
import ReservationItem from '../../components/ReservationItem';
import styled from 'styled-components';

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

function StoreReservationList() {
  const { reservationList } = useReservationStore();

  return (
    <ListContainer>
      {reservationList.map((item, index) => (
        <ReservationItem key={index} item={item} />
      ))}
    </ListContainer>
  );
}

export default StoreReservationList;
