import styled from 'styled-components';
import thema from '../../styles/thema';

const AdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  background: ${thema.color.primary.main3_active};
  font: ${thema.font.h4};
`;

function StoreAd() {
  return <AdContainer>광고</AdContainer>;
}
export default StoreAd;
