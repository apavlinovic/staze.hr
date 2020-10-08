import { isWhiteSpaceOrNull } from '../../src/utils/string.utils';

const strings = [
    [null, true],
    [undefined, true],
    ['', true],
    ['abcd', false],
    ['search query', false],
];

describe('string_is_whitespaceornull', () => {
    test.each(strings)(
        'string_is_whitespaceornull %s',
        (str: string, result: boolean) => {
            expect(isWhiteSpaceOrNull(str)).toBe(result);
        },
    );
});
