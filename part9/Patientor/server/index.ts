import express from "express";
import cors from "cors";
import diagnosesRouter from "./src/routes/diagnoses.routes";
import patientsRouter from "./src/routes/patients.routes";

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.get("/api/ping", (_, res) => {
  res.status(200).send("pong");
});

app.use("/api", diagnosesRouter, patientsRouter);

app.listen(3000, () => {
  console.log(`listening to http://localhost:3000/`);
});
