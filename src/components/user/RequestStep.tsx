import styled from 'styled-components';
import thema from '../../styles/thema';

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
    width: 59px;
    height: 24px;
    border-radius: 16px;
    background-color: ${thema.color.primary.main1};
    font: ${thema.font.pb2};
    color: ${thema.color.primary.main2};
  }
  & span:last-child {
    width: 62%;
    height: 1px;
    border-top: 1px solid ${thema.color.primary.main2};
  }
  & p {
    margin: 0 10px;
    font: ${thema.font.pb2};
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
