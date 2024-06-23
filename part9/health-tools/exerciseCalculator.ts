interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(hours: number[], targetAmount: number): result {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter((n) => n > 0).length;
  const success: boolean = hours.every((n) => n >= targetAmount);
  const average: number =
    hours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const ratingFrac: number = average / targetAmount;
  let rating: number;
  let ratingDescription: string;
  if (ratingFrac >= 0.99) {
    rating = 3;
    ratingDescription = "Good Keep it up";
  } else if (ratingFrac >= 0.6) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need work hard";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
