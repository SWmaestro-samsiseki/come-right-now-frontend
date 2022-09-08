import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import useSocket from '../../utils/useSocket';
import UserRequestHeader from '../../components/user/RequestHeader';
import RequestStep from '../../components/user/RequestStep';
import RequestCategory from '../../components/user/RequestCategory';
import RequestStatus from '../../components/user/RequestStatus';
import ConfirmPopup from '../../components/user/popup/ConfirmPopup';
import FailPopup from '../../components/user/popup/FailPopup';
import thema from '../../styles/thema';

const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const SearchBtn = styled.button`
  position: fixed;
  bottom: 0;
  width: 320px;
  height: 48px;
  margin: 20px;
  font: ${thema.font.pb2};
  color: ${thema.color.primary.main3};
  background: ${thema.color.secondary.main3};
  border: none;
  border-radius: 4px;

  &.active {
    background: ${thema.color.primary.main1};
    color: ${thema.color.primary.main2};
  }
  &:active {
    background: ${thema.color.primary.main1_active};
  }
`;

function RequestPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const { selectedCategories, people, time, latitude, longitude } = useRequestInfoStore();
  const MySwal = withReactContent(Swal);

  function findStore() {
    if (latitude && longitude) {
      socket.emit(
        'user.find-store.server',
        {
          categories: selectedCategories.map((ele) => ele.id),
          numberOfPeople: people,
          delayMinutes: time,
          longitude: longitude,
          latitude: latitude,
        },
        (response: boolean) => {
          if (response) {
            console.log('자리요청 이벤트를 보내는데 성공했습니다.');
            navigate('/search', { replace: true });
          } else {
            MySwal.fire({
              html: (
                <ConfirmPopup
                  title="탐색"
                  description={`주번에 가게가 없습니다. 더 넓은 범위로 탐색하시겠습니까?`}
                  confirm={Swal.clickConfirm}
                  close={Swal.close}
                />
              ),
              showConfirmButton: false,
              width: '280px',
              padding: 0,
              customClass: {
                popup: 'fail-popup-border',
              },
            }).then((result) => {
              if (result.isConfirmed) {
                socket.emit(
                  'user.find-store-further.server',
                  {
                    categories: selectedCategories.map((ele) => ele.id),
                    numberOfPeople: people,
                    delayMinutes: time,
                    longitude: longitude,
                    latitude: latitude,
                  },
                  (response: boolean) => {
                    if (response) {
                      console.log('자리요청 이벤트를 보내는데 성공했습니다.');
                      navigate('/search', { replace: true });
                    } else {
                      MySwal.fire({
                        html: (
                          <FailPopup
                            title="탐색"
                            description={`탐색에 실패했습니다. 다른 곳으로 이동하십시오.`}
                            close={Swal.clickCancel}
                          />
                        ),
                        showConfirmButton: false,
                        width: '280px',
                        padding: 0,
                        customClass: {
                          popup: 'fail-popup-border',
                        },
                        timer: 2000,
                      });
                    }
                  },
                );
              }
            });
          }
        },
      );
    }
  }

  return (
    <RequestContainer>
      <UserRequestHeader />
      <RequestStep step={1} name={'주종'} />
      <RequestCategory />
      <RequestStep step={2} name={'인원'} />
      <RequestStatus type={'people'} />
      <RequestStep step={3} name={'시간'} />
      <RequestStatus type={'time'} />
      <SearchBtn
        onClick={findStore}
        className={selectedCategories.length > 0 ? 'active' : ''}
        disabled={selectedCategories.length > 0 ? false : true}>
        지금갈게
      </SearchBtn>
    </RequestContainer>
  );
}

export default RequestPage;
