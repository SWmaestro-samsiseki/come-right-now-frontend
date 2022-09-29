import styled from 'styled-components';
import SectionNav from './SectionNav';
import SectionContent from './SectionContent';

const SectionContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc((100% - 160px) * 0.9);
`;

function MainSection() {
  return (
    <SectionContainer>
      <SectionNav />
      <SectionContent />
    </SectionContainer>
  );
}
export default MainSection;
