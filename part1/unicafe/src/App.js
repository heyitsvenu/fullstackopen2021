import React, { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === 'positive' && '%'}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const calAverage = () => {
    return isNaN((good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad))
      ? 0
      : ((good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)).toFixed(
          1
        );
  };

  const calPositive = () => {
    return isNaN(good / (good + neutral + bad))
      ? 0
      : ((good / (good + neutral + bad)) * 100).toFixed(1);
  };

  return (
    <div id='stats'>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good + neutral + bad} />
          <StatisticLine text='average' value={calAverage()} />
          <StatisticLine text='positive' value={calPositive()} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ name, handleClick }) => {
  return (
    <>
      <button type='button' onClick={(e) => handleClick(e, name)}>
        {name}
      </button>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (e, fb) => {
    e.preventDefault();
    if (fb === 'good') {
      setGood(good + 1);
    } else if (fb === 'neutral') {
      setNeutral(neutral + 1);
    } else if (fb === 'bad') {
      setBad(bad + 1);
    }
  };

  const fbStatus = () => (good > 0 || neutral > 0 || bad > 0 ? true : false);

  return (
    <div>
      <h1>give feedback</h1>
      <div id='btns'>
        <Button name='good' handleClick={handleClick} />
        <Button name='neutral' handleClick={handleClick} />
        <Button name='bad' handleClick={handleClick} />
      </div>
      <h2>statistics</h2>
      {fbStatus() ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
