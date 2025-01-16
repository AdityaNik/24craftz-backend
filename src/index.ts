import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import authRouter from './routes/auth'
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json())

app.use('/', userRouter);
app.use('/auth', authRouter);


const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Backend started on port ${port}`);
})