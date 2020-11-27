class BulletStar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 20;
        this.color = 'white';
    }

    interactionDetection(enemy) {
        if (
            this.x >= enemy.x &&
            this.y >= enemy.y &&
            this.y <= enemy.y + enemy.height
        ) {
            return true;
        } else {
            return false;
        }
    }
    runLogic() {
        this.x += this.dx;
    }

    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        game.ctx.closePath();
        game.ctx.fill();
    }
}