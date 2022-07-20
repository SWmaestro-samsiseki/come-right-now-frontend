import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function CheckUser({ children }: { children: JSX.Element }) {
  const { authoried } = useAuthStore();
  const location = useLocation();

  if (!authoried) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default CheckUser;
