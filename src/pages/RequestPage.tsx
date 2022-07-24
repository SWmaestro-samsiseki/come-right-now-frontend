import { useEffect, useState } from 'react';
import BeverageItem from '../components/BeverageItem';

function RequestPage() {
  const [category] = useState(['A', 'B', 'C', 'D', 'E', 'F']);
  const [curCategory] = useState([]);
  const [people, setPeople] = useState(1);
  const [time, setTime] = useState(0);

  function searchStore() {
    // 조건들을 매개로 서버에 findStore이벤트 emit하는 코드 작성 필요
  }

  useEffect(() => {
    // 원래 이 부분에 주종을 가져오는 API를 사용하지만 현재는 보류하고 하드한 데이터로 테스트
  }, []);

  return (
    <div>
      {category.map((ele, index) => {
        return <BeverageItem key={index} item={ele} />;
      })}
      {people}
      {time}
      <button type="button" onClick={searchStore}>
        지금갈게
      </button>
    </div>
  );
}

export default RequestPage;
