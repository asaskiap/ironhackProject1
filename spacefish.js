const fishImage = new Image();
fishImage.src = './images/IronhackCanvasGame_fish.png';

class Spacefisch extends Item {
    constructor(x, y, dx, dy) {
        super(x, y, (dx = Math.random() * 3), (dy = Math.random() * 6 - 4));
        this.color = '#00FFFF';
        this.width = 30;
        this.height = 30;
        this.changeDirectionCtr = Math.random() * 200;
    }

    randomlyChangeDirection() {
        this.changeDirectionCtr--;
        if (this.changeDirectionCtr < 0) {
            const rand = Math.random();
            if (rand < 0.4) {
                this.dx *= -1;
            }
            this.changeDirectionCtr += Math.random() * 200;
        }
    }
    bounceOffWalls() {
        // bounce off three walls
        if (this.x > game.canvas.width) {
            this.dx = this.dx * -1;
        }
        if (this.y > game.canvas.height) {
            this.dy = this.dy * -1;
        }
        if (this.y < 0) {
            this.dy = this.dy * -1;
        }
    }
    runLogic() {
        super.runLogic();
        this.bounceOffWalls();
        this.randomlyChangeDirection();
    }

    interactionDetection(player) {
        return super.interactionDetection(player);
    }

    draw() {
        // game.ctx.fillStyle = this.color;
        // game.ctx.fillRect(this.x, this.y, this.width, this.height);
        game.ctx.drawImage(fishImage, this.x, this.y, this.width, this.height);
    }
}