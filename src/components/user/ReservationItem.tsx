import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSocket from '../../utils/useSocket';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useReservationStore from '../../stores/user/reservationStore';
import { getDistance } from '../../utils/reservation';
import { deleteReservation } from '../../utils/reservation';
import type { ReservationDTO } from '../../utils/interface';
import thema from '../../styles/thema';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  border-radius: 8px;
  padding: 16px 20px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  &.noDetail {
    display: none;
  }
`;
const MainHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;

  & span {
    margin-left: 5px;
    font: ${thema.font.pb2};
    color: #282828;
  }
`;
const MainInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
  margin: 8px 0;
`;
const StoreImage = styled.div`
  width: 48px;
  height: 48px;

  & img {
    width: 100%;
    height: 100%;
    background-color: ${thema.color.secondary.main2};
  }
`;
const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 48px);
  height: 100%;
  padding-left: 14px;
`;
const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  margin-bottom: 6px;

  & span:nth-child(1) {
    font: ${thema.font.pb2};
    color: ${thema.color.primary.main2};
  }
  & span:nth-child(2) {
    margin-left: 6px;
    font: ${thema.font.p3};
    color: ${thema.color.secondary.main4};
  }
`;
const InfoSub = styled.div`
  display: flex;
  align-items: center;
  height: 20px;

  & img {
    width: 20px;
    height: 20px;
  }
  & span:nth-child(2) {
    font: ${thema.font.p2};
    color: ${thema.color.primary.main2};
    margin: 0 12px 0 2px;
  }
  & span:nth-child(3) {
    font: ${thema.font.p2};
    color: ${thema.color.secondary.main1_active};
  }
`;
const MainFooter = styled.div`
  width: 100%;
  height: 45px;

  & div {
    display: flex;
    align-items: center;
    font: ${thema.font.p2};
  }
  & div:nth-child(2) {
    margin-top: 5px;
    justify-content: space-between;
  }
  & div img {
    margin-right: 5px;
  }
  & div p {
    color: ${thema.color.primary.main2};
  }
  & div > span {
    font: ${thema.font.p2};
    color: ${thema.color.secondary.main4};
  }
`;
const DetailInfo = styled.div`
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid ${thema.color.secondary.main3};
  font: ${thema.font.p2};
  color: ${thema.color.primary.main2};

  & p {
    margin-top: 4px;
  }
  & p span {
    font: ${thema.font.pb2};
  }
