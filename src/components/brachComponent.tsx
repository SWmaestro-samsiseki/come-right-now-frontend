import useAuthStore from '../store/authStore';

function BranchComponent({
  UserMainPage,
  StoreMainPage,
}: {
  UserMainPage: JSX.Element;
  StoreMainPage: JSX.Element;
}): JSX.Element {
  const { userType } = useAuthStore();
  if (userType === 'USER') return UserMainPage;
  else if (userType === 'STORE') return StoreMainPage;
  else return <div>분기페이지입니다.</div>;
}
export default BranchComponent;
