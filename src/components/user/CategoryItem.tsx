import styled from 'styled-components';
import type { Category } from '../../utils/interface';
import useRequestStore from '../../stores/user/requestInfoStore';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 76px;
  height: 76px;
  margin: 5px;
  border: 1px solid #f5f5f5;
  border-radius: 24px;

  &.selected {
    border: 2px solid #0ba8ff;
  }
  & img {
    height: 51px;
    object-fit: contain;
  }

  & p {
    text-align: center;
    font: normal 700 10px / 12px 'IBM Plex Sans KR';
  }
`;

function CategoryItem({ category }: { category: Category }) {
  const { selectedCategories, addCategory, removeCategory } = useRequestStore();

  function chooseItem() {
    if (selectedCategories.indexOf(category) === -1) {
      addCategory(category);
    } else {
      removeCategory(category);
    }
  }

  return (
    <ItemContainer
      onClick={chooseItem}
      className={selectedCategories.indexOf(category) !== -1 ? 'selected' : ''}>
      <img src={category.image} alt="주류사진" />
      <p>{category.name}</p>
    </ItemContainer>
  );
}
export default CategoryItem;
