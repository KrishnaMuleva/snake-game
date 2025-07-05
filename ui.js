export function showGameOverUI() {
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("retryButton").style.display = "inline-block";
}

export function updateScoreDisplay(score) {
    document.getElementById("scoreDisplay").textContent = "Score: " + score;
}
