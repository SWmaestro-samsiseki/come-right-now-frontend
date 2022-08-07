import { useEffect } from 'react';
import styled from 'styled-components';
import MainHeader from '../../components/store/MainHeader';
import MainSection from '../../components/store/MainSection';
import MainAd from '../../components/store/MainAd';
import MainSocket from '../../components/store/MainSocket';
import useSocket from '../../utils/useSocket';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function StoreMainPage() {
  const token = localStorage.getItem('token') as string;
  const [socket] = useSocket(token);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
  }, []);

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
