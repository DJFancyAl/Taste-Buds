// Dependencies
require('dotenv').config()
import express from 'express';
import { sign, verify, JwtPayload } from 'jsonwebtoken';


interface CustomRequest extends express.Request {
    user: string;
}


// Create Token Function
export const createToken = (userId: string) => {
    const payload = {
        userId,
        expiresIn: 60 * 60 * 24 * 30 // expires in 30 days.
    }

    const token = sign(payload, process.env.JWT_SECRET || '')

    return token
}


// Validate Tokens
export const validateToken = (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decodedToken = verify(token, process.env.JWT_SECRET || '') as JwtPayload;
        req.user = decodedToken.userId;
    
        next();
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
}