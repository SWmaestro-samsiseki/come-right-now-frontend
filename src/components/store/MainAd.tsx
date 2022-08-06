import styled from 'styled-components';

const Advertisement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  background: #f8f8f8;
`;

function StoreAd() {
  return <Advertisement>광고</Advertisement>;
}
export default StoreAd;
