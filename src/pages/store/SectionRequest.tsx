import useStoreManagerStore from '../../stores/store/storeManagerStore';
import RequestItem from '../../components/RequestItem';
import styled from 'styled-components';

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

function StoreRequestList() {
  const { requestList } = useStoreManagerStore();

  return (
    <ListContainer>
      {requestList.map((item, index) => (
        <RequestItem key={index} item={item} />
      ))}
    </ListContainer>
  );
}

export default StoreRequestList;
