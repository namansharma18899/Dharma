import { SittingState } from "./playerStates.js";
import AudioHandler from "./audioHandler.js";
import { RunningState } from "./playerStates.js";

export class Player {
    constructor(game, inputHandler) {
        this.game = game
        this.ih = inputHandler
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.playerWidth = 575
        this.playerHeight = 523
        this.playerFrameX = 0
        this.playerFrameY = 0
        this.image = document.getElementById('player');
        this.background = document.getElementById('background');
        this.movements = {
            'jumping':{
                'speed': 5, // referring to 20pxps
                'midair': false,
                'ascent': false,
                'maxHeight': 150
            },
            'running':{
                'speed' : 4,
            }
        }
        this.states = [new SittingState(), new RunningState()]
        this.currentState = 0
        this.counter = 0
        this.audioHandler = new AudioHandler()
    }
    update() {
        var tempCord = this.states[this.currentState].getCord(this.counter)
        this.counter++;
        this.playerFrameX = tempCord.x
        this.playerFrameY = tempCord.y
        // Hz mvmnt
        if(this.ih.keys.includes('d') || this.ih.keys.includes('a')){
            this.currentState = 1;
            if (this.ih.keys.includes('d') && ((this.x + this.width) < this.game.width)) {
                this.x = this.x+ this.movements.running.speed;
            }
            if (this.ih.keys.includes('a') && ((this.x > 0))) {
                this.x = this.x- this.movements.running.speed;
            }
        }else{
            this.currentState = 0;
        }

        // vrtical mvmnt
        if (this.ih.keys.includes('w') && (this.y > 0)) {
            this.audioHandler.play('jump')
            if (this.movements.jumping.midair == true) {
                if (this.movements.jumping.ascent == true) {
                    if (this.y > this.movements.jumping.maxHeight) {
                        this.y = this.y-this.movements.jumping.speed;
                    } else {
                        this.movements.jumping.ascent = false
                        this.y = this.y + this.movements.jumping.speed;
                    }
                }
                else {
                    if (this.y >= (this.game.height - this.height)) {
                        this.movements.jumping.midair = false
                        this.ih.keys.splice(this.ih.keys.indexOf('w'), 1);
                    }
                    else {
                        this.y = this.y + this.movements.jumping.speed;
                    }   
                }
            }else {
                this.y--;
                this.movements.jumping.midair = true
                this.movements.jumping.ascent = true
            }
        }
    }

    draw(context) {
        context.drawImage(this.background, 0,0, 1500,500);
        context.drawImage(this.image, this.playerFrameX, this.playerFrameY, this.playerWidth, this.playerHeight, this.x, this.y, this.width, this.height);
    }
}