import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../../../utils/useSocket';
import useStandStore from '../../../stores/store/standStore';
import { deleteReservation, calTermTime } from '../../../utils/reservation';
import FailPopup from './FailPopup';
import type { ReservationDTO, SocketResponseDTO } from '../../../utils/interface';

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

function RequestPopup({ item, close }: { item: ReservationDTO; close: VoidFunction }) {
  const [time, setTime] = useState('');
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { removeStand } = useStandStore();
  const MySwal = withReactContent(Swal);

  function reject() {
    deleteReservation(item.id).then((res) => {
      close();
      if (res) {
        console.log('요청을 삭제하는데 성공했습니다.');
        removeStand(item);
      } else {
        // TODO: 삭제에 실패했다는 알림
        console.log('요청을 삭제하는데 실패했습니다.');
      }
    });
  }

  function accept() {
    socket.emit(
      'store.accept-seat.server',
      { userId: item.user.id, reservationId: item.id },
      (response: SocketResponseDTO) => {
        if (response.isSuccess) {
          removeStand(item);
        } else {
          MySwal.fire({
            html: (
              <FailPopup
                title="오류!"
                description={response.message as string}
                close={Swal.clickCancel}
              />
            ),
            showConfirmButton: false,
            width: '480px',
            padding: 0,
            customClass: {
              popup: 'fail-popup-border',
            },
            timer: 2000,
          });
        }
      },
    );
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
    const term = calTermTime(item.createdAt);
    if (term) {
      const finalTime = new Date(
        new Date(item.estimatedTime).getTime() + term,
      ).toLocaleTimeString();
      setTime(finalTime.slice(0, finalTime.lastIndexOf(':')));
    } else {
      close();
    }
  }, [time]);

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
