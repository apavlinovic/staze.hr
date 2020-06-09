import { sign, verify } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const { JWT_SECRET } = process.env;

export interface TokenContent {
    userId: number;
    nonce: string;
}

export async function generateJWT(userId: number, nonce: string) {
    return sign(
        {
            userId,
            nonce,
        },
        JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
}

export async function verifyAndDecodeJWT(
    token: string,
): Promise<TokenContent | Error> {
    try {
        const decoded = verify(token, JWT_SECRET) as TokenContent;
        return decoded;
    } catch (error) {
        return error;
    }
}

export function generateNonce() {
    return randomBytes(20).toString('hex').substr(0, 20);
}
