import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

function CheckUserType({
  userComponent,
  storeComponent,
}: {
  userComponent: JSX.Element;
  storeComponent: JSX.Element;
}): JSX.Element {
  const { userType } = useAuthStore();

  if (userType === 'USER') return userComponent;
  else if (userType === 'STORE') return storeComponent;
  else return <Navigate to="/" replace={true} />;
}
export default CheckUserType;
