import {Player, Player2} from './player_stuff/player.js';

import { Enemy } from './enemy_stuff/enemy.js';
import { Background } from './game_stuff/layers.js';
import {InputHandler} from './game_stuff/input.js';

function handleFormSubmit(){
    console.log('yo here')
    alert('clicked man')
    document.getElementById("myForm").submit();
}

window.addEventListener('load', ()=>{

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 500;
    class Game{
        constructor(width, height){
            this.width = width
            this.height = height
            this.speed = 3;
            this.background = new Background(this);
            this.groundMargin = 50;
            this.P1 = new Player(this);
            this.P2 = new Player2(this);
            this.DragonEnemy = new Enemy(this);
            this.input_p1 = new InputHandler(this.P1.movement_key_override);
            this.input_p2 = new InputHandler(this.P2.movement_key_override);
        }
        update(deltaTime){
            this.background.update()
            this.P1.update(this.input_p1.keys, deltaTime)
            this.P2.update(this.input_p2.keys, deltaTime)
            this.DragonEnemy.update(this.input_p1.keys, deltaTime)
        }
        draw(context){
            this.background.draw(context)
            this.P1.draw(context);
            this.P2.draw(context);
            this.DragonEnemy.draw(context);
        }
    }

    const game= new Game(canvas.width, canvas.height)
    let lastTime = 0;

    function animate(timestamp){ // timestamp generated by requestanimation frame
        const deltaTime = timestamp - lastTime;
        /**Delta time gives off the numeric difference between the appearance of frames */
        // console.log('deltatime -> ', deltaTime)
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
})
