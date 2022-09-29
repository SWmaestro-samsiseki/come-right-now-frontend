import styled from 'styled-components';
import thema from '../../../styles/thema';

const PopupContainer = styled.div`
  width: 100%;
  height: 172px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92px;
  color: ${thema.color.primary.main2};

  & h1 {
    font: ${thema.font.h5};
    margin-bottom: 16px;
  }
  & p {
    font: ${thema.font.p2};
  }
`;
const BtnContainer = styled.div`
  width: 100%;
  height: 80px;
  border-top: 1px solid ${thema.color.secondary.main2_active};

  & button {
    height: 100%;
    border: none;
    font: ${thema.font.p2};
    color: ${thema.color.secondary.main4};
    background: ${thema.color.primary.main3};
  }
  & button:nth-child(1) {
    width: 50%;
    border-bottom-left-radius: 12px;
    border-right: 1px solid ${thema.color.secondary.main2_active};
  }
  & button:nth-child(2) {
    width: 50%;
    border-bottom-right-radius: 12px;
  }
  & button img {
    width: 40px;
  }
`;

function ConfirmLoadPopup({
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
        <button onClick={close}>
          <img src={require(`../../../images/naver_logo.png`)} alt="네이버 로고" />
          <br></br>네이버
        </button>
        <button onClick={confirm}>
          <img src={require(`../../../images/kakao_logo.png`)} alt="카카오 로고" />
          <br></br>카카오
        </button>
      </BtnContainer>
    </PopupContainer>
  );
}

export default ConfirmLoadPopup;
