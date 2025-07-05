export function drawFruit(ctx, fruit) {
  ctx.fillStyle = "red";
  ctx.fillRect(fruit.x, fruit.y, 10, 10);
}

export function drawSnake(ctx, snake, size) {
  for (let part of snake) {
    ctx.fillStyle = (part.x === snake[0].x && part.y === snake[0].y) ? "green" : "yellow";
    ctx.fillRect(part.x, part.y, size, size);
  }
}

export function resetCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
}
