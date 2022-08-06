import { useEffect } from 'react';
import styled from 'styled-components';
import useAuthStore from '../../stores/authStore';
import useRequestStore from '../../stores/user/requestStore';
import { fetchUserInfo } from '../../utils/auth';
import { fetchCategories } from '../../utils/request';
import UserHeader from '../../components/UserHeader';
import UserSection from '../../components/UserSection';
import UserMenu from '../../components/UserMenu';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function UserMainPage() {
  const { setUser } = useAuthStore();
  const { initCategories, setLatitude, setLongitude } = useRequestStore();

  useEffect(() => {
    fetchCategories().then((res) => initCategories(res));
    fetchUserInfo().then((res) => setUser(res));
    // TODO: 위치를 반환하는 Custom Hooks 구현하기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          console.log('사용자의 위치를 가져오는데 실패했습니다.');
        },
      );
    } else {
      // 브라우저가 GPS를 지원하지 않는 경우
    }
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
