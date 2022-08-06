import { useEffect } from 'react';
import StoreHeader from '../../components/StoreHeader';
import StoreSection from './StoreSection';
import StoreAd from '../../components/StoreAd';
import styled from 'styled-components';
import useSocket from '../../utils/useSocket';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function StoreMainPage() {
  const [socket] = useSocket(localStorage.getItem('token') as string);

  useEffect(() => {
    //
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
