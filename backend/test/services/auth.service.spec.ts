require('dotenv').config({ path: './.env' });

import {
    generateJWT,
    verifyAndDecodeJWT,
} from '../../src/services/auth.service';

const tests = [
    [1, 'nonce1'],
    [2, 'nonce2'],
    [3, 'nonce3'],
];

describe('jwt_generation', () => {
    test.each(tests)(
        'jwt_encode_decode (%i, %s)',
        async (userId: number, nonce: string) => {
            var jwt = await generateJWT(userId, nonce);
            var res = await verifyAndDecodeJWT(jwt);

            expect(typeof res).not.toBe(Error);
            expect(res).toHaveProperty('exp');
            expect(res).toHaveProperty('iat');
            expect(res).toHaveProperty('userId', userId);
            expect(res).toHaveProperty('nonce', nonce);
        },
    );
});
