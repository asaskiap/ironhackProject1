const wormholeImg = new Image();
wormholeImg.src = './images/wormhole.png';

class Wormhole extends Item {
    constructor(x, y) {
        super(x, y, 0, 0);
        this.color = 'teal';
        this.width = 100;
        this.height = 100;
    }

    interactionDetection(player) {
        if (
            player.x + player.width > this.x - this.width &&
            player.x < this.x + this.width &&
            player.y + player.height > this.y - this.height &&
            player.y < this.y + this.height
        ) {
            return true;
        } else return false;
    }

    draw() {
        // game.ctx.fillStyle = this.color;
        // game.ctx.beginPath();
        // game.ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        // game.ctx.closePath();
        // game.ctx.fill();
        game.ctx.drawImage(wormholeImg, this.x, this.y, this.width, this.height);
    }
}