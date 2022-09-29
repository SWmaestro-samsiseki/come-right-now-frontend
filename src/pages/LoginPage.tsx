import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FailPopup from '../components/user/popup/FailPopup';
import useAuthStore from '../stores/authStore';
import { login } from '../utils/auth';
import thema from '../styles/thema';

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
    border: 1px solid ${thema.color.secondary.main3};
    border-radius: 4px;
  }
`;
const Title = styled.h1`
  margin-bottom: 50%;
  font: ${thema.font.h3};
  color: ${thema.color.primary.main2};
  @media screen and (min-width: 500px) {
    margin: 0 0 100px;
  }
`;
const InputBox = styled.div`
  position: relative;
  width: 320px;
  height: 24px;
  margin: 0 auto;
  margin-bottom: 20px;

  @media screen and (min-width: 500px) {
    width: 260px;
    height: 32px;
  }

  & input {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    border-bottom: 1px solid ${thema.color.secondary.main4};
    font: ${thema.font.p2};
    caret-color: ${thema.color.primary.main1};
    &:focus {
      border-bottom: 1px solid ${thema.color.primary.main1};
      outline: none;
    }
    &::placeholder {
      color: ${thema.color.secondary.main4};
    }
    @media screen and (min-width: 500px) {
      width: 240px;
      height: 32px;
      padding: 0 10px;
      border: none;
      border-radius: 4px;
      background: ${thema.color.secondary.main2};
    }
  }

  & div {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
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
  font: ${thema.font.pb2};
  color: ${thema.color.primary.main3};
  background: ${(props) =>
    props.disabled ? thema.color.secondary.main3_active : thema.color.primary.main1};
  &:active {
    background: ${(props) =>
      props.disabled ? thema.color.secondary.main3_active : thema.color.primary.main1_active};
  }
  @media screen and (min-width: 500px) {
    width: 260px;
    margin: 30px 0 10px;
  }
`;
const RegistBtn = styled(Link)`
  font: ${thema.font.p3};
  color: ${thema.color.primary.main2};
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
  font: ${thema.font.h4};
  color: ${thema.color.primary.main3};
  background: ${thema.color.primary.main1};
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
  const [isId, setIsId] = useState(false);
  const [pw, setPw] = useState('');
  const [isPw, setIsPw] = useState(false);
  const MySwal = withReactContent(Swal);

  function inputFocusEvent(e: React.FocusEvent) {
    if (e.target.getAttribute('type') === 'password') {
      if (pw.length !== 0) {
        setIsPw(true);
      }
    } else {
      if (id.length !== 0) {
        setIsId(true);
      }
    }
  }
  function inputFocusoutEvent(e: React.FocusEvent) {
    if (e.target.getAttribute('type') === 'password') {
      setIsPw(false);
    } else {
      setIsId(false);
    }
  }
  function idEvent(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
    if (e.target.value.length === 0) {
      setIsId(false);
    } else {
      setIsId(true);
    }
  }
  function pwEvent(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
    if (e.target.value.length === 0) {
      setIsPw(false);
    } else {
      setIsPw(true);
    }
  }
  async function tryLogin() {
    const response = await login(id, pw);
    if (!('error' in response)) {
      localStorage.setItem('token', response.accessToken);
      setAuth(true);
      setUserType(response.userType);
      navigate('/main', { replace: true });
    } else {
      console.log(response.message);
      MySwal.fire({
        html: <FailPopup title="로그인 실패" description={response.message} close={Swal.close} />,
        showConfirmButton: false,
        width: '340px',
        padding: 0,
        customClass: {
          popup: 'fail-popup-border',
        },
      });
    }
  }

  return (
    <LoginForm>
      <Title>지금갈게</Title>
      <InputBox>
        <input
          placeholder="이메일을 입력하세요"
          value={id}
          onChange={idEvent}
          onFocus={inputFocusEvent}
          onBlur={inputFocusoutEvent}
        />
        {isId ? (
          <div onMouseDown={() => setId('')}>
            <img
              src={require('../images/inputDelete.png')}
              alt="아이디 입력 초기화 이미지"
              onMouseDown={() => setId('')}
            />
          </div>
        ) : null}
      </InputBox>
      <InputBox>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={pw}
          onChange={pwEvent}
          onFocus={inputFocusEvent}
          onBlur={inputFocusoutEvent}
        />
        {isPw ? (
          <div onMouseDown={() => setPw('')}>
            <img src={require('../images/inputDelete.png')} alt="비밀번호 입력 초기화 이미지" />
          </div>
        ) : null}
      </InputBox>
      <LoginBtn role="button" onClick={tryLogin} disabled={id && pw ? false : true}>
        로그인
      </LoginBtn>
      <RegistBtn to="/">아직 회원이 아니신가요?</RegistBtn>
      <Tooltip>?</Tooltip>
    </LoginForm>
  );
}

export default LoginPage;
