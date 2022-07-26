import { Link } from 'react-router-dom';

function UserMainPage() {
  return (
    <div>
      <div role="button">
        <Link to="/request">실시간예약</Link>
      </div>
    </div>
  );
}

export default UserMainPage;
