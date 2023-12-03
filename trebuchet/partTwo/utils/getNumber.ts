import { getFirstNumberFromLeft } from './getFirstNumberFromLeft';
import { getFirstNumberFromRight } from './getFirstNumberFromRight';

export const getNumber = (line: string): number => {
    const firstDigit = getFirstNumberFromLeft(line);
    const lastDigit =getFirstNumberFromRight(line);
    const value = parseInt(`${firstDigit}${lastDigit}`);
    console.log(`${line} -> ${value}`);
    return value;
};