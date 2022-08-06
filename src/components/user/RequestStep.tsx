import styled from 'styled-components';

const StepContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 28px;
  padding: 4px 0;

  & span:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 53px;
    height: 20px;
    border-radius: 16px;
    background-color: #0ba8ff;
    font: normal 700 12px / 16px 'IBM Plex Sans KR';
    color: white;
  }
  & span:last-child {
    width: 65%;
    height: 1px;
    border-top: 1px solid #282828;
  }
  & p {
    margin: 6px;
    font: normal 700 12px / 16px 'IBM Plex Sans KR';
    color: #282828;
  }
`;

function RequestStep({ step, name }: { step: number; name: string }) {
  return (
    <StepContainer>
      <span>Step.{step}</span>
      <p>{name} 선택</p>
      <span></span>
    </StepContainer>
  );
}

export default RequestStep;
