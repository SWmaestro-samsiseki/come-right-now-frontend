import styled from 'styled-components';

import SearchMap from '../../components/user/SearchMap';
import SearchStoreList from '../../components/user/SearchStoreList';

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function SearchPage() {
  return (
    <SearchContainer>
      <SearchMap />
      <SearchStoreList />
    </SearchContainer>
  );
}

export default SearchPage;
