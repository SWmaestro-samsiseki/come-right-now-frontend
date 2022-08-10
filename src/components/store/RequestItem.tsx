import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSocket from '../../utils/useSocket';
import useStoreManagerStore from '../../stores/store/storeManagerStore';
import { deleteReservation, validTime } from '../../utils/reservation';
import type { ReservationInfo } from '../../stores/store/storeManagerStore';

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
    border: 2px solid #ff5555;
    background-color: #ffe7e7;
    color: #ff5555;
  }
  & button:nth-child(2) {
    background-color: #54c2ff;
    color: white;
  }
`;

function RequestItem({ item }: { item: ReservationInfo }) {
  const [time, setTime] = useState('');
  const token = localStorage.getItem('token') as string;
  const { acceptReservation } = useSocket(token);
  const { removeRequest } = useStoreManagerStore();

  function reject() {
    deleteReservation(item.reservationId).then((res) => {
      if (res) {
        console.log('요청을 삭제하는데 성공했습니다.');
        removeRequest(item);
      } else {
        // TODO: 삭제에 실패했다는 알림
        console.log('요청을 삭제하는데 실패했습니다.');
      }
    });
  }
  function accept() {
    acceptReservation(item.user.id, item.reservationId);
    removeRequest(item);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime('');
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    const term = validTime(item.createdAt);
    if (term) {
      const finalTime = new Date(
        new Date(item.estimatedTime).getTime() + term,
      ).toLocaleTimeString();
      setTime(finalTime.slice(0, finalTime.lastIndexOf(':')));
    } else {
      reject();
    }
  }, [time]);

  return (
    <ItemContainer>
      <InfoContainer>
        <p>{time}</p>
        <Info>
          <h3>
            {item.user.name} 외 {item.numberOfPeople - 1}명
          </h3>
          <p>{item.user.phone}</p>
          <p>신용등급 : {item.user.creditRate}점</p>
        </Info>
      </InfoContainer>
      <ButtonBox>
        <button onClick={reject}>거절</button>
        <button onClick={accept}>수락</button>
      </ButtonBox>
    </ItemContainer>
  );
}

export default RequestItem;
