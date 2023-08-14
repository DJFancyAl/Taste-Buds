// Dependencies
require('dotenv').config()
import express from 'express';
import { sign, verify } from 'jsonwebtoken';

// Create Token Function
export const createToken = (userId: string) => {
    const payload = {
        userId,
        expiresIn: 60 * 60 * 24 * 30 // expires in 30 days.
    }

    const token = sign(payload, process.env.JWT_SECRET)

    return token
}


// Validate Tokens
export const validateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decodedToken = verify(token, process.env.JWT_SECRET);
    
        req.user = decodedToken.userId;
    
        next();
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
}