import { useNavigate } from 'react-router-dom';

function UserMainPage() {
  const navigate = useNavigate();
  function reservation() {
    navigate('/request', { replace: true });
  }
  return (
    <div>
      <button type="button" onClick={reservation}>
        실시간예약
      </button>
    </div>
  );
}

export default UserMainPage;
