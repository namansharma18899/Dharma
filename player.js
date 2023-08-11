
export class Player {
    constructor(game, inputHandler) {
        this.game = game
        this.ih = inputHandler
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.sx = 575
        this.sy = 523
        this.image = document.getElementById('player');
        this.movements = {
            'jumping':{
                'speed': 5, // referring to 20pxps
                'midair': false,
                'ascent': false,
                'maxHeight': 250
            },
            'running':{
                'speed' : 5,
            }
        }
        // this.midair = false
        // this.ascent = false
        // this.maxHeight = 100
    }
    update() {
        // Hz mvmnt
        if (this.ih.keys.includes('d') && ((this.x + this.width) < this.game.width)) {
            this.x = this.x+ this.movements.running.speed;
        }
        if (this.ih.keys.includes('a') && ((this.x > 0))) {
            this.x = this.x- this.movements.running.speed;
        }
        // vrtical mvmnt
        if (this.ih.keys.includes('w') && (this.y > 0)) {
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
                console.log('cur y ? -> ', this.y)
                this.y--;
                this.movements.jumping.midair = true
                this.movements.jumping.ascent = true
            }
        }
    }
    draw(context) {
        context.drawImage(this.image, 0, 0, this.sx, this.sy, this.x, this.y, this.width, this.height);
    }
}