import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../../styles/thema';

const TimeDealCreateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;

  & span {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
  & img {
    width: 30px;
  }
`;
const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;
const Content = styled.div`
  position: relative;
  width: 45%;
  height: 95%;
  margin: 0 15px;
  border-radius: 12px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);

  &:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 100px;
  margin: 10px 0 15px;

  & span {
    font: ${thema.font.h3};
  }
  & div {
    width: 48%;
    height: 1px;
    margin-left: 15px;
    background: black;
  }
`;
const TimeBox = styled.div`
  width: 100%;
  padding-left: 60px;
  margin-bottom: 20px;

  & p {
    font: ${thema.font.h4};
    margin-bottom: 15px;
  }
  & div {
    display: flex;
    align-items: center;
    font: ${thema.font.h5};
  }
`;
const Controller = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  height: 50px;
  margin-right: 15px;
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 4px;

  & span {
    font: ${thema.font.h4};
  }
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 4px;
    border: none;
    border-radius: 4px;
    font: ${thema.font.h3};
    background: ${thema.color.secondary.main3};
    color: ${thema.color.primary.main3};
  }
  & button:active {
    background: ${thema.color.primary.main2_active};
  }
`;
const BenefitBox = styled.div`
  width: 100%;
  padding-left: 60px;

  & p {
    font: ${thema.font.h4};
    margin-bottom: 15px;
  }
  & textarea {
    padding: 10px;
    border: 1px solid ${thema.color.primary.main2};
    border-radius: 8px;
    font: ${thema.font.p1};
  }
  & textarea:focus {
    outline: none;
  }
`;
const CreateBtn = styled.button`
  position: absolute;
  bottom: 40px;
  right: 50px;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 8px;
  font: ${thema.font.p1};
  color: ${thema.color.primary.main2};
  background: ${thema.color.primary.main1};

  &:active {
    background: ${thema.color.primary.main1_active};
  }
`;

function ContentTimeDealCreate() {
  const navigate = useNavigate();

  function goBack() {
    navigate('/main/timedeal', { replace: true });
  }

  return (
    <TimeDealCreateContainer>
      <Header>
        <span>
          <img src={require('../../images/back.png')} alt="뒤로가기 아이콘" onClick={goBack} />
          뒤로
        </span>
      </Header>
      <Contents>
        <Content>타임딜에 대한 설명</Content>
        <Content>
          <Title>
            <span>타임딜 만들기</span>
            <div></div>
          </Title>
          <TimeBox>
            <p>시간</p>
            <div>
              <Controller>
                <button>-</button>
                <span>0</span>
                <button>+</button>
              </Controller>
              간 노출
            </div>
          </TimeBox>
          <BenefitBox>
            <p>혜택 및 조건</p>
            <textarea cols={35} rows={4}></textarea>
          </BenefitBox>
          <CreateBtn>게시하기</CreateBtn>
        </Content>
      </Contents>
    </TimeDealCreateContainer>
  );
}

export default ContentTimeDealCreate;
