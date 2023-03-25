const PersonForm = ({
  handleSubmit,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  function handleChange(e) {
    const { value } = e.target;
    const re = /^[0-9-]*$/;
    if (re.test(value)) {
      setNewNumber(value);
      return true;
    } else {
      return false;
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name:
        <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        <br />
        Number:
        <input
          type="text"
          pattern="^[0-9-]*$"
          onChange={handleChange}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
