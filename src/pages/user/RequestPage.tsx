import styled from 'styled-components';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useSocket from '../../utils/useSocket';
import UserRequestHeader from '../../components/user/RequestHeader';
import RequestStep from '../../components/user/RequestStep';
import RequestCategory from '../../components/user/RequestCategory';
import RequestStatus from '../../components/user/RequestStatus';

const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const SearchBtn = styled.button`
  position: fixed;
  bottom: 0;
  width: 320px;
  height: 48px;
  margin: 20px;
  font: normal 700 14px / 20px 'IBM Plex Sans KR';
  color: white;
  background: #ddd;
  border: none;
  border-radius: 4px;

  &.active {
    background: #54c2ff;
  }
  &:active {
    background: #0ba8ff;
  }
`;

function RequestPage() {
  const token = localStorage.getItem('token') as string;
  const { emitFindStore } = useSocket(token);
  const { selectedCategories } = useRequestInfoStore();

  return (
    <RequestContainer>
      <UserRequestHeader />
      <RequestStep step={1} name={'주종'} />
      <RequestCategory />
      <RequestStep step={2} name={'인원'} />
      <RequestStatus type={'people'} />
      <RequestStep step={3} name={'시간'} />
      <RequestStatus type={'time'} />
      <SearchBtn
        onClick={emitFindStore}
        className={selectedCategories.length > 0 ? 'active' : ''}
        disabled={selectedCategories.length > 0 ? false : true}>
        지금갈게
      </SearchBtn>
    </RequestContainer>
  );
}

export default RequestPage;
