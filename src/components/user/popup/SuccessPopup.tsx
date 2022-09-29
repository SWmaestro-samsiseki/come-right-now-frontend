import styled from 'styled-components';
import thema from '../../../styles/thema';

const PopupContainer = styled.div`
  width: 100%;
  height: 151px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 111px;

  & h1 {
    font: ${thema.font.pb2};
    margin-bottom: 7px;
  }
  & p {
    font: ${thema.font.p2};
  }
`;
const Btn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: ${thema.color.alert.green};
  font: ${thema.font.pb2};
  color: ${thema.color.primary.main3};
`;

function SuccessPopup({
  title,
  description,
  close,
}: {
  title: string;
  description: string;
  close: VoidFunction;
}) {
  return (
    <PopupContainer>
      <Info>
        <h1>{title}</h1>
        <p>{description}</p>
      </Info>
      <Btn onClick={close}>확인</Btn>
    </PopupContainer>
  );
}

export default SuccessPopup;
