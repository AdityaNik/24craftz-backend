import express from "express"
import { User } from "../db/db";
import jwt from 'jsonwebtoken';
require ('dotenv').config();

const router = express.Router();
const Secret = process.env.AUTH_SECRET;
if(!Secret) {
    throw new Error('AUTH_SECRET is not set');
}

router.get('/me', async (req, res) => {
    const tk = req.headers.authorization;
    if(!tk) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    const token = tk?.split(' ')[1];
    if(token) {
        jwt.verify(token, Secret, (err, decoded) => {
            if(err) {
                return res.status(401).json({ msg: 'Invalid token' });
            }
            if(!decoded || typeof decoded !== 'object' || !('username' in decoded)) {
                return res.status(401).json({ msg: 'Invalid token' });
            }
            const username = (decoded as { username: string }).username;
            User.findOne({phoneNumber: username}).then((user: any) => {
                if(!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                res.json({ msg: 'Logged in successfully', user: user });
            }).catch((err) => {
                res.status(500).json({ msg: 'Internal server error' }); 
                console.log(err);
                return;
            })
        })
    } else {
        return res.status(401).json({ msg: 'Unauthorized' });   
    }
})  

router.post('/signin', async (req, res) => {
    let { phoneNumber, password } = req.body;

    if(!phoneNumber || !password) {
        return res.status(400).json({ msg: 'Please provide all fields' });
    }

    User.findOne({phoneNumber: phoneNumber}).then((user: any) => {
        if(!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if(user.password !== password) {
            return res.status(401).json({ msg: 'Invalid password' });
        }       
        const token = jwt.sign({ username: user.phoneNumber }, Secret);
        res.status(200).json({ 
            msg: 'Login successful',
            token: token
        })
    }).catch((err) => {
        res.status(500).json({ msg: 'Internal server error' }); 
        console.log(err);
        return;
    })
})

router.post('/signup', async (req, res) => {
    let { fullName, phoneNumber, email, role, password, state, city, gender, age, preferences } = req.body;
    console.log('hello all');
    if(!fullName || !phoneNumber || !email || !password) {
        return res.status(400).json({ msg: 'Please provide all fields' });
    }
    console.log(req.body);

    if(gender == "Male") {
        gender = 'male';
    }
    if(gender == 'Female') {
        gender = 'female'
    }

    User.findOne({phoneNumber: phoneNumber}).then((user: any) => {
        if(user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        console.log(user + " ");

        const newUser = new User({
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
        })

        newUser.save();
        const token = jwt.sign({ username: phoneNumber }, Secret);
        console.log(newUser);
        res.json({
            msg: 'User created successfully',
            token: token
        })
    }).catch((err) => {
        res.status(500).json({ msg: 'Internal server error' }); 
        console.log(err);
        return;
    });
})

export default router; 