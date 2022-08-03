import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/user/authStore';

function CheckUserType({
  first,
  second,
}: {
  first: JSX.Element;
  second: JSX.Element;
}): JSX.Element {
  const { userType } = useAuthStore();

  if (userType === 'USER') return first;
  else if (userType === 'STORE') return second;
  else return <Navigate to="/" replace={true} />;
}
export default CheckUserType;
