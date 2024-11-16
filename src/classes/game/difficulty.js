setInterval(function () {
    if (timerSec !== 0 && timerSec % 30 === 0 && speed < 15) {
        makeItHarder();
    }

    if (timerSec !== 0 && timerSec % 120 === 0 && timerSec > 0) {
        addNewEnemies();
    }
    checkTimer();
}, 1000);

function makeItHarder() {
    speed++;
    $("#speed").text(speed);
    // playSound("./src/sound/hentai4.mp3");
}

function addNewEnemies() {

}