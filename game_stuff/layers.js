class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if (this.x < -this.width) {
            this.x = 0;
        } else {
            this.x -= this.game.speed - this.speedModifier;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;

        const layerConfigs = [
            { id: 'layer1', speed: 0.08 },
            { id: 'layer2', speed: 0.2 },
            { id: 'layer3', speed: 0.4 },
            { id: 'layer4', speed: 0.8 },
            { id: 'layer5', speed: 1 },
        ];

        this.layers = layerConfigs.map(
            ({ id, speed }) => new Layer(game, this.width, this.height, speed, document.getElementById(id))
        );
    }

    update() {
        this.layers.forEach((layer) => layer.update());
    }

    draw(context) {
        this.layers.forEach((layer) => layer.draw(context));
    }
}
