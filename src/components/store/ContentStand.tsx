import styled from 'styled-components';
import useStandStore from '../../stores/store/standStore';
import RequestItem from './ItemStand';

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

function ContentStand() {
  const { standList } = useStandStore();

  return (
    <ListContainer>
      {standList.map((item, index) => (
        <RequestItem key={index} item={item} />
      ))}
    </ListContainer>
  );
}

export default ContentStand;
