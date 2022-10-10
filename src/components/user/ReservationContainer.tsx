import { useEffect } from 'react';
import styled from 'styled-components';
import useAuthStore from '../../stores/authStore';
import useReservationStore from '../../stores/user/reservationStore';
import ReservationItem from './ReservationItem';
import { getReservation } from '../../utils/reservation';
import thema from '../../styles/thema';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: auto;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  margin: 10px 0;
`;

const EmptyReservation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 185px;
  font: ${thema.font.p2};
`;

function ReservationContainer() {
  const { user } = useAuthStore();
  const { reservation, addReservation } = useReservationStore();

  useEffect(() => {
    if (user !== null) {
      getReservation(user.id).then((res) => {
        if (!('error' in res)) {
          addReservation(res[0]);
        } else {
          console.log(res.message);
        }
      });
    }
  }, [user]);

  return (
    <Container>
      {!reservation ? (
        <EmptyReservation>예약 내역이 없습니다.</EmptyReservation>
      ) : (
        <ReservationItem reservation={reservation} />
      )}
    </Container>
  );
}

export default ReservationContainer;
