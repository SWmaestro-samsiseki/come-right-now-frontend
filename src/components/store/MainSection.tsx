import { Routes, Route, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SectionReservation from '../../pages/store/SectionReservation';
import SectionRequest from '../../pages/store/SectionRequest';

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
  &.current {
    color: white;
    background: #54c2ff;
  }
`;
const ContentContainer = styled.div`
  width: 85%;
  height: 100%;
`;
const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  & img {
    position: relative;
    width: 100%;
    transform: translateY(-5%);
  }
`;

function StoreSection() {
  const param = useParams();

  return (
    <MainContainer>
      <ButtonContainer>
        <Button to="/main/reservation" className={param['*'] === 'reservation' ? 'current' : ''}>
          예약
        </Button>
        <Button to="/main/request" className={param['*'] === 'request' ? 'current' : ''}>
          대기
        </Button>
      </ButtonContainer>
      <ContentContainer>
        <Routes>
          <Route
            path=""
            element={
              <ImgContainer>
                {/* <img src={require('../../images/temp_img.jpeg')} alt="가게전경사진" /> */}
              </ImgContainer>
            }
          />
          <Route path="reservation" element={<SectionReservation />} />
          <Route path="request" element={<SectionRequest />} />
        </Routes>
      </ContentContainer>
    </MainContainer>
  );
}
export default StoreSection;
