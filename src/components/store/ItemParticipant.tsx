import styled from 'styled-components';
import thema from '../../styles/thema';
import { deleteParticipantByStore } from '../../utils/timeDeal';
import useTimeDealStore from '../../stores/store/timeDealStore';
import type { MiniUserDTO } from '../../utils/interface';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 49%;
  height: 100px;
  padding: 20px;
  border: 1px solid ${thema.color.secondary.main3};
`;
const InfoBox = styled.div`
  color: ${thema.color.primary.main2};
  & p:nth-child(1) {
    font: ${thema.font.h4};
    margin-bottom: 6px;
  }
  & p:nth-child(2) {
    font: ${thema.font.pb2};
  }
`;
const BtnBox = styled.div`
  & button {
    width: 80px;
    height: 65px;
    border: none;
    border-radius: 4px;
    background: ${thema.color.primary.main1};
    font: ${thema.font.pb1};
    color: ${thema.color.primary.main2_active};
  }
`;

function ItemParticipant({
  item,
  timeDealId,
}: {
  item: { id: number; status: string; user: MiniUserDTO };
  timeDealId: number;
}) {
  const { removeParticipant } = useTimeDealStore();

  async function checkOut() {
    const response = await deleteParticipantByStore(item.id);
    if (typeof response === 'boolean') {
      // TODO: 타임딜 아이템의 participant목록에서 삭제하기
      removeParticipant(timeDealId, item.id);
    } else {
      // TODO: 팝업창 띄우기
      console.log(response.message);
    }
  }

  return (
    <Container>
      <InfoBox>
        <p>{item.user.name}</p>
        <p>{item.user.phone}</p>
      </InfoBox>
      <BtnBox>
        <button onClick={checkOut}>체크아웃</button>
      </BtnBox>
    </Container>
  );
}

export default ItemParticipant;
