import styled from 'styled-components';
import useAuthStore from '../../stores/authStore';
import { fetchStoreInfo } from '../../utils/auth';
import MainHeader from '../../components/store/MainHeader';
import MainSection from '../../components/store/MainSection';
import MainAd from '../../components/store/MainAd';
import MainSocket from '../../components/store/MainSocket';
import type { StoreAuth } from '../../utils/interface';
import { useEffect } from 'react';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function StoreMainPage() {
  // TODO: store-info 가져오는 코드 작성하기
  const { setUser } = useAuthStore();
  useEffect(() => {
    fetchStoreInfo().then((res) => setUser(res as StoreAuth));
  }, []);
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
