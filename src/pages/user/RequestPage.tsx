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
    socket.emit(
      'user.find-store.server',
      {
        categories: selectedCategories.map((ele) => ele.id),
        numberOfPeople: people,
        delayMinutes: time,
        userId: user?.id,
        latitude: latitude,
        longitude: longitude,
      },
      (response: boolean, data?: object) => {
        if (response) {
          // TODO: data를 이용해 POST 요청보내기
          navigate('/search', { replace: true });
        } else {
          // TODO: emit 실패시 SweetAlert2를 이용한 경고창 띄우기
        }
      },
    );
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
      <SearchBtn
        onClick={findStore}
        className={selectedCategories.length > 0 ? 'active' : ''}
        disabled={true}>
        지금갈게
      </SearchBtn>
    </RequestContainer>
  );
}

export default RequestPage;
