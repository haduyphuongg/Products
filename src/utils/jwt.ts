import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { env } from '../config/env';

/**
 * Tạo JWT token
 * @param payload Dữ liệu để encode vào token
 * @returns JWT token string
 */
export const generateToken = (payload: any): string => {
    const options: SignOptions = {
        expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
    };

    return jwt.sign(payload, env.JWT_SECRET as jwt.Secret, options);
};

/**
 * Verify JWT token
 * @param token JWT token string
 * @returns Decoded payload hoặc null nếu invalid
 */
export const verifyToken = (token: string): any => {
    try {
        const options: VerifyOptions = {};
        return jwt.verify(token, env.JWT_SECRET as jwt.Secret, options);
    } catch (error) {
        return null;
    }
};
