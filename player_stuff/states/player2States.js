import { State } from '../../game_stuff/state.js';

export const Player2State = Object.freeze({
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    SHOOT_ARROW: 4,
});

export class P2Standing extends State {
    constructor(player) {
        super('P2_STANDING', player);
    }

    enter() {
        this.entity.image = document.getElementById('player2');
        this.entity.frameY = 0;
        this.entity.frameX = 0;
        this.entity.maxFrame = 3;
    }

    handleInput(input) {
        const { right, left, up, special } = this.entity.keyBindings;
        if (input.includes(right) || input.includes(left)) {
            this.entity.setState(Player2State.RUNNING);
        } else if (input.includes(up) && this.entity.stamina >= 15) {
            this.entity.setState(Player2State.JUMPING);
        } else if (input.includes(special)) {
            this.entity.setState(Player2State.SHOOT_ARROW);
        }
    }
}

export class P2Running extends State {
    constructor(player) {
        super('P2_RUNNING', player);
    }

    enter() {
        this.entity.image = document.getElementById('player2_running');
        this.entity.frameY = 0;
        this.entity.frameX = 0;
        this.entity.maxFrame = 7;
    }

    handleInput(input) {
        const { right, left, up } = this.entity.keyBindings;
        if (!(input.includes(left) || input.includes(right))) {
            this.entity.setState(Player2State.STANDING);
        }
        if (input.includes(up) && this.entity.stamina >= 15) {
            this.entity.setState(Player2State.JUMPING);
        }
    }
}

export class P2Jumping extends State {
    constructor(player) {
        super('P2_JUMPING', player);
    }

    enter() {
        this.entity.image = document.getElementById('player2_jump');
        this.entity.frameX = 0;
        this.entity.frameY = 0;
        this.entity.maxFrame = 9;
        if (this.entity.onGround()) {
            this.entity.vy -= 27 * this.entity.staminaFactor;
            this.entity.stamina -= 15;
        }
    }

    handleInput(_input) {
        if (this.entity.vy > this.entity.weight) {
            this.entity.setState(Player2State.FALLING);
        }
    }
}

export class P2Falling extends State {
    constructor(player) {
        super('P2_FALLING', player);
    }

    enter() {
        this.entity.image = document.getElementById('player2_jump');
        this.entity.frameX = 0;
        this.entity.frameY = 0;
        this.entity.maxFrame = 9;
    }

    handleInput(_input) {
        if (this.entity.onGround()) {
            this.entity.setState(Player2State.RUNNING);
        }
    }
}

export class P2ShootArrow extends State {
    constructor(player) {
        super('P2_SHOOT_ARROW', player);
    }

    enter() {
        this.entity.image = document.getElementById('player2_shot');
        this.entity.frameY = 0;
        this.entity.frameX = 0;
        this.entity.maxFrame = 13;
    }

    handleInput(input) {
        if (this.entity.frameX >= this.entity.maxFrame) {
            this.entity.setState(Player2State.STANDING);
            return;
        }
        const { right, left, up } = this.entity.keyBindings;
        if (input.includes(right) || input.includes(left)) {
            this.entity.setState(Player2State.RUNNING);
        } else if (input.includes(up) && this.entity.stamina >= 15) {
            this.entity.setState(Player2State.JUMPING);
        }
    }
}
