import { MAPPED_NUMBERS } from './constants';
import { isDigit } from './isDigit';

import { State, StateMachine } from './StateMachine';

const ZERO = new State('o');
ZERO.addTransition(new State('r')).addTransition(new State('e')).addTransition(new State('z'));
const EN_ROOT = new State('e');
const EN = EN_ROOT.addTransition(new State('n'));
EN.addTransition(new State('o'));
const TWO = new State('o');
TWO.addTransition(new State('w')).addTransition(new State('t'));
const ZERO_OR_TWO = State.combineStates(ZERO, TWO);
const THREE = new State('e');
THREE.addTransition(new State('e')).addTransition(new State('r')).addTransition(new State('h')).addTransition(new State('t'));
const FOUR = new State('r');
FOUR.addTransition(new State('u')).addTransition(new State('o')).addTransition(new State('f'));
const FIVE = new State('e');
FIVE.addTransition(new State('v')).addTransition(new State('i')).addTransition(new State('f'));
const SIX = new State('x');
SIX.addTransition(new State('i')).addTransition(new State('s'));
const SEVEN = new State('n');
SEVEN.addTransition(new State('e')).addTransition(new State('v')).addTransition(new State('e')).addTransition(new State('s'));
const EIGHT = new State('t');
EIGHT.addTransition(new State('h')).addTransition(new State('g')).addTransition(new State('i')).addTransition(new State('e'));
EN.addTransition(new State('i')).addTransition(new State('n'));
const ONE_OR_THREE_OR_FIVE_OR_NINE = State.combineStates(THREE,FIVE,EN_ROOT);
const TEN = new State('n');
TEN.addTransition(new State('e')).addTransition(new State('t'));
const SEVEN_OR_TEN = State.combineStates(SEVEN, TEN);

/**
 * Plan: Start from the left, find the first number that fits
 * then grab the first from the right
 */
export const getFirstNumberFromRight = (needsReversing: string) => {
    const RightToLeftStateMachine = new StateMachine([
        ZERO_OR_TWO,
        ONE_OR_THREE_OR_FIVE_OR_NINE,
        FOUR,
        SIX,
        SEVEN_OR_TEN,
        EIGHT
    ]);
    
    let index = 0;
    let buffer = '';
    const line = needsReversing.split('').reverse().join('');
    while (index < line.length && !RightToLeftStateMachine.state?.isTerminal) {
        if (isDigit(line[index])) {
            return line[index];
        }
        let greedyConsumptionIndex = index;
        while(greedyConsumptionIndex < line.length && !RightToLeftStateMachine.state?.isTerminal) {
            const character = line[greedyConsumptionIndex];
            if (!RightToLeftStateMachine.canConsume(character)) {
                index++;
                buffer = '';
                RightToLeftStateMachine.reset();
                break;
            }
            RightToLeftStateMachine.consume(character);
            buffer += character;
            greedyConsumptionIndex++;
        }
        if (buffer) {
            return String(MAPPED_NUMBERS[buffer.split('').reverse().join('')]);
        }
        
    }
    return String(MAPPED_NUMBERS[`${buffer}`]);
};
