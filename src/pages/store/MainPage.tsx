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
