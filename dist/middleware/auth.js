"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTHENTICATIONJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Secret = process.env.AUTH_SECRET;
const AUTHENTICATIONJWT = (req, res, next) => {
    const jwtToken = req.headers.authorization;
    if (!jwtToken)
        return res.status(401).json({ msg: 'No token provided' });
    let token = jwtToken.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    if (!Secret) {
        return res.status(404).json({ msg: "Internal server error" });
    }
    jsonwebtoken_1.default.verify(token, Secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Invalid token' });
        }
        else {
            if (!decoded) {
                return res.status(401).json({ msg: 'Invalid token' });
            }
            if (typeof decoded == 'string') {
                return res.status(401).json({ msg: 'Invalid token' });
            }
            req.headers["user"] = decoded === null || decoded === void 0 ? void 0 : decoded.username;
            next();
        }
    });
};
exports.AUTHENTICATIONJWT = AUTHENTICATIONJWT;
