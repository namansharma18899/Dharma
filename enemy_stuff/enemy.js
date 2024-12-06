import { FLYING } from "./enemyStates.js";
export class Enemy {
    constructor(game) {
        this.movement_key_override = {
            "up": "w",
            "left": "a",
            "down": "s",
            "right": "d",
            "special": "x",
        }
        this.game = game
        this.width = 100; // dimensions
        this.height = 100;
        this.playerWidth = 62
        this.playerHeight = 72
        this.weight = 1;
        this.vy = 0;
        this.x = 0;
        // this.y = this.game.height - this.height - (this.game.groundMargin);
        this.y = 10
        this.playerFrameX = 0 // Frames
        this.playerFrameY = 10 // IDK what's this...HELP ME ??
        this.maxFrame;
        this.fps = 10;  // FPS
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 2; // Speed
        this.maxSpeed = 10;
        this.image = document.getElementById('enemy_dragon'); // Images
        this.background = document.getElementById('backgroundScenary'); // States
        this.states = [new FLYING(this)]
        this.currentState = this.states[0];
        this.currentState.enter()
        // this.audioHandler = new AudioHandler()
    }

    update(input, deltaTime) {
        this.currentState.handleInput(input);
        console.log('X Before -> -> ', this.x, this.speed)
        this.x += this.speed;
        console.log('After X -> -> ', this.x,  this.speed)
        // When nothing happens
        // if (!(input.includes(this.movement_key_override['right']) || input.includes(this.movement_key_override['left']) || input.includes('w') || input.includes('s'))) {
        //     this.setState(0);
        // }
        if (input.includes(this.movement_key_override['right'])) this.speed = this.maxSpeed;
        else if (input.includes(this.movement_key_override['left'])) this.speed = - this.maxSpeed;
        // else this.speed = 0; // This is commented because we want to move our dragon
        // Boundary
        if (this.x < 0) {
            console.log('resetting X')
            this.x = 0;
        }
        // vertical
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.playerFrameX < this.maxFrame) {
                this.playerFrameX++;
            }
            else {
                this.playerFrameX = 0;
            }
        } else {
            this.frameTimer += deltaTime;
        }
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    draw(context) {
        context.drawImage(this.image, this.playerFrameX * this.playerWidth, this.playerFrameY * this.playerHeight, this.playerWidth, this.playerHeight, this.x, 20, this.width, this.height);
        // context.drawImage(this.background,0,0,this.game.width, this.game.height-160); 
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}