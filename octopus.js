const lastBossImg = new Image();
lastBossImg.src = './images/octopus.png';

class Octopus extends Item {
    constructor(x, y, dx, dy) {
        super(x, y, dx, dy);
        this.color = 'coral';
        this.width = 400;
        this.height = 300;
        this.life = 200;
        this.bullets = [];
    }

    shoot() {
        this.bullets.push(
            new OctopusBullet(this.x + this.width / 2, this.y + this.height / 3)
        );
        console.log('shoot');
    }

    hit() {
        this.life -= 5;
    }

    interactionDetection() {
        if (this.y < 0 || this.y + this.height > game.canvas.height) {
            this.dy *= -1;
        }
    }
    cleanUp() {
        for (let bullet of this.bullets) {
            if (bullet.x < 0) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            }
        }
    }

    runLogic() {
        this.interactionDetection();
        if (Math.random() < 0.03) {
            this.shoot();
        }
        for (let bullet of this.bullets) {
            bullet.runLogic();
        }
        this.cleanUp();
        this.y += this.dy;
    }
    draw() {
        // game.ctx.fillStyle = this.color;
        // game.ctx.fillRect(this.x, this.y, this.width, this.height);
        game.ctx.drawImage(lastBossImg, this.x, this.y, this.width, this.height);
    }
}

class OctopusBullet extends Item {
    constructor(x, y, dx = 10, dy = 0) {
        super(x, y, dx, (dy = 0));

        this.color = 'aqua';
        this.width = 5;
        this.height = 5;
    }

    runLogic() {
        this.x -= this.dx;
    }

    interactionDetection(player) {
        return super.interactionDetection(player);
    }
    draw() {
        console.log('drawing bullet');
        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}