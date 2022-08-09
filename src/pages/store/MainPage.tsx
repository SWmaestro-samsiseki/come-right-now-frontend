import type { Store } from '../../stores/authStore';
import styled from 'styled-components';
import { fetchStoreInfo } from '../../utils/auth';
import useAuthStore from '../../stores/authStore';
import MainHeader from '../../components/store/MainHeader';
import MainSection from '../../components/store/MainSection';
import MainAd from '../../components/store/MainAd';
import MainSocket from '../../components/store/MainSocket';
import { useEffect } from 'react';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function StoreMainPage() {
  const { setUser } = useAuthStore();
  useEffect(() => {
    fetchStoreInfo().then((res) => setUser(res as Store));
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
