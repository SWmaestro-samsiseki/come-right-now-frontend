import styled from 'styled-components';
import type { Category } from '../../utils/interface';
import useRequestStore from '../../stores/user/requestInfoStore';
import thema from '../../styles/thema';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 76px;
  height: 76px;
  margin: 5px;
  border: 1px solid ${thema.color.secondary.main2};
  border-radius: 24px;

  &.selected {
    border: 1px solid ${thema.color.primary.main2};
  }
  & img {
    height: 51px;
    object-fit: contain;
  }

  & p {
    text-align: center;
    font: ${thema.font.pb4};
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
