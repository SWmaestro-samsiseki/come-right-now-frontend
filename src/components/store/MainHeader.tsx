import { useEffect } from 'react';
import useReservationStore from '../../stores/store/reservationStore';
import styled from 'styled-components';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import RequestPopup from '../RequestPopup';
import ReservationPopup from '../ReservationPopup';

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc((100% - 160px) * 0.1);
  border-bottom: 1px solid #d2d2d2;
`;
const Title = styled.h1`
  font: normal 700 18px / 24px 'IBM Plex Sans KR';
  position: absolute;
  top: 50%;
  left: 36px;
  transform: translateY(-50%);
`;
const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  & img {
    padding: 5px;
    margin: 5px;
  }
`;

function StoreHeader() {
  const { addReservation, addRequest } = useReservationStore();

  function test() {
    fetch('http://localhost:8080/reservation-events/test/seat-request', {
      method: 'POST',
    });
  }

  function test2() {
    fetch('http://localhost:8080/reservation-events/test/seat-reservation', {
      method: 'POST',
    });
  }

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('requestSeat', (data) => {
  //       console.log(data);
  //       addRequest(data);
  //       const MySwal = withReactContent(Swal);
  //       MySwal.fire({
  //         html: <RequestPopup item={data} close={Swal.close} />,
  //         showConfirmButton: false,
  //         width: '480px',
  //         padding: 0,
  //         customClass: {
  //           popup: 'border-radius-0',
  //         },
  //       });
  //     });
  //     socket.on('server.make-reservation.store', (data) => {
  //       console.log(data);
  //       addReservation(data);
  //       const MySwal = withReactContent(Swal);
  //       MySwal.fire({
  //         html: <ReservationPopup item={data} close={Swal.close} />,
  //         showConfirmButton: false,
  //         width: '480px',
  //         padding: 0,
  //         customClass: {
  //           popup: 'border-radius-0',
  //         },
  //       });
  //     });
  //   }
  // }, [socket]);

  return (
    <HeaderContainer>
      <Title onClick={test}>지금갈게</Title>
      <IconContainer>
        <img src={require('../../images/notification_on.png')} />
        <img src={require('../../images/graph.png')} />
        <img src={require('../../images/setting.png')} onClick={test2} />
      </IconContainer>
    </HeaderContainer>
  );
}
export default StoreHeader;
