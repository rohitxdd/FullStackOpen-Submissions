import express, { Response, Request } from "express";
import calculateBmi from "./bmiCalculator";
import { tryParseInt } from "./Utils";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_: Request, res: Response) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const { height: heightStr, weight: weightStr } = req.query;
  if (typeof heightStr !== "string" || typeof weightStr !== "string") {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  try {
    const height = tryParseInt(heightStr);
    const weight = tryParseInt(weightStr);
    const bmi = calculateBmi(height, weight);
    return res.status(200).json({ height, weight, bmi });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    if (
      Array.isArray(daily_exercises) &&
      !isNaN(Number(target)) &&
      daily_exercises.every((e) => typeof e === "number")
    ) {
      const result = calculateExercises(
        daily_exercises as number[],
        target as number
      );
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ error: "malformatted parameters" });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
