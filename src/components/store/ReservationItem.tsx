import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../../utils/useSocket';
import useStoreManagerStore from '../../stores/store/storeManagerStore';
import ConfirmPopup from './ConfirmPopup';
import SuccessPopup from './SuccessPopup';
import FailPopup from './FailPopup';
import { deleteReservation } from '../../utils/reservation';
import type { ReservationInStore } from '../../utils/interface';

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
    border: 2px solid #282828;
    background-color: white;
    color: #282828;
  }
  & button:nth-child(2) {
    border: 2px solid #ff5555;
    background-color: #ffe7e7;
    color: #ff5555;
  }
  & button:nth-child(3) {
    background-color: #54c2ff;
    color: white;
  }
`;

function ReservationItem({ item }: { item: ReservationInStore }) {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { removeReservation } = useStoreManagerStore();
  const finalTime = new Date(item.estimatedTime).toLocaleTimeString();
  const time = finalTime.slice(0, finalTime.lastIndexOf(':'));
  const MySwal = withReactContent(Swal);

  function checkPosition() {
    // 예약자의 위치를 확인하는 함수 작성
  }

  function reject() {
    // 예약을 취소하는 함수 작성
    MySwal.fire({
      html: (
        <ConfirmPopup
          title="예약취소"
          description={'예약을 취소하겠습니까?'}
          confirm={Swal.clickConfirm}
          close={Swal.close}
        />
      ),
      showConfirmButton: false,
      width: '480px',
      padding: 0,
      customClass: {
        popup: 'fail-popup-border',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit(
          'store.cancel-reservation.server',
          item.id,
          (response: { isSuccess: boolean; reservationId: number }) => {
            if (response.isSuccess) {
              console.log('예약취소 이벤트 전송에 성공했습니다.');
              deleteReservation(response.reservationId).then((res) => {
                if (typeof res === 'boolean') {
                  console.log('예약이 성공적으로 취소되었습니다.');
                  removeReservation(item);
                  MySwal.fire({
                    html: (
                      <SuccessPopup
                        title="예약취소"
                        description="예약을 취소했습니다."
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
                } else {
                  console.log('예약을 취소하지 못했습니다.');
                  MySwal.fire({
                    html: (
                      <FailPopup
                        title="예약취소"
                        description="res.message"
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
              });
            } else {
              console.log('예약취소 이벤트 전송에 실패했습니다.');
              MySwal.fire({
                html: (
                  <FailPopup
                    title="예약취소"
                    description="서버오류로 인해 예약취소를 하지 못했습니다."
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
    });
  }

  function checkIn() {
    // 예약자가 도착했을때 처리하는 함수 작성
    socket.emit(
      'store.check-in.server',
      {
        reservationId: item.id,
        userId: item.user.id,
      },
      (isSuccess: boolean) => {
        if (isSuccess) {
          removeReservation(item);
          console.log('사용자의 도착을 처리하는데 성공했습니다.');
        } else {
          console.log('사용자의 도착을 처리하는데 실패했습니다.');
        }
      },
    );
  }

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
        <button onClick={checkPosition}>위치확인</button>
        <button onClick={reject}>예약취소</button>
        <button onClick={checkIn}>Check In</button>
      </ButtonBox>
    </ItemContainer>
  );
}

export default ReservationItem;
