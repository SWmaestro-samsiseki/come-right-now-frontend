import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../../styles/thema';

const TimeDealContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
const CreateTimeDealBtn = styled.button`
  width: 95%;
  height: 120px;
  margin: 20px;
  background: ${thema.color.secondary.main2};
  border: none;
  font: ${thema.font.p1};
  text-decoration: underline;
`;

function ConetntTimeDeal() {
  const navigate = useNavigate();

  function createTimeDeal() {
    navigate('create', { replace: true });
  }

  return (
    <TimeDealContainer>
      <CreateTimeDealBtn type="button" onClick={createTimeDeal}>
        + 타임딜 새로 생성하기
      </CreateTimeDealBtn>
    </TimeDealContainer>
  );
}

export default ConetntTimeDeal;
