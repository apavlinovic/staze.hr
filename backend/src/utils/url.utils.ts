export function toUrlFriendlyString(input: string) {
    return input
        .toLowerCase()
        .replace(
            /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g,
            '',
        )
        .replace(/\s+/g, '-');
}
