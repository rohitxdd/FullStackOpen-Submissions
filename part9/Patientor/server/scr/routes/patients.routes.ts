import express from "express";
const router = express.Router();
import data from "../data/patients";
import { NewEntry, NonSensitivePatientsEntry } from "../types";
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

router.get("/patients/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    const result = PatientService.findPatientById(id);
    if (res) {
      return res.status(200).json(result);
    }
  }
  return res.status(404);
});

router.post("/:id/entries", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { description, date, specialist, type, ...rest } = req.body as NewEntry;
  const patientid = req.params.id;
  if (!description || !date || !specialist || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newEntry = PatientService.parseNewEntryData(
      description,
      date,
      specialist,
      type,
      rest
    );
    const result = PatientService.newEntryService(newEntry, patientid);
    if (result >= 0) {
      return res
        .status(201)
        .json({ message: "new entry added", data: newEntry });
    }
    return res.status(404).json({ message: "patient not found" });
  } catch (e) {
    return res.status(400).json({ error: "Bad Request" });
  }
});

export default router;
