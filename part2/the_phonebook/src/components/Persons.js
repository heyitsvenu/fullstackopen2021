import React from 'react';

const Persons = ({ showPersons, deletePerson }) => {
  return (
    <div>
      {showPersons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>
              delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
