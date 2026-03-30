import { Flying } from './enemyStates.js';

export class Enemy {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.spriteWidth = 62;
        this.spriteHeight = 72;
        this.vy = 0;
        this.weight = 1;
        this.x = 0;
        this.y = 50;
        this.frameX = 0;
        this.frameY = 10;
        this.maxFrame = 0;
        this.fps = 10;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 2;
        this.maxSpeed = 10;
        this.image = document.getElementById('enemy_dragon');

        this.states = [new Flying(this)];
        this.currentState = this.states[0];
        this.currentState.enter();

        this.timeElapsed = 0;
        this.waveAmplitude = 1.8;
        this.waveFrequency = 0.050;
    }

    update(deltaTime) {
        this.currentState.handleInput();
        this.updateFlight();

        if (this.x > this.game.width - this.width) this.x = 0;

        this.advanceFrame(deltaTime);
    }

    updateFlight() {
        this.x += this.speed;
        this.timeElapsed++;
        this.y += Math.sin(this.timeElapsed * this.waveFrequency) * this.waveAmplitude;
    }

    advanceFrame(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height
        );
    }

    setState(stateIndex) {
        this.currentState = this.states[stateIndex];
        this.currentState.enter();
    }
}
