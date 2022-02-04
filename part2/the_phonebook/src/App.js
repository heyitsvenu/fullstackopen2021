import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import SuccessNotification from './components/SuccessNotification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('start fetching data...');
    personsService.getAllPersons().then((initialPersons) => {
      console.log('complete fetching data...');
      setPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    console.log('Person: ', persons);
  }, [persons]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        personsService
          .updatePerson(personToUpdate.id, {
            ...personObject,
            id: personToUpdate.id,
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
            setSuccessMessage(
              `Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setError(true);
            setSuccessMessage(
              `Information of ${personToUpdate.name} has already been removed from server.`
            );
            setTimeout(() => {
              setError(false);
              setSuccessMessage(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== personToUpdate.id)
            );
          });
      } else {
        setNewName('');
        setNewNumber('');
        setError(true);
        setSuccessMessage(`No changes made.`);
        setTimeout(() => {
          setError(false);
          setSuccessMessage(null);
        }, 5000);
      }
    } else {
      personsService.createPerson(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const showPersons =
    filterValue.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        );

  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name} ?`)) {
      personsService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`${name} deleted.`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setError(true);
          setSuccessMessage(
            `Information of ${name} has already been removed from server.`
          );
          setTimeout(() => {
            setError(false);
            setSuccessMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    } else {
      setSuccessMessage(`${name} not deleted.`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} error={error} />
      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
