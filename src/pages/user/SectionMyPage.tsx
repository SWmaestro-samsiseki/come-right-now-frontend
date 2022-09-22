import styled from 'styled-components';
import thema from '../../styles/thema';
import MenuHeader from '../../components/user/MenuHeader';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function SectionTimeDeal() {
  return (
    <Container>
      <MenuHeader title={'My 지금갈게'} />
    </Container>
  );
}

export default SectionTimeDeal;
