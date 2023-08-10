
export class Player {
    constructor(game) {
        this.game = game
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.sx = 575
        this.sy = 523
        this.image = document.getElementById('player');
    }
    update(keys) {
        // Hz mvmnt
        if (keys.includes('d') && ((this.x + this.width)< this.game.width)){
            this.x++;
        }
        if (keys.includes('a') && ((this.x > 0))){
            this.x--;
        }
        // vrtical mvmnt
    }   
    draw(context) {
        context.drawImage(this.image, 0,0, this.sx , this.sy, this.x, this.y, this.width, this.height);
        // context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}