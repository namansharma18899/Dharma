const states = {
    'SITTING': 0,
    'RUNNING': 1,
    'JUMPING': 2
}


const playerWidth = 575
const playerHeight = 523

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
        var absX = playerWidth * i
        var absY = playerHeight * index
        coord.push({ 'x': absX, 'y': absY })
    }
    imageAnimations[state.id] = coord
})


class State{
    constructor(state){
        this.state = state
    }
}

export class RunningState extends State{
    constructor(){
        super('RUNNING');
        this.frames = 9
        this.frameY = 0
        this.animationMovements = imageAnimations['run'];
    }
    // Handle All variations in SITTING STATE
    
    getCord(counter){
        return this.animationMovements[Math.floor(counter / this.frames) % this.animationMovements.length]
    }
}


export class SittingState extends State{
    constructor(){
        super('SITTING');
        this.frames = 7
        this.frameY = 0
        this.animationMovements = imageAnimations['idle'];
    }
    // Handle All variations in SITTING STATE
    handleAnimation(player){
        
    }
    getCord(counter){
        return this.animationMovements[Math.floor(counter / this.frames) % this.animationMovements.length]
        // console.log('X -> ',(playerFrameX))
        // console.log('Number -> ',this.frames*super.getPlayerWidth())
        // var tempPFX = (playerFrameX+super.getPlayerWidth())%(this.frames*super.getPlayerWidth())
        // console.log("animate -> ", tempPFX)
        // return {'x':tempPFX, 'y':this.frameY}
    }
}