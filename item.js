//Muffin,Pillow,Star,Fern

class Item {
    constructor(x, y, dx, dy = 0) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.width;
        this.height;
        this.color;
    }

    runLogic() {
        this.x -= this.dx;
        this.y += this.dy;
    }

    interactionDetection(player) {
        if (
            this.x + this.width < player.x + player.width &&
            this.x > player.x &&
            this.y + this.height < player.y + player.height &&
            this.y > player.y
        ) {
            return true;
        } else {
            return false;
        }
    }

    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}