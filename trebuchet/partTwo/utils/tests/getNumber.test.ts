import { getNumber } from '../getNumber';


describe(getNumber, () => {
    it('can correctly get a number from a line with two numbers embedded in it', () => {
        expect(getNumber('1abc2')).toStrictEqual(12);
    });
    it('can correctly get a number from a line with more than two numbers embedded in it', () => {
        expect(getNumber('a1b2c3d4e5f')).toStrictEqual(15);
    });
    it('can correctly get a number from a line with a single number embedded in it', () => {
        expect(getNumber('treb7uchet')).toStrictEqual(77);
    });
    it('can correctly get a number from a line with a single 0 embedded in it', () => {
        expect(getNumber('treb0uchet')).toStrictEqual(0);
    });
    it('can correctly handle written out numbers', () => {
        expect(getNumber('two1nine')).toStrictEqual(29);
    });
    it('can correctly handle numbers with shared letters', () => {
        expect(getNumber('eightwothree')).toStrictEqual(83);
    });
    it('does not handle numbers greater than nine when written', () => {
        expect(getNumber('7pqrstsixteen')).toStrictEqual(76);
    });
    it.each<[string, number]>([
        ['two1nine',29,],
        ['eightwothree',83,],
        ['abcone2threexyz',13,],
        ['xtwone3four',24,],
        ['4nineeightseven2',42,],
        ['zoneight234',14, ],
        ['7pqrstsixteen',76],
        ['vfzmncfonexxkzlcstqhxvtwoplsglsix1kpkssfz', 11],
        ['326sevenfivenseven1ctgmntwonef', 31],
        ['8srrrcv7xszzn5oneightfg', 88]
    ])('correctly parses %s to %s', (line, expected) => {
        expect(getNumber(line )).toStrictEqual(expected);
    });
});