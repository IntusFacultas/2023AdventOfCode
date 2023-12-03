
export const isDigit = (character: string) => {
    const digits = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    return digits.has(character);
};
