let bulletInterval;
let bullets = [];
const orangeBulletExpGif = new GIF();
orangeBulletExpGif.load("./src/assets/misc/bullet_orange_exp.gif");
const greenBulletExpGif = new GIF();
greenBulletExpGif.load("./src/assets/misc/bullet_green_exp.gif");
const greenBulletSmallExpGif = new GIF();
greenBulletSmallExpGif.load("./src/assets/misc/bullet_green_small_exp.gif");
const redBulletExpGif = new GIF();
redBulletExpGif.load("./src/assets/misc/bullet_red_exp.gif");
let explosions = [];
const bulletHit = false;
const explosionDuration = 500; // Set the duration of the explosion to 500ms

function bulletSystem() {
  bullets.forEach((bullet, index) => {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    if (bullet.image.complete && bullet.image.naturalHeight !== 0) {
      if (bullet.size === 60 || bullet.isRed) {
        bullet.rotation += 0.1;
        ctx.save();
        ctx.translate(bullet.x + bullet.size / 2, bullet.y + bullet.size / 2);
        ctx.rotate(bullet.rotation);
        ctx.drawImage(
          bullet.image,
          -bullet.size / 2,
          -bullet.size / 2,
          bullet.size,
          bullet.size
        );
        ctx.restore();
      } else {
        ctx.drawImage(
          bullet.image,
          bullet.x,
          bullet.y,
          bullet.size,
          bullet.size
        );
      }
    }
    if (
      bullet.isRed &&
      (Date.now() > bullet.explodeTime || bulletHitsWall(bullet))
    ) {
      explodeRedBullet(bullet, index);
    }
    if (checkBulletPlayerCollision(bullet)) {
      bullets.splice(index, 1);
      bulletPlayerCollisionEvent();
    }
    if (
      bullet.x < 0 ||
      bullet.x > canvas.width - bullet.size ||
      bullet.y < 0 ||
      bullet.y > canvas.height - bullet.size
    ) {
      if (bullet.canSplit && bullet.bounces < 2) {
        splitBullet(bullet, index);
      } else {
        explosions.push({
          x: bullet.x,
          y: bullet.y,
          time: Date.now(),
          gif: bullet.isRed
            ? redBulletExpGif
            : bullet.size === 30
            ? orangeBulletExpGif
            : bullet.size === 60
            ? greenBulletExpGif
            : greenBulletSmallExpGif,
        });
        bullets.splice(index, 1);
      }
    }
  });

  explosions.forEach((explosion, index) => {
    if (Date.now() - explosion.time < explosionDuration) {
      const frameIndex = Math.floor(
        ((Date.now() - explosion.time) / explosionDuration) *
          explosion.gif.frames.length
      );
      const frame = explosion.gif.frames[frameIndex];
      if (frame && frame.image) {
        const size = explosion.size || 40; // Default size for other explosions
        ctx.drawImage(frame.image, explosion.x, explosion.y, size, size);
      }
    } else {
      explosions.splice(index, 1);
    }
  });
}

function generateBullet(
  type,
  startX,
  startY,
  velocityX,
  velocityY,
  bounces,
  size,
  canSplit,
  rotation,
  explodeTime
) {
  startX = startX || bossX + 75;
  startY = startY || canvas.height / 2 - 255;
  velocityX = velocityX || (Math.random() - 0.5) * 10;
  velocityY = velocityY || (Math.random() - 0.5) * 10;

  const bulletImage = new Image();
  bulletImage.src = "./src/assets/misc/bullet" + type + ".png";
  bulletImage.onload = function () {
    const bullet = {
      image: new Image(),
      x: startX,
      y: startY,
      vx: velocityX,
      vy: velocityY,
      bounces: bounces,
      size: size,
      canSplit: canSplit,
      rotation: rotation,
      isRed: type == 2 ? 1 : 0,
      explodeTime: explodeTime,
    };
    bullet.image.src = bulletImage.src;
    bullets.push(bullet);
  };
}

function splitBullet(bullet, index) {
  explosions.push({
    x: bullet.x,
    y: bullet.y,
    time: Date.now(),
    gif: greenBulletExpGif,
  });

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const angles = [
    Math.PI / 4 + (Math.random() - 0.5) * 0.2,
    -Math.PI / 4 + (Math.random() - 0.5) * 0.2,
    Math.PI / 6 + (Math.random() - 0.5) * 0.2,
    -Math.PI / 6 + (Math.random() - 0.5) * 0.2,
  ];
  const newBulletImage = new Image();
  newBulletImage.src = "./src/assets/misc/bullet1_small.png";
  const newBullets = angles.map((angle) => {
    const newAngle = Math.atan2(centerY - bullet.y, centerX - bullet.x) + angle;
    return {
      image: newBulletImage,
      x: bullet.x,
      y: bullet.y,
      vx: Math.cos(newAngle) * 5,
      vy: Math.sin(newAngle) * 5,
      bounces: bullet.bounces,
      size: bullet.size * 0.3,
      canSplit: false,
      isRed: false,
    };
  });
  bullets.push(...newBullets);
  bullets.splice(index, 1);
}

function explodeRedBullet(bullet, index) {
  const angles = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);
  const newBulletImage = new Image();
  newBulletImage.src = "./src/assets/misc/bullet2_small.png";
  const newBullets = angles.map((angle) => {
    return {
      image: newBulletImage,
      x: bullet.x,
      y: bullet.y,
      vx: Math.cos(angle) * 5,
      vy: Math.sin(angle) * 5,
      bounces: 0,
      size: 30,
      canSplit: false,
    };
  });
  bullets.push(...newBullets);
  explosions.push({
    x: bullet.x,
    y: bullet.y,
    time: Date.now(),
    gif: redBulletExpGif,
  });
  bullets.splice(index, 1);
}

function bulletHitsWall(bullet) {
  return (
    bullet.x < 0 ||
    bullet.x > canvas.width - bullet.size ||
    bullet.y < 0 ||
    bullet.y > canvas.height - bullet.size
  );
}

function bulletPlayerCollisionEvent() {
  const event = new CustomEvent("bulletPlayerCollision");
  window.dispatchEvent(event);
}

function displayTextExplosion(x, y) {
  explosions.push({
    x: x + 30,
    y: y + 20,
    time: Date.now(),
    gif: textExplosion,
    size: 100, 
  });
}
