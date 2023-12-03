import { sumLines } from '../sumLines';


describe(sumLines, () => {
    it('correctly sums up a series of lines', () => {
        const data = [
            'two1nine',
            'eightwothree',
            'abcone2threexyz',
            'xtwone3four',
            '4nineeightseven2',
            'zoneight234',
            '7pqrstsixteen',
        ];
        expect(sumLines(data)).toStrictEqual(281);
    });
});