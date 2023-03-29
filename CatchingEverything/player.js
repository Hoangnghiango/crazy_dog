import { Sitting, Running, Jumping, Falling,Rolling } from './playerState.js'
export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        //velocity y: van toc y
        this.vy = 0;
        this.weight = 0.8;
        this.image = document.getElementById("player");
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 30;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 3;
        this.maxSpeed = 10;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this),new Rolling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();

    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);

        //horizontal movement chuyển động hang ngang
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // vertical movement : chuyển động thẳng đứng
        // if (input.includes('ArrowUp') && this.onGround()) this.vy -= 30;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        // sprite animation
        if (this.frameTimer < this.frameInterval) {
            this.frameTimer += deltaTime;
        } else {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }
    }
    draw(context) {
        // context.fillStyle = 'red';
        // context.fillRect(this.x, this.y, this.width, this.height);
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                //collision detected
                enemy.markedForDeletion = true;
                var eating = document.getElementById("eating");
                eating.play();
                this.game.score++;

            } else {
                //no collision: 

            }

        });
    }
}