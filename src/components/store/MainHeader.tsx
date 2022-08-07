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
  function test() {
    fetch('http://localhost:8080/reservation-events/test/seat-request', {
      method: 'POST',
    });
  }
  function test2() {
    fetch('http://localhost:8080/reservation-events/test/seat-reservation', {
      method: 'POST',
    });
  }

  return (
    <HeaderContainer>
      <Title onClick={test}>지금갈게</Title>
      <IconContainer>
        <img src={require('../../images/notification_on.png')} />
        <img src={require('../../images/graph.png')} />
        <img src={require('../../images/setting.png')} onClick={test2} />
      </IconContainer>
    </HeaderContainer>
  );
}
export default StoreHeader;
