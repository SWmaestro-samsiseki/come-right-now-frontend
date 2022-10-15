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
  border-radius: 8px;
`;

const EmptyReservation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 185px;
  font: ${thema.font.p2};
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 8px;
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
