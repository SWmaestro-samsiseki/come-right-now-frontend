import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../../styles/thema';
import useAuthStore from '../../stores/authStore';
import useTimeDealStore from '../../stores/store/timeDealStore';
import { getTimeDealByStore } from '../../utils/timeDeal';
import ItemTimeDeal from './ItemTimeDeal';

const TimeDealContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
const CreateTimeDealBtn = styled.button`
  width: 95%;
  height: 120px;
  min-height: 120px;
  margin: 20px;
  background: ${thema.color.secondary.main2};
  border: none;
  font: ${thema.font.p1};
  text-decoration: underline;
`;

function ConetntTimeDeal() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { timeDealList, initTimeDeal } = useTimeDealStore();

  async function fetchTimeDeal(storeId: string) {
    const response = await getTimeDealByStore(storeId);
    if (!('error' in response)) {
      initTimeDeal([response]);
    } else {
      console.log('진행중인 타임딜이 없습니다.');
    }
  }

  function createTimeDeal() {
    navigate('create', { replace: true });
  }

  useEffect(() => {
    if (user !== null) {
      fetchTimeDeal(user.id);
    }
  }, [user]);

  return (
    <TimeDealContainer>
      <CreateTimeDealBtn type="button" onClick={createTimeDeal}>
        + 타임딜 새로 생성하기
      </CreateTimeDealBtn>
      {timeDealList.map((item, index) => (
        <ItemTimeDeal key={index} item={item} />
      ))}
    </TimeDealContainer>
  );
}

export default ConetntTimeDeal;
