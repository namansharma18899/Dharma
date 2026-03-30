import { Player, Player2 } from './player_stuff/player.js';
import { Enemy } from './enemy_stuff/enemy.js';
import { Background } from './game_stuff/layers.js';
import { InputHandler } from './game_stuff/input.js';

const DAMAGE_PER_HIT = 20;
const HEALTH_LERP_SPEED = 0.05;

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.speed = 3;
        this.groundMargin = 50;
        this.background = new Background(this);
        this.P1 = new Player(this);
        this.P2 = new Player2(this);
        this.dragon = new Enemy(this);
        this.inputP1 = new InputHandler(this.P1.keyBindings);
        this.inputP2 = new InputHandler(this.P2.keyBindings);
        this.gameOver = false;
        this.winner = null;
    }

    update(deltaTime) {
        if (this.gameOver) return;

        this.background.update();
        this.P1.update(this.inputP1.keys, deltaTime);
        this.P2.update(this.inputP2.keys, deltaTime);
        this.dragon.update(deltaTime);
        this.checkCollisions();
        this.updateDisplayStats();
        this.checkGameOver();
    }

    checkCollisions() {
        // P1 projectiles hitting P2
        this.P1.projectiles.forEach((projectile) => {
            if (projectile.collidesWith(this.P2)) {
                projectile.hit = true;
                this.P2.health = Math.max(0, this.P2.health - DAMAGE_PER_HIT);
            }
        });

        // P2 projectiles hitting P1
        this.P2.projectiles.forEach((projectile) => {
            if (projectile.collidesWith(this.P1)) {
                projectile.hit = true;
                this.P1.health = Math.max(0, this.P1.health - DAMAGE_PER_HIT);
            }
        });
    }

    updateDisplayStats() {
        const lerp = HEALTH_LERP_SPEED;
        this.P1.displayHealth += (this.P1.health - this.P1.displayHealth) * lerp;
        this.P2.displayHealth += (this.P2.health - this.P2.displayHealth) * lerp;
        this.P1.displayStamina += (this.P1.stamina - this.P1.displayStamina) * lerp;
        this.P2.displayStamina += (this.P2.stamina - this.P2.displayStamina) * lerp;
        this.P1.displayMagic += (this.P1.magic - this.P1.displayMagic) * lerp;
        this.P2.displayMagic += (this.P2.magic - this.P2.displayMagic) * lerp;
    }

    checkGameOver() {
        if (this.P1.health <= 0) {
            this.gameOver = true;
            this.winner = 'Player 2';
        } else if (this.P2.health <= 0) {
            this.gameOver = true;
            this.winner = 'Player 1';
        }
    }

    draw(context) {
        this.background.draw(context);
        this.P1.draw(context);
        this.P2.draw(context);
        this.dragon.draw(context);
        this.drawHUD(context);

        if (this.gameOver) {
            this.drawGameOver(context);
        }
    }

    drawHUD(context) {
        const barWidth = 300;
        const padding = 20;
        const p1X = padding;
        const p2X = this.width - barWidth - padding;

        // Player 1 - top left
        this.drawLabel(context, 'Player 1', p1X, padding - 5);
        this.drawBar(context, p1X, padding, barWidth, 25, this.P1.displayHealth, this.P1.maxHealth, '#4CAF50');
        this.drawBar(context, p1X, padding + 30, barWidth, 15, this.P1.displayStamina, this.P1.maxStamina, '#FFD700');
        this.drawBar(context, p1X, padding + 50, barWidth, 15, this.P1.displayMagic, this.P1.maxMagic, '#2196F3');

        // Player 2 - top right
        this.drawLabel(context, 'Player 2', p2X + barWidth - context.measureText('Player 2').width, padding - 5);
        this.drawBar(context, p2X, padding, barWidth, 25, this.P2.displayHealth, this.P2.maxHealth, '#f44336');
        this.drawBar(context, p2X, padding + 30, barWidth, 15, this.P2.displayStamina, this.P2.maxStamina, '#FFD700');
        this.drawBar(context, p2X, padding + 50, barWidth, 15, this.P2.displayMagic, this.P2.maxMagic, '#2196F3');
    }

    drawLabel(context, text, x, y) {
        context.font = 'bold 16px Arial';
        context.fillStyle = '#fff';
        context.strokeStyle = '#000';
        context.lineWidth = 3;
        context.strokeText(text, x, y);
        context.fillText(text, x, y);
    }

    drawBar(context, x, y, width, height, value, maxValue, color) {
        const percent = Math.max(0, value / maxValue);
        const radius = 4;

        context.fillStyle = '#333';
        context.beginPath();
        context.roundRect(x, y, width, height, radius);
        context.fill();

        if (percent > 0) {
            context.fillStyle = color;
            context.beginPath();
            context.roundRect(x, y, width * percent, height, radius);
            context.fill();
        }

        context.strokeStyle = '#fff';
        context.lineWidth = 1.5;
        context.beginPath();
        context.roundRect(x, y, width, height, radius);
        context.stroke();
    }

    drawGameOver(context) {
        // Dim overlay
        context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        context.fillRect(0, 0, this.width, this.height);

        // Winner text
        context.font = 'bold 64px Arial';
        context.fillStyle = '#fff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`${this.winner} Wins!`, this.width / 2, this.height / 2 - 50);

        // Restart button
        const btnWidth = 200;
        const btnHeight = 50;
        const btnX = this.width / 2 - btnWidth / 2;
        const btnY = this.height / 2 + 30;

        context.fillStyle = '#4CAF50';
        context.beginPath();
        context.roundRect(btnX, btnY, btnWidth, btnHeight, 8);
        context.fill();

        context.font = 'bold 24px Arial';
        context.fillStyle = '#fff';
        context.fillText('Restart', this.width / 2, btnY + btnHeight / 2);

        // Store button bounds for click detection
        this.restartBtn = { x: btnX, y: btnY, width: btnWidth, height: btnHeight };

        // Reset text alignment
        context.textAlign = 'start';
        context.textBaseline = 'alphabetic';
    }

    restart() {
        this.P1 = new Player(this);
        this.P2 = new Player2(this);
        this.dragon = new Enemy(this);
        this.inputP1 = new InputHandler(this.P1.keyBindings);
        this.inputP2 = new InputHandler(this.P2.keyBindings);
        this.gameOver = false;
        this.winner = null;
    }
}

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 500;

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    canvas.addEventListener('click', (e) => {
        if (!game.gameOver || !game.restartBtn) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        const btn = game.restartBtn;
        if (clickX >= btn.x && clickX <= btn.x + btn.width &&
            clickY >= btn.y && clickY <= btn.y + btn.height) {
            game.restart();
        }
    });

    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
});
