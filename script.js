const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;


const playerImage = new Image();
playerImage.src = 'assets/sprint/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 5;
let frameY = 8;
let gameFrame = 0;
const staggerFrame = 7;


const imageFramesInfo = [
    {
        'id': 'idle',
        'frames': 7
    },
    {
        'id': 'jump',
        'frames': 7
    },
    {
        'id': 'fall',
        'frames': 7
    },
    {
        'id': 'run',
        'frames': 9
    },
    {
        'id': 'dizzy',
        'frames': 11
    },
    {
        'id': 'sit',
        'frames': 5
    },
    {
        'id': 'roll',
        'frames': 7
    },
    {
        'id': 'bite',
        'frames': 7
    },
    {
        'id': 'ko',
        'frames': 12
    },
    {
        'id': 'getHit',
        'frames': 4
    },
]

const imageAnimations = {}
imageFramesInfo.forEach((state, index) => {
    var coord = []
    for (var i = 0; i < state.frames; i++) {
        var absX = spriteWidth * i
        var absY = spriteHeight * index
        coord.push({ 'x': absX, 'y': absY })
    }
    imageAnimations[state.id] = coord
})

let counter = 0;
const animationMovements = imageAnimations['idle'];
animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    var imagePosition = animationMovements[Math.floor(counter / staggerFrame) % animationMovements.length]
    ctx.drawImage(playerImage, imagePosition.x, imagePosition.y, spriteWidth,
        spriteHeight, 0, 0, spriteWidth, spriteHeight);
    counter += 1
    requestAnimationFrame(animate);
}
animate();