import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../../../utils/useSocket';
import useStandStore from '../../../stores/store/standStore';
import { deleteReservation, calTermTime } from '../../../utils/reservation';
import thema from '../../../styles/thema';
import FailPopup from './FailPopup';
import type { ReservationDTO, SocketResponseDTO } from '../../../utils/interface';

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
  margin: 44px 0 18px;
  font: ${thema.font.h5};
  color: ${thema.color.primary.main2};
`;
const InfoContainer = styled.div`
  font: ${thema.font.p1};
  color: ${thema.color.primary.main2_active};

  & p:first-child {
    margin-bottom: 14px;
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
  margin-top: 36px;

  & button {
    width: 145px;
    height: 44px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    font: ${thema.font.pb2};
  }
  & button:nth-child(1) {
    border: 2px solid ${thema.color.alert.red};
    background-color: ${thema.color.primary.main3};
    color: ${thema.color.alert.red};
  }
  & button:nth-child(2) {
    background-color: ${thema.color.primary.main1};
    color: ${thema.color.primary.main2_active};
  }
`;

function RequestPopup({ item, close }: { item: ReservationDTO; close: VoidFunction }) {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const [time, setTime] = useState(new Date(item.estimatedTime));
  const { removeStand } = useStandStore();
  const MySwal = withReactContent(Swal);

  async function reject() {
    const response = await deleteReservation(item.id);
    if (typeof response === 'boolean') {
      removeStand(item);
      close();
    } else {
      MySwal.fire({
        html: <FailPopup title="오류!" description={response.message} close={Swal.clickCancel} />,
        showConfirmButton: false,
        width: '480px',
        padding: 0,
        customClass: {
          popup: 'fail-popup-border',
        },
        timer: 2000,
      });
    }
  }

  function accept() {
    socket.emit(
      'store.accept-seat.server',
      { userId: item.user.id, reservationId: item.id },
      (response: SocketResponseDTO) => {
        if (response.isSuccess) {
          removeStand(item);
          close();
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
      const term = calTermTime(item.createdAt);
      if (term) {
        const calTime = new Date(new Date(time).getTime() + term);
        setTime(calTime);
      } else {
        reject();
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <PopupContainer>
      <Title>자리 요청</Title>
      <InfoContainer>
        <p>{item.numberOfPeople}명</p>
        <p>
          도착시간 :{' '}
          <span>
            {time.toLocaleTimeString().slice(0, time.toLocaleTimeString().lastIndexOf(':'))}
          </span>
        </p>
        <p>
          신용등급 : <span>{item.user.creditRate}점</span>
        </p>
      </InfoContainer>
      <BtnContainer>
        <button onClick={reject}>거절</button>
        <button onClick={accept}>수락</button>
      </BtnContainer>
    </PopupContainer>
  );
}

export default RequestPopup;
