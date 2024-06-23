import { argv } from "node:process";
import { tryParseInt } from "./Utils";

if (argv.length != 4) {
  throw new Error("Invalid Arguments");
}

const height: number = tryParseInt(argv[2], "height");
const weight: number = tryParseInt(argv[3], "weight");

console.log(calculateBmi(height, weight));

function calculateBmi(height: number, weight: number): string {
  if (height <= 0 || weight <= 0) {
    return "Invalid Input";
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
