import styled from 'styled-components';
import thema from '../../styles/thema';
import type { StoreInfo } from '../../utils/interface';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
`;
const ImageBox = styled.div`
  width: 48px;
  height: 48px;
  margin: 12px;
  background: ${thema.color.secondary.main2};

  & img {
    width: 100%;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 72px;
  color: ${thema.color.primary.main2};

  & p:nth-child(1) span:nth-child(1) {
    font: ${thema.font.pb2};
    margin-right: 6px;
  }
  & p:nth-child(1) span:nth-child(2) {
    font: ${thema.font.p3};
    color: ${thema.color.secondary.main4};
  }
  & p:nth-child(2) {
    font: ${thema.font.p3};
    margin-top: 4px;
  }
`;

function HistoryItem({ item }: { item: StoreInfo }) {
  return (
    <Container>
      <ImageBox>
        <img src={item.storeImage as string} alt="가게 이미지" />
      </ImageBox>
      <InfoBox>
        <p>
          <span>{item.businessName}</span>
          <span>{item.storeType}</span>
        </p>
        <p>{item.address}</p>
      </InfoBox>
    </Container>
  );
}

export default HistoryItem;
