// const playerText = document.getElementById("text-section");
// playerText.style.display = "block";

const playerImage = new Image();
playerImage.src = "./src/assets/images/player.png";
const playerIdleGif = new GIF();
playerIdleGif.load("./src/assets/images/player_idle.gif");
const playerWalkGif = new GIF();
playerWalkGif.load("./src/assets/images/player_walk.gif");
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
const playerSpeed = 3;
const playerSize = 80;

let aspectRatio;

function playerSystem() {
  updatePlayerPosition();
  const currentPlayerGif = isPlayerMoving() ? playerWalkGif : playerIdleGif;
  if (currentPlayerGif.complete && currentPlayerGif.frames.length > 0) {
    const currentFrame = currentPlayerGif.frames[currentPlayerGif.currentFrame];
    aspectRatio = currentFrame.image.width / currentFrame.image.height;
    ctx.drawImage(
      currentFrame.image,
      playerX,
      playerY,
      playerSize * aspectRatio,
      playerSize
    );

    // head hitbox (circle)
    const headRadius = playerSize * 0.2;
    const headX = playerX + (playerSize * aspectRatio) / 2;
    const headY = playerY + headRadius;
    ctx.beginPath();
    ctx.arc(headX, headY, headRadius, 0, Math.PI * 2);

    // torso hitbox (oval)
    const torsoWidth = playerSize * aspectRatio * 0.6;
    const torsoHeight = playerSize * 0.5;
    const torsoX = playerX + (playerSize * aspectRatio) / 2 - torsoWidth / 2;
    const torsoY = playerY + headRadius * 2;
    ctx.beginPath();
    ctx.ellipse(
      torsoX + torsoWidth / 2,
      torsoY + torsoHeight / 2,
      torsoWidth / 2,
      torsoHeight / 2,
      0,
      0,
      Math.PI * 2
    );
  }
}

function checkBulletPlayerCollision(bullet) {
  // head hitbox
  const headRadius = playerSize * 0.2;
  const headX = playerX + (playerSize * aspectRatio) / 2;
  const headY = playerY + headRadius;

  // torso hitbox
  const torsoWidth = playerSize * aspectRatio * 0.6;
  const torsoHeight = playerSize * 0.5;
  const torsoX = playerX + (playerSize * aspectRatio) / 2 - torsoWidth / 2;
  const torsoY = playerY + headRadius * 2;

  // bullet hitbox
  const bulletRadius = (bullet.size / 2) * 0.8;
  const bulletX = bullet.x + bullet.size / 2;
  const bulletY = bullet.y + bullet.size / 2;

  // bullet hitbox
  ctx.beginPath();
  ctx.arc(bulletX, bulletY, bulletRadius, 0, Math.PI * 2);

  // Check collision with head
  const distXHead = Math.abs(bulletX - headX);
  const distYHead = Math.abs(bulletY - headY);
  const distanceHead = Math.sqrt(distXHead * distXHead + distYHead * distYHead);
  const headCollision = distanceHead < headRadius + bulletRadius;

  // Check collision with torso
  const distXTorso = Math.abs(bulletX - (torsoX + torsoWidth / 2));
  const distYTorso = Math.abs(bulletY - (torsoY + torsoHeight / 2));
  const torsoCollision =
    distXTorso < torsoWidth / 2 + bulletRadius &&
    distYTorso < torsoHeight / 2 + bulletRadius;

  return headCollision || torsoCollision;
}
