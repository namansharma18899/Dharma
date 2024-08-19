const states = {
    'P2SITTING': 0,
    'P2RUNNING': 1,
    'P2JUMPING': 2,
    'P2FALLING': 3,
    'P2STANDING': 4,
    'P2SHOOTARROW': 5
}
const playerWidth = 120
const playerHeight = 120

class State {
    constructor(state) {
        this.state = state
    }
}

export class P2Falling extends State {
    constructor(player) {
        super('P2FALLING');
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
            this.player.setState(states.P2RUNNING);
        }
    }
}
export class P2Jumping extends State {
    constructor(player) {
        super('P2JUMPING');
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
            this.player.setState(states.P2FALLING);
        }
    }
}
export class P2Running extends State {
    constructor(player) {
        super('P2RUNNING');
        this.player = player
    }
    // Handle All variations in SITTING STATE
    enter() {
        this.player.image = document.getElementById('player2_running'); // Images
        this.player.playerFrameY = 0;
        this.player.playerFrameX = 0;
        this.fps = 60; 
        this.player.maxFrame = 7;
    }

    handleInput(input) {
        if (! (input.includes(this.player.movement_key_override['left']) || (input.includes(this.player.movement_key_override['right'])))) {
            this.player.setState(states.P2STANDING);
        }
        if (input.includes(this.player.movement_key_override['up'])) {
            this.player.setState(states.P2JUMPING);
        }
        else if (input.includes(this.player.movement_key_override['down'])) {
            this.player.setState(states.P2SITTING); // 1 refers to running state
        }
        // else{ // Stanidng
        //     this.player.setState(states.STANDING);
        // }
    }
}
export class P2Sitting extends State {
    constructor(player) {
        super('P2SITTING');
        this.player = player
    }

    enter() {
        this.player.playerFrameY = 0;
        this.player.playerFrameX = 0;
        this.player.maxFrame = 4;
    }

    handleInput(input) {
        // console.log(`input > ${input}`)
        if (input.includes(this.player.movement_key_override['right']) || input.includes(this.player.movement_key_override['left'])) {
            this.player.setState(states.P2RUNNING); // 1 refers to running state
        }
    }
}
export class P2ShootArrow extends State {
    constructor(player) {
        super('P2SHOOTARROW');
        this.player = player
    }

    enter() {
        console.log('Inside shoot')
        this.player.image = document.getElementById('player2_shot');
        this.player.playerFrameY = 0;
        this.player.playerFrameX = 0;
        this.player.maxFrame = 13;
        this.player.block_transition = true
    }

    handleInput(input) {
        if (this.block_transition == true){
            if (this.player.playerFrameX==this.maxFrame){
                this.block_transition=false
                this.player.setState(states.P2RUNNING); // 1 refers to running state    
            }
        }
        if (input.includes(this.player.movement_key_override['right']) || input.includes(this.player.movement_key_override['left'])) {
            this.player.setState(states.P2RUNNING); // 1 refers to running state
        }
        else if (input.includes(this.player.movement_key_override['up'])) {
            this.player.setState(states.P2JUMPING);
        }
        else if (input.includes(this.player.movement_key_override['down'])) {
            this.player.setState(states.P2SITTING); // 1 refers to running state
        }

    }
}

export class P2Standing extends State {
    constructor(player) {
        super('P2STANDING');
        this.player = player
    }

    enter() {
        this.player.image = document.getElementById('player2');
        this.player.playerFrameY = 0;
        this.player.playerFrameX = 0;
        this.player.maxFrame = 3;
    }

    handleInput(input) {
        // console.log(`input > ${input}`)
        if (input.includes(this.player.movement_key_override['right']) || input.includes(this.player.movement_key_override['left'])) {
            this.player.setState(states.P2RUNNING); // 1 refers to running state
            return
        }
        else if (input.includes(this.player.movement_key_override['up'])) {
            this.player.setState(states.P2JUMPING);
        }
        else if (input.includes(this.player.movement_key_override['down'])) {
            this.player.setState(states.P2SITTING); // 1 refers to running state
        }
        else if (input.includes(this.player.movement_key_override['special'])) {
            this.player.setState(states.P2SHOOTARROW); // 1 refers to running state
        }

    }
}
