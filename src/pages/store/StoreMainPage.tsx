import { useEffect } from 'react';
import socket from '../../utils/socket';
import StoreHeader from '../../components/StoreHeader';
import StoreSection from './StoreSection';
import StoreAd from '../../components/StoreAd';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function StoreMainPage() {
  useEffect(() => {
    socket.on(socket.id, (data) => {
      console.log(data);
    });
  });
  return (
    <MainContainer>
      <StoreHeader />
      <StoreSection />
      <StoreAd />
    </MainContainer>
  );
}

export default StoreMainPage;
