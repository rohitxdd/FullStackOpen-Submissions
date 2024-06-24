export default function calculateBmi(height: number, weight: number): string {
  if (height <= 0 || weight <= 0) {
    throw new Error("Invalid Input");
  }
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);

  if (bmi <= 18.5) {
    return "Underweight";
  } else if (bmi > 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obesity";
  }
}
