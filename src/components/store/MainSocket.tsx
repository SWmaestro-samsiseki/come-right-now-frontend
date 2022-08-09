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
    socket.on('server.find-store.store', (data: { reservationId: number }) => {
      console.log('자리요청 이벤트를 받는데 성공했습니다.');
      getReservationInfo(data.reservationId).then((res) => {
        const response = {
          numberOfPeople: res.numberOfPeople,
          estimatedTime: res.estimatedTime,
          createdAt: res.createdAt,
          reservationStatus: res.reservationStatus,
          user: res.user,
          reservationId: data.reservationId,
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
    socket.on('server.make-reservation.store', (data: { reservaionId: number }) => {
      console.log('예약 이벤트를 받는데 성공했습니다.');
      getReservationInfo(data.reservaionId).then((res) => {
        const response = {
          numberOfPeople: res.numberOfPeople,
          estimatedTime: res.estimatedTime,
          createdAt: res.createdAt,
          reservationStatus: res.reservationStatus,
          user: res.user,
          reservationId: data.reservaionId,
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
