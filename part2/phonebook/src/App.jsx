import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const initialState = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

const App = () => {
  const [persons, setPersons] = useState(initialState);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterText, setFilterText] = useState("");

  const filteredPersons = filterText.trim()
    ? getFilteredArr(persons, filterText)
    : persons;

  function getFilteredArr(arr, filterPhrase) {
    return arr.filter((elem) =>
      elem.name.toLowerCase().includes(filterPhrase.toLowerCase())
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newName.trim() && newNumber.trim()) {
      const isExist = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
      if (isExist) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
      setPersons((prev) => [...prev, { name: newName, number: newNumber }]);
    }
    setNewNumber("");
    setNewName("");
  }

  function handleFilterChange(e) {
    const { value } = e.target;
    setFilterText(value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterValue={filterText}
        filterChangeHandler={handleFilterChange}
      />
      <h2>Add a New</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
