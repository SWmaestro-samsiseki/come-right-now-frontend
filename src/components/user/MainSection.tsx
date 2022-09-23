import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import SectionHome from '../../pages/user/SectionHome';
import SectionStar from '../../pages/user/SectionStar';
import SectionTimeDeal from '../../pages/user/SectionTimeDeal';
import SectionMyPage from '../../pages/user/SectionMyPage';

const SectionContainer = styled.section`
  width: 100%;
  height: 92%;
`;

function UserSection() {
  return (
    <SectionContainer>
      <Routes>
        <Route path="" element={<SectionHome />} />
        <Route path="star" element={<SectionStar />} />
        <Route path="timedeal" element={<SectionTimeDeal />} />
        <Route path="mypage" element={<SectionMyPage />} />
      </Routes>
    </SectionContainer>
  );
}

export default UserSection;
