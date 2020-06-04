import { sign, verify } from 'jsonwebtoken';
import { AccountRole } from '../database/enums/accountRole.enum';

const { JWT_SECRET } = process.env;

export async function GenerateJWT(
    userId: number,
    email: string,
    role: AccountRole,
) {
    return sign(
        {
            userId,
            email,
            role,
        },
        JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
}

export async function VerifyAndDecodeJWT(token: string) {
    try {
        const decoded = verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return error;
    }
}
