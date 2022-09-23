import { useEffect, useState } from 'react';
import styled from 'styled-components';
import thema from '../../styles/thema';
import useAuthStore from '../../stores/authStore';
import MenuHeader from '../../components/user/MenuHeader';
import type { UserAuth } from '../../utils/interface';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 56px;
  margin-top: 22px;

  & > div p:first-child {
    margin-bottom: 4px;
    font: ${thema.font.p2};
    color: ${thema.color.primary.main2};
  }
  & > div p:last-child {
    font: ${thema.font.p3};
    color: ${thema.color.secondary.main3_active};
  }
`;
const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 46px;
  font: ${thema.font.p2};
  color: ${thema.color.primary.main2};

  & > div {
    display: flex;
    align-items: center;
  }
  & > div img {
    margin-left: 4px;
  }
  & > span {
    color: ${thema.color.alert.blue};
  }
`;

function SectionTimeDeal() {
  const { user } = useAuthStore();
  const [auth, setAuth] = useState<UserAuth>();

  useEffect(() => {
    if (user) {
      if ('creditRate' in user) {
        setAuth(user);
      }
    }
  }, [user]);

  return (
    <Container>
      <MenuHeader title={'My 지금갈게'} />
      <ProfileBox>
        <div>
          <p>{auth?.name}님 안녕하세요.</p>
          <p>{auth?.email}</p>
        </div>
        <span>
          <img src={require('../../images/next.png')} alt="다음 이미지" />
        </span>
      </ProfileBox>
      <ItemBox>
        <div>
          <p>신용등급</p>
          <img src={require('../../images/Q.png')} alt="물음표 이미지" />
        </div>
        <span>{auth?.creditRate}점</span>
      </ItemBox>
      <ItemBox>
        <div>이용내역</div>
        <span>
          <img src={require('../../images/next.png')} alt="다음 이미지" />
        </span>
      </ItemBox>
      <ItemBox>
        <div>이벤트</div>
        <span>
          <img src={require('../../images/next.png')} alt="다음 이미지" />
        </span>
      </ItemBox>
      <ItemBox>
        <div>환경설정</div>
        <span>
          <img src={require('../../images/next.png')} alt="다음 이미지" />
        </span>
      </ItemBox>
    </Container>
  );
}

export default SectionTimeDeal;
