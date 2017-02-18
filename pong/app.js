class Pong {

    constructor() {
        this.context = null;
        this.config = {
            stage: {
                width: 480,
                height: 320,
                color: '#222222',
            },
            paddle: {
                width: 5,
                height: 80,
                color: '#efefef',
            },
            ball: {
                size: 10
            }
        }
    }

    init() {
        this.createStage(this.config.stage.width, this.config.stage.height).then(context => {

            const ball = new Ball(
                context,
                5,
                this.config.stage.width / 2,
                this.config.stage.height / 2
            ).draw();

            const player = new Paddle(
                context,
                this.config.paddle.width,
                this.config.paddle.height,
                20,
                (this.config.stage.height - this.config.paddle.height) / 2,
            ).draw();

            const ai = new Paddle(
                context,
                this.config.paddle.width,
                this.config.paddle.height,
                this.config.stage.width - 20,
                (this.config.stage.height - this.config.paddle.height) / 2,
            ).draw();

        });
    }

    createStage(width, height) {
        return new Promise((resolve, reject) => {
            try {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                document.body.appendChild(canvas);
                canvas.id = 'pong';
                canvas.width = width;
                canvas.height = height;
                context.fillStyle = this.config.stage.color;
                context.fillRect(0, 0, width, height);
                resolve(context);
            }
            catch(error) {
                reject('Cannot create stage: ' + error);
            }
        });
    }

}


class Ball {

    constructor(context, size, x, y, color = '#efefef') {
        this.color = color;
        this.context = context;
        this.xPosition = x;
        this.yPosition = y;
        this.size = size;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(
            this.xPosition,
            this.yPosition,
            this.size,
            2 * Math.PI,
            false
        );
        this.context.fill();
    }

}


class Paddle {

    constructor(context, width, height, x, y, color = '#efefef') {
        this.color = color;
        this.context = context;
        this.height = height;
        this.width = width;
        this.xPosition = x;
        this.yPosition = y;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(
            this.xPosition,
            this.yPosition,
            this.width,
            this.height
        );
    }

}


window.onload = () => {
    const pong = new Pong;
    pong.init();
}
