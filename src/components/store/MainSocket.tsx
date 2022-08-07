import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../../utils/useSocket';
import useReservationStore from '../../stores/store/reservationStore';
import RequestPopup from '../RequestPopup';
import ReservationPopup from '../ReservationPopup';

function MainSocket() {
  const token = localStorage.getItem('token') as string;
  const [socket] = useSocket(token);
  const { addRequest, addReservation } = useReservationStore();

  useEffect(() => {
    // TODO: 이벤트명 server.find-store.store로 수정하기
    socket.on('requestSeat', (data) => {
      addRequest(data);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        html: <RequestPopup item={data} close={Swal.close} />,
        showConfirmButton: false,
        width: '480px',
        padding: 0,
        customClass: {
          popup: 'border-radius-0',
        },
      });
    });
    socket.on('server.make-reservation.store', (data) => {
      console.log(data);
      addReservation(data);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        html: <ReservationPopup item={data} close={Swal.close} />,
        showConfirmButton: false,
        width: '480px',
        padding: 0,
        customClass: {
          popup: 'border-radius-0',
        },
      });
    });
  }, []);

  return <></>;
}

export default MainSocket;
