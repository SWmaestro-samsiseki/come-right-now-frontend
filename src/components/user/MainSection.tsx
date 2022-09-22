import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import SectionMain from '../../pages/user/SectionMain';
import SectionTimedeal from '../../pages/user/SectionTimeDeal';

const SectionContainer = styled.section`
  width: 100%;
  height: 84%;
`;

function UserSection() {
  return (
    <SectionContainer>
      <Routes>
        <Route path="" element={<SectionMain />} />
        <Route path="star" element={<div>찜</div>} />
        <Route path="timedeal" element={<SectionTimedeal />} />
        <Route path="mypage" element={<div>마이페이지</div>} />
      </Routes>
    </SectionContainer>
  );
}

export default UserSection;
