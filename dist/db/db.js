"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Gender = exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Role;
(function (Role) {
    Role[Role["talent"] = 0] = "talent";
    Role[Role["industry"] = 1] = "industry";
})(Role || (exports.Role = Role = {}));
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
    Gender[Gender["other"] = 2] = "other";
})(Gender || (exports.Gender = Gender = {}));
const UserSchema = new mongoose_1.default.Schema({
    fullName: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: true },
    state: { type: String, require: true },
    city: { type: String, require: true },
    age: { type: Number, require: true },
    gender: { type: String, require: true, enum: Object.values(Gender) },
    password: { type: String, require: true },
    role: { type: String, require: true, enum: Object.values(Role) },
    preferences: { type: Array, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
exports.User = mongoose_1.default.model('User', UserSchema);
