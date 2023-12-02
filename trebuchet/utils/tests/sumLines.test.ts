import { sumLines } from '../sumLines';


describe(sumLines, () => {
    it('correctly sums up a series of lines', () => {
        const data = [
            '1abc2',
            'pqr3stu8vwx',
            'a1b2c3d4e5f',
            'treb7uchet',
        ];
        expect(sumLines(data)).toStrictEqual(142);
    });
});