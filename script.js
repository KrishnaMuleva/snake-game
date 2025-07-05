// script.js (Main controller)
import { setupInputListeners } from "./inputHandler.js";
import { saveScore } from "./scoreManager.js";
import { showGameOverUI, updateScoreDisplay } from "./ui.js";
import { drawFruit, drawSnake, resetCanvas } from "./gameLoop.js";

const playerName = localStorage.getItem("playerName");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = 50;
let dx = 0;
let dy = 0;
const size = 20;
const canvasWidth = 400;
const canvasHeight = 400;
let nFruits = 0;
let score = 0;
let direction = '';
let gameStarted = false;
let gameOver = false;
let snake = [{ x: 50, y: 50 }];
let fruit = getRandomPosition();

function getRandomPosition() {
    let position;
    let overlaps;
    do {
        position = {
            x: Math.floor(Math.random() * (canvasWidth / size)) * size,
            y: Math.floor(Math.random() * (canvasHeight / size)) * size
        };
        overlaps = snake.some(segment => segment.x === position.x && segment.y === position.y);
    } while (overlaps);
    return position;
}

function gameLoop() {
    if (gameOver) return;

    resetCanvas(ctx, canvasWidth, canvasHeight);
    drawFruit(ctx, fruit);

    x += dx;
    y += dy;
    score += Math.floor(nFruits / 10);

    snake.unshift({ x, y });

    if (
        x < fruit.x + 10 &&
        x + size > fruit.x &&
        y < fruit.y + 10 &&
        y + size > fruit.y
    ) {
        nFruits++;
        score += 100;
        fruit = getRandomPosition();
    } else {
        if (snake.length > nFruits + 1) {
            snake.pop();
        }
    }

    if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight || checkSelfCollision()) {
        saveScore(playerName, score);
        showGameOverUI();
        gameOver = true;
        return;
    }

    drawSnake(ctx, snake, size);
    updateScoreDisplay(score);

    let gameSpeed = Math.max(100 - nFruits, 50);
    setTimeout(gameLoop, gameSpeed);
}

function checkSelfCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false;
}

setupInputListeners({
    onStart: () => {
        if (!gameStarted) {
            gameStarted = true;
            gameLoop();
        }
    },
    onDirectionChange: (newDx, newDy, newDirection) => {
        dx = newDx;
        dy = newDy;
        direction = newDirection;
    },
    onEscape: () => window.location.href = "index.html"
});
