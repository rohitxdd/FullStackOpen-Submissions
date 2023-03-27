import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactsService from "./services/persons";

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
        const updateConsent = confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        );
        if (updateConsent) {
          const { id } = isExist;
          const updatedContact = { ...isExist, number: newNumber };
          contactsService
            .update(id, updatedContact)
            .then((response) => {
              setPersons((prev) =>
                prev.map((person) => (person.id !== id ? person : response))
              );
              setNewName("");
              setNewNumber("");
            })
            .catch((e) => console.log(e));
        }
        return;
      }
      const newContact = {
        name: newName,
        number: newNumber,
      };

      contactsService
        .create(newContact)
        .then((res) => {
          setPersons(persons.concat(res));
        })
        .catch((error) => console.log(error));
    }
    setNewNumber("");
    setNewName("");
  }

  function handleFilterChange(e) {
    const { value } = e.target;
    setFilterText(value);
  }

  function handleDelete(person) {
    const { name, id } = person;
    const consent = confirm(`Delete ${name} ?`);
    if (consent) {
      contactsService
        .deleteContact(id)
        .then(() => {
          setPersons((prev) => prev.filter((person) => person.id !== id));
        })
        .catch((e) => console.log(e.message));
    }
  }

  useEffect(() => {
    contactsService
      .getAll()
      .then((response) => {
        setPersons(response);
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
