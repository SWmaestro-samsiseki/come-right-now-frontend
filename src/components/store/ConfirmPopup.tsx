import styled from 'styled-components';
import thema from '../../styles/thema';

const PopupContainer = styled.div`
  width: 100%;
  height: 300px;
`;
const Info = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 240px;

  & h1 {
    position: absolute;
    top: 50px;
    font: ${thema.font.pb1};
  }
  & p {
    position: absolute;
    top: 130px;
    font: ${thema.font.h4};
  }
`;
const BtnContainer = styled.div`
  width: 100%;
  height: 60px;

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
