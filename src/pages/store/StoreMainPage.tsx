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
  const { socket, setSocket } = useSocketStore();

  useEffect(() => {
    setSocket(initSocket());
    if (socket) {
      socket.on('requestSeat', (data) => {
        console.log(data);
      });
    }
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
