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

function playerSystem() {
  updatePlayerPosition();
  const currentPlayerImage = isPlayerMoving() ? playerWalkImage : playerImage;
  if (currentPlayerImage.complete && currentPlayerImage.naturalHeight !== 0) {
    const aspectRatio =
      currentPlayerImage.naturalWidth / currentPlayerImage.naturalHeight;
    ctx.drawImage(
      currentPlayerImage,
      playerX,
      playerY,
      playerSize * aspectRatio,
      playerSize
    );

    // hitbox
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(playerX, playerY, playerSize * aspectRatio, playerSize);
  }
}

function checkBulletPlayerCollision(bullet) {
  const playerRect = {
    x: playerX,
    y: playerY,
    width: playerSize,
    height: playerSize,
  };
  const bulletRect = {
    x: bullet.x,
    y: bullet.y,
    width: bullet.size,
    height: bullet.size,
  };
  return (
    playerRect.x < bulletRect.x + bulletRect.width &&
    playerRect.x + playerRect.width > bulletRect.x &&
    playerRect.y < bulletRect.y + bulletRect.height &&
    playerRect.y + playerRect.height > bulletRect.y
  );
}
