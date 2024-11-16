function generateBullet() {
  let bullet = $('<div class="bullet"></div>');
  let boss = $("#boss");
  let bossWidth = boss.width();
  let bossHeight = boss.height();
  let randomX = (Math.random() - 0.5) * 2000;
  let randomY = (Math.random() - 0.1) * 2000; //de bugged by michal

  bullet.css({
    left: bossWidth / 2 + "px",
    top: bossHeight / 2 + "px",
    "--random-x": randomX + "px",
    "--random-y": randomY + "px",
  });

  $("#bullets").append(bullet);

  function checkCollision() {
    let bulletPosition = bullet.position();
    let gameWindow = $("#game-window");
    let gameWindowWidth = gameWindow.width();
    let gameWindowHeight = gameWindow.height();
    
    if (bulletPosition) {
      if (
        bulletPosition.left <= -gameWindowWidth - bullet.width() || //de bugged by michal
        bulletPosition.left >= gameWindowWidth - bullet.width()
      ) {
        bullet.css("--random-x", -parseFloat(bullet.css("--random-x")) + "px");
      }
      if (
        bulletPosition.top <= -gameWindowHeight - bullet.height() || //de bugged by michal
        bulletPosition.top >= gameWindowHeight - bullet.height()
      ) {
        bullet.css("--random-y", -parseFloat(bullet.css("--random-y")) + "px");
      }

      if (checkWallCollision(bullet)) {
        handleWallCollision(bullet);
      }
    }
  }

  setInterval(checkCollision, 50);

  function checkWallCollision(bullet) {
    let bulletOffset = bullet.offset();

    if (!bulletOffset) {
      return false;
    }

    return (
      checkElementCollision(bullet, $("#top-wall")) ||
      checkElementCollision(bullet, $("#bottom-wall")) ||
      checkElementCollision(bullet, $("#left-wall")) ||
      checkElementCollision(bullet, $("#right-wall"))
    );
  }

  function checkElementCollision(bullet, wall) {
    let bulletOffset = bullet.offset();
    let wallOffset = wall.offset();

    if (!bulletOffset || !wallOffset) {
      return false;
    }

    return !(
      bulletOffset.left > wallOffset.left + wall.width() ||
      bulletOffset.left + bullet.width() < wallOffset.left ||
      bulletOffset.top > wallOffset.top + wall.height() ||
      bulletOffset.top + bullet.height() < wallOffset.top
    );
  }

  function handleWallCollision(bullet) {
    bullet.remove();
  }
}
