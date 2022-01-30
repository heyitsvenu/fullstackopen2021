import React from 'react';

const Persons = ({ showPersons }) => {
  return (
    <div>
      {showPersons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
