let bulletInterval;
let bullets = [];
const explosionImage = new Image();
explosionImage.src = "./src/assets/misc/expolde_bullet.png";
let explosions = [];
const bulletHit = false;

function bulletSystem() {
  bullets.forEach((bullet, index) => {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    if (bullet.image.complete && bullet.image.naturalHeight !== 0) {
      if (bullet.size === 60 || bullet.isRed) {
        bullet.rotation += 0.1; // Update rotation
        ctx.save();
        ctx.translate(
          bullet.x + bullet.size / 2,
          bullet.y + bullet.size / 2
        );
        ctx.rotate(bullet.rotation); // Rotate based on bullet's rotation property
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
      if (
        explosionImage.complete &&
        explosionImage.naturalHeight !== 0
      ) {
        explosions.push({ x: bullet.x, y: bullet.y, time: Date.now() });
      }
      if (bullet.canSplit && bullet.bounces < 2) {
        splitBullet(bullet, index);
      } else {
        bullets.splice(index, 1); // Remove normal bullets after hitting a wall
      }
    }
  });

  explosions.forEach((explosion, index) => {
    if (Date.now() - explosion.time < 2000) {
      ctx.drawImage(explosionImage, explosion.x, explosion.y, 30, 30);
    } else {
      explosions.splice(index, 1);
    }
  });
}

function generateBullet(type, startX, startY, velocityX, velocityY, bounces, size, canSplit, rotation, explodeTime) {
  startX = startX || bossX + 75;
  startY = startY || canvas.height / 2 - 255;
  velocityX = velocityX || (Math.random() - 0.5) * 10;
  velocityY = velocityY || (Math.random() - 0.5) * 10;

  const bulletImage = new Image();
  bulletImage.src = "./src/assets/misc/bullet" + type + ".png";
  bulletImage.onload = function () {
    // const randomValue = Math.random();
    // const isGreenBullet = randomValue < 0.2; // 20% chance to be a green bullet
    // const isRedBullet = randomValue >= 0.2 && randomValue < 0.4; // 20% chance to be a red bullet
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
      isRed: (type == 2) ? 1 : 0,
      explodeTime: explodeTime
      // explodeTime: isRedBullet ? Date.now() + Math.random() * 2000 : null, // Set random explode time for red bullet
    };
    bullet.image.src = bulletImage.src;
    bullets.push(bullet);
  };
}

function splitBullet(bullet, index) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const angles = [Math.PI / 4, -Math.PI / 4, Math.PI / 6, -Math.PI / 6];
  const newBulletImage = new Image();
  newBulletImage.src = "./src/assets/misc/bullet1_small.png";
  const newBullets = angles.map((angle) => {
    const newAngle =
      Math.atan2(centerY - bullet.y, centerX - bullet.x) + angle;
    return {
      image: newBulletImage,
      x: bullet.x,
      y: bullet.y,
      vx: Math.cos(newAngle) * 5,
      vy: Math.sin(newAngle) * 5,
      bounces: bullet.bounces,
      size: bullet.size, // Green bullets retain the original size
      canSplit: false, // New bullets cannot split further
    };
  });
  bullets.push(...newBullets);
  bullets.splice(index, 1); // Remove the original bullet after splitting
}

function explodeRedBullet(bullet, index) {
  const angles = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4); // 8 directions
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
      size: 30, // Small red bullets
      canSplit: false,
    };
  });
  bullets.push(...newBullets);
  bullets.splice(index, 1); // Remove the original red bullet after exploding
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
  const event = new CustomEvent('bulletPlayerCollision');
  window.dispatchEvent(event);
}