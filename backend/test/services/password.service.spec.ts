import { equals, hashify } from '../../src/services/password.service';

const testStrings = [
    '8yn+"q+*;@g=N$MW',
    `,n7Pa''r~;$S(Hrv`,
    'L6&jMz<QYT3C,wuE',
    'g!",u~2BD%mV^4wq',
];

describe('password_hashing', () => {
    test.each(testStrings)('hashing_works (%s)', async (password) => {
        const result = await hashify(password);
        expect(result).not.toBe(null);
    });

    test.each(testStrings)(
        'password_hashing_matches_original_hash (%s)',
        async (password) => {
            const result = await hashify(password);
            expect(await equals(password, result)).toBe(true);
        },
    );
});
