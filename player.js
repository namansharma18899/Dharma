import { Sitting, Running, Falling, Jumping } from "./playerStates.js";
import AudioHandler from "./audioHandler.js";
export class Player {
    constructor(game) {
        this.game = game
        this.width = 100; // dimensions
        this.height = 100;
        this.playerWidth = 575
        this.playerHeight = 523
        this.weight = 1;
        this.vy = 0;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.playerFrameX = 0 // Frames
        this.playerFrameY = 5
        this.maxFrame = 5;
        this.fps = 20;  // FPS
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 0; // Speed
        this.maxSpeed = 10;
        this.image = document.getElementById('player'); // Images
        this.background = document.getElementById('background'); // States
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)]
        this.currentState = this.states[0];
        this.currentState.enter()
        this.audioHandler = new AudioHandler()
    }

    update(input, deltaTime) {
        this.currentState.handleInput(input);
        this.x += this.speed;
        if (input.includes('d')) this.speed = this.maxSpeed;
        else if (input.includes('a')) this.speed = - this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // vertical
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.playerFrameX < this.maxFrame) this.playerFrameX++;
            else this.playerFrameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    onGround() {
        return this.y >= this.game.height - this.height;
    }

    draw(context) {
        context.drawImage(this.image, this.playerFrameX * this.playerWidth, this.playerFrameY * this.playerHeight, this.playerWidth, this.playerHeight, this.x, this.y, this.width, this.height);
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}