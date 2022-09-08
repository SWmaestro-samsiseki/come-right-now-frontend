import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useRequestInfoStore from '../../stores/user/requestInfoStore';

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8%;
  font: normal 700 14px / 20px 'IBM Plex Sans KR';
`;
const BackBtn = styled(Link)`
  position: absolute;
  left: 20px;
`;

function UserRequestHeader() {
  const { initPT } = useRequestInfoStore();

  return (
    <Header>
      <BackBtn to="/main" replace={true} onClick={initPT}>
        <img src={require('../../images/back.png')} alt="뒤로가기" />
      </BackBtn>
      <h1>주점 찾기</h1>
    </Header>
  );
}

export default UserRequestHeader;
