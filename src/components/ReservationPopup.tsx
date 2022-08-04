import type { Reservation } from '../stores/store/reservationStore';
import styled from 'styled-components';

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
const TimeSpan = styled.span`
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

function ReservationPopup({ item, close }: { item: Reservation; close: VoidFunction }) {
  const date = new Date(item.estimatedTime);
  const dateString = date.toLocaleTimeString();
  const time = dateString.slice(0, dateString.indexOf(':', 7));

  return (
    <PopupContainer>
      <Title>도착 예정</Title>
      <TimeSpan>{time}</TimeSpan>
      <InfoContainer>
        <p>
          {item.userName} 외 {item.peopleNumber - 1}명 도착 예정
        </p>
      </InfoContainer>
      <ButtonContainer>
        <button onClick={close}>닫기</button>
        <button>상세보기</button>
      </ButtonContainer>
    </PopupContainer>
  );
}

export default ReservationPopup;
