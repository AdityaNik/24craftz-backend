"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
router.get('/getUserInfo/:id', (req, res) => {
    res.json({
        msg: 'all right'
    });
});
router.get('/userWork', (req, res) => {
    res.json({
        msg: 'all right'
    });
});
exports.default = router;
