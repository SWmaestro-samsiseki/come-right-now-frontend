import { useEffect, useState } from 'react';
import BeverageItem from '../../components/BeverageItem';

interface item {
  id: number;
  name: string;
}

async function fetchItem(): Promise<Array<string>> {
  const response = await fetch('http://localhost:8080/category', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse.map((ele: item) => ele.name);
}

function RequestPage() {
  const [item, setItem] = useState<string[]>([]);
  const [people, setPeople] = useState(1);
  const [time, setTime] = useState(0);

  useEffect(() => {
    fetchItem().then((res) => setItem(res));
  }, []);

  return (
    <div>
      {item.map((ele, index) => (
        <BeverageItem key={index} name={ele} index={index} />
      ))}
      <div
        role="button"
        onClick={
          people !== 1
            ? () => setPeople(people - 1)
            : () => {
                alert('최소 1명 이상이여야 합니다.');
              }
        }>
        -
      </div>
      <input type="number" value={people} onChange={(e) => setPeople(Number(e.target.value))} />
      <div role="button" onClick={() => setPeople(people + 1)}>
        +
      </div>
      <div
        role="button"
        onClick={
          time !== 0
            ? () => setTime(time - 5)
            : () => {
                alert('최소 0분 이상이여야 합니다.');
              }
        }>
        -
      </div>
      <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} />
      <div role="button" onClick={() => setTime(time + 5)}>
        +
      </div>
      <button>지금갈게</button>
    </div>
  );
}

export default RequestPage;
