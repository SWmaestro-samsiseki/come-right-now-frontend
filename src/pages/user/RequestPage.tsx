import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '../../stores/authStore';
import useRequestStore from '../../stores/user/requestStore';
import useSocket from '../../utils/useSocket';
import UserRequestHeader from '../../components/user/RequestHeader';
import RequestStep from '../../components/user/RequestStep';
import CategoryItem from '../../components/CategoryItem';

const RequestContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function RequestPage() {
  const token = localStorage.getItem('token') as string;
  const [socket] = useSocket(token);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    categories,
    selectedCategories,
    people,
    time,
    latitude,
    longitude,
    plusPeople,
    minusPeople,
    plusTime,
    minusTime,
  } = useRequestStore();

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
      {categories.map((ele, index) => (
        <CategoryItem key={index} category={ele} />
      ))}
      <RequestStep step={2} name={'인원'} />
      <div role="button" onClick={minusPeople}>
        -
      </div>
      {people}
      <div role="button" onClick={plusPeople}>
        +
      </div>
      <RequestStep step={3} name={'시간'} />
      <div role="button" onClick={minusTime}>
        -
      </div>
      {time}
      <div role="button" onClick={plusTime}>
        +
      </div>
      <button onClick={findStore}>지금갈게</button>
    </RequestContainer>
  );
}

export default RequestPage;
