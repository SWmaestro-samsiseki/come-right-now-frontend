import styled from 'styled-components';
import useTimeDealStore from '../../stores/user/timeDealStore';
import MenuHeader from '../../components/user/MenuHeader';
import ItemTimeDeal from '../../components/user/ItemTimeDeal';
import { getTimeDealByUser } from '../../utils/timeDeal';
import { useEffect } from 'react';
import useRequestInfoStore from '../../stores/user/requestInfoStore';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px 0;
  overflow-y: scroll;

  & > div {
    margin-bottom: 20px;
  }
  & > div:last-child {
    margin: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

function SectionTimeDeal() {
  const { latitude, longitude } = useRequestInfoStore();
  const { timeDealList, initTimeDeal } = useTimeDealStore();

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
      <MenuHeader title={'오늘의 타임 딜'} />
      <ListContainer>
        {timeDealList.map((item, index) => (
          <ItemTimeDeal key={index} item={item}></ItemTimeDeal>
        ))}
      </ListContainer>
    </Container>
  );
}

export default SectionTimeDeal;
