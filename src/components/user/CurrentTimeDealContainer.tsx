import { useEffect } from 'react';
import styled from 'styled-components';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useTimeDealStore from '../../stores/user/timeDealStore';
import thema from '../../styles/thema';
import ItemCurrentTimeDeal from './ItemCurrentTimeDeal';
import { getCurrenTimeDealByUser } from '../../utils/timeDeal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 184px;
`;
const Header = styled.div`
  width: 100%;
  height: 22px;
  padding: 0 20px;
  font: ${thema.font.p1};
  color: ${thema.color.primary.main2};
`;
const Content = styled.div`
  width: 100%;
  height: 152px;
  overflow-x: scroll;

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
  margin: 0 auto;
  font: ${thema.font.p2};
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 8px;
`;

function CurrentTimeDealContainer() {
  const { latitude, longitude } = useRequestInfoStore();
  const { currentTimeDealList, initCurrentTimeDeal } = useTimeDealStore();

  async function fetchCurrentTimeDeal(latitude: number, longitude: number) {
    const response = await getCurrenTimeDealByUser(latitude, longitude);
    if (!('error' in response)) {
      initCurrentTimeDeal(response);
    } else {
      console.log(response.message);
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      fetchCurrentTimeDeal(latitude, longitude);
    }
  }, [latitude, longitude]);
  return (
    <Container>
      <Header>타임딜 신청내역</Header>
      <Content>
        {currentTimeDealList.length === 0 ? (
          <EmptyBox>신청된 타임딜이 없습니다.</EmptyBox>
        ) : (
          <Slider>
            {currentTimeDealList.map((item, index) => (
              <ItemCurrentTimeDeal key={index} item={item}></ItemCurrentTimeDeal>
            ))}
          </Slider>
        )}
      </Content>
    </Container>
  );
}

export default CurrentTimeDealContainer;
