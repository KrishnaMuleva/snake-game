document.addEventListener("keydown",function(event){
    if(event.key == "Escape"){
        window.location.href="index.html";
    }
})

function restartGame(){
    window.location.href="game.html";
}

const playerName = localStorage.getItem("playerName");

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0,0,400,400);

ctx.fillStyle = "green";
ctx.fillRect(50,50,20,20);

let x = 50;
let y = 50;
let dx = 0;
let dy = 0;
let size = 20;
let canvasWidth = 400;
let canvasHeight = 400;
let nFruits = 0;
let score = 0;
let direction = '';
let gameStarted = false;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

document.addEventListener("keydown",function(event){

    if(!gameStarted && ["ArrowUp","ArrowDown","ArrowRight","ArrowLeft"].includes(event.key)){
        gameInterval = setInterval(gameLoop,100);
        gameStarted = true;
    }

    if(event.key == "ArrowRight" && direction != 'left'){
        dx = 10;
        dy = 0;
        direction = 'right';
    }
    else if(event.key == "ArrowLeft" && direction != 'right'){
        dx = -10;
        dy = 0;
        direction = 'left';
    }
    else if(event.key == "ArrowUp" && direction != 'down'){
        dx = 0;
        dy = -10;
        direction = 'up'
    }
    else if(event.key == "ArrowDown" && direction != 'up'){
        dx = 0;
        dy = 10;
        direction = 'down';
    }
})

let snake = [{x:50,y:50}]

function getRandomPosition(){
    let position;
    let overlaps;
    do{
        position = {
            x : Math.floor(Math.random()*(canvasWidth/size))*size,
            y : Math.floor(Math.random()*(canvasHeight/size))*size
        };
        overlaps = snake.some(segment => segment.x === position.x && segment.y === position.y);
    }while(overlaps);
    return position;
}

let fruit = getRandomPosition();

function gameLoop(){

    ctx.clearRect(0,0,canvasWidth,canvasHeight)

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);


    ctx.fillStyle = "red";
    ctx.fillRect(fruit.x,fruit.y,10,10);

    x += dx;
    y += dy;

    score += Math.floor(nFruits/10);

    snake.unshift({x,y});
    if( x < fruit.x + 10 &&
        x + size > fruit.x &&
        y < fruit.y + 10 &&
        y + size > fruit.y){
            nFruits++;
            score += 100;
            fruit = getRandomPosition();
    }else{
        if(snake.length > nFruits+1){
            snake.pop();
        }
    }

    if(x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight){

        
        const newEntry = {name : playerName, score : score};

        highScores.push(newEntry);
        highScores.sort((a,b) => b.score - a.score);
        highScores.splice(10);

        localStorage.setItem("highScores",JSON.stringify(highScores));

        document.getElementById("gameOver").style.display="block";
        document.getElementById("retryButton").style.display = "inline-block";
        clearInterval(gameInterval);
        return;
    }

    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){

            
            const newEntry = {name : playerName, score : score};

            highScores.push(newEntry);
            highScores.sort((a,b) => b.score - a.score);
            highScores.splice(10);

            localStorage.setItem("highScores",JSON.stringify(highScores));

            document.getElementById("gameOver").style.display="block";
            document.getElementById("retryButton").style.display = "inline-block";
            clearInterval(gameInterval);
            return;
        }
    }
    
    for(let colorFiller of snake){
        if(colorFiller.x == snake[0].x && colorFiller.y == snake[0].y){
            ctx.fillStyle = "green";
            ctx.fillRect(colorFiller.x,colorFiller.y,size,size);
        }else{
            ctx.fillStyle = "yellow";
            ctx.fillRect(colorFiller.x,colorFiller.y,size,size);
        }
    }
    
    document.getElementById("scoreDisplay").textContent = "Score: " + score;

}

