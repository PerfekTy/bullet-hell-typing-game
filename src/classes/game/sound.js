function playSound(soundFile, volume = 1, loop = false) {
    let audio = new Audio(soundFile);
    audio.volume = volume;
    audio.loop = loop;
    audio.play();
}

function playBackgroundMusic() {
    playSound("./src/sound/Concussion.mp3", 0.2, true);
}

function HENTAI() {
    let hentaiNr = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
    playSound("./src/sound/hentai" + hentaiNr + ".mp3");
}

function HENTAIULTIMATE() {
    playSound("./src/sound/hentaiUltimate.mp3", 0.2, true);
}