`;
const DetailBtn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 16px;

  & button {
    width: 45%;
    height: 36px;
    margin: 6px;
    font: ${thema.font.pb2};
    color: ${thema.color.secondary.main4};
    border: none;
    border-radius: 4px;
    background: ${thema.color.secondary.main2};
  }
  & button.cancel {
    color: ${thema.color.alert.red};
    border: 1px solid ${thema.color.alert.red};
  }
`;
function ReservationItem({ reservation }: { reservation: ReservationDTO }) {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { latitude, longitude } = useRequestInfoStore();
  const { removeReservation, updateReservation } = useReservationStore();
  const [distance, setDistance] = useState('');
  const [isDetail, setIsDetail] = useState(false);

  function showDetail() {
    setIsDetail(!isDetail);
  }

  function convertTime(time: Date): string {
    const temp = new Date(time).toLocaleTimeString();
    return temp.slice(0, temp.lastIndexOf(':'));
  }

  function calTime(time: Date): number {
    const cur = new Date();
    const temp = new Date(time);
    return Math.floor((temp.getTime() - cur.getTime()) / 60000);
  }

  function delay() {
    socket.emit(
      'user.delay-reservation.server',
      reservation.id,
      (response: { isSuccess: boolean; count: number; estimatedTime: Date }) => {
        if (response.isSuccess) {
          if (reservation) {
            updateReservation(reservation, response.estimatedTime);
          }
          console.log(`시간 지연에 성공했습니다.`);

          reservation;
        } else {
          console.log(`시간 지연에 실패했습니다. 최대 지연회수는 ${response.count}회입니다.`);
        }
      },
    );
  }

  function reject() {
    socket.emit(
      'user.cancel-reservation.server',
      reservation?.id,
      (response: { isSuccess: boolean; reservationId: number }) => {
        if (response.isSuccess) {
          console.log('예약취소 이벤트 전송에 성공했습니다.');
          deleteReservation(response.reservationId)
            .then((res) => {
              if (res) {
                removeReservation();
                console.log('예약이 성공적으로 취소되었습니다.');
              } else {
                console.log('예약을 취소하지 못했습니다.');
              }
            })
            .catch(() => {
              console.log('통신에 문제가 있습니다.');
            });
        } else {
          console.log('예약취소 이벤트 전송에 실패했습니다.');
        }
      },
    );
  }

  useEffect(() => {
    if (reservation && latitude && longitude) {
      getDistance(reservation.store.id, latitude, longitude).then((res) => {
        if (res) {
          setDistance(res.distanceMeter);
        } else {
          console.log('거리를 가져오지 못했습니다.');
        }
      });
    }
  }, [reservation, latitude, longitude]);

  return (
    <ItemContainer>
      <Container>
        <MainHeader>
          <img src={require('../../images/reservation_complete.png')} alt="예약완료 아이콘" />
          <span>예약완료</span>
        </MainHeader>
        <MainInfo>
          <StoreImage>
            <img
              src={reservation.store.storeImage ? reservation.store.storeImage : ''}
              alt="가게 이미지"
            />
          </StoreImage>
          <StoreInfo>
            <InfoTitle>
              <span>{reservation.store.businessName}</span>
              <span>{reservation.store.storeType}</span>
            </InfoTitle>
            <InfoSub>
              <img src={require('../../images/star_on.png')} alt="별점 이미지" />
              <span>{reservation.store.starRate}/5.0</span>
              <span>{distance}m</span>
            </InfoSub>
          </StoreInfo>
        </MainInfo>
        <MainFooter>
          <div>
            <img src={require('../../images/clock.png')} alt="시계 이미지" />
            <p>{`도착 예정 시간 : ${convertTime(reservation.estimatedTime)}`}</p>
          </div>
          <div>
            <p>
              {new Date() < new Date(reservation.departureTime)
                ? `출발까지 ${calTime(reservation.departureTime)}분 남았습니다.`
                : new Date() < new Date(reservation.estimatedTime)
                ? `도착까지 ${calTime(reservation.estimatedTime)}분 남았습니다.`
                : `도착시간이 지났습니다!`}
            </p>
            <span onClick={showDetail}>{isDetail ? '접기' : '더보기'}</span>
          </div>
        </MainFooter>
      </Container>
      <Container className={isDetail ? '' : 'noDetail'}>
        <DetailInfo>
          <p>
            <span>주소:</span> {reservation.store.address}
          </p>
          <p>
            <span>전화:</span> {reservation.store.storePhone}
          </p>
          <p>
            <span>영업시간: </span>
            {reservation.store.todayOpenAt ? reservation.store.todayOpenAt.toString() : null} -{' '}
            {reservation.store.todayCloseAt ? reservation.store.todayCloseAt.toString() : null}
          </p>
          <p>
            <span>대표메뉴: </span>
            {[reservation.store.mainMenu1, reservation.store.mainMenu2, reservation.store.mainMenu3]
              .filter((ele) => ele !== null)
              .join(', ')}
          </p>
        </DetailInfo>
        <DetailBtn>
          <button>전화 걸기</button>
          <button>길 찾기</button>
          <button onClick={delay}>시간 변경</button>
          <button className="cancel" onClick={reject}>
            예약 취소
          </button>
        </DetailBtn>
      </Container>
    </ItemContainer>
  );
}

export default ReservationItem;
