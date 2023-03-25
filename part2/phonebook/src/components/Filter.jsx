const Filter = ({ filterValue, filterChangeHandler }) => {
  return (
    <span>
      Filter shown with{" "}
      <input type="text" onChange={filterChangeHandler} value={filterValue} />
    </span>
  );
};
export default Filter;
