import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

const SectionContainer = styled.section`
  width: 100%;
  height: 84%;
`;

function UserSection() {
  return (
    <SectionContainer>
      <Routes>
        <Route path="" element={<div>메인</div>} />
        <Route path="star" element={<div>찜</div>} />
        <Route path="history" element={<div>이용내역</div>} />
        <Route path="mypage" element={<div>마이페이지</div>} />
      </Routes>
    </SectionContainer>
  );
}

export default UserSection;
