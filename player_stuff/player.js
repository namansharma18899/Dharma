import { Sitting, Running, Falling, Jumping, Standing } from "./states/playerStates.js";
import { P2Sitting, P2Running, P2Falling, P2Jumping, P2Standing } from "./states/player2States.js";
import AudioHandler from "../game_stuff/audioHandler.js";
export class Player {
    constructor(game) {
        this.movement_key_override = {
            "up":"w",
            "left":"a",
            "down":"s",
            "right":"d",
            "special-one":"x",
        }
        this.game = game
        this.width = 100; // dimensions
        this.height = 100;
        this.playerWidth = 575
        this.playerHeight = 523
        this.weight = 1;
        this.vy = 0;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.playerFrameX = 0 // Frames
        this.playerFrameY = 5
        this.maxFrame;
        this.fps = 20;  // FPS
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 0; // Speed
        this.maxSpeed = 10;
        this.image = document.getElementById('player'); // Images
        this.background = document.getElementById('backgroundScenary'); // States
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this), new Standing(this)]
        this.currentState = this.states[0];
        this.currentState.enter()
        this.audioHandler = new AudioHandler()
    }

    update(input, deltaTime) {
        this.currentState.handleInput(input);
        this.x += this.speed;
        // When nothing happens
        // if (!(input.includes(this.movement_key_override['right']) || input.includes(this.movement_key_override['left']) || input.includes('w') || input.includes('s'))) {
        //     this.setState(0);
        // }
        if (input.includes(this.movement_key_override['right'])) this.speed = this.maxSpeed;
        else if (input.includes(this.movement_key_override['left'])) this.speed = - this.maxSpeed;
        else this.speed = 0;
        // Boundary
        if (this.x < 0) this.x = 0;
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
        context.drawImage(this.image, this.playerFrameX * this.playerWidth, this.playerFrameY * this.playerHeight, this.playerWidth, this.playerHeight, this.x, this.y, this.width, this.height);
        // context.drawImage(this.background,0,0,this.game.width, this.game.height-160); 
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}


export class Player2 {
    constructor(game) {
        this.movement_key_override = {
            "up": "i",
            "left": "j",
            "down": "k",
            "right": "l",
            "special-one":",",
        }
        this.image = document.getElementById('player2'); // Images
        this.playerWidth = 128
        this.playerHeight = 128
        
        this.game = game;
        this.width = 100; // dimensions
        this.height = 100;
        // this.playerWidth = 600; // Different sprite size for Player2
        // this.playerHeight = 500; // Different sprite size for Player2
        this.weight = 1;
        this.vy = 0;
        this.x = this.game.width - 300; // Position on the opposite side of the game canvas
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.playerFrameX = 0 // Frames
        this.playerFrameY = 6 // Different initial frame for Player2
        this.maxFrame;
        this.fps = 10;  // FPS
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 0; // Speed
        this.maxSpeed = 10;
        this.background = document.getElementById('backgroundScenary'); // States
        this.states = [new P2Standing(this), new P2Running(this), new P2Jumping(this), new P2Falling(this), new P2Standing(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.audioHandler = new AudioHandler();
    }

    update(input, deltaTime) {
        this.currentState.handleInput(input);
        this.x += this.speed;
        console.log('curr -> ', this.currentState.state)
        if (input.includes(this.movement_key_override['right'])) this.speed = this.maxSpeed;
        else if (input.includes(this.movement_key_override['left'])) this.speed = -this.maxSpeed;
        else this.speed = 0;
        // Boundary
        if (this.x < 0) this.x = 0;
        // Vertical movement
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // Animation frame control
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.playerFrameX < this.maxFrame) {
                this.playerFrameX++;
            } else {
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
        context.save()
        context.translate(this.x + this.width / 2, this.y + this.height / 2); // Move the context to the image's center
        context.scale(-1, 1); // Flip the context horizontally
        context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2)); // Move the context back
        context.drawImage(this.image, this.playerFrameX * this.playerWidth, this.playerFrameY * this.playerHeight, this.playerWidth, this.playerHeight, this.x, this.y, this.width, this.height);
        context.restore()
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}