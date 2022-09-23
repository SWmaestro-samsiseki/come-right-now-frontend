import styled from 'styled-components';
import thema from '../../styles/thema';
import MenuHeader from '../../components/user/MenuHeader';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function SectionStar() {
  return (
    <Container>
      <MenuHeader title={'찜'} />
    </Container>
  );
}
export default SectionStar;
