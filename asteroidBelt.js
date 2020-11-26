class AsteroidBelt {
    constructor(width, height, active) {
        this.width = width - 500;
        this.height = height;
        this.active = active;

        this.asteroids = [];
        this.createAsteroids();
    }

    createAsteroids() {
        for (let i = 0; i < 50; i++) {
            this.asteroids.push(
                new Asteroid(
                    8,
                    Math.random() * this.width + 250,
                    Math.random() * this.height
                )
            );
        }
    }

    runLogic(player) {
        //collision detection
        for (let asteroid of this.asteroids) {
            if (asteroid.x > this.width + 500) {
                asteroid.dx = asteroid.dx * -1;
            }
            if (asteroid.x < 0) {
                asteroid.dx *= -1;
            }
            if (asteroid.y > this.height || asteroid.y < 0) {
                asteroid.dy *= -1;
            }
        }

        // interaction logic
        for (let asteroid of this.asteroids) {
            if (asteroid.interactionDetection(player)) {
                asteroid.dx *= -1;
                asteroid.dy *= -1;
                game.player.energy -= 10;
            }
        }

        //move
        for (let asteroid of this.asteroids) {
            asteroid.runLogic();
        }
    }

    draw() {
        for (let asteroid of this.asteroids) {
            asteroid.draw();
        }
    }
}

class Asteroid {
    constructor(rad, x, y) {
        this.rad = Math.random() * rad + 5;
        this.x = x;
        this.y = y;
        this.dx = Math.random() * -1 + Math.random() * 2;
        this.dy = Math.random() * -1 + Math.random() * 2;
    }

    // interaction detection
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

    runLogic() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        game.ctx.fillStyle = '#82c7d1';
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        game.ctx.closePath();
        game.ctx.fill();
    }
}