const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.length > 0 ? (
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={()=> handleDelete(person)}>delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing to Show</p>
      )}
    </>
  );
};

export default Persons;
