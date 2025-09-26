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
require('dotenv').config();
const router = express_1.default.Router();
router.get('/getJobs', (req, res) => {
    res.json({
        msg: 'all jobs will be listed here (new jobs)...'
    });
});
router.post('/postJob', (req, res) => {
    res.json({
        msg: 'all right'
    });
});
router.get('/getApplied', (req, res) => {
    res.json({
        msg: 'all right'
    });
});
router.get('/getApplicationReceived', (req, res) => {
    res.json({
        msg: 'all right'
    });
});
router.get('/userWork', (req, res) => {
    res.json({
        msg: 'all right'
    });
});
router.get('/userProfile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.User.find();
        res.json({
            users
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}));
exports.default = router;
