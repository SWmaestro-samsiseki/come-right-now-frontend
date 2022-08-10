import styled from 'styled-components';
import MainHeader from '../../components/store/MainHeader';
import MainSection from '../../components/store/MainSection';
import MainAd from '../../components/store/MainAd';
import MainSocket from '../../components/store/MainSocket';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function StoreMainPage() {
  // TODO: store-info 가져오는 코드 작성하기
  // TODO: 이미 있는 예약내역, 대기내역 가져오는 코드 작성하기
  return (
    <MainContainer>
      <MainHeader />
      <MainSection />
      <MainAd />
      <MainSocket />
    </MainContainer>
  );
}

export default StoreMainPage;
