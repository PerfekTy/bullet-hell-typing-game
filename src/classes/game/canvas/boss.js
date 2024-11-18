const bossGif = GIF();
let bossX = 0;
let direction = 2;
bossGif.load("./src/assets/images/boss.gif");
bossGif.onload = function () {
    bossLoadComplete();
}

function bossSystem() {
    generateBoss();
    bossX += direction;
    bossChangeDirection();
}

function generateBoss() {
    ctx.drawImage(
        bossGif.image,
        bossX,
        canvas.height / 2 - 330,
        150,
        150
    );
    bossX += direction;
}

function bossChangeDirection() {
    if (bossX > canvas.width - 150 || bossX < 0) {
        direction = -direction;
    }
}
