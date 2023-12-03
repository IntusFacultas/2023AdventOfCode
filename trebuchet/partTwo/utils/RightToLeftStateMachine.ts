import { State, StateMachine } from './StateMachine';

const ZERO = new State('o');
ZERO.addTransition(new State('r')).addTransition(new State('e')).addTransition(new State('z'));
const ONE = new State('e');
ONE.addTransition(new State('n')).addTransition(new State('o'));
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
const NINE = new State('e');
NINE.addTransition(new State('n')).addTransition(new State('i')).addTransition(new State('n'));
const ONE_OR_THREE_OR_FIVE_OR_NINE = State.combineStates(ONE,THREE,FIVE,NINE);
const TEN = new State('n');
TEN.addTransition(new State('e')).addTransition(new State('t'));
const SEVEN_OR_TEN = State.combineStates(SEVEN, TEN);

export const RightToLeftStateMachine = new StateMachine([
    ZERO_OR_TWO,
    ONE_OR_THREE_OR_FIVE_OR_NINE,
    FOUR,
    SIX,
    SEVEN_OR_TEN,
    EIGHT
]);
