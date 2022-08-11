import styled from 'styled-components';
import useRequestInfoStore from '../../stores/user/requestInfoStore';
import CategoryItem from './CategoryItem';

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  // TODO: 344px과 같이 하드한 값이 아닌 내부 아이템들에 의해 결정되도록 수정하기
  & > div {
    display: flex;
    flex-wrap: wrap;
    width: 344px;
  }
`;

function RequestCategory() {
  const { categories } = useRequestInfoStore();

  return (
    <CategoryContainer>
      <div>
        {categories.map((ele, index) => (
          <CategoryItem key={index} category={ele} />
        ))}
      </div>
    </CategoryContainer>
  );
}

export default RequestCategory;
