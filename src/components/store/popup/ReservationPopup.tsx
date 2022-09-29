import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../../../styles/thema';
import type { ReservationDTO } from '../../../utils/interface';

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  border-radius: 8px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 16px;
    background: ${thema.color.primary.main1_active};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;
const Title = styled.h1`
  margin: 44px 0 24px;
  font: ${thema.font.h5};
  color: ${thema.color.primary.main2};
`;
const InfoContainer = styled.div`
  font: ${thema.font.p1};
  color: ${thema.color.primary.main2_active};

  & p:first-child {
    margin-bottom: 12px;
    font: ${thema.font.h2};
    color: ${thema.color.primary.main2};
  }
  & p span {
    color: ${thema.color.alert.blue};
  }
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 54px;

  & button {
    width: 145px;
    height: 44px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    font: ${thema.font.pb2};
  }
  & button:nth-child(1) {
    border: 1px solid ${thema.color.secondary.main3};
    background-color: ${thema.color.secondary.main2};
    color: ${thema.color.primary.main2};
  }
  & button:nth-child(2) {
    background-color: ${thema.color.primary.main2};
    color: ${thema.color.primary.main3};
  }
`;

function ReservationPopup({
  item,
  close,
  navigate,
}: {
  item: ReservationDTO;
  close: VoidFunction;
  navigate: NavigateFunction;
}) {
  const timeString = new Date(item.estimatedTime).toLocaleTimeString();
  const time = timeString.slice(0, timeString.lastIndexOf(':'));

  function detail() {
    navigate('/main/reservation', { replace: true });
    close();
  }
  return (
    <PopupContainer>
      <Title>도착 예정</Title>
      <InfoContainer>
        <p>{time}</p>
        <p>
          {item.user.name} 외 {item.numberOfPeople - 1}명 도착 예정
        </p>
      </InfoContainer>
      <BtnContainer>
        <button onClick={close}>닫기</button>
        <button onClick={detail}>상세보기</button>
      </BtnContainer>
    </PopupContainer>
  );
}

export default ReservationPopup;
