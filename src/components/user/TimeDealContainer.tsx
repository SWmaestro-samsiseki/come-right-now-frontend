import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useTimeDealStore from '../../stores/user/timeDealStore';
import thema from '../../styles/thema';
import ItemTimeDeal from './ItemTimeDeal';
import { getTimeDealByUser } from '../../utils/timeDeal';
import type { TimeDealUserDTO } from '../../utils/interface';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 211px;
  margin: 44px 0 8px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px;
  padding: 0 20px;
  margin-bottom: 20px;

  & p:first-child {
    font: ${thema.font.p1};
    color: ${thema.color.primary.main2};
  }
  & p:last-child {
    font: ${thema.font.pb3};
    color: ${thema.color.secondary.main4};
  }
`;
const Content = styled.div`
  width: 100%;
  height: 169px;
  overflow-x: scroll;
  overflow-y: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Slider = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
`;
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  height: 100%;
  font: ${thema.font.p2};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24);
`;
const MoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;

  & div {
    justify-content: center;
    align-items: center;
    display: flex;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 25px;
    font: ${thema.font.p3};
    background: ${thema.color.secondary.main2_active};
  }
`;

function TimeDealContainer() {
  const navigate = useNavigate();
  const { latitude, longitude } = useRequestInfoStore();
  const { timeDealList, initTimeDeal } = useTimeDealStore();
  const [list, setList] = useState<TimeDealUserDTO[]>([]);

  function moreTimeDeal() {
    navigate('timedeal', { replace: true });
  }

  async function fetchTimeDeal(latitude: number, longitude: number) {
    const response = await getTimeDealByUser(latitude, longitude);
    if (!('error' in response)) {
      initTimeDeal(response);
    } else {
      console.log(response.message);
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      fetchTimeDeal(latitude, longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (timeDealList.length > 5) {
      setList(timeDealList.slice(0, 5));
    } else {
      setList(timeDealList);
    }
  }, [timeDealList]);

  return (
    <Container>
      <Header>
        <p>오늘의 타임딜</p>
        <p onClick={moreTimeDeal}>더보기 {'>'}</p>
      </Header>
      <Content>
        {list.length === 0 ? (
          <EmptyBox>타임딜이 없습니다.</EmptyBox>
        ) : (
          <Slider>
            {list.map((item, index) => (
              <ItemTimeDeal key={index} item={item}></ItemTimeDeal>
            ))}
            {timeDealList.length > 5 ? (
              <MoreBox>
                <div onClick={moreTimeDeal}>더보기</div>
              </MoreBox>
            ) : null}
          </Slider>
        )}
      </Content>
    </Container>
  );
}

export default TimeDealContainer;
