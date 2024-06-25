import express from "express";

const router = express.Router();

router.get("/ping", (_, res) => {
  res.status(200).send("pong");
});

export default router;
