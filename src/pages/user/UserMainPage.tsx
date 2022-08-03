import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../stores/user/authStore';
import useRequestStore from '../../stores/user/requestStore';
import useSocketStore from '../../stores/user/socketStore';
import { fetchUserInfo } from '../../utils/auth';
import { fetchCategories } from '../../utils/request';
import initSocket from '../../utils/socket';

function UserMainPage() {
  const { setUser } = useAuthStore();
  const { initCategories, setLatitude, setLongitude } = useRequestStore();
  const { setSocket } = useSocketStore();

  useEffect(() => {
    fetchCategories().then((res) => initCategories(res));
    fetchUserInfo().then((res) => setUser(res));
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
      // 브라우저가 GPS를 지원하지 않는 경우.
    }
    setSocket(initSocket());
  }, []);

  return (
    <div>
      <div role="button">
        <Link to="/request">실시간예약</Link>
      </div>
    </div>
  );
}

export default UserMainPage;
