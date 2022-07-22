import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function LoginPage() {
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
    fetch('API주소/accout/login', {
      method: 'POST',
      body: JSON.stringify({
        email: id,
        password: pw,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isSuccess) {
          localStorage.setItem('token', res.accessToken);
          setAuth();
          setUserType(res.userType);
          return <Navigate to="/main" replace={true} />;
        } else {
          alert('로그인 실패');
        }
      })
      .catch((err) => {
        alert('로그인에 실패했습니다.' + err);
      });
    console.log(id, pw);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      fetch('API주소/accout/validation', {
        method: 'GET',
        headers: {
          accessToken: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.isValid) {
            return <Navigate to="/main" replace={true} />;
          }
        })
        .catch((err) => {
          alert('확인에 실패했습니다.' + err);
        });
    }
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
