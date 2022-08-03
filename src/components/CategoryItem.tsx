import type { category } from '../stores/user/requestStore';
import useRequestStore from '../stores/user/requestStore';

function CategoryItem({ category }: { category: category }) {
  const { selectedCategories, addCategory, removeCategory } = useRequestStore();
  function chooseItem() {
    if (selectedCategories.indexOf(category) === -1) {
      addCategory(category);
    } else {
      removeCategory(category);
    }
  }

  return (
    <div onClick={chooseItem}>
      {category.name}, {category.id + 1}
    </div>
  );
}
export default CategoryItem;
