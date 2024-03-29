import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useTimeDealStore from '../../stores/user/timeDealStore';
import thema from '../../styles/thema';
import { getCurrenTimeDealByUser, requestTimeDealByUser } from '../../utils/timeDeal';
import ConfirmPopup from './popup/ConfirmPopup';
import SuccessPopup from './popup/SuccessPopup';
import FailPopup from './popup/FailPopup';
import MapPopup from './popup/MapPopup';
import type { TimeDealUserDTO } from '../../utils/interface';
import useRequestInfoStore from '../../stores/user/requestInfoStore';

const Container = styled.div`
  width: calc(100vw - 40px);
  height: 169px;
  margin: 5px 20px;
  background: ${thema.color.primary.main3};
  border-radius: 8px;
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 8px;

  & hr {
    height: 1.4px;
    margin: 0 20px;
    border: none;
    background: ${thema.color.secondary.main3};
  }
`;
const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 21px;
  border-radius: 8px 8px 0px 0px;
  background: ${thema.color.secondary.main2};
  font: ${thema.font.pb3};
  color: ${thema.color.alert.blue};
`;
const InfoBox = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 12px 20px;
`;
const ImgBox = styled.div`
  width: 48px;
  height: 48px;
  background: ${thema.color.secondary.main2};

  & img {
    width: 48px;
    height: 48px;
  }
`;
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 48px);
  height: 100%;
  padding-left: 14px;

  & > div:first-child {
    font: ${thema.font.pb2};
    color: ${thema.color.primary.main2};
  }
  & > div:first-child span {
    margin-left: 6px;
    font: ${thema.font.p3};
    color: ${thema.color.secondary.main4};
  }
  & > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & > div:last-child div {
    display: flex;
    align-items: center;
    font: ${thema.font.p2};
  }
  & > div:last-child div img {
    width: 16px;
    height: 16px;
    margin-right: 2px;
  }
  & > div:last-child button {
    width: 58px;
    height: 22px;
    background: ${thema.color.secondary.main2};
    border: 1px solid ${thema.color.primary.main2_active};
    border-radius: 2px;
    font: ${thema.font.pb3};
    color: ${thema.color.primary.main2_active};
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 12px 20px;

  & > div p:first-child {
    font: ${thema.font.p3};
    color: ${thema.color.primary.main2_active};
    margin-bottom: 2px;
  }
  & > div p:last-child {
    font: ${thema.font.pb2};
    color: ${thema.color.alert.green};
  }
  & > button {
    width: 42px;
    height: 28px;
    margin-right: 3px;
    border: 1px solid ${thema.color.primary.main2_active};
    border-radius: 4px;
    background: ${thema.color.primary.main1};
    font: ${thema.font.pb3};
    color: ${thema.color.primary.main2_active};
  }
`;

function ItemTimeDeal({ item }: { item: TimeDealUserDTO }) {
  const { latitude, longitude } = useRequestInfoStore();
  const { initCurrentTimeDeal } = useTimeDealStore();

  async function fetchCurrentTimeDeal(latitude: number, longitude: number) {
    const response = await getCurrenTimeDealByUser(latitude, longitude);
    if (!('error' in response)) {
      initCurrentTimeDeal(response);
    } else {
      console.log(response.message);
    }
  }
  const [limitTime, setLimitTime] = useState('00:00');
  const { removeTimeDeal } = useTimeDealStore();
  const MySwal = withReactContent(Swal);

  function calLimitTime(time: Date): string {
    const limit = new Date(time);
    const H = limit.getHours();
    const M = limit.getMinutes();
    return `${H < 12 ? '오전 ' + H : '오후 ' + (H - 12)}시 ${M < 10 ? '0' + M : M}분`;
  }

  function showMap() {
    MySwal.fire({
      html: <MapPopup location={{ la: item.store.latitude, lo: item.store.longitude }} />,
      showConfirmButton: false,
      width: '370px',
      padding: 0,
      customClass: {
        popup: 'border-radius-0',
      },
    });
  }

  function requestTimeDeal() {
    MySwal.fire({
      html: (
        <ConfirmPopup
          title="타임딜 신청"
          description={`해당 타임딜을 신청하시겠습니까?`}
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
        const response = await requestTimeDealByUser(item.id);
        if (typeof response === 'boolean') {
          fetchCurrentTimeDeal(latitude as number, longitude as number);
          MySwal.fire({
            html: (
              <SuccessPopup
                title="타임딜 신청"
                description="타임딜 신청에 성공했습니다."
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
                title="타임딜 신청"
                description={response.message}
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
      }
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const limit = new Date(item.endTime);
      const cur = new Date();
      const term = limit.getTime() - cur.getTime();
      if (term > 1000) {
        const T = Math.floor(term / 1000);
        const M = Math.floor(T / 60);
        const S = T % 60;
        setLimitTime(`${M < 10 ? '0' + M : M}:${S < 10 ? '0' + S : S}`);
      } else {
        removeTimeDeal(item);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <TimeBox>남은시간 {limitTime}</TimeBox>
      <InfoBox>
        <ImgBox>
          {item.store.storeImage ? <img src={item.store.storeImage} alt="가게 이미지" /> : null}
        </ImgBox>
        <DetailBox>
          <div>
            {item.store.businessName}
            <span>{item.store.storeType}</span>
          </div>
          <div>
            <div>
              <img src={require('../../images/star_on.png')} alt="별점 이미지" />
              <span>{item.store.starRate}/5.0</span>
            </div>
            <button onClick={showMap}>지도보기</button>
          </div>
        </DetailBox>
      </InfoBox>
      <hr />
      <BtnBox>
        <div>
          <p>
            {calLimitTime(item.endTime)}
            까지 방문시
          </p>
          <p>{item.benefit}</p>
        </div>
        <button onClick={requestTimeDeal}>신청</button>
      </BtnBox>
    </Container>
  );
}

export default ItemTimeDeal;
