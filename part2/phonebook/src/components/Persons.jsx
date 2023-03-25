const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.length > 0 ? (
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
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
