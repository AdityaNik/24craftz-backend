import express from "express";
import { Talent } from "../db/db";
import jwt from "jsonwebtoken";
import { AUTHENTICATIONJWT } from "../middleware/auth";
require("dotenv").config();

const router = express.Router();
const Secret = process.env.AUTH_SECRET;
if (!Secret) {
  throw new Error("AUTH_SECRET is not set");
}

router.get("/me-talent", AUTHENTICATIONJWT, async (req, res) => {
  try {
    const talent = await Talent.findOne({ phoneNumber: req.headers["user"] });
    if (!talent) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    res.json({ msg: "Logged in successfully", talent: talent.phoneNumber });
  } catch (error) {
    console.error("Error fetching talent:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/talent-signin", async (req, res) => {
  let { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ msg: "Please provide all fields" });
  }

  Talent.findOne({ phoneNumber: phoneNumber })
    .then((user: any) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (user.password !== password) {
        return res.status(401).json({ msg: "Invalid password" });
      }
      const token = jwt.sign({ username: user.phoneNumber }, Secret);
      res.status(200).json({
        msg: "Login successful",
        token: token,
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Internal server error" });
      console.log(err);
      return;
    });
});

router.post("/talent-signup", async (req, res) => {
  let {
    fullName,
    phoneNumber,
    email,
    password,
    state,
    city,
    gender,
    age,
    preferences,
  } = req.body;
  if (!fullName || !phoneNumber || !email || !password) {
    return res.status(400).json({ msg: "Please provide all fields" });
  }
  console.log(req.body);

  if (gender == "Male") {
    gender = "male";
  }
  if (gender == "Female") {
    gender = "female";
  }

  Talent.findOne({ phoneNumber: phoneNumber })
    .then((user: any) => {
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      console.log(user + " ");

      const newUser = new Talent({
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        state: state,
        city: city,
        gender: gender,
        age: age,
        preferences: preferences,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      newUser.save();
      const token = jwt.sign({ username: phoneNumber }, Secret);
      console.log(newUser);
      res.json({
        msg: "User created successfully",
        token: token,
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Internal server error" });
      console.log(err);
      return;
    });
});

export default router;
