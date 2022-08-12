import styled from 'styled-components';
import type { ReservationInUser } from '../../utils/interface';

const ItemCantainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 160px;
  padding: 16px 20px;
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

function ReservationItem({ item }: { item: ReservationInUser }) {
  return (
    <ItemCantainer>
      <ItemHeader>
        <img src={require('../../images/reservation_complete.png')} alt="예약완료 아이콘" />
        <span>예약완료</span>
      </ItemHeader>
      <ItemMain>
        <MainImage>
          <img src={item.store.storeImage ? item.store.storeImage : ''} alt="가게 이미지" />
        </MainImage>
        <MainInfo>
          <InfoMain>
            <span>{item.store.businessName}</span>
            <span>{item.store.storeType}</span>
          </InfoMain>
          <InfoSub>
            <img src={require('../../images/star_on.png')} alt="별점 이미지" />
            <span>{item.store.starRate}/5.0</span>
            <span>{new Date(item.estimatedTime).toLocaleTimeString()}</span>
          </InfoSub>
        </MainInfo>
      </ItemMain>
      <ItemFooter>
        <span>출발까지 15분 남았습니다.</span>
        <span>더보기</span>
      </ItemFooter>
    </ItemCantainer>
  );
}

export default ReservationItem;
