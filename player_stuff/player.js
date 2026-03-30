import { Sitting, Running, Falling, Jumping, Standing } from './states/playerStates.js';
import { P2Standing, P2Running, P2Falling, P2Jumping, P2ShootArrow } from './states/player2States.js';
import { Projectile } from './projectile.js';
import AudioHandler from '../game_stuff/audioHandler.js';

class BasePlayer {
    constructor(game, config) {
        this.game = game;
        this.keyBindings = config.keyBindings;
        this.width = 100;
        this.height = 100;
        this.spriteWidth = config.spriteWidth;
        this.spriteHeight = config.spriteHeight;
        this.weight = 1;
        this.vy = 0;
        this.x = config.startX;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.frameX = 0;
        this.frameY = config.initialFrameY;
        this.maxFrame = 0;
        this.fps = config.fps;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.image = config.image;
        this.audioHandler = new AudioHandler();
        this.health = 100;
        this.maxHealth = 100;
        this.displayHealth = 100;
        this.stamina = 100;
        this.maxStamina = 100;
        this.displayStamina = 100;
        this.magic = 100;
        this.maxMagic = 100;
        this.displayMagic = 100;
        this.states = [];
        this.currentState = null;
    }

    update(input, deltaTime) {
        this.currentState.handleInput(input);
        this.x += this.speed;

        const currentSpeed = this.maxSpeed * this.staminaFactor;
        if (input.includes(this.keyBindings.right)) this.speed = currentSpeed;
        else if (input.includes(this.keyBindings.left)) this.speed = -currentSpeed;
        else this.speed = 0;

        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        this.advanceFrame(deltaTime);
    }

    advanceFrame(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    get staminaFactor() {
        return 0.3 + 0.7 * (this.stamina / this.maxStamina);
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height
        );
    }

    setState(stateIndex) {
        this.currentState = this.states[stateIndex];
        this.currentState.enter();
    }
}

export class Player extends BasePlayer {
    constructor(game) {
        super(game, {
            keyBindings: { up: 'w', left: 'a', down: 's', right: 'd', special: 'x' },
            spriteWidth: 575,
            spriteHeight: 523,
            startX: 0,
            initialFrameY: 5,
            fps: 20,
            image: document.getElementById('player'),
        });
        this.states = [
            new Sitting(this), new Running(this), new Jumping(this),
            new Falling(this), new Standing(this),
        ];
        this.currentState = this.states[0];
        this.currentState.enter();

        this.projectiles = [];
        this.projectileImage = document.getElementById('laser');
        this.fireCooldown = 0;
        this.fireCooldownMax = 400;
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);

        if (input.includes(this.keyBindings.special) && this.fireCooldown <= 0 && this.magic >= 20) {
            this.fireProjectile();
            this.fireCooldown = this.fireCooldownMax;
            this.magic -= 20;
        }
        if (this.fireCooldown > 0) this.fireCooldown -= deltaTime;

        this.projectiles.forEach((p) => p.update());
        this.projectiles = this.projectiles.filter((p) => !p.hit && !p.isOffScreen(this.game.width));
    }

    draw(context) {
        super.draw(context);
        this.projectiles.forEach((p) => p.draw(context));
    }

    fireProjectile() {
        this.projectiles.push(
            new Projectile(this.x + this.width, this.y + this.height / 2, this.projectileImage)
        );
    }
}

export class Player2 extends BasePlayer {
    constructor(game) {
        super(game, {
            keyBindings: { up: 'i', left: 'j', down: 'k', right: 'l', special: ',' },
            spriteWidth: 128,
            spriteHeight: 128,
            startX: game.width - 300,
            initialFrameY: 6,
            fps: 10,
            image: document.getElementById('player2'),
        });
        this.states = [
            new P2Standing(this), new P2Running(this), new P2Jumping(this),
            new P2Falling(this), new P2ShootArrow(this),
        ];
        this.currentState = this.states[0];
        this.currentState.enter();

        this.projectiles = [];
        this.projectileImage = document.getElementById('arrow');
        this.fireCooldown = 0;
        this.fireCooldownMax = 400;
    }

    update(input, deltaTime) {
        super.update(input, deltaTime);

        if (input.includes(this.keyBindings.special) && this.fireCooldown <= 0 && this.magic >= 20) {
            this.fireProjectile();
            this.fireCooldown = this.fireCooldownMax;
            this.magic -= 20;
        }
        if (this.fireCooldown > 0) this.fireCooldown -= deltaTime;

        this.projectiles.forEach((p) => p.update());
        this.projectiles = this.projectiles.filter((p) => !p.hit && !p.isOffScreen(this.game.width));
    }

    draw(context) {
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.scale(-1, 1);
        context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        super.draw(context);
        context.restore();
        this.projectiles.forEach((p) => p.draw(context));
    }

    fireProjectile() {
        this.projectiles.push(
            new Projectile(this.x - this.width, this.y + this.height / 2, this.projectileImage, -8)
        );
    }
}
