import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReservationItem from '../../components/user/ReservationItem';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
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
  return (
    <MainContainer>
      <ReservationItem />
      <RequestBtn to="/request" replace={true}>
        + 실시간 예약
      </RequestBtn>
    </MainContainer>
  );
}

export default SectionMain;
