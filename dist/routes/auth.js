"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const router = express_1.default.Router();
const Secret = process.env.AUTH_SECRET;
if (!Secret) {
    throw new Error('AUTH_SECRET is not set');
}
router.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tk = req.headers.authorization;
    if (!tk) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    const token = tk === null || tk === void 0 ? void 0 : tk.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, Secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Invalid token' });
            }
            if (!decoded || typeof decoded !== 'object' || !('username' in decoded)) {
                return res.status(401).json({ msg: 'Invalid token' });
            }
            const username = decoded.username;
            db_1.User.findOne({ phoneNumber: username }).then((user) => {
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                res.json({ msg: 'Logged in successfully', user: user });
            }).catch((err) => {
                res.status(500).json({ msg: 'Internal server error' });
                console.log(err);
                return;
            });
        });
    }
    else {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
        return res.status(400).json({ msg: 'Please provide all fields' });
    }
    db_1.User.findOne({ phoneNumber: phoneNumber }).then((user) => {
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ msg: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ username: user.phoneNumber }, Secret);
        res.status(200).json({
            msg: 'Login successful',
            token: token
        });
    }).catch((err) => {
        res.status(500).json({ msg: 'Internal server error' });
        console.log(err);
        return;
    });
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { fullName, phoneNumber, email, role, password, state, city, gender, age, preferences } = req.body;
    if (!fullName || !phoneNumber || !email || !password) {
        return res.status(400).json({ msg: 'Please provide all fields' });
    }
    db_1.User.findOne({ phoneNumber: phoneNumber }).then((user) => {
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const newUser = new db_1.User({
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
            role: role,
            state: state,
            city: city,
            gender: gender,
            age: age,
            preferences: preferences,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        newUser.save();
        const token = jsonwebtoken_1.default.sign({ username: phoneNumber }, Secret);
        res.json({
            msg: 'User created successfully',
            token: token
        });
    }).catch((err) => {
        res.status(500).json({ msg: 'Internal server error' });
        console.log(err);
        return;
    });
}));
exports.default = router;
