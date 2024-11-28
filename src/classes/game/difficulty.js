setInterval(function () {
    if (timerSec !== 0 && timerSec % 20 === 0 && level <= 10) {
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

let shotRate = 2000; // do fali 1

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
                shotRate = 1200;
                wave4();
                break;
            case 5:
                shotRate = 1200;
                wave5();
                break;
            case 6:
                shotRate = 5200;
                wave6();
                break;
            case 7:
                shotRate = 2000;
                wave7();
                break;
            case 8:
                shotRate = 2000;
                wave8();
                break;
            case 9:
                shotRate = 1200;
                wave9();
                break;
            case 10:
                shotRate = 2500;
                wave10();
                break;
            default:
                shotRate = 1200;
                wave5();
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
    generateBullet(1, 0, -1, 5, 1, 0, bullet1.size, bullet1.canSplit, 0, bullet1.explodeTime);
    generateBullet(1, 0, -1, -5, 1, 0, bullet1.size, bullet1.canSplit, 0, bullet1.explodeTime);
    generateBullet(2, 0, 0, 0, 1, 0, bullet2.size, bullet2.canSplit, 0, bullet2.explodeTime);
}

function wave7()
{
    generateBullet(2, 0, 0, 0, 1, 0, bullet2.size, bullet2.canSplit, 50, Date.now() + Math.random() * 2000);
}

function wave8()
{
    generateBullet(2, 0, 0, 1, 1, 0, bullet2.size, bullet2.canSplit, 0, Date.now() + Math.random() * 1700);
    generateBullet(2, 0, 0, 0, 1, 0, bullet2.size, bullet2.canSplit, 0, Date.now() + Math.random() * 700);
    generateBullet(2, 0, 0, -1, 1, 0, bullet2.size, bullet2.canSplit, 0, Date.now() + Math.random() * 1700);
}

function wave9()
{
    generateBullet(0, -1 + bossX, -3, 0, 3, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
    generateBullet(0, 1 + bossX, -3, 0, 3, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
    generateBullet(0, 0 + bossX, -3, 0, 3, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
    generateBullet(0, 2 + bossX, -3, 0, 3, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
    generateBullet(0, -2 + bossX, -3, 0, 3, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
}

function wave10()
{
    for(i = 0; i <= 1000 ; i = i + 25)
    {
        generateBullet(0, i, 0, 0, 0.5, 0, bullet0.size, bullet0.canSplit, 0, bullet0.explodeTime);
    }
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