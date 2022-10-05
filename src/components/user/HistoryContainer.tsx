import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuthStore from '../../stores/authStore';
import thema from '../../styles/thema';
import { getHistoryByUser } from '../../utils/reservation';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const EmtpyHistory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font: ${thema.font.p2};
  color: ${thema.color.primary.main2_active};

  & img {
    width: 140px;
    margin-bottom: 12px;
  }
`;

function HistoryContainer() {
  const { user } = useAuthStore();
  const [historyList, setHistoryList] = useState([]);
  const [text, setText] = useState('이용내역이 없습니다 :0');

  async function fetchHistory(id: string) {
    const response = await getHistoryByUser(id);
    if (!('error' in response)) {
      setHistoryList(response);
    } else {
      setText(response.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchHistory(user.id);
    }
  }, [user]);

  return (
    <Container>
      {historyList.length === 0 ? (
        <EmtpyHistory>
          <img
            src={
              'https://s3.ap-northeast-2.amazonaws.com/static.jigeumgo.com/images/emtpyHistory.png'
            }
            alt="빈 이미지"
          />
          {text}
        </EmtpyHistory>
      ) : null}
    </Container>
  );
}

export default HistoryContainer;
