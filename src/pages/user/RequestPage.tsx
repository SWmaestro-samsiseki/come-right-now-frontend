import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import useRequestStore from '../../stores/requestStore';
import CategoryItem from '../../components/CategoryItem';
import { findStore } from '../../utils/request';

function RequestPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    categories,
    selectedCategories,
    people,
    time,
    latitude,
    longitude,
    plusPeople,
    minusPeople,
    plusTime,
    minusTime,
  } = useRequestStore();

  function check() {
    findStore({
      categories: selectedCategories.map((ele) => ele.id),
      numberOfPeople: people,
      arrivedAt: new Date(new Date().getTime() + time * 60000),
      userId: user?.id,
      latitude,
      longitude,
    }).then((res) => {
      if (res.isSuccess === true) {
        navigate('/search', { replace: true });
      } else {
        alert('요청에 실패했습니다');
      }
    });
  }
  return (
    <div>
      {categories.map((ele, index) => (
        <CategoryItem key={index} category={ele} />
      ))}
      <div role="button" onClick={minusPeople}>
        -
      </div>
      <input type="number" value={people} />
      <div role="button" onClick={plusPeople}>
        +
      </div>
      <div role="button" onClick={minusTime}>
        -
      </div>
      <input type="number" value={time} />
      <div role="button" onClick={plusTime}>
        +
      </div>
      <button onClick={check}>지금갈게</button>
    </div>
  );
}

export default RequestPage;
