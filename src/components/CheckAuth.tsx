import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

function CheckAuth({ component }: { component: JSX.Element }): JSX.Element {
  const { authoried } = useAuthStore();

  return authoried ? component : <Navigate to="/" replace={true} />;
}

export default CheckAuth;
