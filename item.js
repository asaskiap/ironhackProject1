//Muffin,Pillow,Star,Fern

class Item {
    constructor(x, y, dx, dy = 0) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color;
    }

    runLogic() {
        this.x -= this.dx;
        this.y += this.dy;
    }

    interactionDetection(player) {
        if (
            this.x < player.x + player.width &&
            this.x > player.x &&
            this.y < player.y + player.height &&
            this.y > player.y
        ) {
            return true;
        } else {
            return false;
        }
    }

    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(this.x, this.y, 10, 10);
    }
}