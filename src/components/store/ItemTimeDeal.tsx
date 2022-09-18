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
const LimitTimeBox = styled.div`
  position: absolute;
  right: 113px;
  font: ${thema.font.p2};
  color: ${thema.color.alert.red};
`;
const CloseBtn = styled.button`
  position: absolute;
  right: 18px;
  width: 80px;
  height: 84px;
  background: ${thema.color.primary.main3};
  border: 1px solid ${thema.color.alert.red};
  border-radius: 4px;
  font: ${thema.font.pb1};
  color: ${thema.color.alert.red};
`;

function ItemTimeDeal({ item }: { item: TimeDealStoreDTO }) {
  const timeString = new Date(item.endTime).toLocaleTimeString();
  const time = timeString.slice(0, timeString.lastIndexOf(':'));
  const [limit, setLimit] = useState('00:00:00');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const term = new Date(item.endTime).getTime() - new Date().getTime();
      if (term >= 0) {
        setLimit(String(term));
      } else {
        console.log('이미 끝남');
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
        <LimitTimeBox>종료까지 {limit}</LimitTimeBox>
        <CloseBtn>종료</CloseBtn>
      </ControlBox>
    </TimeDealContainer>
  );
}

export default ItemTimeDeal;
