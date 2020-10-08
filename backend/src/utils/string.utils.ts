export function isWhiteSpaceOrNull(str: string) {
    return (
        str === null ||
        str === undefined ||
        !str.match ||
        str.match(/^ *$/) !== null
    );
}
