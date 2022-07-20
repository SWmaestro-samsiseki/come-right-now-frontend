import React, { useState } from 'react';

function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  function idEvent(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }
  function pwEvent(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }
  function login() {
    // id와 pw값을 보내고 성공시 로그인 로직 처리
    // 성공시 JWT를 반환 받아서 쿠키에 저장하고 /main으로 리다이렉트
    // 이때 로그인 상태관리를 하는 전역 상태 변수를 true로 변경
    // 실패시 실패 alert
    console.log(id, pw);
  }

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
