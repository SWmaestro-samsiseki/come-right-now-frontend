import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../../utils/useSocket';
import useStandStore from '../../stores/store/standStore';
import { deleteReservation, calTermTime } from '../../utils/reservation';
import thema from '../../styles/thema';
import FailPopup from './popup/FailPopup';
import type { ReservationDTO, SocketResponseDTO } from '../../utils/interface';

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 95%;
  min-height: 120px;
  border: 1px solid ${thema.color.secondary.main3};
  padding: 0 18px;
  margin-top: 20px;
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  width: 92px;
  height: 88px;
  padding-right: 20px;
  border-right: 1.4px solid ${thema.color.secondary.main3};
  font: ${thema.font.h4};
  text-align: center;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;

  & p {
    font: ${thema.font.p2};
    margin-bottom: 2px;
  }
  & p:first-child {
    font: ${thema.font.h4};
    margin-bottom: 6px;
  }
`;
const BtnBox = styled.div`
  position: absolute;
  right: 18px;
  display: flex;

  & button {
    width: 80px;
    height: 84px;
    border: none;
    border-radius: 4px;
    font: ${thema.font.pb1};
  }
  & button:nth-child(1) {
    border: 1px solid ${thema.color.alert.red};
    background: ${thema.color.primary.main3};
    color: ${thema.color.alert.red};
  }
  & button:nth-child(2) {
    margin-left: 12px;
    background: ${thema.color.primary.main1};
    color: ${thema.color.primary.main2_active};
  }
`;

function ItemStand({ item }: { item: ReservationDTO }) {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const [time, setTime] = useState(new Date(item.estimatedTime));
  const { removeStand } = useStandStore();
  const MySwal = withReactContent(Swal);

  async function reject() {
    const response = await deleteReservation(item.id);
    if (typeof response === 'boolean') {
      removeStand(item);
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
    <ItemContainer>
      <TimeBox>
        {time.toLocaleTimeString().slice(0, time.toLocaleTimeString().lastIndexOf(':'))}
      </TimeBox>
      <InfoBox>
        <p>
          {item.user.name} 외 {item.numberOfPeople - 1}명
        </p>
        <p>{item.user.phone}</p>
        <p>신용등급 : {item.user.creditRate}점</p>
      </InfoBox>
      <BtnBox>
        <button onClick={reject}>거절</button>
        <button onClick={accept}>수락</button>
      </BtnBox>
    </ItemContainer>
  );
}

export default ItemStand;
