import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useTimeDealStore from '../../stores/user/timeDealStore';
import thema from '../../styles/thema';
import ItemTimeDeal from './ItemTimeDeal';
import { getTimeDealByUser } from '../../utils/timeDeal';

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
  width: 80%;
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

  & > div {
    margin-right: 30px;
  }
  & > div:last-child {
    margin: 0;
  }
`;

function TimeDealContainer() {
  const navigate = useNavigate();
  const { latitude, longitude } = useRequestInfoStore();
  const { timeDealList, initTimeDeal } = useTimeDealStore();
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

  return (
    <Container>
      <Header>
        <p>오늘의 타임딜</p>
        <p onClick={moreTimeDeal}>더보기 {'>'}</p>
      </Header>
      <Content>
        <Slider>
          {timeDealList.map((item, index) => (
            <ItemTimeDeal key={index} item={item}></ItemTimeDeal>
          ))}
        </Slider>
      </Content>
    </Container>
  );
}

export default TimeDealContainer;
