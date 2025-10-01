import express from "express";
import { IndustryProfessional, Talent } from "../db/db";
import jwt from "jsonwebtoken";
import { AUTHENTICATIONJWT } from "../middleware/auth";
require("dotenv").config();

const router = express.Router();

const Secret = process.env.AUTH_SECRET;
if (!Secret) {
  throw new Error("AUTH_SECRET is not set");
}

router.get("/me-industry", AUTHENTICATIONJWT, async (req, res) => {
  const industryProfessional = await IndustryProfessional.findOne({
    phoneNumber: req.headers["user"],
  });
  if (!industryProfessional) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.json({
    msg: "Logged in successfully",
    user: industryProfessional.phoneNumber,
  });
});

router.post("/industry-signin", async (req, res) => {
  let { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ msg: "Please provide all fields" });
  }

  IndustryProfessional.findOne({ phoneNumber: phoneNumber })
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

router.post("/industry-signup", async (req, res) => {
  let { fullName, phoneNumber, email, password } = req.body;
  if (!fullName || !phoneNumber || !email || !password) {
    return res.status(400).json({ msg: "Please provide all fields" });
  }
  console.log(req.body);

  IndustryProfessional.findOne({ phoneNumber: phoneNumber })
    .then((user: any) => {
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      console.log(user + " ");

      const newUser = new IndustryProfessional({
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
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
