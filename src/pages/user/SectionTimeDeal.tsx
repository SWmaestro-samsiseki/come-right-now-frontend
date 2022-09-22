import styled from 'styled-components';
import thema from '../../styles/thema';
import useTimeDealStore from '../../stores/user/timeDealStore';
import MenuHeader from '../../components/user/MenuHeader';
import ItemTimeDeal from '../../components/user/ItemTimeDeal';

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
  const { timeDealList } = useTimeDealStore();

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
