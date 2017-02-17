class Pong {

    constructor() {
        this.context = null;
        this.createCanvas();
       // this.createPaddle();
    }

    createCanvas(width = 480, height = 320) {
        console.log('create canvas');
        const canvas = document.createElement('canvas');
        canvas.id = 'pong';
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);
        this.context = canvas.getContext('2d');
        this.context.fillStyle = "#222222";
        this.context.fillRect(25, 25, 100, 100);
    }

    createPaddle() {
        if (this.context !== null) {
            console.log('create paddle');
            this.context.beginPath();
            this.context.fillRect(25, 25, 100, 100);
        }
    }

}


window.onload = new Pong;
