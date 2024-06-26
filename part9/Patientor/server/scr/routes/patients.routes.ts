import express from "express";
const router = express.Router();
import data from "../data/patients";
import { NonSensitivePatientsEntry } from "../types";
import * as PatientService from "../services/patientsServices";

router.get("/patients", (_req, res) => {
  const nonSensitiveData: NonSensitivePatientsEntry[] = data.map((e) => ({
    id: e.id,
    name: e.name,
    dateOfBirth: e.dateOfBirth,
    gender: e.gender,
    occupation: e.occupation,
  }));
  return res.status(200).json(nonSensitiveData);
});

router.post("/patients", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, occupation, ssn, dateOfBirth, gender } = req.body;
  try {
    const newEntry = PatientService.newPatientEntry(
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    );
    return res.status(201).json(newEntry);
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ error: "some error occured while processing your request" });
  }
});

export default router;
