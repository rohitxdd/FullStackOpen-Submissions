import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((e) => {
        console.log(e);
        setPersons([]);
      });
  }, []);

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
