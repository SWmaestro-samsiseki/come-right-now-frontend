import type { Reservation } from '../stores/store/reservationStore';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  min-height: 140px;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 30px;
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 92px;
    height: 64px;
    font: normal 700 24px / 32px 'IBM Plex Sans KR';
    text-align: center;
  }
`;
const Info = styled.div`
  padding-left: 30px;
  margin-left: 20px;
  border-left: 1px solid #ccc;
  & h3 {
    font: normal 700 24px / 32px 'IBM Plex Sans KR';
    margin-bottom: 6px;
  }
  & p {
    font: normal 500 14px / 20px 'IBM Plex Sans KR';
  }
`;
const ButtonBox = styled.div`
  display: flex;

  & button {
    width: 80px;
    height: 84px;
    border: none;
    border-radius: 4px;
    margin-left: 20px;
    font: normal 700 16px / 22px 'IBM Plex Sans KR';
  }
  & button:nth-child(1) {
    border: 2px solid #282828;
    background-color: white;
    color: #282828;
  }
  & button:nth-child(2) {
    border: 2px solid #ff5555;
    background-color: #ffe7e7;
    color: #ff5555;
  }
  & button:nth-child(3) {
    background-color: #54c2ff;
    color: white;
  }
`;

function RequestItem({ item }: { item: Reservation }) {
  const date = new Date(item.estimatedTime);
  const dateString = date.toLocaleTimeString();
  const time = dateString.slice(0, dateString.indexOf(':', 7));
  return (
    <ItemContainer>
      <InfoContainer>
        <p>{time}</p>
        <Info>
          <h3>
            {'한재혁'} 외 {item.peopleNumber - 1}명
          </h3>
          <p>{item.phone}</p>
          <p>신용등급 : {item.creditRate}점</p>
        </Info>
      </InfoContainer>
      <ButtonBox>
        <button>위치확인</button>
        <button>거절</button>
        <button>수락</button>
      </ButtonBox>
    </ItemContainer>
  );
}

export default RequestItem;