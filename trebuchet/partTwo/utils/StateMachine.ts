export class State {
    public letters: string[];
    public transitions: State[];

    constructor(letters: string | string[]) {
        this.letters = Array.isArray(letters) ? letters : [letters];
        this.transitions = [] as State[];
    }

    addTransition(s: State)  {
        this.transitions.push(s);
        return s;
    }

    get isTerminal():boolean {
        return !this.transitions.length;
    }

    accepts(letter: string): boolean {
        return this.letters.some(l => l === letter);
    }
    static combineStates(...states: State[]) {
        const combinedLetters = Array.from(new Set(...states.flatMap(state => state.letters)));
        const combinedTransitions = states.flatMap(state => state.transitions);
        const combined = new State(combinedLetters);
        combinedTransitions.forEach(transition => combined.addTransition(transition));
        return combined;
    }
}

export class StateMachine {
    public state: State | null = null;
    private startStates: State[];
    constructor(start: State | State[]) {
        this.startStates = Array.isArray(start) ? start : [start];
    }

    reset(): void {
        this.state = null;
    }

    private reject(): never {
        this.reset();
        throw new Error('Unparsable token');
    }

    private transition(target: State) {
        this.state = target;
        return !this.state.isTerminal;
    }

    canConsume(letter: string): boolean {
        if (!this.state) {
            return this.startStates.some(state => state.accepts(letter));
        }
        return this.state.transitions.some(state => state.accepts(letter));
    }

    consume(letter: string): boolean {
        if (!this.state) {
            if (!this.startStates.some(startState => startState.accepts(letter))) {
                this.reject();
            }
            const state =  this.startStates.find(startState => startState.accepts(letter)) as State;
            return this.transition(state);
        } 

        if (!this.state.transitions.some(transition => transition.accepts(letter))) {
            this.reject();
        }
        
        const transition = this.state.transitions.find(transition => transition.accepts(letter)) as State;
        return this.transition(transition);
    }
}