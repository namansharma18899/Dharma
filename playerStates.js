const states = {
    'SITTING': 0,
    'RUNNING': 1,
    'JUMPING': 2,
    'FALLING': 3
}
const playerWidth = 575
const playerHeight = 523

class State {
    constructor(state) {
        this.state = state
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player
    }
    // Handle All variations in SITTING STATE
    enter() {
        this.player.playerFrameY = 2;
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING);
        }
    }
}
export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player
    }
    // Handle All variations in SITTING STATE
    enter() {
        if (this.player.onGround()) this.player.vy -= 25;
        this.player.playerFrameY = 1;
    }

    handleInput(input) {
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING);
        }
    }
}
export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player
    }
    // Handle All variations in SITTING STATE
    enter() {
        this.player.playerFrameY = 3;
    }

    handleInput(input) {
        if (input.includes('w')) {
            this.player.setState(states.JUMPING);
        }
        if (input.includes('s')) {
            this.player.setState(states.SITTING); // 1 refers to running state
        }

    }
}
export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player
    }

    enter() {
        this.player.playerFrameY = 5;
    }

    handleInput(input) {
        console.log(`input > ${input}`)
        if (input.includes('d') || input.includes('a')) {
            this.player.setState(states.RUNNING); // 1 refers to running state
        }

    }
}