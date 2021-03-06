import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

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
    fetch('http://localhost:8080/account/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: id,
        password: pw,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isSuccess) {
          console.log(res);
          localStorage.setItem('token', res.accessToken);
          setAuth(true);
          setUserType(res.userType);
          navigate('/main', { replace: true });
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
      fetch('http://localhost:8080/account/validation', {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200) {
            setAuth(true);
            setUserType(res.userType);
            navigate('/main', { replace: true });
            console.log(res);
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
