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

export const requireAuth: RequestHandler = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    
    if (!token) {
        res.status(401).json({ error: 'Authentication required' });
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
        return
    }
};