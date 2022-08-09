import type { ReservationInfo } from '../stores/store/storeManagerStore';
import styled from 'styled-components';
import useSocket from '../utils/useSocket';
import useStoreManagerStore from '../stores/store/storeManagerStore';
import { deleteReservation } from '../utils/reservation';

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  height: 300px;
  border-radius: 8px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 480px;
    height: 16px;
    background: #0ba8ff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;
const Title = styled.span`
  font: normal 700 18px / 24px 'IBM Plex Sans KR';
  color: #0ba8ff;
  margin-top: 44px;
`;
const PeopleSpan = styled.span`
  font: normal 700 40px / 52px 'IBM Plex Sans KR';
  color: #282828;
  margin-top: 18px;
`;
const InfoContainer = styled.div`
  font: normal 500 16px / 22px 'IBM Plex Sans KR';
  color: #555;
  margin-top: 14px;
  & span {
    color: #1593fd;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 36px;
  & button {
    width: 145px;
    height: 44px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    font: normal 700 14px / 20px 'IBM Plex Sans KR';
  }
  & button:nth-child(1) {
    border: 2px solid #ff5555;
    background-color: #ffe7e7;
    color: #ff5555;
  }
  & button:nth-child(2) {
    background-color: #54c2ff;
    color: white;
  }
`;

function RequestPopup({ item, close }: { item: ReservationInfo; close: VoidFunction }) {
  const token = localStorage.getItem('token') as string;
  const { acceptReservation } = useSocket(token);
  const { removeRequest } = useStoreManagerStore();

  const date = new Date(item.estimatedTime);
  const dateString = date.toLocaleTimeString('ko-KR');
  const time = dateString.slice(0, dateString.indexOf(':', 7));

  function reject() {
    deleteReservation(item.reservationId).then((res) => {
      if (res) {
        console.log('요청을 삭제하는데 성공했습니다.');
        removeRequest(item);
        close();
      } else {
        // TODO: 삭제에 실패했다는 알림
        console.log('요청을 삭제하는데 실패했습니다.');
      }
    });
  }
  function accept() {
    acceptReservation(item.user.id, item.reservationId);
    removeRequest(item);
    close();
  }

  return (
    <PopupContainer>
      <Title>자리 요청</Title>
      <PeopleSpan>{item.numberOfPeople}명</PeopleSpan>
      <InfoContainer>
        <div>
          도착시간 : <span>{time}</span>
        </div>
        <div>
          신용등급 : <span>{item.user.creditRate}점</span>
        </div>
      </InfoContainer>
      <ButtonContainer>
        <button onClick={reject}>거절</button>
        <button onClick={accept}>수락</button>
      </ButtonContainer>
    </PopupContainer>
  );
}

export default RequestPopup;
