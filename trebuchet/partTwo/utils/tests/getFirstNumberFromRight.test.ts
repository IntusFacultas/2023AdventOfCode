import { getFirstNumberFromRight } from '../getFirstNumberFromRight';

describe(getFirstNumberFromRight, () => {
    it.each<[string, string]>([
        ['two1nine', '9'],
        ['eightwothree', '3'],
        ['abcone2threexyz', '3'],
        ['xtwone3four', '4',],
        ['4nineeightseven2', '2'],
        ['zoneight234', '4',],
        ['7pqrstsixteen', '6'],
        ['vfzmncfonexxkzlcstqhxvtwoplsglsix1kpkssfz', '1'],
        ['326sevenfivenseven1ctgmntwonef', '1'],
        ['8srrrcv7xszzn5oneightfg', '8']
    ])('correctly converts %s to %s', (line, expected) => {
        expect(getFirstNumberFromRight(line)).toStrictEqual(expected);
    });
});