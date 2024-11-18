const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  document.addEventListener("keydown", function (event) {
    if (keys.hasOwnProperty(event.key)) {
      keys[event.key] = true;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (keys.hasOwnProperty(event.key)) {
      keys[event.key] = false;
    }
  });

  function updatePlayerPosition() {
    if (keys.ArrowUp && playerY > 0) playerY -= playerSpeed;
    if (keys.ArrowDown && playerY < canvas.height - playerSize)
      playerY += playerSpeed;
    if (keys.ArrowLeft && playerX > 0) playerX -= playerSpeed;
    if (keys.ArrowRight && playerX < canvas.width - playerSize)
      playerX += playerSpeed;
  }

  function isPlayerMoving() {
    return (
      keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight
    );
  }