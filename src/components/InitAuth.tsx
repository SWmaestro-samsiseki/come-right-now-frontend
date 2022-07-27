import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { authValid } from '../utils/auth';
import useAuthStore from '../stores/authStore';

function CheckAuth(): JSX.Element {
  const navigate = useNavigate();
  const { setAuth, setUserType } = useAuthStore();

  useEffect(() => {
    authValid()
      .then((res) => {
        if (res) {
          setAuth(true);
          setUserType(res);
          navigate('/main', { replace: true });
        }
      })
      .catch((err) => {
        alert('확인에 실패했습니다.' + err);
      });
  }, []);

  return <Navigate to="/login" replace={true} />;
}

export default CheckAuth;
