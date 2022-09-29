import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useAuthStore from '../stores/authStore';
import useCommonStore from '../stores/common';
import useRequestInfoStore from '../stores/user/requestInfoStore';
import { fetchUserInfo } from '../utils/auth';
import { fetchCategories } from '../utils/request';
import type { UserAuth } from '../utils/interface';

const logoAni = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(0);
  }
  75% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0);
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;

  & img {
    animation: ${logoAni} 1.5s linear infinite;
  }
`;

export default function LoadingPage() {
  const { isLoad, setLoad } = useCommonStore();
  const { setUser } = useAuthStore();
  const { initCategories, setLatitude, setLongitude } = useRequestInfoStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoad(true);
        console.log('위치를 가져오는데 성공했습니다.');
      },
      () => {
        console.log('위치를 가져오는데 실패했습니다.');
      },
    );
  }, []);

  useEffect(() => {
    fetchCategories().then((res) => {
      console.log('주종 카테고리를 가져오는데 성공했습니다.');
      initCategories(res);
    });
    fetchUserInfo().then((res) => {
      console.log('사용자 정보를 가져오는데 성공해습니다.');
      setUser(res as UserAuth);
    });
  }, []);

  return isLoad ? null : (
    <LoadingContainer>
      <img src={require(`../images/loadingLogo.png`)} alt="로딩 이미지" />
    </LoadingContainer>
  );
}
