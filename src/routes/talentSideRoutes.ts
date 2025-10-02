import express from "express";
import { Talent } from "../db/db";
require("dotenv").config();

const router = express.Router();

router.get("/get-jobs", (req, res) => {
  res.json({
    msg: "all jobs will be listed here (new jobs)...",
  });
});

router.get("/get-applied", (req, res) => {
  res.json({
    msg: "all right",
  });
});

router.get("/user-work", (req, res) => {
  res.json({
    msg: "all right",
  });
});

router.get("/user-profile", async (req, res) => {
  try {
    const users = await Talent.find();
    res.json({
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
