import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '../../stores/authStore';
import useRequestStore from '../../stores/user/requestStore';
import useSocket from '../../utils/useSocket';
import UserRequestHeader from '../../components/user/RequestHeader';
import RequestStep from '../../components/user/RequestStep';
import RequestCategory from '../../components/user/RequestCategory';
import RequestStatus from '../../components/user/RequestStatus';

const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const SearchBtn = styled.button`
  position: fixed;
  bottom: 0;
  width: 320px;
  height: 48px;
  margin: 20px;
  font: normal 700 14px / 20px 'IBM Plex Sans KR';
  color: white;
  background: #ddd;
  border: none;
  border-radius: 4px;

  &.active {
    background: #54c2ff;
  }
  &:active {
    background: #0ba8ff;
  }
`;
function RequestPage() {
  const token = localStorage.getItem('token') as string;
  const [socket] = useSocket(token);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { selectedCategories, people, time, latitude, longitude } = useRequestStore();

  function findStore() {
    // TODO: 준호와 이벤트명세 확정하고 수정하기
    if (socket) {
      socket.emit('user.find-store.server', {
        categories: selectedCategories.map((ele) => ele.id),
        numberOfPeople: people,
        arrivedAt: new Date(new Date().getTime() + time * 60000),
        userId: user?.id,
        latitude: latitude,
        longitude: longitude,
      });
      navigate('/search', { replace: true });
    } else {
      console.log('소켓이 활성화되지 않았습니다.');
      // TODO: SweetAlert2를 사용해 알림창 띄우기
    }
  }
  return (
    <RequestContainer>
      <UserRequestHeader />
      <RequestStep step={1} name={'주종'} />
      <RequestCategory />
      <RequestStep step={2} name={'인원'} />
      <RequestStatus type={'people'} />
      <RequestStep step={3} name={'시간'} />
      <RequestStatus type={'time'} />
      <SearchBtn onClick={findStore} className={selectedCategories.length > 0 ? 'active' : ''}>
        지금갈게
      </SearchBtn>
    </RequestContainer>
  );
}

export default RequestPage;
