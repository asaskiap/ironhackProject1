const lastBossImg = new Image();
lastBossImg.src = './images/lastBoss.png';

class Octopus extends Item {
    constructor(x, y, dx, dy) {
        super(x, y, dx, dy);
        this.color = 'coral';
        this.width = 300;
        this.height = 300;
        this.life = 100;
    }

    hit() {
        this.life -= 5;
        console.log('hit' + this.life);
    }

    interactionDetection() {
        if (this.y < 0 || this.y + this.height > game.canvas.height) {
            this.dy *= -1;
        }
    }

    runLogic() {
        this.interactionDetection();
        this.y += this.dy;
    }
    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
        //game.ctx.drawImage(lastBossImg, this.x, this.y, this.width, this.height);
    }
}