import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import thema from '../../styles/thema';
import MapPopup from './popup/MapPopup';
import ConfirmPopup from './popup/ConfirmPopup';
import SuccessPopup from './popup/SuccessPopup';
import FailPopup from './popup/FailPopup';
import type { CurrentTimeDealUserDTO } from '../../utils/interface';
import useSocket from '../../utils/useSocket';

const Container = styled.div`
  display: flex;
  width: calc(100vw - 40px);
  height: 102px;
  margin: 10px 20px;
  padding: 16px 20px;
  background: ${thema.color.primary.main3};
  /* box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24); */
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 8px;
`;
const ImageBox = styled.div`
  width: 70px;
  height: 70px;
  background: ${thema.color.secondary.main2};

  & img {
    width: 100%;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;

  & p:nth-child(1) span:nth-child(1) {
    font: ${thema.font.pb1};
    color: ${thema.color.primary.main2};
  }
  & p:nth-child(1) span:nth-child(2) {
    margin-left: 8px;
    font: ${thema.font.p2};
    color: ${thema.color.secondary.main4};
  }
  & p:nth-child(1) button {
    width: 58px;
    height: 20px;
    margin-left: 8px;
    background: ${thema.color.secondary.main2};
    border: 1px solid ${thema.color.primary.main2_active};
    border-radius: 2px;
    font: ${thema.font.pb3};
    color: ${thema.color.primary.main2_active};
  }
  & p:nth-child(2) {
    margin-top: 4px;
    font: ${thema.font.p3};
    color: ${thema.color.primary.main2_active};
  }
  & p:nth-child(3) {
    margin-top: 2px;
    font: ${thema.font.pb2};
    color: ${thema.color.alert.green};
  }
`;

function ItemCurrentTimeDeal({ item }: { item: CurrentTimeDealUserDTO }) {
  const { socket } = useSocket(localStorage.getItem('token') as string);
  const MySwal = withReactContent(Swal);

  function showMap() {
    MySwal.fire({
      html: <MapPopup location={{ la: item.latitude, lo: item.longitude }} />,
      showConfirmButton: false,
      width: '370px',
      padding: 0,
      customClass: {
        popup: 'border-radius-0',
      },
    });
  }

  function calLimitTime(time: Date): string {
    const limit = new Date(time);
    const H = limit.getHours();
    const M = limit.getMinutes();
    return `${H < 12 ? '오전 ' + H : '오후 ' + (H - 12)}시 ${M < 10 ? '0' + M : M}분`;
  }

  function checkIn() {
    MySwal.fire({
      html: (
        <ConfirmPopup
          title="체크인"
          description={`가게에 도착했습니까?`}
          confirm={Swal.clickConfirm}
          close={Swal.close}
        />
      ),
      showConfirmButton: false,
      width: '280px',
      padding: 0,
      customClass: {
        popup: 'fail-popup-border',
      },
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        socket.emit(
          'user.check-in-time-deal.server',
          {
            participantId: item.participantId,
            storeId: item.storeId,
          },
          (response: boolean) => {
            if (response) {
              MySwal.fire({
                html: (
                  <SuccessPopup
                    title="체크인"
                    description="체크인되었습니다! :)"
                    close={Swal.clickCancel}
                  />
                ),
                showConfirmButton: false,
                width: '280px',
                padding: 0,
                customClass: {
                  popup: 'fail-popup-border',
                },
                timer: 2000,
              });
            } else {
              MySwal.fire({
                html: (
                  <FailPopup
                    title="체크인"
                    description="체크인에 실패했습니다."
                    close={Swal.clickCancel}
                  />
                ),
                showConfirmButton: false,
                width: '280px',
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

  return (
    <Container>
      <ImageBox onClick={checkIn}>
        {item.storeImage ? <img src={item.storeImage} alt="가게 이미지" /> : null}
      </ImageBox>
      <InfoBox>
        <p>
          <span>{item.businessName}</span>
          <span>{item.distance}m</span>
          <button onClick={showMap}>지도보기</button>
        </p>
        <p>
          {calLimitTime(item.endTime)}
          까지 방문시
        </p>
        <p>{item.benefit}</p>
      </InfoBox>
    </Container>
  );
}

export default ItemCurrentTimeDeal;
