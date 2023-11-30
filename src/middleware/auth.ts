import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User'; 

export const authMiddleware: express.RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader: string = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const parts: string[] = authHeader.split(' ');

        if (!(parts.length === 2)) {
            return res.status(401).json({ message: 'Token error' });
        }

        const [ scheme, token ] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ message: 'Token malformatted' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token invalid' });
            }
            console.log(typeof decoded === 'object' && 'id' in decoded);
            if (typeof decoded === 'object' && 'id' in decoded) {
                const userRepository = AppDataSource.getRepository(User);

                let user = await userRepository.findOne({
                    where: { userId: decoded.id }    
                });
        
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
        
                req.userUid = user.userId;
                req.userId = user.id;
                user = null;
                
        
                return next();
            } else {
                return res.status(401).json({ message: 'Token invalid' });
            }

        });
    } catch (err) {
        return res.status(500).json({ message: 'Unexpected error.' });
    }
};
