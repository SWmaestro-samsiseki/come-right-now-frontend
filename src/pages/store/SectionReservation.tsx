import styled from 'styled-components';
import useStoreManagerStore from '../../stores/store/storeManagerStore';
import ReservationItem from '../../components/store/ReservationItem';

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

function StoreReservationList() {
  const { reservationList } = useStoreManagerStore();

  return (
    <ListContainer>
      {reservationList.map((item, index) => (
        <ReservationItem key={index} item={item} />
      ))}
    </ListContainer>
  );
}

export default StoreReservationList;
