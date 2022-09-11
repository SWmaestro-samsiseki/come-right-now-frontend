import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import ContentStand from './ContentStand';
import ContentReservation from './ContentReservation';
import ContentTimeDeal from './ContentTimeDeal';
import ContentTimeDealCreate from './ContentTimeDealCreate';
import thema from '../../styles/thema';

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 100%;
  font: ${thema.font.h5};
`;

function SectionContent() {
  return (
    <ContentContainer>
      <Routes>
        <Route path="" element={<p>가게 전경 사진</p>} />
        <Route path="stand" element={<ContentStand />} />
        <Route path="reservation" element={<ContentReservation />} />
        <Route path="timedeal" element={<ContentTimeDeal />} />
        <Route path="timedeal/create" element={<ContentTimeDealCreate />} />
      </Routes>
    </ContentContainer>
  );
}

export default SectionContent;
