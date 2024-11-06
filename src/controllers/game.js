$(document).ready(function() {
    // lives = 3;
    timerSec = 0;
    // score = 0;
    // scoreCount = 0;
    // combo = 1;
    // speed = 1;

    // allWords = [];
    // sections = [];
    // wordGenerateInterval = '';
    timerInterval = '';
    isBackgroundPlaying = true;

    // hentaiMode = 0;

    // isReady checks if everything is loaded
    // before starting the game
    let isReady = false;

    // tutaj wczytujemy inne pliki, jak wszystkie pliki się wczytają
    // to odpalamy run(), które będzie takim głównym silnikiem gry
    $.getScript("./src/classes/game/letters/popupLetter.js");
    $.getScript("./src/classes/game/sound.js");
    // $.getScript("./src/classes/game/score.js");
    $.getScript("./src/classes/game/letters/letterDetection.js", function() {
        // getAllWords(function(words) {
            // allWords = words;
            // sections = getSections();
            isReady = true;

            // Start the game
            run();
        // });
    });

    $(document).keydown(function(e) {
        if (!isReady) {
            return
        }

        let letter = getPressedLetter(e);

        if (!letter) {
            return;
        }

        displayPopupLetter(letter);

        // let correctSections = getCorrectSections(letter);

        // // Checking if key pressed matches any inactive first letters
        // if (correctSections.length) {
        //     // Logic of correct key...
        //     let correctSectionsId = correctSections.map(correctSection => correctSection.id);
        //     activateLetters(correctSectionsId);

        //     // Get sections with activated words if exists
        //     let activeWordsSectionsId = getSectionsIdOfActivatedWords(correctSectionsId);

        //     // Check if word is activated
        //     if (activeWordsSectionsId.length) {
        //         if (hentaiMode) {
                    // HENTAI();
        //         }

        //         updateScoreCount(activeWordsSectionsId);
        //         playSound("./src/sound/wordActive" + combo + ".mp3");

        //         activeWordsSectionsId.forEach(sectionId => {
        //             removeWordFromSection(sectionId);
        //             resetAnimaton(sectionId);
        //         });
        //     } else {
        //         playSound("./src/sound/correctKey.mp3");
        //     }
        // } else {
        //     // Logic of incorrect key...
            playSound("./src/sound/badKey.wav");
        //     resetScoreCount();
        //     combo = 1;
        // }
    });
})

function run(isRetry = false) {
    timeCounter();

    if (isBackgroundPlaying) {
        playBackgroundMusic();
    }

    // generateWords();

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
    let timerElement = $('#timer');

    timerInterval = setInterval(function() {
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
