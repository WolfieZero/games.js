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

    /**
     * Animate the stage.
     *
     * @param {Callback} callback
     */
    animate(callback) {
        window.requestAnimationFrame(callback);
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

            this.player1 = new Paddle(
                context,
                this.config.paddle.width,
                this.config.paddle.height,
                20,
                (this.config.stage.height - this.config.paddle.height) / 2
            );

            this.player2 = new Paddle(
                context,
                this.config.paddle.width,
                this.config.paddle.height,
                this.config.stage.width - 20,
                (this.config.stage.height - this.config.paddle.height) / 2
            );

            const step = () => {
                this.render();
                this.animate(step);
                this.ball.move();
            }
            this.animate(step);
            this.player1.control();

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
                resolve(context);
            }
            catch(error) {
                reject('Cannot create stage: ' + error);
            }
        });
    }

    render() {
        this.context.fillStyle = this.config.stage.color;
        this.context.fillRect(0, 0, this.config.stage.width, this.config.stage.height);
        this.player1.render();
        this.player2.render();
        this.ball.render();
    }

}


class Ball {

    constructor(context, size, x, y, speed = 1, maxSpeed = 3, color = '#efefef') {
        this.color = color;
        this.context = context;
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseSpeed = speed;
        this.speedX = speed
        this.speedY = speed
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    changeDirectionX() {
        this.speedX = (this.speedX - (this.speedX*2)) * this.baseSpeed;
    }

    changeDirectionY() {
        this.speedY = (this.speedY - (this.speedY*2)) * this.baseSpeed;
    }

    physics() {
        if (this.x > this.context.canvas.width || this.x < 0) {
            this.changeDirectionX();
        }
        if (this.y > this.context.canvas.height || this.y < 0) {
            this.changeDirectionY();
        }
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
        this.physics();
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
        console.log(this.context);
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

        if (this.y < 0) {
            this.y = 0;
        } else if (this.y >= this.context.canvas.height - this.height) {
            this.y = this.context.canvas.height - this.height;
        }
    }

    control() {
        let key = null;
        const moveSpeed = 10;
        window.addEventListener('keydown', event => {
            key = event.keyCode;
            switch(key) {
                case 38:
                    this.move(-moveSpeed);
                    break;
                case 40:
                    this.move(moveSpeed);
                    break;
                default:
                    this.move(0);
            }
        });
    }

}


window.onload = () => {
    const pong = new Pong;
    window.pong = pong;
    pong.init();
}
