$(document).ready(function () {
  setInterval(generateBullet, 100); // Generate bullets every 500ms for faster shooting

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
  $.getScript("./src/classes/game/sound.js");
  $.getScript("./src/classes/game/letters/letterDetection.js");
  $.getScript("./src/classes/game/text/texts.js", function () {
    getAllTexts(function (texts) {
      allTexts = texts;
      // sections = getSections();
      isReady = true;

      // Start the game
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
      }\
      #player {\
        width: 50px; /* Adjust size as needed */\
        height: 50px; /* Adjust size as needed */\
        background-color: red; /* Adjust color as needed */\
        position: absolute; /* Ensure it can be positioned within the game window */\
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

function generateBullet() {
  let bullet = $('<div class="bullet"></div>');
  let boss = $("#boss");
  let bossWidth = boss.width();
  let bossHeight = boss.height();
  let randomX = (Math.random() - 0.5) * 2000;
  let randomY = (Math.random() - 0.5) * 2000;

  bullet.css({
    left: bossWidth / 2 + "px",
    top: bossHeight / 2 + "px",
    "--random-x": randomX + "px",
    "--random-y": randomY + "px",
  });

  $("#bullets").append(bullet);

  function checkCollision() {
    let bulletPosition = bullet.position();
    let gameWindow = $("#game-window");
    let gameWindowWidth = gameWindow.width();
    let gameWindowHeight = gameWindow.height();

    if (bulletPosition) {
      if (
        bulletPosition.left <= 0 ||
        bulletPosition.left >= gameWindowWidth - bullet.width()
      ) {
        bullet.css("--random-x", -parseFloat(bullet.css("--random-x")) + "px");
      }
      if (
        bulletPosition.top <= 0 ||
        bulletPosition.top >= gameWindowHeight - bullet.height()
      ) {
        bullet.css("--random-y", -parseFloat(bullet.css("--random-y")) + "px");
      }

      if (checkWallCollision(bullet)) {
        handleWallCollision(bullet);
      }
    }
  }

  setInterval(checkCollision, 50);

  function checkWallCollision(bullet) {
    let bulletOffset = bullet.offset();

    if (!bulletOffset) {
      return false;
    }

    return (
      checkElementCollision(bullet, $("#top-wall")) ||
      checkElementCollision(bullet, $("#bottom-wall")) ||
      checkElementCollision(bullet, $("#left-wall")) ||
      checkElementCollision(bullet, $("#right-wall"))
    );
  }

  function checkElementCollision(bullet, wall) {
    let bulletOffset = bullet.offset();
    let wallOffset = wall.offset();

    if (!bulletOffset || !wallOffset) {
      return false;
    }

    return !(
      bulletOffset.left > wallOffset.left + wall.width() ||
      bulletOffset.left + bullet.width() < wallOffset.left ||
      bulletOffset.top > wallOffset.top + wall.height() ||
      bulletOffset.top + bullet.height() < wallOffset.top
    );
  }

  function handleWallCollision(bullet) {
    bullet.remove();
  }
}
