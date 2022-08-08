import type { StoreInfo } from '../../stores/user/responseInfoStore';
import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  height: 72px;
  border: 1px solid black;
`;

function SearchStoreItem({ item }: { item: StoreInfo }) {
  return <ItemContainer></ItemContainer>;
}

export default SearchStoreItem;
