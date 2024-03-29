import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import thema from '../../styles/thema';
import useTimeDealStore from '../../stores/store/timeDealStore';
import { closeTimeDealByStore } from '../../utils/timeDeal';
import ConfirmPopup from './popup/ConfirmPopup';
import SuccessPopup from './popup/SuccessPopup';
import FailPopup from './popup/FailPopup';
import ItemParticipant from './ItemParticipant';
import type { TimeDealStoreDTO } from '../../utils/interface';

const TimeDealContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin: 20px;
  background: ${thema.color.primary.main3};
`;
const ControlBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  border: 1px solid ${thema.color.secondary.main3};

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88px;
    padding: 0 24px;
    border-right: 1px solid ${thema.color.secondary.main3};
    font: ${thema.font.h4};
  }
`;
const InfoBox = styled.div`
  margin-left: 38px;
  & p:first-child {
    font: ${thema.font.p1};
    margin-bottom: 4px;
  }
  & p:last-child {
    font: ${thema.font.h5};
    color: ${thema.color.alert.green};
  }
`;
const LimitTimeBox = styled.div<{ done: boolean }>`
  position: absolute;
  right: 113px;
  font: ${thema.font.p2};
  color: ${(props) => (props.done !== true ? thema.color.alert.red : thema.color.secondary.main4)};
`;
const CloseBtn = styled.button<{ done: boolean }>`
  position: absolute;
  right: 18px;
  width: 80px;
  height: 84px;
  background: ${thema.color.primary.main3};
  border: 1px solid
    ${(props) => (props.done !== true ? thema.color.alert.red : thema.color.secondary.main4)};
  border-radius: 4px;
  font: ${thema.font.pb1};
  color: ${(props) => (props.done !== true ? thema.color.alert.red : thema.color.secondary.main4)};
`;
const ParticipantBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  padding-top: 20px;

  & > div:nth-child(odd) {
    margin: 0 1% 2% 0;
  }
  & > div:nth-child(even) {
    margin: 0 0 2% 1%;
  }
`;

function ItemTimeDeal({ item }: { item: TimeDealStoreDTO }) {
  const MySwal = withReactContent(Swal);
  const { removeTimeDeal } = useTimeDealStore();
  const timeString = new Date(item.endTime).toLocaleTimeString();
  const time = timeString.slice(0, timeString.lastIndexOf(':'));
  const [limitTime, setLimitTime] = useState('00:00');
  const [isDone, setIsDone] = useState(false);

  function closeTimeDeal() {
    MySwal.fire({
      html: (
        <ConfirmPopup
          title="타임딜 종료"
          description={'해당 타임딜을 종료하시겠습니까?'}
          confirm={Swal.clickConfirm}
          close={Swal.close}
        />
      ),
      showConfirmButton: false,
      width: '480px',
      padding: 0,
      customClass: {
        popup: 'fail-popup-border',
      },
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const response = await closeTimeDealByStore(item.id);
        if (typeof response === 'boolean') {
          MySwal.fire({
            html: (
              <SuccessPopup
                title="타임딜 종료"
                description="타임딜을 종료시켰습니다."
                close={Swal.clickCancel}
              />
            ),
            showConfirmButton: false,
            width: '480px',
            padding: 0,
            customClass: {
              popup: 'fail-popup-border',
            },
            timer: 2000,
          });
          setIsDone(true);
          if (item.participants.length === 0) {
            removeTimeDeal(item);
          }
        } else {
          MySwal.fire({
            html: (
              <FailPopup
                title="타임딜 종료"
                description={response.message}
                close={Swal.clickCancel}
              />
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
      }
    });
  }

  async function doneTimeDeal() {
    const response = await closeTimeDealByStore(item.id);
    if (typeof response === 'boolean') {
      setIsDone(true);
      if (item.participants.length === 0) {
        removeTimeDeal(item);
      }
    } else {
      console.log(response.error);
    }
  }

  useEffect(() => {
    if (item.status === 'CLOSED' && item.participants.length === 0) {
      closeTimeDeal();
    }
  }, [item.status, item.participants]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const limit = new Date(item.endTime);
      const cur = new Date();
      const term = limit.getTime() - cur.getTime();
      if (term > 1000 && !isDone) {
        const T = Math.floor(term / 1000);
        const M = Math.floor(T / 60);
        const S = T % 60;
        setLimitTime(`${M < 10 ? '0' + M : M}:${S < 10 ? '0' + S : S}`);
      } else {
        clearInterval(intervalId);
        doneTimeDeal();
        setLimitTime('00:00');
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TimeDealContainer>
      <ControlBox>
        <p>TIME DEAL</p>
        <InfoBox>
          <p>{time}까지 방문시</p>
          <p>{item.benefit}</p>
        </InfoBox>
        <LimitTimeBox done={isDone}>종료까지 {isDone ? '00:00' : limitTime}</LimitTimeBox>
        <CloseBtn done={isDone} onClick={closeTimeDeal} disabled={isDone}>
          종료
        </CloseBtn>
      </ControlBox>
      <ParticipantBox>
        {item.participants.map((ele, index) => (
          <ItemParticipant key={index} item={ele} timeDealId={item.id} />
        ))}
      </ParticipantBox>
    </TimeDealContainer>
  );
}

export default ItemTimeDeal;
