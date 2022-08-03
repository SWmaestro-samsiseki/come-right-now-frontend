import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '../stores/user/authStore';
import { addAuth } from '../utils/auth';

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 500px) {
    width: 30%;
    height: 60%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;
const Title = styled.h1`
  margin-bottom: 50%;
  font: normal 700 32px / 42px 'IBM Plex Sans KR';
  color: #282828;
  @media screen and (min-width: 500px) {
    margin: 0 0 100px;
  }
`;
const AccountInput = styled.input`
  display: block;
  width: 320px;
  height: 24px;
  margin: 0 auto;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #888;
  font: normal 500 14px / 20px 'IBM Plex Sans KR';
  text-decoration: 1px solid #54c2ff;
  &:focus {
    border-bottom: 1px solid #54c2ff;
    outline: none;
  }
  &::placeholder {
    color: #ddd;
  }
  @media screen and (min-width: 500px) {
    width: 240px;
    height: 32px;
    padding: 0 10px;
    border: none;
    border-radius: 4px;
    background: #f5f5f5;
  }
`;
const LoginBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 48px;
  margin-top: 40%;
  margin-bottom: 30px;
  border: none;
  border-radius: 4px;
  font: normal 700 14px / 20px 'IBM Plex Sans KR';
  color: white;
  background: ${(props) => (props.disabled ? '#DDD' : '#54c2ff')};
  &:active {
    background: ${(props) => (props.disabled ? '#DDD' : '#0ba8ff')};
  }
  @media screen and (min-width: 500px) {
    width: 260px;
    margin: 30px 0 10px;
  }
`;
const RegistBtn = styled(Link)`
  font: normal 500 12px / 16px 'IBM Plex Sans KR';
  color: #282828;
  text-decoration: none;
  @media screen and (min-width: 500px) {
    display: none;
  }
`;
const Tooltip = styled.div`
  display: none;
  position: absolute;
  width: 40px;
  height: 40px;
  top: 30px;
  right: 40px;
  border-radius: 50%;
  font: normal 700 24px / 32px 'IBM Plex Sans KR';
  color: white;
  background: #54c2ff;
  @media screen and (min-width: 500px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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

  return (
    <LoginForm>
      <Title>지금갈게</Title>
      <AccountInput placeholder="이메일을 입력하세요" value={id} onChange={idEvent} />
      <AccountInput
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={pw}
        onChange={pwEvent}
      />
      <LoginBtn role="button" onClick={login} disabled={id && pw ? false : true}>
        로그인
      </LoginBtn>
      <RegistBtn to="/">아직 회원이 아니신가요?</RegistBtn>
      <Tooltip>?</Tooltip>
    </LoginForm>
  );
}

export default LoginPage;
