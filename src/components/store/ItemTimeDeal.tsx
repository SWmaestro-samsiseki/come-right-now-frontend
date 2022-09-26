import { useEffect, useState } from 'react';
import styled from 'styled-components';
import thema from '../../styles/thema';
import type { TimeDealStoreDTO } from '../../utils/interface';

const TimeDealContainer = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  margin: 20px;
  border: 1px solid ${thema.color.secondary.main3};
  background: ${thema.color.primary.main3};
`;
const ControlBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88px;
    padding: 0 24px;
    border-right: 1px solid ${thema.color.secondary.main3};
    font: ${thema.font.h4};
  }
`;
const InfoBox = styled.div`
  margin-left: 38px;
  & p:first-child {
    font: ${thema.font.p1};
    margin-bottom: 4px;
  }
  & p:last-child {
    font: ${thema.font.h5};
    color: ${thema.color.alert.green};
  }
`;
const LimitTimeBox = styled.div<{ done: boolean }>`
  position: absolute;
  right: 113px;
  font: ${thema.font.p2};
  color: ${(props) => (props.done !== true ? thema.color.alert.red : thema.color.secondary.main4)};
`;
const CloseBtn = styled.button<{ done: boolean }>`
  position: absolute;
  right: 18px;
  width: 80px;
  height: 84px;
  background: ${thema.color.primary.main3};
  border: 1px solid
    ${(props) => (props.done !== true ? thema.color.alert.red : thema.color.secondary.main4)};
  border-radius: 4px;
  font: ${thema.font.pb1};
  color: ${(props) => (props.done !== true ? thema.color.alert.red : thema.color.secondary.main4)};
`;

function ItemTimeDeal({ item }: { item: TimeDealStoreDTO }) {
  const timeString = new Date(item.endTime).toLocaleTimeString();
  const time = timeString.slice(0, timeString.lastIndexOf(':'));
  const [limitTime, setLimitTime] = useState('00:00');
  const [isDone, setIsDone] = useState(false);

  function closeTimeDeal() {
    setIsDone(true);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const limit = new Date(item.endTime);
      const cur = new Date();
      const term = limit.getTime() - cur.getTime();
      if (term > 1000 && isDone) {
        const T = Math.floor(term / 1000);
        const M = Math.floor(T / 60);
        const S = T % 60;
        setLimitTime(`${M < 10 ? '0' + M : M}:${S < 10 ? '0' + S : S}`);
      } else {
        setIsDone(true);
        setLimitTime('00:00');
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TimeDealContainer>
      <ControlBox>
        <p>TIME DEAL</p>
        <InfoBox>
          <p>{time}까지 방문시</p>
          <p>{item.benefit}</p>
        </InfoBox>
        <LimitTimeBox done={isDone}>종료까지 {limitTime}</LimitTimeBox>
        <CloseBtn done={isDone} onClick={closeTimeDeal}>
          종료
        </CloseBtn>
      </ControlBox>
    </TimeDealContainer>
  );
}

export default ItemTimeDeal;
