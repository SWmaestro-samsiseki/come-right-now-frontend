import styled from 'styled-components';
import useResponseStore from '../../stores/user/responseStore';
import SearchStoreItem from './SearchStoreItem';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;

function SearchStoreList() {
  const { responses } = useResponseStore();
  return (
    <ListContainer>
      {responses.map((item, index) => (
        <SearchStoreItem key={index} item={item} />
      ))}
    </ListContainer>
  );
}

export default SearchStoreList;
