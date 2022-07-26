import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authValid } from '../utils/auth';
import useAuthStore from '../stores/authStore';

function BranchComponent({
  first,
  second,
}: {
  first: JSX.Element;
  second: JSX.Element;
}): JSX.Element {
  const navigate = useNavigate();
  const { setAuth, setUserType } = useAuthStore();
  const [userType, setType] = useState('');

  useEffect(() => {
    authValid()
      .then((res) => {
        if (res) {
          setAuth(true);
          setUserType(res);
          setType(res);
        } else {
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => {
        alert('확인에 실패했습니다.' + err);
        navigate('/login', { replace: true });
      });
  }, []);

  if (userType === 'USER') return first;
  else if (userType === 'STORE') return second;
  else return <></>;
}
export default BranchComponent;
