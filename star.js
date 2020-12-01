const starImage = new Image();
starImage.src = './images/IronhackCanvasGame_star.png';

class Star extends Item {
    constructor(x, y, dx, dy = 0) {
        super(x, y, dx, (dy = 0));
        this.color = 'white';
        this.width = 10;
        this.height = 10;
    }

    runLogic() {
        if (Math.random() < 0.01) {
            this.dy += 0.25;
        }
        if (Math.random() < 0.01) {
            this.dy -= 0.25;
        }
        this.x -= this.dx;
        this.y += this.dy;
    }

    interactionDetection(player) {
        return super.interactionDetection(player);
    }

    draw() {
        // game.ctx.fillStyle = this.color;
        // game.ctx.beginPath();
        // game.ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        // game.ctx.closePath();
        // game.ctx.fill();
        game.ctx.drawImage(starImage, this.x, this.y, this.width, this.height);
    }
}