import express from "express";
const router = express.Router();
import data from "../data/patients";
import { NonSensitivePatientsEntry } from "../types";

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

export default router;
