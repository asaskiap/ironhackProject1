class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
        this.setKeys();
        this.timectr = setInterval(() => {
            const clock = document.getElementById('clock');
            if (this.clock < 0) {
                //clock.innerHTML = `TOO LATE - GAME OVER !!`;
                this.active = false;
            } else {
                clock.innerHTML = `TIME TO DINNER ${this.clock}`;
            }

            this.clock--;
        }, 1000);
    }

    reset() {
        this.player = new Player(this, 50, 50, 80, 80);
        this.stars = [];
        this.ferns = [];
        this.pillows = [];
        this.muffins = [];
        this.sunbeams = [];
        this.spacefish = [];
        this.octopus = new Octopus(
            this.canvas.width - 150,
            this.canvas.height / 6,
            0,
            3
        );
        this.wormhole = undefined;
        this.initialSpeed = 1;
        this.i = 0;
        this.active = true;
        this.clock = 300;

        this.keys = [];
    }

    //////////////////////KEYS////////////////////////////////////////////
    setKeys() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    //this.player.y -= this.player.dy;
                    if (!this.keys.includes('ArrowUp')) {
                        this.keys.push('ArrowUp');
                        this.player.img = catBack;
                    }

                    break;
                case 'ArrowDown':
                    //this.player.y += this.player.dy;
                    if (!this.keys.includes('ArrowDown')) {
                        this.keys.push('ArrowDown');
                        this.player.img = catFrontal;
                    }
                    break;
                case 'ArrowRight':
                    if (this.player.sunbeamctr > 0) {
                        break;
                    }
                    // this.player.x += this.player.dx;
                    if (!this.keys.includes('ArrowRight')) {
                        this.keys.push('ArrowRight');
                        this.player.img = catRight;
                    }

                    break;
                case 'ArrowLeft':
                    // this.player.x -= this.player.dx;
                    if (!this.keys.includes('ArrowLeft')) {
                        this.keys.push('ArrowLeft');
                        this.player.img = catLeft;
                    }
                    break;
                case ' ':
                    //this.player.jump();
                    if (!this.keys.includes('Space')) {
                        this.keys.push('Space');
                    }
                    break;
                case 'y':
                    //this.player.shoot();
                    if (!this.keys.includes('y')) {
                        this.keys.push('y');
                    }
            }
        });

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.keys.splice(this.keys.indexOf('ArrowUp'), 1);
                    break;
                case 'ArrowDown':
                    this.keys.splice(this.keys.indexOf('ArrowDown'), 1);
                    break;
                case 'ArrowRight':
                    this.keys.splice(this.keys.indexOf('ArrowRight'), 1);
                    break;
                case 'ArrowLeft':
                    this.keys.splice(this.keys.indexOf('ArrowLeft'), 1);
                    break;
                case ' ':
                    this.keys.splice(this.keys.indexOf('Space'), 1);
                    break;
                case 'y':
                    this.keys.splice(this.keys.indexOf('y'), 1);
            }
        });
    }

    ///////////////////////CREATE////////////////////////////////////////////////////////////
    createStars() {
        if (Math.random() < 0.02 + this.i * 2) {
            const star = new Star(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed + 1
            );
            this.stars.push(star);
        }
    }

    createFerns() {
        if (Math.random() < 0.003 + this.i) {
            const fern = new Fern(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed
            );
            this.ferns.push(fern);
        }
    }

    createPillows() {
        if (Math.random() < 0.0015 + this.i) {
            const pillow = new Pillow(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed
            );
            this.pillows.push(pillow);
        }
    }

    createMuffins() {
        if (Math.random() < 0.001 + this.i) {
            const muffin = new Muffin(
                this.canvas.width,
                Math.random() * this.canvas.height,
                this.initialSpeed + 1
            );
            this.muffins.push(muffin);
        }
    }

    createSunbeam() {
        if (Math.random() < 0.0004) {
            const sun = new Sunbeam(200);
            this.sunbeams.push(sun);
        }
    }

    createSpacefish() {
        if (Math.random() < 0.0007) {
            const fish = new Spacefisch(
                this.canvas.width,
                Math.random() * this.canvas.height,
                2,
                2
            );
            this.spacefish.push(fish);
        }
    }

    createWormhole() {
        this.wormhole = new Wormhole(
            this.canvas.width - 100,
            this.canvas.height / 2
        );
    }

    ///////////////////////////CLEAN UP////////////////////////////////////////////////////

    cleanUp() {
        this.cleanUpItems(this.stars);
        this.cleanUpItems(this.ferns);
        this.cleanUpItems(this.muffins);
        this.cleanUpItems(this.pillows);
        this.cleanUpItems(this.sunbeams);
        for (let i = 0; i < this.spacefish.length; i++) {
            if (this.spacefish[i].x + this.spacefish[i].width < 0) {
                this.spacefish.splice(i, 1);
            }
        }
        for (let i = 0; i < this.player.bulletStars.length; i++) {
            if (this.player.bulletStars[i].x > this.canvas.width) {
                this.player.bulletStars.splice(i, 1);
            }
        }
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

    ///////////////// detect interactions ////////////////////////////////////////////
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
            for (let bullet of this.player.bulletStars) {
                if (bullet.interactionDetection(fern)) {
                    let idx = this.ferns.indexOf(fern);
                    let idxB = this.player.bulletStars.indexOf(bullet);
                    this.ferns.splice(idx, 1);
                    this.player.bulletStars.splice(idxB, 1);
                }
            }
        }

        // pillows
        for (let pillow of this.pillows) {
            if (pillow.interactionDetection(this.player)) {
                this.player.pillow();
                let idx = this.pillows.indexOf(pillow);
                this.pillows.splice(idx, 1);
            }
            for (let bullet of this.player.bulletStars) {
                if (bullet.interactionDetection(pillow)) {
                    let idx = this.pillows.indexOf(pillow);
                    let idxB = this.player.bulletStars.indexOf(bullet);
                    this.pillows.splice(idx, 1);
                    this.player.bulletStars.splice(idxB, 1);
                }
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

        // sunbeam
        for (let sun of this.sunbeams) {
            if (sun.x < this.player.x && sun.x + sun.width > this.player.x) {
                this.player.sunbeam();
            }
        }

        //spacefish
        for (let fish of this.spacefish) {
            if (fish.interactionDetection(this.player)) {
                this.player.collectFish();
                let idx = this.spacefish.indexOf(fish);
                this.spacefish.splice(idx, 1);
            }
        }

        // bullets with octopus

        if (this.octopus) {
            for (let bullet of this.player.bulletStars) {
                if (bullet.interactionDetection(this.octopus)) {
                    this.octopus.hit();
                    let idxB = this.player.bulletStars.indexOf(bullet);
                    this.player.bulletStars.splice(idxB, 1);
                }
            }
        }

        // wormhole

        if (this.wormhole) {
            if (this.wormhole.interactionDetection(this.player)) {
                console.log('YOU WON');
                const clock = document.getElementById('clock');

                clock.innerHTML = `YOU WON!!`;
            }
        }
    }

    ///////////////////////// SPEED //////////////////////////////////////////////

    speedUpdate(factor) {
        this.initialSpeed += 0.0001 * factor;
        this.i += 0.000001;
    }

    ////////////////////////////// LOGIC ///////////////////////////////////////////

    runLogic() {
        // keys
        if (this.keys.includes('ArrowUp')) {
            this.player.y -= this.player.dy;
        }
        if (this.keys.includes('ArrowDown')) {
            this.player.y += this.player.dy;
        }
        if (this.keys.includes('ArrowRight')) {
            this.player.x += this.player.dx;
        }
        if (this.keys.includes('ArrowLeft')) {
            this.player.x -= this.player.dx;
        }
        if (this.keys.includes('Space')) {
            this.player.jump();
            console.log('jump');
        }
        if (this.keys.includes('y')) {
            this.player.shoot();
        }
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

        // sunbeam logic
        this.createSunbeam();
        for (let sun of this.sunbeams) {
            sun.runLogic();
        }

        //spacefish logic
        this.createSpacefish();
        for (let fish of this.spacefish) {
            fish.runLogic();
        }
        //bullet logic
        for (let bullet of this.player.bulletStars) {
            bullet.runLogic();
        }

        //octopus logic

        if (this.octopus) {
            this.octopus.runLogic();
            if (this.octopus.life < 0) {
                this.octopus = undefined;
                this.createWormhole();
            }
        }

        // cleanUp
        this.cleanUp();

        this.interactionDetection();
        let factor = 1;
        this.speedUpdate(factor);
    }

    /////////////////////////////////// DRAW //////////////////////////////////////
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

        // draw sunbeams
        for (let sun of this.sunbeams) {
            sun.draw();
        }
        // spacefish
        for (let fish of this.spacefish) {
            fish.draw();
        }
        //bullets
        for (let bullet of this.player.bulletStars) {
            bullet.draw();
        }
        //octopus
        if (this.player.fish > 2) {
            if (this.octopus) {
                this.octopus.draw();
            }
        }

        if (this.wormhole) {
            this.wormhole.draw();
        }
    }

    ///////////////////////////////////// LOOP ////////////////////////////////////

    loop() {
        this.runLogic();
        this.draw();
        if (this.active) {
            window.requestAnimationFrame(() => {
                this.loop();
            });
        } else {
            playGame.style.display = 'none';
            gameOver.style.display = 'initial';
        }
    }
}