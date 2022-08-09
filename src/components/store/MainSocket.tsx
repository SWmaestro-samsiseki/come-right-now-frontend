import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../../utils/useSocket';
import useReservationStore from '../../stores/store/storeManagerStore';
import { getReservationInfo } from '../../utils/reservation';
import RequestPopup from '../RequestPopup';
import ReservationPopup from '../ReservationPopup';

function MainSocket() {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { addRequest, addReservation } = useReservationStore();

  useEffect(() => {
    socket.on('server.find-store.store', (reservationId: number) => {
      console.log('자리요청 이벤트를 받는데 성공했습니다.');
      getReservationInfo(reservationId).then((res) => {
        const response = {
          numberOfPeople: res.numberOfPeople,
          estimatedTime: res.estimatedTime,
          createdAt: res.createdAt,
          reservationStatus: res.reservationStatus,
          user: res.user,
          reservationId: reservationId,
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
          numberOfPeople: res.numberOfPeople,
          estimatedTime: res.estimatedTime,
          createdAt: res.createdAt,
          reservationStatus: res.reservationStatus,
          user: res.user,
          reservationId: reservaionId,
        };
        addReservation(response);
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          html: <ReservationPopup item={response} close={Swal.close} />,
          showConfirmButton: false,
          width: '480px',
          padding: 0,
          customClass: {
            popup: 'border-radius-0',
          },
        });
      });
    });
  }, []);

  return <></>;
}

export default MainSocket;
