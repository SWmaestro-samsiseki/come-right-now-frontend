import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useReservationStore from '../../stores/user/reservationStore';
import ReservationItem from '../../components/user/ReservationItem';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;
const ReservationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 160px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  margin: 10px 0;
`;
const RequestBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 48px;
  background: #54c2ff;
  border-radius: 4px;
  font: normal 700 14px / 20px 'IBM Plex Sans KR';
  color: white;
  text-decoration: none;
`;
function SectionMain() {
  const { reservation } = useReservationStore();
  return (
    <MainContainer>
      <ReservationContainer>
        {reservation ? <ReservationItem item={reservation} /> : '예약 내역이 없습니다.'}
      </ReservationContainer>
      <RequestBtn to="/request" replace={true}>
        + 실시간 예약
      </RequestBtn>
    </MainContainer>
  );
}

export default SectionMain;
