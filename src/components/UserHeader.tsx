import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8%;
  font: normal 700 24px / 32px 'IBM Plex Sans KR';
`;

function UserHeader() {
  return (
    <Header>
      <h1>지금갈게</h1>
    </Header>
  );
}

export default UserHeader;
