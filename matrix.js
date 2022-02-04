import * as constants from "./constants.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let cw = window.innerWidth
let ch = window.innerHeight

canvas.width = cw;
canvas.height = ch;

let fallingCharArr = [];
let maxColumns = cw / constants.fontSize;
let frames = 0;

window.addEventListener('resize', function(event) {
    cw = window.innerWidth
    ch = window.innerHeight
    canvas.width = cw;
    canvas.height = ch;
    maxColumns = cw / constants.fontSize;
    console.log("Resizing screen", cw, ch)
}, true);


class FallingChar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        this.value = constants.charArr[getRandomIndexOfArray(constants.charArr.length)].toUpperCase();
        this.speed = (Math.random() * constants.fontSize * 3) / 4 + (constants.fontSize * 3) / 4;

        ctx.fillStyle = "rgba(0,255,0)";
        ctx.font = constants.fontSize + "px sans-serif"
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {
            this.y = (Math.random() * ch) / 2 - 50;
            this.x = Math.floor(Math.random() * maxColumns) * constants.fontSize;
            this.speed = (-Math.random() * constants.fontSize * 3) / 4 + (constants.fontSize * 3) / 4;
        }
    }
}

let getRandomIndexOfArray = (arrayLength) => {
    return Math.floor(Math.random() * (arrayLength - 1));
}


let update = () => {
    if (fallingCharArr.length < constants.maxCharCount) {
        let fallingChar = new FallingChar(Math.floor(Math.random() * maxColumns) * constants.fontSize, (Math.random() * ch) / 2 - 50);
        fallingCharArr.push(fallingChar);
    }

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, cw, ch);
    for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
        fallingCharArr[i].draw(ctx);
    }

    requestAnimationFrame(update);
    frames++;
}

update();