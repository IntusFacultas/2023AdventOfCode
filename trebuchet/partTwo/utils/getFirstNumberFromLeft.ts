import { MAPPED_NUMBERS } from './constants';
import { isDigit } from './isDigit';

import { State, StateMachine } from './StateMachine';

const ZERO = new State('z');
ZERO.addTransition(new State('e')).addTransition(new State('r')).addTransition(new State('o'));
const ONE = new State('o');
ONE.addTransition(new State('n')).addTransition(new State('e'));
const TWO = new State('t');
TWO.addTransition(new State('w')).addTransition(new State('o'));
const THREE = new State('t');
THREE.addTransition(new State('h')).addTransition(new State('r')).addTransition(new State('e')).addTransition(new State('e'));
const TWO_OR_THREE = State.combineStates(TWO, THREE);
const FOUR = new State('f');
FOUR.addTransition(new State('o')).addTransition(new State('u')).addTransition(new State('r'));
const FIVE = new State('f');
FIVE.addTransition(new State('i')).addTransition(new State('v')).addTransition(new State('e'));
const FOUR_OR_FIVE = State.combineStates(FOUR, FIVE);
const SIX = new State('s');
SIX.addTransition(new State('i')).addTransition(new State('x'));
const SEVEN = new State('s');
SEVEN.addTransition(new State('e')).addTransition(new State('v')).addTransition(new State('e')).addTransition(new State('n'));
const SIX_OR_SEVEN = State.combineStates(SIX, SEVEN);
const EIGHT = new State('e');
EIGHT.addTransition(new State('i')).addTransition(new State('g')).addTransition(new State('h')).addTransition(new State('t'));
const NINE = new State('n');
NINE.addTransition(new State('i')).addTransition(new State('n')).addTransition(new State('e'));
const TEN = new State('t');
TEN.addTransition(new State('e')).addTransition(new State('n'));
const TWO_OR_THREE_OR_TEN = State.combineStates(TWO_OR_THREE, TEN);


/**
 * Plan: Start from the left, find the first number that fits
 * then grab the first from the right
 */
export const getFirstNumberFromLeft = (line: string) => {
    const LeftToRightStateMachine = new StateMachine([
        ZERO,
        ONE,
        TWO_OR_THREE_OR_TEN,
        FOUR_OR_FIVE,
        SIX_OR_SEVEN,
        EIGHT,
        NINE
    ]);
    let index = 0;
    let buffer = '';
    while (index < line.length && !LeftToRightStateMachine.state?.isTerminal) {
        if (isDigit(line[index])) {
            return line[index];
        }
        let greedyConsumptionIndex = index;
        while(greedyConsumptionIndex < line.length && !LeftToRightStateMachine.state?.isTerminal) {
            if (!LeftToRightStateMachine.canConsume(line[greedyConsumptionIndex])) {
                index++;
                buffer = '';
                LeftToRightStateMachine.reset();
                break;
            }
            LeftToRightStateMachine.consume(line[greedyConsumptionIndex]);
            buffer += line[greedyConsumptionIndex++];
        }
        if (buffer) {
            return String(MAPPED_NUMBERS[buffer]);
        }
        
    }
    return String(MAPPED_NUMBERS[`${buffer}`]);
};
