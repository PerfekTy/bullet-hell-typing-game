$(document).ready(function () {
  lives = 10;
  timerSec = 1;
  score = 0;
  scoreCount = 0;
  combo = 1;
  currentLetterScore = 20;
  level = 1;
  isRetry = 0;

  isPaused = false;

  allTexts = [];
  currentText = [];
  timerInterval = "";
  isBackgroundPlaying = true;

  // isReady checks if everything is loaded
  // before starting the games
  let isReady = false;

  $.getScript("./src/classes/game/canvas/canvasSetup.js", function () {
    $.getScript("./src/classes/game/canvas/boss.js", function () {
      bossLoadComplete = function () {
        $.getScript("./src/classes/game/canvas/player.js", function () {
          $.getScript("./src/classes/game/letters/popupLetter.js");
          $.getScript("./src/classes/game/bullets/bullet0.js");
          $.getScript("./src/classes/game/bullets/bullet1.js");
          $.getScript("./src/classes/game/bullets/bullet2.js");
          $.getScript("./src/classes/game/canvas/controls.js");

          $.getScript("./src/classes/game/canvas/bullets.js");
          $.getScript("./src/classes/game/sound.js");
          $.getScript("./src/classes/game/letters/letterDetection.js");
          $.getScript("./src/classes/game/score.js");
          $.getScript("./src/classes/game/difficulty.js");
          $.getScript("./src/classes/game/text/texts.js", function () {
            getAllTexts(function (texts) {
              allTexts = texts;
              isReady = true;
              animate();
              manageBulletWaves();

              if (isBackgroundPlaying) {
                playBackgroundMusic();
              }

              run();
            });
          });
        });
      };
    });
  });

  $(document).keydown(function (e) {
    if (!isReady) {
      return;
    }

    let letter = getPressedLetter(e);

    if (!letter) {
      return;
    }

    if (isKeyMatched(currentText, letter)) {
      activateLetters();
      playSound("./src/sound/correct" + combo + ".mp3");
      updateScoreCount(currentLetterScore);

      if (isTextActivated()) {
        playSound("./src/sound/textActivated.wav", 0.5);
        animateTextUp(() => {
          removeText();
          currentText = generateText();
        });
      }
    } else {
      playSound("./src/sound/fuck.mp3");
      resetScoreCount();
      combo = 1;
    }
  });
});

function run() {
  timeCounter();

  currentText = generateText();
}

window.addEventListener("bulletPlayerCollision", function () {
  if (!isPaused) {
    // lives--;
    $("#lives").text(lives);
    if (lives == 0) {
      clearInterval(timerInterval);
      hideGameElements();
      isPaused = true;

      if (isRetry) {
        showGameOverElements();
        gameOverProcess();
      } else {
        $("#gameOver").load("./src/view/gameOver.html", function () {
          $.getScript("./src/controllers/gameOver.js");
        });
      }
    } else {
      playSound("./src/sound/injury.mp3");
      resetScoreCount();
      combo = 1;
    }
  }
});

function animate() {
  generateMap();
  bossSystem();
  bulletSystem();
  playerSystem();
  requestAnimationFrame(animate);
}

function timeCounter() {
  let seconds = 0;
  let minutes = 0;
  let timerElement = $("#timer");

  timerInterval = setInterval(function () {
    seconds++;
    timerSec++;

    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }

    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    timerElement.text(formattedMinutes + ":" + formattedSeconds);
  }, 1000);
}

function hideGameElements() {
  $("#game").hide();
  hideCanvas();
}

function showGameOverElements() {
  $("#gameOver").show();
}
