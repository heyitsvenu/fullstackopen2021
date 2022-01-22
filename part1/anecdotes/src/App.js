import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const generateNextAnecdote = (e) => {
    e.preventDefault();
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0)));
  };

  const handleVote = (e) => {
    e.preventDefault();
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]}
        <br />
        has {points[selected]} votes
      </div>
      <div id='btns'>
        <button type='button' onClick={handleVote}>
          Vote
        </button>
        <button type='button' onClick={generateNextAnecdote}>
          next anecdote
        </button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>
        {anecdotes[points.indexOf(Math.max(...points))]}
        <br />
        has {points[points.indexOf(Math.max(...points))]} votes
      </div>
    </>
  );
};

export default App;
