export class Projectile {
    constructor(x, y, image, speed = 8) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 10;
        this.speed = speed;
        this.image = image;
        this.hit = false;
    }

    update() {
        this.x += this.speed;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isOffScreen(gameWidth) {
        return this.x > gameWidth || this.x + this.width < 0;
    }

    collidesWith(target) {
        return (
            this.x < target.x + target.width &&
            this.x + this.width > target.x &&
            this.y < target.y + target.height &&
            this.y + this.height > target.y
        );
    }
}
