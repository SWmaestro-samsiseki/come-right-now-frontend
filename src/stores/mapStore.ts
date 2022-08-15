import create from 'zustand';

interface Map {
  map: naver.maps.Map | null;
  setMap: (value: naver.maps.Map) => void;
}

const useMap = create<Map>((set) => ({
  map: null,
  setMap: (value: naver.maps.Map) => set(() => ({ map: value })),
}));

export default useMap;
