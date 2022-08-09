import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
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
  const navigate = useNavigate();
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { selectedCategories, people, time, latitude, longitude } = useRequestInfoStore();

  function findStore() {
    socket.emit(
      'user.find-store.server',
      {
        categories: selectedCategories.map((ele) => ele.id),
        numberOfPeople: people,
        delayMinutes: time,
        longitude: longitude,
        latitude: latitude,
      },
      (response: boolean) => {
        if (response) {
          console.log('자리요청 이벤트를 보내는데 성공했습니다.');
          navigate('/search', { replace: true });
        } else {
          // TODO: 이벤트 전송에 실패했다는 알림
          console.log('자리요청 이벤트를 보내는데 실패했습니다.');
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
        disabled={selectedCategories.length > 0 ? false : true}>
        지금갈게
      </SearchBtn>
    </RequestContainer>
  );
}

export default RequestPage;
