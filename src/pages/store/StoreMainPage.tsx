import { useEffect } from 'react';
import initSocket from '../../utils/socket';
import StoreHeader from '../../components/StoreHeader';
import StoreSection from './StoreSection';
import StoreAd from '../../components/StoreAd';
import styled from 'styled-components';
import useSocketStore from '../../stores/socketStore';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function StoreMainPage() {
  const { setSocket } = useSocketStore();

  useEffect(() => {
    setSocket(initSocket());
  }, []);

  return (
    <MainContainer>
      <StoreHeader />
      <StoreSection />
      <StoreAd />
    </MainContainer>
  );
}

export default StoreMainPage;
