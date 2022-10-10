import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../../utils/useSocket';
import useStandStore from '../../stores/store/standStore';
import useReservationStore from '../../stores/store/reservationStore';
import { getReservationInfo } from '../../utils/reservation';
import RequestPopup from './popup/StandPopup';
import ReservationPopup from './popup/ReservationPopup';
import FailPopup from './popup/FailPopup';

function MainSocket() {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const { addStand } = useStandStore();
  const { addReservation, removeReservation, updateReservation } = useReservationStore();

  useEffect(() => {
    // socket.on('server.find-store.store', async (reservationId: number) => {
    //   const response = await getReservationInfo(reservationId);
    //   if (!('error' in response)) {
    //     addStand(response);
    //     MySwal.fire({
    //       html: <RequestPopup item={response} close={Swal.close} />,
    //       showConfirmButton: false,
    //       width: '480px',
    //       padding: 0,
    //       customClass: {
    //         popup: 'border-radius-0',
    //       },
    //     });
    //   } else {
    //     MySwal.fire({
    //       html: <FailPopup title="오류!" description={response.message} close={Swal.clickCancel} />,
    //       showConfirmButton: false,
    //       width: '480px',
    //       padding: 0,
    //       customClass: {
    //         popup: 'fail-popup-border',
    //       },
    //       timer: 2000,
    //     });
    //   }
    // });
    socket.on('server.make-reservation.store', async (reservationId: number) => {
      const response = await getReservationInfo(reservationId);
      if (!('error' in response)) {
        addReservation(response);
        MySwal.fire({
          html: <ReservationPopup item={response} close={Swal.close} navigate={navigate} />,
          showConfirmButton: false,
          width: '480px',
          padding: 0,
          customClass: {
            popup: 'border-radius-0',
          },
        });
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
    });
    // socket.on('server.cancel-reservation.store', (reservationId: number) => {
    //   removeReservation(reservationId);
    //   console.log('사용자로부터 해당 예약건이 취소되었습니다.');
    // });
    // socket.on(
    //   'server.delay-reservation.store',
    //   (response: { reservationId: number; estimatedTime: Date }) => {
    //     updateReservation(response.reservationId, response.estimatedTime);
    //     console.log('사용자로부터 해당 예약건이 지연되었습니다.');
    //   },
    // );
  }, []);

  return <></>;
}

export default MainSocket;
