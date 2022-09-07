import styled from 'styled-components';
import thema from '../../../styles/thema';

const PopupContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;

  & span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 16px;
    background: ${thema.color.secondary.main2_active};
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  & h1 {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    font: ${thema.font.pb1};
  }
  & p {
    position: absolute;
    top: 130px;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    font: ${thema.font.h4};
  }
  & button {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 308px;
    height: 44px;
    border: none;
    border-radius: 4px;
    background: ${thema.color.alert.green};
    font: ${thema.font.pb2};
    color: ${thema.color.primary.main3};
  }
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
      <span></span>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={close}>확인</button>
    </PopupContainer>
  );
}

export default SuccessPopup;
