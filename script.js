import {Player, Player2} from './player_stuff/player.js';
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
            this.player = new Player(this);
            this.player2 = new Player2(this);
            this.input_p1 = new InputHandler(this.player.movement_key_override);
            this.input_p2 = new InputHandler(this.player2.movement_key_override);
        }
        update(deltaTime){
            this.background.update()
            this.player.update(this.input_p1.keys, deltaTime)
            this.player2.update(this.input_p2.keys, deltaTime)
        }
        draw(context){
            this.background.draw(context)
            this.player.draw(context);
            this.player2.draw(context);
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
