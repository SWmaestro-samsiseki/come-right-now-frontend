import styled from 'styled-components';
import thema from '../../styles/thema';

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc((100% - 160px) * 0.1);
  background: ${thema.color.primary.main3};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
`;
const Title = styled.h1`
  font: ${thema.font.h5};
  position: absolute;
  top: 50%;
  left: 30px;
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
        <img src={require('../../images/notification_on.png')} />
        <img src={require('../../images/graph.png')} />
        <img src={require('../../images/setting.png')} />
      </IconContainer>
    </HeaderContainer>
  );
}
export default StoreHeader;
