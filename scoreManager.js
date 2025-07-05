export function saveScore(name, score) {
    const newEntry = { name, score };
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(newEntry);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
