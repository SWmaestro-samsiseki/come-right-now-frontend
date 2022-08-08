import { useEffect } from 'react';
import styled from 'styled-components';
import useRequestInfoStore from '../../stores/user/requestInfoStore';

const MapContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
`;
const Map = styled.div`
  width: 100%;
  height: 100%;
`;
const Noti = styled.div`
  position: absolute;
  top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 172px;
  height: 32px;
  font: normal 500 12px / 16px 'IBM Plex Sans KR';
  color: white;
  background: #54c2ff;
  border-radius: 100px;
`;
const StopBtn = styled.button`
  position: absolute;
  bottom: 5%;
  font: normal 500 14px / 20px 'IBM Plex Sans KR';
  color: #282828;
  text-decoration: underline;
  border: none;
  background: transparent;
`;

function SearchMap() {
  const { latitude, longitude } = useRequestInfoStore();
  useEffect(() => {
    const initMap = () => {
      if (latitude && longitude) {
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(latitude, longitude),
          zoom: 15,
        });
        map.setOptions({
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          mapTypeControl: false,
        });
        new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: map,
        });
      } else {
        // TODO: 위치가 특정될 떄까지 Loading되는 팝업을 SweetAlert2를 이용해 구현하기
      }
    };
    initMap();
  }, [latitude, longitude]);
  return (
    <MapContainer>
      <Map id="map"></Map>
      <Noti>가게를 탐색하게 있습니다</Noti>
      <StopBtn>탐색 취소</StopBtn>
    </MapContainer>
  );
}

export default SearchMap;
