import { State } from '../../game_stuff/state.js';

export const PlayerState = Object.freeze({
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    STANDING: 4,
});

export class Sitting extends State {
    constructor(player) {
        super('SITTING', player);
    }

    enter() {
        this.entity.frameY = 5;
        this.entity.frameX = 0;
        this.entity.maxFrame = 4;
    }

    handleInput(input) {
        const { right, left } = this.entity.keyBindings;
        if (input.includes(right) || input.includes(left)) {
            this.entity.setState(PlayerState.RUNNING);
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING', player);
    }

    enter() {
        this.entity.frameY = 3;
        this.entity.frameX = 0;
        this.entity.maxFrame = 8;
    }

    handleInput(input) {
        const { up, down } = this.entity.keyBindings;
        if (input.includes(up) && this.entity.stamina >= 15) {
            this.entity.setState(PlayerState.JUMPING);
        } else if (input.includes(down)) {
            this.entity.setState(PlayerState.SITTING);
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING', player);
    }

    enter() {
        this.entity.frameX = 0;
        this.entity.frameY = 1;
        this.entity.maxFrame = 6;
        if (this.entity.onGround()) {
            this.entity.vy -= 27 * this.entity.staminaFactor;
            this.entity.stamina -= 15;
        }
    }

    handleInput(_input) {
        if (this.entity.vy > this.entity.weight) {
            this.entity.setState(PlayerState.FALLING);
        }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING', player);
    }

    enter() {
        this.entity.frameY = 2;
        this.entity.frameX = 0;
        this.entity.maxFrame = 6;
    }

    handleInput(_input) {
        if (this.entity.onGround()) {
            this.entity.setState(PlayerState.RUNNING);
        }
    }
}

export class Standing extends State {
    constructor(player) {
        super('STANDING', player);
    }

    enter() {
        this.entity.frameY = 0;
        this.entity.frameX = 0;
        this.entity.maxFrame = 6;
    }

    handleInput(input) {
        const { right, left, up, down } = this.entity.keyBindings;
        if (input.includes(right) || input.includes(left)) {
            this.entity.setState(PlayerState.RUNNING);
        } else if (input.includes(up) && this.entity.stamina >= 15) {
            this.entity.setState(PlayerState.JUMPING);
        } else if (input.includes(down)) {
            this.entity.setState(PlayerState.SITTING);
        }
    }
}
