class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.image = image
        this.x = 0
        this.y = 0
    }

    draw(context){
        context.drawImage(this.image,this.x, this.y, this.width, this.height);
        context.drawImage(this.image,this.x+this.width, this.y, this.width, this.height);
    }

    update(){
        if (this.x < -this.width){
            this.x=0;
        }else{
            this.x -= this.game.speed - this.speedModifier;
        }

    }
}

export class Background{
    constructor(game){ 
        this.game = game
        this.width = 1667
        this.height = 500
        this.layer5image = document.getElementById('layer5');
        this.layer1 = new Layer(game, this.width, this.height, 1, this.layer5image);
        this.backgroundLayers = [this.layer1]
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update() 
        });
    }

    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context) 
        });
    }

}