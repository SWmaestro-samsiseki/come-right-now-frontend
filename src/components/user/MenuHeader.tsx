import styled from 'styled-components';
import thema from '../../styles/thema';

const MenuHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  min-height: 50px;
  font: ${thema.font.pb2};
  color: ${thema.color.primary.main2};
  background: ${thema.color.primary.main3};
  box-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.16);
`;

function MenuHeader({ title }: { title: string }) {
  return <MenuHeaderContainer>{title}</MenuHeaderContainer>;
}

export default MenuHeader;
