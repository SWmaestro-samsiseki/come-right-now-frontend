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
const BtnContainer = styled.div`
  width: 100%;
  height: 40px;

  & button {
    height: 100%;
    border: none;
    font: ${thema.font.pb2};
    color: ${thema.color.primary.main2};
  }
  & button:nth-child(1) {
    width: 40%;
    border-bottom-left-radius: 12px;
    background: ${thema.color.secondary.main3};
  }
  & button:nth-child(2) {
    width: 60%;
    border-bottom-right-radius: 12px;
    background: ${thema.color.primary.main1};
  }
`;

function ConfirmPopup({
  title,
  description,
  confirm,
  close,
}: {
  title: string;
  description: string;
  confirm: VoidFunction;
  close: VoidFunction;
}) {
  return (
    <PopupContainer>
      <Info>
        <h1>{title}</h1>
        <p>{description}</p>
      </Info>
      <BtnContainer>
        <button onClick={close}>취소</button>
        <button onClick={confirm}>확인</button>
      </BtnContainer>
    </PopupContainer>
  );
}

export default ConfirmPopup;
