setInterval(function () {
    if (timerSec !== 0 && timerSec % 30 === 0 && level < 15) {
        levelUp();
        manageBulletWaves();
    }
}, 1000);

function levelUp() {
    level++;
    $("#level").text(level);
    playSound("./src/sound/speedUp.mp3");
}

let bulletWaveInterval;

let shotRate = 500; // do fali 1

function manageBulletWaves() {
    if (bulletWaveInterval) clearInterval(bulletWaveInterval);

    bulletWaveInterval = setInterval(() => {
        switch (level) {
            case 1:
                shotRate = 600; // do fali 2
                wave1();
                break;
            case 2:
                shotRate = 1200; // do fali 3
                wave2();
                break;
            case 3:
                shotRate = 50;
                wave3();
                break;
            case 4:
                shotRate = 300;
                wave4();
                break;
            case 5:
                shotRate = 200;
                wave5();
                break;
            case 6:
                shotRate = 150;
                wave6();
                break;
            case 7:
                shotRate = 100;
                wave7();
                break;
            case 8:
                shotRate = 80;
                wave8();
                break;
            case 9:
                shotRate = 60;
                wave9();
                break;
            case 10:
                shotRate = 50;
                wave10();
                break;
            default:
                wave10();
        }
    }, shotRate);
}

function wave1() {
    generateBullet(0, 0, 0, 0, 0, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
}

function wave2() {
    generateBullet(1, 0, 0, 0, 0, 0, bullet1.size, bullet1.canSplit, 0, bullet1.explodeTime);
}

function wave3() {
    generateBullet(2, 0, 0, 0, 0, 0, bullet2.size, bullet2.canSplit, 0, bullet2.explodeTime);
}

function wave4()
{
    generateBullet(0, 0, 0, 30, 40, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
    generateBullet(0, 0, 0, -30, 40, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
}

function wave5()
{
    generateBullet(1, 0, 0, 0, 0, 0, bullet1.size, bullet1.canSplit, 0, bullet1.explodeTime);
    generateBullet(0, 0, 0, 0, 0, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
}

function wave6()
{
    
}

function wave7()
{
    
}

function wave8()
{
    
}

function wave9()
{
    
}

function wave10()
{
    
}

function generateBasicBullets() {
    generateBullet(0, 0, 0, 0, 0, 0, 30, 0, 0, 0);
}

function generateFastBullets() {
    generateBullet(1, 0, 0, 5, 5, 0, 20, 0, 0, 0); // Szybsze pociski z kierunkiem
}

function generateRandomDirectionBullets() {
    const directionX = (Math.random() - 0.5) * 20;
    const directionY = (Math.random() - 0.5) * 20;
    generateBullet(2, 0, 0, directionX, directionY, 0, 25, 1, 0, 0);
}

function generateAdvancedBullets() {
    for (let i = 0; i < level; i++) {
        const directionX = (Math.random() - 0.5) * 15;
        const directionY = (Math.random() - 0.5) * 15;
        const type = i % 3; // Przykładowo, co trzeci typ pocisku
        generateBullet(type, 0, 0, directionX, directionY, 1, 30, 1, 0, 0);
    }
}