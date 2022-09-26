import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import thema from '../../styles/thema';

const StatusContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  font: ${thema.font.pb2};
  color: ${thema.color.primary.main2};

  & p {
    position: absolute;
    bottom: 0;
    font: ${thema.font.p3};
    color: ${thema.color.secondary.main4};
  }
  & p.highlight {
    color: ${thema.color.primary.main1_active};
  }
`;
const Controller = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 84px;
  height: 28px;
  margin-right: 8px;
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 4px;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19px;
    height: 19px;
    margin: 2px;
    border: none;
    border-radius: 4px;
    background: ${thema.color.secondary.main3};
    color: ${thema.color.primary.main3};
  }
  & button:active {
    background: ${thema.color.primary.main2_active};
  }
`;

function RequestStatus({ type }: { type: string }) {
  const [isZero, setIsZero] = useState(true);
  const { people, time, plusPeople, minusPeople, plusTime, minusTime } = useRequestInfoStore();

  useEffect(() => {
    if (time !== 0) setIsZero(false);
    else setIsZero(true);
  }, [time]);

  return (
    <StatusContainer>
      <Controller>
        <button onClick={type === 'people' ? minusPeople : minusTime}>-</button>
        <span>{type === 'people' ? people : time}</span>
        <button onClick={type === 'people' ? plusPeople : plusTime}>+</button>
      </Controller>
      <span>{type === 'people' ? '명이서' : '분 뒤에'} 갈게</span>
      {type === 'time' ? (
        <p className={isZero ? '' : 'highlight'}>
          {new Date(new Date().getTime() + time * 60000).getHours()}:
          {new Date(new Date().getTime() + time * 60000).getMinutes() < 10
            ? '0' + new Date(new Date().getTime() + time * 60000).getMinutes()
            : new Date(new Date().getTime() + time * 60000).getMinutes()}{' '}
          에 출발예정
        </p>
      ) : null}
    </StatusContainer>
  );
}

export default RequestStatus;
