import StatisticLine from "./StatisticLine";
const Statistics = ({ good, bad, neutral }) => {
  const numOfFeedback = good + bad + neutral;
  const AverageFeedback = ((good - bad) / numOfFeedback).toFixed(2);
  const positiveFeedback = ((good / numOfFeedback) * 100).toFixed(2) + "%";

  if (numOfFeedback === 0) {
    return <p>No Feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={numOfFeedback} />
        <StatisticLine text="Average" value={AverageFeedback} />
        <StatisticLine text="Positive" value={positiveFeedback} />
      </tbody>
    </table>
  );
};

export default Statistics;
