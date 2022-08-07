import type { Response } from '../../stores/user/responseStore';
import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  height: 72px;
  border: 1px solid black;
`;

function SearchStoreItem({ item }: { item: Response }) {
  return <ItemContainer></ItemContainer>;
}

export default SearchStoreItem;
