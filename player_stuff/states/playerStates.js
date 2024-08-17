const states = {
    'SITTING': 0,
    'RUNNING': 1,
    'JUMPING': 2,
    'FALLING': 3,
    'STANDING': 4
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
        this.player.playerFrameX = 0;
        this.player.maxFrame = 6;
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
        this.player.playerFrameX = 0;
        if (this.player.onGround()) this.player.vy -= 27;
        this.player.playerFrameY = 1;
        this.player.maxFrame = 6;
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
        this.player.playerFrameX = 0;
        this.player.maxFrame = 8;
    }

    handleInput(input) {
        if (input.includes(this.player.movement_key_override['up'])) {
            this.player.setState(states.JUMPING);
        }
        else if (input.includes(this.player.movement_key_override['down'])) {
            this.player.setState(states.SITTING); // 1 refers to running state
        }
        // else{ // Stanidng
        //     this.player.setState(states.STANDING);
        // }
    }
}
export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player
    }

    enter() {
        this.player.playerFrameY = 5;
        this.player.playerFrameX = 0;
        this.player.maxFrame = 4;
    }

    handleInput(input) {
        // console.log(`input > ${input}`)
        if (input.includes(this.player.movement_key_override['right']) || input.includes(this.player.movement_key_override['left'])) {
            this.player.setState(states.RUNNING); // 1 refers to running state
        }
    }
}
export class Standing extends State {
    constructor(player) {
        super('STANDING');
        this.player = player
    }

    enter() {
        this.player.playerFrameY = 0;
        this.player.playerFrameX = 0;
        this.player.maxFrame = 6;
    }

    handleInput(input) {
        // console.log(`input > ${input}`)
        if (input.includes(this.player.movement_key_override['right']) || input.includes(this.player.movement_key_override['left'])) {
            this.player.setState(states.RUNNING); // 1 refers to running state
        }
        else if (input.includes(this.player.movement_key_override['up'])) {
            this.player.setState(states.JUMPING);
        }
        else if (input.includes(this.player.movement_key_override['down'])) {
            this.player.setState(states.SITTING); // 1 refers to running state
        }

    }
}

