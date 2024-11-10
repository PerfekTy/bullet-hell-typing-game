$(document).ready(function () {
  // lives = 3;
  timerSec = 0;
  // score = 0;
  // scoreCount = 0;
  // combo = 1;
  // speed = 1;

  allTexts = [];
  currentText = [];
  // sections = [];
  // wordGenerateInterval = '';
  timerInterval = "";
  isBackgroundPlaying = false;

  // isReady checks if everything is loaded
  // before starting the game
  let isReady = false;

  $.getScript("./src/classes/game/letters/popupLetter.js");
  $.getScript("./src/classes/game/bullets/bullet.js");
  $.getScript("./src/classes/game/sound.js");
  $.getScript("./src/classes/game/letters/letterDetection.js");
  $.getScript("./src/classes/game/text/texts.js", function () {
    getAllTexts(function (texts) {
      allTexts = texts;
      // sections = getSections();
      isReady = true;

      // Start the game
      run();
      setInterval(generateBullet, 100); // Generate bullets every 500ms for faster shooting
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

    // displayPopupLetter(letter);

    if (isKeyMatched(currentText, letter)) {
        activateLetters();

        if (isTextActivated()) {
            // updateScoreCount(activeWordsSectionsId);
            playSound("./src/sound/hentai1.mp3");
            removeText();
            currentText = generateText();
            // playSound("./src/sound/wordActive1" + combo + ".mp3");

            // activeWordsSectionsId.forEach(sectionId => {
            //     removeWordFromSection(sectionId);
            //     resetAnimaton(sectionId);
            // });
        } else {
            playSound("./src/sound/correctKey.mp3");
        }
    } else {
        playSound("./src/sound/badKey.wav");
        // resetScoreCount();
        // combo = 1;
    }
  });

  // Add this line to set the bullet animation duration
  $("<style>")
    .prop("type", "text/css")
    .html(
      "\
      @keyframes bullet-move {\
        0% { transform: translate(0, 0); }\
        100% { transform: translate(var(--random-x), var(--random-y)); }\
      }\
      .bullet {\
        animation: bullet-move 5s linear infinite; /* Adjust the duration here */\
      }"
    )
    .appendTo("head");
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
