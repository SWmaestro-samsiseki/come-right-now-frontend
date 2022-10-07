import styled from 'styled-components';
import thema from '../../styles/thema';
import HistoryItem from './HistoryItem';
import type { StoreInfo } from '../../utils/interface';

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  padding-left: 20px;
  background: ${thema.color.secondary.main2};
  font: ${thema.font.p3};
  color: ${thema.color.secondary.main4};
`;

function HistoryList({ list }: { list: { day: string; store: StoreInfo[] } }) {
  return (
    <div>
      <Header>{list.day}</Header>
      {list.store.map((item, index) => (
        <HistoryItem key={index} item={item} />
      ))}
    </div>
  );
}

export default HistoryList;
