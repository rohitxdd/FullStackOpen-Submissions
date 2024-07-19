import express from "express";
const router = express.Router();
import data from "../data/diagnoses";

router.get("/diagnoses", (_req, res) => {
  return res.status(200).json(data);
});

export default router;
