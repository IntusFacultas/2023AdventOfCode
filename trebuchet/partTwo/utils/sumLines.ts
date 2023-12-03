import { getNumber } from './getNumber';

export const sumLines = (lines: string[]): number => lines.map(getNumber).reduce((acc, cur) => acc + cur, 0);