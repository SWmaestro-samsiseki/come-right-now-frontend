import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../../styles/thema';

const NavContainer = styled.div`
  width: 15%;
  height: 100%;
  box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.08);
`;
const Button = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% / 3);
  font: ${thema.font.h4};
  color: ${thema.color.primary.main2_active};
  border-bottom: 1.4px solid ${thema.color.secondary.main3};
  text-decoration: none;

  &:last-child {
    border: none;
  }
  &.current {
    background: ${thema.color.primary.main1};
  }
`;

function SectionNav() {
  const param = useParams();

  return (
    <NavContainer>
      <Button to="/main/stand" className={param['*'] === 'stand' ? 'current' : ''}>
        대기
      </Button>
      <Button to="/main/reservation" className={param['*'] === 'reservation' ? 'current' : ''}>
        예약
      </Button>
      <Button to="/main/timedeal" className={param['*'] === 'timedeal' ? 'current' : ''}>
        타임딜
      </Button>
    </NavContainer>
  );
}

export default SectionNav;
