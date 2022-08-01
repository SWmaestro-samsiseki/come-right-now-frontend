import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc((100% - 160px) * 0.1);
  border-bottom: 1px solid #d2d2d2;
`;
const Title = styled.h1`
  font: normal 700 18px / 24px 'IBM Plex Sans KR';
  position: absolute;
  top: 50%;
  left: 36px;
  transform: translateY(-50%);
`;
const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  & img {
    padding: 5px;
    margin: 5px;
  }
`;

function StoreHeader() {
  return (
    <HeaderContainer>
      <Title>지금갈게</Title>
      <IconContainer>
        <img src={require('../images/notification_on.png')} />
        <img src={require('../images/graph.png')} />
        <img src={require('../images/setting.png')} />
      </IconContainer>
    </HeaderContainer>
  );
}
export default StoreHeader;
