import React, { Component } from 'react';
import './pong.css'

let ballCenterX = window.innerWidth/2;
let ballCenterY = window.innerHeight/2;

class Pong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            WindowHeight: window.innerHeight,
            WindowWidth: window.innerWidth,

            leftPaddle_x: 5/window.innerWidth,
            leftPaddle_y: 0,
            leftPaddle_height: 100,
            leftPaddle_width: 15,
            rightPaddle_x: window.innerWidth-((5/window.innerWidth)+15),
            rightPaddle_y: 10,
            rightPaddle_height: 100,
            rightPaddle_width: 15,
            ball_cx: ballCenterX,
            ball_cy: ballCenterY,
            ball_r: 10,

            ballDirectionX: 2.0,
            ballDirectionY: 3.0,
            baseBallSpeed: 4.0,
            ballSpeed: 4.0,

            rightPaddleEnabled: false,
            leftPaddleEnabled: true,

            lag: 0.0,
            lagSwitch: false,

            computerLevel: 2,
            isBallActive: true
        }
    }
    //------------------------------------------------


    //---GameRun---------------------------------------
    gameLoop = () => {
        this.movePaddle();
        this.moveBall();
        this.checkYBoundaries(this.state.ball_r, this.state.ball_cy);
        this.checkXBoundaries(this.state.ball_r, this.state.ball_cx);
        this.checkrightPaddleCollision();
        this.checkleftPaddleCollision();
    }

    componentDidMount() {
        setInterval(this.gameLoop, (1000 / 30));
    }
    clamp(num, min, max) {
        return num <= min ? min : num >= max ? max : num;
    }

    checkYBoundaries(ball_radius, ballPositionY) {
        const { ball_cy, ballDirectionY } = this.state;
        if (ball_radius + 2 + ballPositionY > this.state.WindowHeight) {
            console.log("bounce1");
            this.setState({
                ball_cy: ball_cy - 10,
                ballDirectionY: ballDirectionY * -1
            });
        }
        if (ballPositionY - (ball_radius + 2) < 0) {
            console.log("bounce2");
            this.setState({
                ball_cy: ball_cy + 10,
                ballDirectionY: ballDirectionY * -1
            });
        }
    }

    checkXBoundaries(ball_radius, ballPositionX) {
        if (ball_radius + ballPositionX > this.state.WindowWidth+15 || ballPositionX - ball_radius < 0) {
            this.setState({
                rightPaddleEnabled: false,
                leftPaddleEnabled: true
            });
            this.resetBall();
        }
    }


    resetBall() {
        const { baseBallSpeed, ballDirectionX } = this.state;
            this.setState({
                ball_cx: ballCenterX,
                ball_cy: ballCenterY,
                ballDirectionX: (Math.floor(Math.random() * 3) + 2) * -1,
                ballDirectionY: Math.floor(Math.random() * 3) + 2,
                ballSpeed: baseBallSpeed,
                lagSwitch: false
            });
    }

    //Consider Replacing with two buttons by AI opponent
    movePaddle() {
        this.executeLeftAI();
        this.executeRightAI();
    }

    executeLeftAI() {
        const { lag, leftPaddle_y, ball_cy } = this.state;
        if (this.state.leftPaddleEnabled) {
            this.setState({ 
                leftPaddle_y: leftPaddle_y + this.moveTowardBall(ball_cy-(leftPaddle_y/4), leftPaddle_y, 7)
            });
        }
    }

    executeRightAI() {
        const { lag, ball_cy, rightPaddle_y } = this.state;

        if (this.state.rightPaddleEnabled) {          
            this.setState({ 
                rightPaddle_y: rightPaddle_y + this.moveTowardBall(ball_cy-(rightPaddle_y/4), rightPaddle_y, 7)
            });
        }
        
    }

    moveTowardBall(ballPosition, paddlePosition, paddleSpeed) {
        if(ballPosition > paddlePosition) 
            return paddleSpeed;
        else if(ballPosition < paddlePosition) 
            return (paddleSpeed*-1);
        else 
            return 0;
    }

    ballPositionForPaddle() {
        const { lag, ball_cy } = this.state;
        return this.clamp(ball_cy - lag, 32, 268) - 32
    }

    moveBall() {
        const { ball_cx, ball_cy, ballDirectionX, ballDirectionY, ballSpeed } = this.state;
        if (this.state.isBallActive) {
            this.setState({
                ball_cx: ball_cx + (ballDirectionX * ballSpeed),
                ball_cy: ball_cy + (ballDirectionY * ballSpeed)
            });
        }
    }

    checkrightPaddleCollision() {
        const { ball_cx, ballDirectionX, ballSpeed } = this.state;
        if (this.state.ball_cy - this.state.ball_r < this.state.rightPaddle_y + this.state.rightPaddle_height && this.state.ball_cy + this.state.ball_r > this.state.rightPaddle_y && this.state.ball_cx + this.state.ball_r > this.state.rightPaddle_x) {
            console.log("Right Paddle Detected Collsiion");
            this.setState({
                ball_cx: ball_cx - 10,
                ballDirectionX: ballDirectionX * -1,
                ballSpeed: ballSpeed + .1,
                leftPaddleEnabled: true,
                rightPaddleEnabled: false
            });
        }
    }

    checkleftPaddleCollision() {
        const { ball_cx, ballDirectionX, ballSpeed } = this.state;
        if (this.state.ball_cy - this.state.ball_r < this.state.leftPaddle_y + this.state.leftPaddle_height && this.state.ball_r + this.state.ball_cy > this.state.leftPaddle_y && this.state.ball_cx - this.state.ball_r < this.state.leftPaddle_x + this.state.leftPaddle_width) {
            console.log("Left Paddle Detected Collsiion");
            this.setState({
                ball_cx: ball_cx + 10,
                ballDirectionX: ballDirectionX * -1,
                ballSpeed: ballSpeed + .1,
                leftPaddleEnabled: false,
                rightPaddleEnabled: true
            });
        }

    }

    render() {
        return (
            <svg className="pongEntities">
                <rect id="leftPaddle" className="game paddle in-play" x={this.state.leftPaddle_x} y={this.state.leftPaddle_y} width={this.state.leftPaddle_width} height={this.state.leftPaddle_height} />
                <rect id="rightPaddle" className="game paddle in-play" x={this.state.rightPaddle_x} y={this.state.rightPaddle_y} width={this.state.rightPaddle_width} height={this.state.rightPaddle_height} />
                <circle id="ball" className="game in-play" cx={this.state.ball_cx} cy={this.state.ball_cy} r={this.state.ball_r} />
            </svg>
        );


    }
}
export default Pong;


