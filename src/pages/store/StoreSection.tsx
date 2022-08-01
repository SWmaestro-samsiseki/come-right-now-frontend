import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc((100% - 160px) * 0.9);
`;
const ButtonContainer = styled.div`
  width: 15%;
  height: 100%;
  border-right: 1px solid #d2d2d2;
`;
const Button = styled.button`
  width: 100%;
  height: 50%;
  font: normal 700 24px / 32px 'IBM Plex Sans KR';
  color: #888;
  border: none;
  background: none;
  &:first-child {
    border-bottom: 1px solid #d2d2d2;
  }
`;
const ContentContainer = styled.div`
  width: 85%;
  height: 100%;
`;

function StoreSection() {
  return (
    <MainContainer>
      <ButtonContainer>
        <Button>예약</Button>
        <Button>대기</Button>
      </ButtonContainer>
      <ContentContainer></ContentContainer>
    </MainContainer>
  );
}
export default StoreSection;
