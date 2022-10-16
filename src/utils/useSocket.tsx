import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useAuthStore from '../stores/authStore';
import useStandStore from '../stores/store/standStore';
import useReservationStore from '../stores/store/reservationStore';
import useTimeDealStore from '../stores/store/timeDealStore';
import { getReservationInfo } from './reservation';
import { getParcitipantInfoByStore } from './timeDeal';
import StandPopup from '../components/store/popup/StandPopup';
import ReservationPopup from '../components/store/popup/ReservationPopup';
import FailPopup from '../components/store/popup/FailPopup';

const BASE_URL = 'http://devserver.jigeumgo.com';
const socket: { [key: string]: Socket } = {};

interface SocketHooks {
  socket: Socket;
}

const useSocket = (token: string): SocketHooks => {
  // const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const { userType } = useAuthStore();
  const { addStand } = useStandStore();
  const { addReservation, removeReservation, updateReservation } = useReservationStore();
  const { addParticipant } = useTimeDealStore();

  if (!socket[token]) {
    socket[token] = io(BASE_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
    });

    if (userType === 'USER') {
      //
    } else if (userType === 'STORE') {
      socket[token].on('server.find-store.store', async (reservationId: number) => {
        const response = await getReservationInfo(reservationId);
        if (!('error' in response)) {
          addStand(response);
          MySwal.fire({
            html: <StandPopup item={response} close={Swal.close} />,
            showConfirmButton: false,
            width: '480px',
            padding: 0,
            customClass: {
              popup: 'border-radius-0',
            },
          });
        } else {
          MySwal.fire({
            html: (
              <FailPopup title="오류!" description={response.message} close={Swal.clickCancel} />
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

      // socket[token].on('server.make-reservation.store', async (reservationId: number) => {
      //   const response = await getReservationInfo(reservationId);
      //   if (!('error' in response)) {
      //     addReservation(response);
      //     MySwal.fire({
      //       html: <ReservationPopup item={response} close={Swal.close} navigate={navigate} />,
      //       showConfirmButton: false,
      //       width: '480px',
      //       padding: 0,
      //       customClass: {
      //         popup: 'border-radius-0',
      //       },
      //     });
      //   } else {
      //     MySwal.fire({
      //       html: (
      //         <FailPopup title="오류!" description={response.message} close={Swal.clickCancel} />
      //       ),
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

      socket[token].on('server.cancel-reservation.store', (reservationId: number) => {
        removeReservation(reservationId);
        console.log('사용자로부터 해당 예약건이 취소되었습니다.');
      });

      socket[token].on(
        'server.delay-reservation.store',
        (response: { reservationId: number; estimatedTime: Date }) => {
          updateReservation(response.reservationId, response.estimatedTime);
          console.log('사용자로부터 해당 예약건이 지연되었습니다.');
        },
      );

      socket[token].on('server.check-in-time-deal.store', async (participantId: number) => {
        const response = await getParcitipantInfoByStore(participantId);
        if (!('error' in response)) {
          addParticipant(response.timeDeal.id, response.id, response.user);
        } else {
          console.log(response.message);
        }
      });
    }
  }

  return { socket: socket[token] };
};

export default useSocket;
