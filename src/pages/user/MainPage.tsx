import { useEffect } from 'react';
import styled from 'styled-components';
import useSocket from '../../utils/useSocket';
import useAuthStore from '../../stores/authStore';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useReservationStore from '../../stores/user/reservationStore';
import { fetchUserInfo } from '../../utils/auth';
import { fetchCategories } from '../../utils/request';
import { getReservation } from '../../utils/reservation';
import LoadingPage from '../LoadingPage';
import UserHeader from '../../components/user/MainHeader';
import UserSection from '../../components/user/MainSection';
import UserMenu from '../../components/user/MainMenu';
import type { UserAuth } from '../../utils/interface';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function UserMainPage() {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { setUser } = useAuthStore();
  const { initCategories } = useRequestInfoStore();
  const { addReservation, removeReservation } = useReservationStore();

  useEffect(() => {
    fetchCategories().then((res) => initCategories(res));
    fetchUserInfo().then((res) => {
      setUser(res as UserAuth);
      getReservation(res.id).then((res) => {
        if (!('error' in res)) {
          addReservation(res);
        } else {
          console.log(res.message);
        }
      });
    });
  }, []);

  useEffect(() => {
    socket.on('server.cancel-reservation.user', () => {
      // TODO: 가게측으로부터 예약이 취소되었다는 팝업
      removeReservation();
      console.log('가게로부터 해당 예약건이 취소되었습니다.');
    });
    socket.on('server.check-in.user', () => {
      // TODO: 쳬약이 성공적으로 처리되었다는 팝업
      removeReservation();
      console.log('가게로부터 해당 예약건이 CheckIn되었습니다.');
    });
  }, []);

  return (
    <MainContainer>
      <LoadingPage />
      <UserHeader />
      <UserSection />
      <UserMenu />
    </MainContainer>
  );
}

export default UserMainPage;
