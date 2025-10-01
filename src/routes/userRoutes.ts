import express from "express";
import jwt from "jsonwebtoken";
import { Talent } from "../db/db";
require("dotenv").config();

const router = express.Router();

router.get("/getJobs", (req, res) => {
  res.json({
    msg: "all jobs will be listed here (new jobs)...",
  });
});

router.post("/postJob", (req, res) => {
  res.json({
    msg: "all right",
  });
});

router.get("/getApplied", (req, res) => {
  res.json({
    msg: "all right",
  });
});

router.get("/getApplicationReceived", (req, res) => {
  res.json({
    msg: "all right",
  });
});

router.get("/userWork", (req, res) => {
  res.json({
    msg: "all right",
  });
});

router.get("/userProfile", async (req, res) => {
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

