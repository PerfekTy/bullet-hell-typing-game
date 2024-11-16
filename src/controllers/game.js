$(document).ready(function () {
  lives = 3;
  timerSec = 0;
  score = 0;
  scoreCount = 0;
  combo = 1;
  currentLetterScore = 20;
  speed = 1;

  allTexts = [];
  currentText = [];
  timerInterval = "";
  isBackgroundPlaying = false;

  // isReady checks if everything is loaded
  // before starting the games
  let isReady = false;

  $.getScript("./src/classes/game/letters/popupLetter.js");
  $.getScript("./src/classes/game/bullets/bullet.js");
  $.getScript("./src/classes/game/sound.js");
  $.getScript("./src/classes/game/letters/letterDetection.js");
  $.getScript("./src/classes/game/score.js");
  $.getScript("./src/classes/game/difficulty.js");
  $.getScript("./src/classes/game/text/texts.js", function () {
    getAllTexts(function (texts) {
      allTexts = texts;
      isReady = true;

      run();
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
          playSound("./src/sound/hentai5.mp3");
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

function run(isRetry = false) {
  timeCounter();

  if (isBackgroundPlaying) {
    playBackgroundMusic();
  }

  currentText = generateText();

  // isAnimationFinished(function(sectionId) {
  //     removeWordFromSection(sectionId);
  //     resetAnimaton(sectionId);
  //     resetScoreCount();
  //     lives--;
  //     $("#lives").text(lives);

  //     if (lives == 0) {
  //         resetAllAnimations();
  //         removeAllWordsFromSections();
  //         removeAnimationListeners();
  //         clearInterval(wordGenerateInterval);
  //         clearInterval(timerInterval);
  //         playSound("./src/sound/gameOver.mp3");
  //         hideGameElements();

  //         if (isRetry) {
  //             showGameOverElements();

  //             gameOverProcess();
  //         } else {
  //             $('#gameOver').load('./src/view/gameOver.html', function() {
  //                 $.getScript("./src/controllers/gameOver.js");
  //             });
  //         }
  //     } else {
  //         playSound("./src/sound/injury.mp3");
  //     }
  // })
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
}

function showGameOverElements() {
  $("#gameOver").show();
}
