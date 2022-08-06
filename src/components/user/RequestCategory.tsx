import styled from 'styled-components';
import useRequestStore from '../../stores/user/requestStore';
import CategoryItem from './CategoryItem';

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  & > div {
    display: flex;
    flex-wrap: wrap;
    width: 344px;
  }
`;

function RequestCategory() {
  const { categories } = useRequestStore();
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
