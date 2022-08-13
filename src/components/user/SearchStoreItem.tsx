import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSocket from '../../utils/useSocket';
import useReservationStore from '../../stores/user/reservationStore';
import { deleteReservation } from '../../utils/reservation';
import type { ReservationInUser } from '../../utils/interface';

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  padding: 5px 15px;
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;

  & button {
    width: 58px;
    height: 24px;
    border: 1px solid #282828;
    border-radius: 4px;
    font: normal 700 12px / 16px 'IBM Plex Sans KR';
    color: #282828;
    background: none;
  }
  & button.done {
    color: #bbb;
    border: 1px solid #bbb;
  }
  & span {
    margin-top: 4px;
    font: normal 500 12px / 16px 'IBM Plex Sans KR';
    color: #282828;
  }
  & span.limit {
    color: #f55;
  }
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: #f5f5f5;

  & img {
    width: 100%;
  }
`;
const InfoBox = styled.div`
  max-width: 70%;
  height: 90%;
  margin-left: 15px;
`;
const InfoMain = styled.div`
  display: flex;
  align-items: center;
  height: 50%;

  & span:nth-child(1) {
    font: normal 700 14px / 20px 'IBM Plex Sans KR';
    color: #282828;
  }
  & span:nth-child(2) {
    margin-left: 5px;
    font: normal 500 12px / 16px 'IBM Plex Sans KR';
    color: #888;
  }
`;
const InfoSub = styled.div`
  display: flex;
  align-items: center;
  height: 50%;

  & span:nth-child(1) {
    display: flex;
    align-items: center;
    font: normal 500 14px / 20px 'IBM Plex Sans KR';
    color: #282828;
  }
  & span:nth-child(2) {
    margin-left: 10px;
    font: normal 500 14px / 20px 'IBM Plex Sans KR';
    color: #1593fd;
  }
  & span:nth-child(3) {
    margin-left: 5px;
  }
`;

function SearchStoreItem({ item }: { item: ReservationInUser }) {
  const [limitTime] = useState(new Date().getTime() + 180000);
  const [time, setTime] = useState('03:00');
  const [isLimit, setIsLimit] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { addReservation } = useReservationStore();
  const navigate = useNavigate();

  function reservation() {
    socket.emit(
      'user.make-reservation.server',
      { storeId: item.store.id, reservationId: item.id },
      (response: boolean) => {
        if (response) {
          console.log('예약에 성공했습니다.');
          addReservation(item);
          navigate('/main', { replace: true });
        } else {
          console.log('예약에 실패했습니다.');
        }
      },
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const total = limitTime - new Date().getTime();
      const min = Math.floor(total / 60000);
      const sec = Math.floor((total % 60000) / 1000);
      if (min === 0) {
        setIsLimit(true);
      }
      if (min <= 0 && sec <= 0) {
        clearInterval(intervalId);
        setTime(`00:00`);
        setIsDone(true);
      } else setTime(`0${min}:${sec < 10 ? '0' + sec : sec}`);
    }, 1000);
    return () => {
      if (intervalId) clearInterval(intervalId);
      deleteReservation(item.id).then((res) => {
        if (res) {
          console.log('삭제에 성공했습니다.');
        } else {
          console.log('삭제에 실패했습니다.');
        }
      });
    };
  }, []);

  return (
    <ItemContainer>
      <InfoContainer>
        <ImageBox>
          <img src={item.store.storeImage ? 'item.store.storeImage' : ''} alt="가게 이미지" />
        </ImageBox>
        <InfoBox>
          <InfoMain>
            <span>{item.store.businessName}</span>
            <span>{item.store.storeType}</span>
          </InfoMain>
          <InfoSub>
            <span>
              <img src={require('../../images/star_on.png')} alt="평점 이미지" width={18} />
              {item.store.starRate}/5.0
            </span>
            <span>{new Date(item.estimatedTime).toLocaleTimeString()}</span>
            <span>
              <img src={require('../../images/down.png')} alt="더보기 아이콘" />
            </span>
          </InfoSub>
        </InfoBox>
      </InfoContainer>
      <BtnContainer>
        <button className={isDone ? 'done' : ''} onClick={reservation} disabled={isDone}>
          예약
        </button>
        <span className={isLimit ? 'limit' : ''}>{time}</span>
      </BtnContainer>
    </ItemContainer>
  );
}

export default SearchStoreItem;
