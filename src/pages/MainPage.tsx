import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkStyled = styled(Link)`
  font-size: 2rem;
  color: red;
`;
const DivBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  transform: translate(100px);
`;

function MainPage() {
  return (
    <div>
      <div role="button">
        <LinkStyled to="/request">실시간예약</LinkStyled>
        <DivBox>dd</DivBox>
      </div>
    </div>
  );
}

export default MainPage;
