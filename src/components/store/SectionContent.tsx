import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import SectionStand from './ContentStand';
import SectionReservation from './ContentReservation';
import SectionTimedeal from './ContentTimeDeal';
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
        <Route path="stand" element={<SectionStand />} />
        <Route path="reservation" element={<SectionReservation />} />
        <Route path="timedeal" element={<SectionTimedeal />} />
      </Routes>
    </ContentContainer>
  );
}

export default SectionContent;
