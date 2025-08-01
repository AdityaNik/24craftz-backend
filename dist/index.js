"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', userRoutes_1.default);
app.use('/auth', auth_1.default);
const port = process.env.PORT || 3000;
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/24craftz-backend');
app.listen(port, () => {
    console.log(`Backend started on port ${port}`);
});
