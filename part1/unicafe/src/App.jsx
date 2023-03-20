import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleClick(btn) {
    switch (btn) {
      case "Good":
        setGood(() => good + 1);
        break;
      case "Neutral":
        setNeutral(() => neutral + 1);
        break;
      case "Bad":
        setBad(() => bad + 1);
        break;
      default:
        console.log("something went wrong");
    }
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button name="Good" onButtonClick={handleClick} />
        <Button name="Neutral" onButtonClick={handleClick} />
        <Button name="Bad" onButtonClick={handleClick} />
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}
