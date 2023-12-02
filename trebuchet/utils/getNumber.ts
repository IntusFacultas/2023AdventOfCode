export const getNumber = (line: string): number => {
    const onlyDigits = line.replace(/[^\d]/g, '');
    if (onlyDigits.length === 1) {
        const digitAsValue = parseInt(onlyDigits);
        return digitAsValue * 10 + digitAsValue;
    }
    const firstDigit = onlyDigits[0];
    const lastDigit = onlyDigits[onlyDigits.length - 1];
    return parseInt(`${firstDigit}${lastDigit}`);
};