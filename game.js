class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player = new Player(this, 50, 50, 20, 20);
        this.setKeys();
        this.stars = [];
        this.ferns = [];
        this.pillows = [];
        this.muffins = [];
        this.sunbeams = [];
        this.sunglasses = [];

        this.initialSpeed = 2;
        this.clock = 300;
        this.i = 0;
        this.timectr = setInterval(() => {
            const clock = document.getElementById('clock');
            if (this.clock < 0) {
                clock.innerHTML = `TOO LATE - GAME OVER !!`;
            } else {
                clock.innerHTML = `TIME TO DINNER ${this.clock}`;
            }

            this.clock--;
        }, 1000);
    }

    setKeys() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.player.y -= this.player.dy;
                    break;
                case 'ArrowDown':
                    this.player.y += this.player.dy;
                    break;
                case 'ArrowRight':
                    if (this.player.sunbeamctr > 0) {
                        break;
                    }
                    this.player.x += this.player.dx;
                    this.player.distanceToHome -= this.player.dx;
                    break;
                case 'ArrowLeft':
                    this.player.x -= this.player.dx;
                    break;
            }
        });
    }

    createStars() {
        if (Math.random() < 0.03 + this.i * 2) {
            const star = new Star(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed + 1
            );
            this.stars.push(star);
        }
    }

    createFerns() {
        if (Math.random() < 0.01 + this.i) {
            const fern = new Fern(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed
            );
            this.ferns.push(fern);
        }
    }

    createPillows() {
        if (Math.random() < 0.005 + this.i) {
            const pillow = new Pillow(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed
            );
            this.pillows.push(pillow);
        }
    }

    createMuffins() {
        if (Math.random() < 0.003 + this.i) {
            const muffin = new Muffin(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed + 1
            );
            this.muffins.push(muffin);
        }
    }

    createSunbeam() {
        if (Math.random() < 0.0002) {
            const sun = new Sunbeam(200);
            this.sunbeams.push(sun);
        }
    }

    createSunglasses() {
        if (Math.random() < 0.002 + this.i) {
            const glass = new Sunglasses(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed + 2
            );
            this.sunglasses.push(glass);
        }
    }

    cleanUp() {
        this.cleanUpItems(this.stars);
        this.cleanUpItems(this.ferns);
        this.cleanUpItems(this.muffins);
        this.cleanUpItems(this.pillows);
        this.cleanUpItems(this.sunglasses);
        this.cleanUpItems(this.sunbeams);
    }

    cleanUpItems(item) {
        for (let i = 0; i < item.length; i++) {
            if (
                item[i].x + item[i].width < 0 ||
                item[i].y > this.canvas.height ||
                item[i].y < 0
            ) {
                item.splice(i, 1);
            }
        }
    }

    // detect interactions
    interactionDetection() {
        // stars
        for (let star of this.stars) {
            if (star.interactionDetection(this.player)) {
                let idx = this.stars.indexOf(star);
                this.stars.splice(idx, 1);
                this.player.collectStars();
            }
        }

        // ferns
        for (let fern of this.ferns) {
            if (fern.interactionDetection(this.player)) {
                let idx = this.ferns.indexOf(fern);
                this.ferns.splice(idx, 1);
                this.player.fern();
            }
        }

        // pillows
        for (let pillow of this.pillows) {
            if (pillow.interactionDetection(this.player)) {
                this.player.pillow();
                let idx = this.pillows.indexOf(pillow);
                this.pillows.splice(idx, 1);
            }
        }

        // muffins
        for (let muffin of this.muffins) {
            if (muffin.interactionDetection(this.player)) {
                this.player.collectMuffins();
                let idx = this.muffins.indexOf(muffin);
                this.muffins.splice(idx, 1);
            }
        }

        // sunglasses
        for (let glass of this.sunglasses) {
            if (glass.interactionDetection(this.player)) {
                this.player.sunglasses++;
                let idx = this.sunglasses.indexOf(glass);
                this.sunglasses.splice(idx, 1);
            }
        }

        // sunbeam
        for (let sun of this.sunbeams) {
            if (sun.x < this.player.x && sun.x + sun.width > this.player.x) {
                this.player.sunbeam();
            }
        }
    }

    speedUpdate(factor) {
        this.initialSpeed += 0.0001 * factor;
        this.i += 0.000001;
    }

    runLogic() {
        // player logic
        this.player.runLogic();

        // star logic
        this.createStars();
        for (let star of this.stars) {
            star.runLogic();
        }
        //fern logic
        this.createFerns();
        for (let fern of this.ferns) {
            fern.runLogic();
        }

        // pillow logic
        this.createPillows();
        for (let pillow of this.pillows) {
            pillow.runLogic();
        }

        // muffin logic
        this.createMuffins();
        for (let muffin of this.muffins) {
            muffin.runLogic();
        }

        //sunglasses logic
        this.createSunglasses();
        for (let glass of this.sunglasses) {
            glass.runLogic();
        }

        // sunbeam logic
        this.createSunbeam();
        for (let sun of this.sunbeams) {
            sun.runLogic();
        }

        // cleanUp
        this.cleanUp();

        this.interactionDetection();
        let factor = 1;
        // if (this.player.x === this.canvas.width) {
        //     factor = 2;
        // }
        this.speedUpdate(factor);
    }

    draw() {
        // clear
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draw player
        this.player.draw();
        // draw stars
        for (let star of this.stars) {
            star.draw();
        }
        //draw ferns
        for (let fern of this.ferns) {
            fern.draw();
        }
        // draw pillows
        for (let pillow of this.pillows) {
            pillow.draw();
        }
        // draw muffins
        for (let muffin of this.muffins) {
            muffin.draw();
        }
        // draw sunglasses
        for (let glass of this.sunglasses) {
            glass.draw();
        }
        // draw sunbeams
        for (let sun of this.sunbeams) {
            sun.draw();
        }

        //display distance
        const dist = document.getElementById('distance');
        if (this.player.distanceToHome < 0) {
            dist.innerHTML = `YOU WON`;
        } else {
            dist.innerHTML = `Distance to home: ${Math.floor(
        this.player.distanceToHome
      )}`;
        }
    }

    loop() {
        this.runLogic();
        this.draw();

        window.requestAnimationFrame(() => {
            this.loop();
        });
    }
}