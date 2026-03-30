import { State } from '../game_stuff/state.js';

export const EnemyState = Object.freeze({
    FLYING: 0,
});

export class Flying extends State {
    constructor(enemy) {
        super('FLYING', enemy);
    }

    enter() {
        this.entity.frameY = 0;
        this.entity.frameX = 0;
        this.entity.maxFrame = 14;
    }

    handleInput(_input) {}
}
