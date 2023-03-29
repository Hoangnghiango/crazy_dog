export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 50;
        this.fontFamily = 'Creepster';

    }
    draw(context) {
        context.font = this.fontSize + "px  " + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('SCORE: ' + this.game.score, 40, 50);
        //time
        context.font = this.fontSize + " px" + this.fontFamily;
        context.fillText('TIME: ' + this.game.time, 40, 90);

        //Game Over Message
        if (this.game.gameOver) {
            context.textAlign = 'center'
            context.font = this.fontSize + " px" + this.fontFamily;
            context.fillText('GAME OVER ', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.fillText(' Best Luck Next Time !!! ', this.game.width * 0.5, this.game.height * 0.5 + 30);
            var endGame = document.getElementById("endgame");
            endGame.play();
            
        }
        //Win Message
        if (this.game.win) {
            context.textAlign = 'center'
            context.font = this.fontSize + " px" + this.fontFamily;
            context.fillText('Congratulation!!', this.game.width * 0.5, this.game.height * 0.5);
            context.fillText(' You win - Wolf Wolf Wolf ', this.game.width * 0.5, this.game.height * 0.5 + 50);
            var winGame = document.getElementById("win_game");
            winGame.play();
        }


    }
}