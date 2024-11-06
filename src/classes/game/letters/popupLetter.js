// TODO: move this variable somewhere else (maybe inside some function)
let timer;

function getPressedLetter(e) {
    // Check letters from a to z
    // TODO: do something with capslock situation
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        let letter = String.fromCharCode(e.which);
        return letter;
    }

    return;
}

function displayPopupLetter(letter) {
    $("#popupLetter").text(letter);

    // Reset animation
    clearInterval(timer);
    $("#popupLetter").stop();

    // Play animation
    popupAnimation(300, 500, 400);
}

function popupAnimation(goUpTime, goDownTime, hangTime) {
    let letter = $("#popupLetter");
    let windowHeight = $(window).height();

    // Start position
    letter.css('top', '-50px');

    // Animation of going up
    letter.animate({ top: '-150px' }, {
        duration: goUpTime,
        step: function(now, fx) {
            // System of progressive speed animation
            // it becomes slower the closer it gets to top
            var progress = now + 100;
            var speed = 1000 + (windowHeight - progress) * 5;
            fx.options.duration = speed;
        },
        complete: function() {
            // Pause between first and second animation
            timer = setTimeout(function() {
                // Animation of falling down
                letter.animate({ top: '50vh' }, goDownTime);
            }, hangTime);
        }
    });
}


