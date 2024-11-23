// const playerText = document.getElementById("text-section");
// playerText.style.display = "block";

const playerImage = new Image();
playerImage.src = "./src/assets/images/player.png";
const playerWalkImage = new Image();
playerWalkImage.src = "./src/assets/images/player_walk.gif";
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
const playerSpeed = 5;
const playerSize = 80;

let aspectRatio;

function playerSystem() {
  updatePlayerPosition();
  const currentPlayerImage = isPlayerMoving() ? playerWalkImage : playerImage;
  if (currentPlayerImage.complete && currentPlayerImage.naturalHeight !== 0) {
    aspectRatio =
      currentPlayerImage.naturalWidth / currentPlayerImage.naturalHeight;
    ctx.drawImage(
      currentPlayerImage,
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
    ctx.strokeStyle = "red"; // Change hitbox color
    ctx.stroke();

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
    ctx.strokeStyle = "red"; // Change hitbox color
    ctx.stroke();
  }
}

function checkBulletPlayerCollision(bullet) {
  // head hitbox (circle)
  const headRadius = playerSize * 0.2;
  const headX = playerX + (playerSize * aspectRatio) / 2;
  const headY = playerY + headRadius;

  // torso hitbox (oval)
  const torsoWidth = playerSize * aspectRatio * 0.6;
  const torsoHeight = playerSize * 0.5;
  const torsoX = playerX + (playerSize * aspectRatio) / 2 - torsoWidth / 2;
  const torsoY = playerY + headRadius * 2;

  // bullet hitbox (circle)
  const bulletRadius = (bullet.size / 2) * 0.8; // Reduce bullet hitbox size
  const bulletX = bullet.x + bullet.size / 2;
  const bulletY = bullet.y + bullet.size / 2;

  // Draw bullet hitbox
  ctx.beginPath();
  ctx.arc(bulletX, bulletY, bulletRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "green"; // Change hitbox color
  ctx.lineWidth = 3; // Set hitbox outline thickness
  ctx.stroke();

  // Check collision with head hitbox
  const distXHead = Math.abs(bulletX - headX);
  const distYHead = Math.abs(bulletY - headY);
  const distanceHead = Math.sqrt(distXHead * distXHead + distYHead * distYHead);
  const headCollision = distanceHead < headRadius + bulletRadius;

  // Check collision with torso hitbox
  const distXTorso = Math.abs(bulletX - (torsoX + torsoWidth / 2));
  const distYTorso = Math.abs(bulletY - (torsoY + torsoHeight / 2));
  const torsoCollision =
    distXTorso < torsoWidth / 2 + bulletRadius &&
    distYTorso < torsoHeight / 2 + bulletRadius;

  if (headCollision || torsoCollision) {
    console.log("Player hit!");
  }

  return headCollision || torsoCollision;
}
