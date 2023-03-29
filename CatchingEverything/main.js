import { Player } from './player.js'
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js'

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 1;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this)
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.time = 2023;
            this.minTime = 0;
            this.gameOver = false;
            this.win = false;
            this.fontColor = 'black';
           

        }
        update(deltaTime) {
            this.time--;
            if (this.time <= this.minTime) {
                this.gameOver = true;
            }
            if (this.time > this.minTime && this.score == 20) {
                this.win = true;

            }

            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handler Enemy
            if (this.enemyTimer < this.enemyInterval) {
                this.enemyTimer += deltaTime;

            } else {
                this.addEnemy();
                this.enemyTimer = 0;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);

                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
            })
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.UI.draw(context);

        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.3) this.enemies.push(new GroundEnemy(this));

            this.enemies.push(new FlyingEnemy(this));
            console.log(this.enemies);
        }
    }
    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver && !game.win) requestAnimationFrame(animate);

    }
    animate();
})