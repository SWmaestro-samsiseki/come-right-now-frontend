import styled from 'styled-components';
import useRequestStore from '../../stores/user/requestStore';

const StatusContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  font: normal 700 14px / 20px 'IBM Plex Sans KR';
  color: #282828;

  & p {
    position: absolute;
    bottom: 0;
    font: normal 500 12px / 16px 'IBM Plex Sans KR';
    color: #888;
  }
`;
const Controller = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 72px;
  height: 24px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    margin: 2px;
    border: none;
    border-radius: 4px;
    background: #ddd;
    color: white;
  }
  & button:active {
    background: #0ba8ff;
  }
`;

function RequestStatus({ type }: { type: string }) {
  const { people, time, plusPeople, minusPeople, plusTime, minusTime } = useRequestStore();
  return (
    <StatusContainer>
      <Controller>
        <button onClick={type === 'people' ? minusPeople : minusTime}>-</button>
        <span>{type === 'people' ? people : time}</span>
        <button onClick={type === 'people' ? plusPeople : plusTime}>+</button>
      </Controller>
      <span>{type === 'people' ? '명이서' : '분 뒤에'} 갈게</span>
      {type === 'time' ? (
        <p>
          {new Date(new Date().getTime() + time * 60000).getHours()}:
          {new Date(new Date().getTime() + time * 60000).getMinutes()} 에 출발예정
        </p>
      ) : null}
    </StatusContainer>
  );
}

export default RequestStatus;
