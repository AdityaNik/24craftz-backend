"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/signin', (req, res) => {
    res.json({
        msg: 'all right'
    });
});
router.post('/signup', (req, res) => {
    res.json({
        msg: 'all right'
    });
});
exports.default = router;