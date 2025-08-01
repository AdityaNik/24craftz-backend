import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const Secret = process.env.AUTH_SECRET;

export const AUTHENTICATIONJWT = (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers.authorization;

    if (!jwtToken) return res.status(401).json({ msg: 'No token provided' });
    let token = jwtToken.split(' ')[1];

    if(!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    if(!Secret) {
        return res.status(404).json({msg: "Internal server error"});
    }

    jwt.verify(token, Secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Invalid token' });
        } else {
            if(!decoded) {
                return res.status(401).json({ msg: 'Invalid token' });
            }
            if(typeof decoded == 'string') {
                return res.status(401).json({ msg: 'Invalid token' });
            }

            req.headers["user"] = decoded?.username;
            next();
        }
    });
}