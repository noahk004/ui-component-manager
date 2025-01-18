import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: {
        userId: string;
        username: string;
    };
}

interface JwtPayload {
    userId: string;
    username: string;
}

export const authenticateToken: RequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};