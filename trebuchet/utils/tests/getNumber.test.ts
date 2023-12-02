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
});