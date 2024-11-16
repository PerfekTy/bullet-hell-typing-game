let lastLifeIncreaseScore = 0;

function updateScoreCount(letterScore) {
    scoreCount += combo * letterScore;

    if (combo < 6) {
        combo++;
    }

    updateScoreCountDisplay();
    updateComboDisplay();
    updateLives();
}

function resetScoreCount() {
    score += scoreCount;
    scoreCount = 0;
    updateScoreDisplay();
    removeScoreCountDisplay();
    removeComboDisplay();
}

function updateHighscore(score) {
    let highscore = (window.localStorage.getItem("highscore")) ? window.localStorage.getItem("highscore") : 0;

    highscore = parseInt(highscore);
    score = parseInt(score);

    if (score >= highscore) {
        window.localStorage.setItem("highscore", score);
    }
}

function updateLives() {
    const totalScore = score + scoreCount;
    const lifeIncreaseThreshold = Math.floor(totalScore / 10000) * 10000;

    if (totalScore >= 10000 && lifeIncreaseThreshold > lastLifeIncreaseScore) {
        lives += Math.floor((lifeIncreaseThreshold - lastLifeIncreaseScore) / 10000);
        lastLifeIncreaseScore = lifeIncreaseThreshold;
        $("#lives").text(lives);
        playSound("./src/sound/liveUp.wav");
    }
}

function updateScoreCountDisplay() {
    $("#scoreCount").text("+" + scoreCount);
}

function removeScoreCountDisplay() {
    $("#scoreCount").text("");
    $("#combo").removeClass("x" + combo);
}

function updateComboDisplay() {
    $("#combo").text("x" + combo);
    $("#combo").addClass("x" + combo).removeClass("x" + (combo - 1));

}

function removeComboDisplay() {
    $("#combo").text("");
}

function updateScoreDisplay() {
    $("#score").text(score);
}
