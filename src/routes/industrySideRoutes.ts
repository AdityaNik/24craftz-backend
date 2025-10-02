import express from "express";
import { IndustryProfessional } from "../db/db";
require("dotenv").config();

const router = express.Router();

router.post("/post-job", (req, res) => {
  res.json({
    msg: "all right",
  });
});

router.get("/get-application-received", (req, res) => {
  res.json({
    msg: "all right",
  });
});

router.get("/get-applied-user-info", (req, res) => {
  res.json({
    msg: "all applied user info will be shown here",
  });
});

router.get("/user-profile", async (req, res) => {
  try {
    const users = await IndustryProfessional.find();
    res.json({
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
