import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../../utils/useSocket';
import useReservationStore from '../../stores/store/storeManagerStore';
import { getReservationInfo } from '../../utils/reservation';
import RequestPopup from './RequestPopup';
import ReservationPopup from './ReservationPopup';

function MainSocket() {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const navigate = useNavigate();
  const { reservationList, addRequest, addReservation, removeReservation, updateReservation } =
    useReservationStore();

  useEffect(() => {
    socket.on('server.find-store.store', (reservationId: number) => {
      console.log('자리요청 이벤트를 받는데 성공했습니다.');
      getReservationInfo(reservationId).then((res) => {
        const response = {
          id: reservationId,
          numberOfPeople: res.numberOfPeople,
          estimatedTime: res.estimatedTime,
          createdAt: res.createdAt,
          reservationStatus: res.reservationStatus,
          user: res.user,
        };
        addRequest(response);
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          html: <RequestPopup item={response} close={Swal.close} />,
          showConfirmButton: false,
          width: '480px',
          padding: 0,
          customClass: {
            popup: 'border-radius-0',
          },
        });
      });
    });

    socket.on('server.make-reservation.store', (reservaionId: number) => {
      console.log('예약 이벤트를 받는데 성공했습니다.');
      getReservationInfo(reservaionId).then((res) => {
        const response = {
          id: reservaionId,
          numberOfPeople: res.numberOfPeople,
          estimatedTime: res.estimatedTime,
          createdAt: res.createdAt,
          reservationStatus: res.reservationStatus,
          user: res.user,
        };
        addReservation(response);
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          html: <ReservationPopup item={response} close={Swal.close} navigate={navigate} />,
          showConfirmButton: false,
          width: '480px',
          padding: 0,
          customClass: {
            popup: 'border-radius-0',
          },
        });
      });
    });

    socket.on('server.cancel-reservation.store', (reservationId: number) => {
      removeReservation(reservationId);
      console.log('사용자로부터 해당 예약건이 취소되었습니다.');
      // TODO: 팝업창 띄우기
    });

    socket.on(
      'server.delay-reservation.store',
      (response: { reservationId: number; estimatedTime: Date }) => {
        updateReservation(response.reservationId, response.estimatedTime);
      },
    );
  }, []);

  return <></>;
}

export default MainSocket;
