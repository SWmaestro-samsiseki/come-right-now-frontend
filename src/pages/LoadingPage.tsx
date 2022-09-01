import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useCommonStore from '../stores/common';
import useRequestInfoStore from '../stores/user/requestInfoStore';

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
  width: 100%;
  height: 100%;
  z-index: 1;
  animation: ${logoAni} 1.5s linear infinite;
`;

export default function LoadingPage() {
  const { isLoad, setLoad } = useCommonStore();
  const { setLatitude, setLongitude } = useRequestInfoStore();

  useEffect(() => {
    // TODO: 위치를 반환하는 Custom Hooks 구현하기
    // TODO: 위치를 반환하기 전까지 요청을 보낼 수 없도록 구현하기
    if (navigator.geolocation) {
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
    } else {
      // 브라우저가 GPS를 지원하지 않는 경우
    }
  }, []);

  return isLoad ? null : (
    <LoadingContainer>
      <img src={require(`../images/loadingLogo.png`)} alt="로딩 이미지" />
    </LoadingContainer>
  );
}
