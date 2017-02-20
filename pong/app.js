class Pong {

    constructor() {
        this.context = null;
        this.config = {
            game: {
                fps: 60
            },
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

    animate(callback) {
        window.setTimeout(callback, 1000/this.config.game.fps)
    }

    init() {
        this.createStage(this.config.stage.width, this.config.stage.height).then(context => {

            this.context = context;

            this.ball = new Ball(
                context,
                5,
                this.config.stage.width / 2,
                this.config.stage.height / 2
            );

            this.player = new Paddle(
                context,
                this.config.paddle.width,
                this.config.paddle.height,
                20,
                (this.config.stage.height - this.config.paddle.height) / 2,
            );

            this.ai = new Paddle(
                context,
                this.config.paddle.width,
                this.config.paddle.height,
                this.config.stage.width - 20,
                (this.config.stage.height - this.config.paddle.height) / 2,
            );

            const step = () => {
                this.render();
                this.animate(step);
            }
            this.animate(step);
            this.player.control();

        });
    }

    render() {
        this.context.fillStyle = this.config.stage.color;
        this.context.fillRect(0, 0, this.config.stage.width, this.config.stage.height);
        this.ai.render();
        this.ball.render();
        this.player.render();
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
        this.x = x;
        this.y = y;
        this.size = size;
    }

    render() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(
            this.x,
            this.y,
            this.size,
            2 * Math.PI,
            false
        );
        this.context.fill();
    }

    move() {
        this.x += 1;
    }

}


class Paddle {

    constructor(context, width, height, x, y, color = '#efefef') {

        this.x = x;
        this.y = y;

        this.height = height;
        this.width = width;

        this.color = color;
        this.context = context;
    }

    render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    move(y) {
        this.y += y;
    }

    control() {
        let key = null;
        window.addEventListener('keydown', event => {
            key = event.keyCode;
            switch(key) {
                case 38:
                    this.move(-10);
                    break;
                case 40:
                    this.move(10);
                    break;
                default:
                    this.move(0);
            }
        });
    }

}


window.onload = () => {
    const pong = new Pong;
    pong.init();
}
