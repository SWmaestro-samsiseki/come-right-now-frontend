import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSocket from '../../utils/useSocket';
import useAuthStore from '../../stores/authStore';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useReservationStore from '../../stores/user/reservationStore';
import { getDistance, getReservation } from '../../utils/reservation';
import { deleteReservation } from '../../utils/reservation';

const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 320px;
  height: auto;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  margin: 10px 0;
  padding: 16px 20px;
`;
const ItemCantainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;

  & span {
    margin-left: 5px;
    font: normal 700 14px / 20px 'IBM Plex Sans KR';
    color: #282828;
  }
`;
const ItemMain = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  margin: 8px 0;
`;
const MainImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 100%;

  & img {
    width: 48px;
    height: 48px;
    background-color: #f5f5f5;
  }
`;
const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 48px);
  height: 100%;
  padding-left: 14px;
`;
const InfoMain = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  margin-bottom: 6px;

  & span:nth-child(1) {
    font: normal 700 14px / 20px 'IBM Plex Sans KR';
    color: #282828;
  }
  & span:nth-child(2) {
    margin-left: 6px;
    font: normal 500 12px / 16px 'IBM Plex Sans KR';
    color: #888;
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
    font: normal 500 14px / 20px 'IBM Plex Sans KR';
    color: #282828;
    margin: 0 12px 0 2px;
  }
  & span:nth-child(3) {
    font: normal 500 14px / 20px 'IBM Plex Sans KR';
    color: #1593fd;
  }
`;
const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 20px;

  & span:nth-child(1) {
    font: normal 500 14px / 20px 'IBM Plex Sans KR';
    color: #282828;
  }
  & span:nth-child(2) {
    font: normal 500 12px / 16px 'IBM Plex Sans KR';
    color: #888;
  }
`;
const ItemDetail = styled.div`
  display: none;
  width: 100%;
  border-top: 1px solid #ccc;
  margin-top: 12px;
  padding-top: 12px;

  &.detail {
    display: flex;
    flex-direction: column;
  }
`;
const DetailInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 8px;
  font: normal 500 14px / 20px 'IBM Plex Sans KR';
  color: #282828;

  & p {
    margin-top: 4px;
  }
  & p span {
    font: normal 700 14px / 20px 'IBM Plex Sans KR';
  }
  & > span {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 59px;
    height: 24px;
    background: #bbbbbb;
    border-radius: 16px;
    font: normal 500 12px / 16px 'IBM Plex Sans KR';
    color: white;
  }
`;
const DetailBtnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 280px;
  padding-top: 16px;

  & button {
    width: 128px;
    height: 36px;
    margin: 6px;
    font: normal 700 14px / 20px 'IBM Plex Sans KR';
    color: #1593fd;
    border: 1px solid #1593fd;
    border-radius: 4px;
    background: #f8f8f8;
  }
  & button.cancel {
    color: #ff5555;
    border: 1px solid #ff5555;
  }
`;
function ReservationItem() {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { user } = useAuthStore();
  const { latitude, longitude } = useRequestInfoStore();
  const { reservation, addReservation, removeReservation, updateReservation } =
    useReservationStore();
  const [distance, setDistance] = useState('');
  const [isDetail, setIsDetail] = useState(false);

  function showDetail() {
    setIsDetail(!isDetail);
  }

  function delay() {
    socket.emit(
      'user.delay-reservation.server',
      reservation?.id,
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
    if (user !== null) {
      getReservation(user.id).then((res) => {
        if (!('error' in res)) {
          console.log(res);
          addReservation(res);
        } else {
          console.log(res.message);
        }
      });
    }
  }, [user]);

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
    <ReservationContainer>
      {!reservation ? (
        '예약 내역이 없습니다.'
      ) : (
        <>
          <ItemCantainer>
            <ItemHeader>
              <img src={require('../../images/reservation_complete.png')} alt="예약완료 아이콘" />
              <span>예약완료</span>
            </ItemHeader>
            <ItemMain>
              <MainImage>
                <img
                  src={reservation.store.storeImage ? reservation.store.storeImage : ''}
                  alt="가게 이미지"
                />
              </MainImage>
              <MainInfo>
                <InfoMain>
                  <span>{reservation.store.businessName}</span>
                  <span>{reservation.store.storeType}</span>
                </InfoMain>
                <InfoSub>
                  <img src={require('../../images/star_on.png')} alt="별점 이미지" />
                  <span>{reservation.store.starRate}/5.0</span>
                  <span>{distance}m</span>
                </InfoSub>
              </MainInfo>
            </ItemMain>
            <ItemFooter>
              <span>출발까지 15분 남았습니다.</span>
              <span onClick={showDetail}>더보기</span>
            </ItemFooter>
          </ItemCantainer>
          <ItemDetail className={isDetail ? 'detail' : ''}>
            <DetailInfo>
              <p>
                <span>주소:</span> {reservation.store.address}
              </p>
              <p>
                <span>전화:</span> {reservation.store.storePhone}
              </p>
              <p>
                <span>영업시간: </span>
                {reservation.store.todayOpenAt
                  ? reservation.store.todayOpenAt.toString()
                  : null} -{' '}
                {reservation.store.todayCloseAt ? reservation.store.todayCloseAt.toString() : null}
              </p>
              <p>
                <span>대표메뉴: </span>
                {[
                  reservation.store.mainMenu1,
                  reservation.store.mainMenu2,
                  reservation.store.mainMenu3,
                ]
                  .filter((ele) => ele !== null)
                  .join(', ')}
              </p>
              {reservation.store.menuImage ? <span>메뉴보기</span> : null}
            </DetailInfo>
            <DetailBtnContainer>
              <button>전화 걸기</button>
              <button>길 찾기</button>
              <button onClick={delay}>시간 변경</button>
              <button className="cancel" onClick={reject}>
                예약 취소
              </button>
            </DetailBtnContainer>
          </ItemDetail>
        </>
      )}
    </ReservationContainer>
  );
}

export default ReservationItem;
