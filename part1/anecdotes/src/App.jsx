import { useEffect, useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});
  const [votes, setVotes] = useState(0);

  let maxVote = Number.NEGATIVE_INFINITY;
  let indexWithMaxVote = 0;
  for (let x in points) {
    if (points[x] > maxVote) {
      maxVote = points[x];
      indexWithMaxVote = x;
    }
  }

  function getVotes() {
    if (points[selected]) {
      let vote = points[selected];
      setVotes(vote);
    } else {
      setPoints((prev) => ({ ...prev, [selected]: 0 }));
      setVotes(0);
    }
  }

  function updatePoints() {
    setPoints((prev) => ({ ...prev, [selected]: points[selected] + 1 }));
    setVotes(() => points[selected] + 1);
  }

  function handleNextClick() {
    const randInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randInt);
  }

  useEffect(() => {
    getVotes();
  }, [selected]);

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <p>has {votes} votes</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button id="vote" onClick={updatePoints}>vote</button>
        <button onClick={handleNextClick}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexWithMaxVote]}</p>
      <p>has {maxVote} votes</p>
    </div>
  );
};

export default App;
