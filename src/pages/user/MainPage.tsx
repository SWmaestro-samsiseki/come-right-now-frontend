import { useEffect } from 'react';
import styled from 'styled-components';
import useSocket from '../../utils/useSocket';
import useAuthStore from '../../stores/authStore';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useReservationStore from '../../stores/user/reservationStore';
import { fetchUserInfo } from '../../utils/auth';
import { fetchCategories } from '../../utils/request';
import { getReservation } from '../../utils/reservation';
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
  const { initCategories, setLatitude, setLongitude } = useRequestInfoStore();
  const { addReservation, removeReservation } = useReservationStore();

  useEffect(() => {
    // TODO: 위치를 반환하는 Custom Hooks 구현하기
    // TODO: 위치를 반환하기 전까지 요청을 보낼 수 없도록 구현하기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log('위치를 가져오는데 성공했습니다.');
        },
        () => {
          console.log('위치를 가져오는데 실패했습니다.');
        },
      );
    } else {
      // 브라우저가 GPS를 지원하지 않는 경우
    }
  }, []);

  useEffect(() => {
    fetchCategories().then((res) => initCategories(res));
    fetchUserInfo().then((res) => {
      setUser(res as UserAuth);
      getReservation(res.id).then((res) => {
        if (res.length !== 0) {
          addReservation(res[0]);
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
      <UserHeader />
      <UserSection />
      <UserMenu />
    </MainContainer>
  );
}

export default UserMainPage;
