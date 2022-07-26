import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { authValid, addAuth } from '../utils/auth';

function LoginPage() {
  const navigate = useNavigate();
  const { setAuth, setUserType } = useAuthStore();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  function idEvent(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }
  function pwEvent(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }
  function login() {
    addAuth(id, pw)
      .then((res) => {
        if (res.isSuccess) {
          localStorage.setItem('token', res.accessToken);
          setAuth(true);
          setUserType(res.userType);
          navigate('/main', { replace: true });
        } else {
          alert('로그인 정보가 일치하지 않습니다.');
        }
      })
      .catch((err) => {
        alert('확인에 실패했습니다.' + err);
      });
  }

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

  return (
    <div>
      <label htmlFor="userId">ID</label>
      <input type="text" id="userId" value={id} onChange={idEvent} />
      <label htmlFor="userPw">PW</label>
      <input type="password" id="userPw" value={pw} onChange={pwEvent} />
      <button type="button" onClick={login}>
        login
      </button>
    </div>
  );
}

export default LoginPage;
