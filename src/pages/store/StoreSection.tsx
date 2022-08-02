import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import StoreReservationList from './StoreReservationList';
import StoreRequestList from './StoreRequestList';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc((100% - 160px) * 0.9);
`;
const ButtonContainer = styled.div`
  width: 15%;
  height: 100%;
  border-right: 1px solid #d2d2d2;
`;
const Button = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  font: normal 700 24px / 32px 'IBM Plex Sans KR';
  color: #888;
  text-decoration: none;
  &:first-child {
    border-bottom: 1px solid #d2d2d2;
  }
`;
const ContentContainer = styled.div`
  width: 85%;
  height: 100%;
`;

function StoreSection() {
  return (
    <MainContainer>
      <ButtonContainer>
        <Button to="/main/reservation">예약</Button>
        <Button to="/main/request">대기</Button>
      </ButtonContainer>
      <ContentContainer>
        <Routes>
          <Route path="" element={<div>가게전경사진</div>} />
          <Route path="reservation" element={<StoreReservationList />} />
          <Route path="request" element={<StoreRequestList />} />
        </Routes>
      </ContentContainer>
    </MainContainer>
  );
}
export default StoreSection;
