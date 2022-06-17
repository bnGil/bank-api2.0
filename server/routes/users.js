import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.status(200).send("All users");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
