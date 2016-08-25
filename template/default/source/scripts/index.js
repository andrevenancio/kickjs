/* global dat, Stats */
class Application {

    constructor() {
        this.gui = new dat.GUI();

        this.stats = new Stats();
        document.body.appendChild(this.stats.domElement);

        this.update();
    }

    update() {
        requestAnimationFrame(this.update.bind(this));
        this.stats.begin();
        this.stats.end();
    }
}

window.app = new Application();
