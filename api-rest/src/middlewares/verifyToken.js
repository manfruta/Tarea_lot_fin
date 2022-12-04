var jwt = require('jsonwebtoken');
import { JWT } from '../config.js';

export const verifyToken = async (req, res, next) => {
    // token bearer
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    
    jwt.verify(token, JWT.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};