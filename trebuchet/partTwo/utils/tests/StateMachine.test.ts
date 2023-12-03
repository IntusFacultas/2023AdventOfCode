import { State, StateMachine } from '../StateMachine';


describe('State', () => {
    it('returns true when asked if it accepts a letter in the list of letters it accepts', () => {
        const acceptABC = new State(['a', 'b', 'c']);
        expect(acceptABC.accepts('a')).toBe(true);
        expect(acceptABC.accepts('b')).toBe(true);
        expect(acceptABC.accepts('c')).toBe(true);
    });
    it('can combine multiple states into one', () => {
        const acceptO = new State(['o']);
        const acceptN = new State(['n']);
        const acceptE = new State(['e']);
        const acceptO2 = new State(['o']);
        const acceptU = new State(['u']);
        const acceptR = new State(['r']);
        acceptO.addTransition(acceptN).addTransition(acceptE);
        acceptO2.addTransition(acceptU).addTransition(acceptR);
        const combined = State.combineStates(acceptO, acceptO2);
        expect(combined.letters).toStrictEqual(['o']);
        expect(combined.transitions).toStrictEqual([acceptN, acceptU]);
    });
});

describe('StateMachine', () => {
    it('consumes a token and adds it to the list of previously consumed tokens if a valid transition exists', () => {
        const acceptO = new State(['o']);
        const acceptN = new State(['n']);
        const acceptE = new State(['e']);
        acceptO.addTransition(acceptN).addTransition(acceptE);
        const machine = new StateMachine(acceptO);
        expect(() => machine.consume('o')).not.toThrow();
        expect(machine.state).toBe(acceptO);
    });
    it('can accept multiple token paths', () => {
        const ONE = new State('o');
        ONE.addTransition(new State('n')).addTransition(new State('e'));
        const TWO = new State('t');
        TWO.addTransition(new State('w')).addTransition(new State('o'));
        const machine = new StateMachine([ONE, TWO]);
        expect(() => machine.consume('t')).not.toThrow();
        expect(() => machine.consume('w')).not.toThrow();
        expect(() => machine.consume('o')).not.toThrow();
        machine.reset();
        expect(() => machine.consume('o')).not.toThrow();
        expect(() => machine.consume('n')).not.toThrow();
        expect(() => machine.consume('e')).not.toThrow();
    });
    it('returns false for consumption when it reaches a terminal state', () => {
        const acceptO = new State(['o']);
        const acceptN = new State(['n']);
        const acceptE = new State(['e']);
        acceptO.addTransition(acceptN).addTransition(acceptE);
        const machine = new StateMachine(acceptO);
        expect(machine.consume('o')).toBe(true);
        expect(machine.consume('n')).toBe(true);
        expect(machine.consume('e')).toBe(false);
    });
    it('throws when it cannot consume a token from the current state', () => {
        const acceptO = new State(['o']);
        const acceptN = new State(['n']);
        const acceptE = new State(['e']);
        acceptO.addTransition(acceptN).addTransition(acceptE);
        const machine = new StateMachine(acceptO);
        expect(() => machine.consume('o')).not.toThrow();
        expect(() => machine.consume('n')).not.toThrow();
        expect(() => machine.consume('o')).toThrow();
    });
});