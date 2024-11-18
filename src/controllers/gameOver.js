$(document).ready(function() {
    gameOverProcess();

    $(document).keydown(function(event) {
        restartGame(event);
    });
})

function gameOverProcess() {
    const interval = 1000;
    let textAnimation;

    textAnimation = animateText(interval, "gameOverRetry");

    let finalTime = $("#timer").text();
    let finalScore = $("#score").text();
    let finalLevel = $("#level").text();

    updateHighscore(finalScore);

    $("#finalTime").text(finalTime);
    $("#finalScore").text(finalScore);
    $("#finalLevel").text(finalLevel);
    $("#highscore").text(window.localStorage.getItem("highscore"));
}

function hideGameOverElements() {
    $("#gameOver").hide();
}

function showGameElements() {
    $("#game").show();
    showCanvas();
}

function restartGame(event) {
    if (event.keyCode === 32) {
        isRetry = true;
        $(document).off("keydown", restartGame);
        hideGameOverElements();
        showGameElements();
        resetGame();
        isPaused = false;
        run();
    }
}

function resetGame() {
    lives = 3;
    timerSec = 0;
    scoreCount = 0;
    score = 0;
    combo = 1;
    level = 1;
    bossX = 0;
    direction = 2;
    bullets = [];
    explosions = []
    shotRate = 1000;
    wordGenerateInterval = '';
    timerInterval = '';

    $("#timer").text("00:00");
    $("#score").text("0");
    $("#lives").text(lives);
    $("#level").text(level);
}