function BeverageItem({ name, index }: { name: string; index: number }) {
  return (
    <div>
      {name}, {index + 1}
    </div>
  );
}
export default BeverageItem;
