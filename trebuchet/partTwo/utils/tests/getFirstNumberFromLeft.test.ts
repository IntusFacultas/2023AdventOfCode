import { getFirstNumberFromLeft } from '../getFirstNumberFromLeft';

describe(getFirstNumberFromLeft, () => {
    it.each<[string, string]>([
        ['two1nine', '2'],
        ['eightwothree', '8'],
        ['abcone2threexyz', '1'],
        ['xtwone3four', '2',],
        ['4nineeightseven2', '4'],
        ['zoneight234', '1',],
        ['7pqrstsixteen', '7'],
    ])('correctly converts %s to %s', (line, expected) => {
        expect(getFirstNumberFromLeft(line)).toStrictEqual(expected);
    });
});