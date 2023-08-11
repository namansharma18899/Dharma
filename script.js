import {Player} from './player.js';
import {InputHandler} from './input.js';

window.addEventListener('load', ()=>{
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    class Game{
        constructor(width, height){
            this.width = width
            this.height = height
            this.InputHandler = new InputHandler();
            this.player = new Player(this, this.InputHandler);
        }
        update(context){
            this.player.update()
        }
        draw(context){
            this.player.draw(context);
        }
    }

    const game= new Game(canvas.width, canvas.height)

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(ctx);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate();
})





// const spriteWidth = 575;
// const spriteHeight = 523;
// let GAMESPEED = 5;
// const playerImage = new Image();
// playerImage.src = 'assets/sprint/shadow_dog.png';







// /*
// main sprite
// */
// const imageFramesInfo = [
//     {
//         'id': 'idle',
//         'frames': 7
//     },
//     {
//         'id': 'jump',
//         'frames': 7
//     },
//     {
//         'id': 'fall',
//         'frames': 7
//     },
//     {
//         'id': 'run',
//         'frames': 9
//     },
//     {
//         'id': 'dizzy',
//         'frames': 11
//     },
//     {
//         'id': 'sit',
//         'frames': 5
//     },
//     {
//         'id': 'roll',
//         'frames': 7
//     },
//     {
//         'id': 'bite',
//         'frames': 7
//     },
//     {
//         'id': 'ko',
//         'frames': 12
//     },
//     {
//         'id': 'getHit',
//         'frames': 4
//     },
// ]
// const imageAnimations = {}
// imageFramesInfo.forEach((state, index) => {
//     var coord = []
//     for (var i = 0; i < state.frames; i++) {
//         var absX = spriteWidth * i
//         var absY = spriteHeight * index
//         coord.push({ 'x': absX, 'y': absY })
//     }
//     imageAnimations[state.id] = coord;
// })

// class Sprite{
//     constructor(image, animationType,staggerFrame){
//         this.x = 0;
//         this.y = 0;
//         this.counter = 0;
//         this.animationType = animationType
//         this.staggerFrame = staggerFrame
//         this.width = 2400 // Width of the Background image
//         this.height = 700 // you guessed it right
//         this.image = image
//         this.speed = GAMESPEED * this.speedModifier;
//     }
//     resetSpriteAnimation(){
//         this.counter=0;
//     }

//     update(){
//     }

//     draw(){
//     // Sprite runs
//     const animationMovements = imageAnimations[this.animationType];
//     var imagePosition = animationMovements[Math.floor(this.counter / this.staggerFrame) % animationMovements.length]
//     ctx.drawImage(playerImage, imagePosition.x, imagePosition.y, spriteWidth,
//         spriteHeight, 0, 0, spriteWidth, spriteHeight);
//     this.counter+=1
//     }
// }

// /* 
// background
// */

// const backgroundLayers = ['layer-1.png','layer-2.png','layer-3.png','layer-4.png','layer-5.png']
// const backgroundLayersSrc= []
// backgroundLayers.forEach((item, index)=>{
//     let img = new Image()
//     img.src='assets/background/'+item;
//     backgroundLayersSrc.push(img)
// })
// class BackgroundLayer {
//     constructor(image, speedModifier){
//         this.x = 0;
//         this.y = 0;
//         this.width = 2400 // Width of the Background image
//         this.height = 700 // you guessed it right
//         this.x2 = this.width;
//         this.image = image
//         this.speedModifier  = speedModifier
//         this.speed = GAMESPEED * this.speedModifier;
//     }
//     update(){
//         this.speed = GAMESPEED * this.speedModifier;
//         if (this.x <= -this.width){
//             this.x = this.width + this.x2 - this.speed;
//         }
//         if (this.x2 <= -this.width){
//             this.x2 = this.width + this.x - this.speed;
//         }
//         this.x = Math.floor(this.x - this.speed);
//         this.x2 = Math.floor(this.x2 - this.speed);

//     }
//     draw(){
//         ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//         ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
//     }
// }

// /* 
// MAIN LOGIC
// */
// const layer1 = new BackgroundLayer(backgroundLayersSrc[0], 0.5)
// const layer2 = new BackgroundLayer(backgroundLayersSrc[1], 0.5)
// const layer3 = new BackgroundLayer(backgroundLayersSrc[2], 0.5)
// const layer4 = new BackgroundLayer(backgroundLayersSrc[3], 0.5)
// const layer5 = new BackgroundLayer(backgroundLayersSrc[4], 1)
// const gameBackgroundLayers = [layer1,layer2, layer3, layer4, layer5]
// const mainSprite = new Sprite(playerImage,'jump', 6)

// animate = () => {
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     gameBackgroundLayers.forEach((layer, index)=>{
//         layer.update();
//         layer.draw();
//     })
//     mainSprite.draw();
//     requestAnimationFrame(animate);
// }
// animate();