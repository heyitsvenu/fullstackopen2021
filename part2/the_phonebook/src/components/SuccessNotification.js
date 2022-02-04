import React from 'react';

const SuccessNotification = ({ message, error }) => {
  const divStyle = {
    color: error ? 'red' : 'green',
    borderStyle: 'solid',
    padding: 10,
    backgroundColor: 'light-grey',
    fontSize: 20,
    marginBottom: 10,
    borderRadius: 5,
  };

  if (message === null) {
    return null;
  }
  return (
    <div className='success' style={divStyle}>
      {message}
    </div>
  );
};

export default SuccessNotification;
