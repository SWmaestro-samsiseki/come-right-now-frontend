import styled from 'styled-components';

const PopupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;

  & img {
    width: 100%;
  }
`;

function MenuPopup({ src }: { src: string }) {
  return (
    <PopupContainer>
      <img src={src} alt="메뉴이미지" />
    </PopupContainer>
  );
}

export default MenuPopup;
