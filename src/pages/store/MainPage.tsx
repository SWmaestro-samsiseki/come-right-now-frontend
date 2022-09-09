import { useEffect } from 'react';
import styled from 'styled-components';
import useAuthStore from '../../stores/authStore';
import useStandStore from '../../stores/store/standStore';
import useReservationStore from '../../stores/store/reservationStore';
import { fetchStoreInfo } from '../../utils/auth';
import { getReservationList, getRequestList } from '../../utils/reservation';
import MainHeader from '../../components/store/MainHeader';
import MainSection from '../../components/store/MainSection';
import MainAd from '../../components/store/MainAd';
import MainSocket from '../../components/store/MainSocket';
import type { StoreAuth } from '../../utils/interface';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function StoreMainPage() {
  const { setUser } = useAuthStore();
  const { addStand } = useStandStore();
  const { addReservation } = useReservationStore();

  useEffect(() => {
    fetchStoreInfo().then((res) => {
      setUser(res as StoreAuth);
      getReservationList(res.id).then((res) => {
        if (res.length !== 0) {
          res.forEach((ele) => addReservation(ele));
        }
      });
      getRequestList(res.id).then((res) => {
        if (res.length !== 0) {
          res.forEach((ele) => addStand(ele));
        }
      });
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
