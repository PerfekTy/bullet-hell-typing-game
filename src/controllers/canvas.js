// window.onload = function () {
  // const canvas = document.getElementById("canvas");
  // const ctx = canvas.getContext("2d");
  // const loading = document.getElementById("loading");
  // const playerText = document.getElementById("text-section");

  // canvas.style.display = "none";
  // playerText.style.display = "none";

  // canvas.width = 900;
  // canvas.height = 900;

  // const mapImage = new Image();
  // mapImage.src = "./src/assets/images/map.png";
  // mapImage.onload = function () {
  //   ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

    // const bossGif = GIF();
    // bossGif.onload = function () {
      // loading.style.display = "none";
      // canvas.style.display = "block";
      // playerText.style.display = "block";
      // let isPaused = false;

      // function animate() {
      //   if (!isPaused) {
      //     ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
      //     ctx.drawImage(
      //       bossGif.image,
      //       bossX,
      //       canvas.height / 2 - 330,
      //       150,
      //       150
      //     );
      //     bossX += direction;
      //     if (bossX > canvas.width - 150 || bossX < 0) {
      //       direction = -direction;
      //     }
      //     bullets.forEach((bullet, index) => {
      //       bullet.x += bullet.vx;
      //       bullet.y += bullet.vy;
      //       if (bullet.image.complete && bullet.image.naturalHeight !== 0) {
      //         if (bullet.size === 60 || bullet.isRed) {
      //           bullet.rotation += 0.1; // Update rotation
      //           ctx.save();
      //           ctx.translate(
      //             bullet.x + bullet.size / 2,
      //             bullet.y + bullet.size / 2
      //           );
      //           ctx.rotate(bullet.rotation); // Rotate based on bullet's rotation property
      //           ctx.drawImage(
      //             bullet.image,
      //             -bullet.size / 2,
      //             -bullet.size / 2,
      //             bullet.size,
      //             bullet.size
      //           );
      //           ctx.restore();
      //         } else {
      //           ctx.drawImage(
      //             bullet.image,
      //             bullet.x,
      //             bullet.y,
      //             bullet.size,
      //             bullet.size
      //           );
      //         }
      //       }
      //       if (
      //         bullet.isRed &&
      //         (Date.now() > bullet.explodeTime || bulletHitsWall(bullet))
      //       ) {
      //         explodeRedBullet(bullet, index);
      //       }
      //       if (checkBulletPlayerCollision(bullet)) {
      //         console.log("Player hit by bullet!");
      //         bullets.splice(index, 1); // Remove the bullet after hitting the player
      //       }
      //       if (
      //         bullet.x < 0 ||
      //         bullet.x > canvas.width - bullet.size ||
      //         bullet.y < 0 ||
      //         bullet.y > canvas.height - bullet.size
      //       ) {
      //         if (
      //           explosionImage.complete &&
      //           explosionImage.naturalHeight !== 0
      //         ) {
      //           explosions.push({ x: bullet.x, y: bullet.y, time: Date.now() });
      //         }
      //         if (bullet.canSplit && bullet.bounces < 2) {
      //           splitBullet(bullet, index);
      //         } else {
      //           bullets.splice(index, 1); // Remove normal bullets after hitting a wall
      //         }
      //       }
      //     });

      //     explosions.forEach((explosion, index) => {
      //       if (Date.now() - explosion.time < 2000) {
      //         ctx.drawImage(explosionImage, explosion.x, explosion.y, 30, 30);
      //       } else {
      //         explosions.splice(index, 1);
      //       }
      //     });

      //     updatePlayerPosition();
      //     const currentPlayerImage = isPlayerMoving()
      //       ? playerWalkImage
      //       : playerImage;
      //     if (
      //       currentPlayerImage.complete &&
      //       currentPlayerImage.naturalHeight !== 0
      //     ) {
      //       const aspectRatio =
      //         currentPlayerImage.naturalWidth /
      //         currentPlayerImage.naturalHeight;
      //       ctx.drawImage(
      //         currentPlayerImage,
      //         playerX,
      //         playerY,
      //         playerSize * aspectRatio,
      //         playerSize
      //       );
      //     }
      //   }
      //   requestAnimationFrame(animate);
      // }
      // animate();

      // function checkBulletPlayerCollision(bullet) {
      //   const playerRect = {
      //     x: playerX,
      //     y: playerY,
      //     width: playerSize,
      //     height: playerSize,
      //   };
      //   const bulletRect = {
      //     x: bullet.x,
      //     y: bullet.y,
      //     width: bullet.size,
      //     height: bullet.size,
      //   };
      //   return (
      //     playerRect.x < bulletRect.x + bulletRect.width &&
      //     playerRect.x + playerRect.width > bulletRect.x &&
      //     playerRect.y < bulletRect.y + bulletRect.height &&
      //     playerRect.y + playerRect.height > bulletRect.y
      //   );
      // }
    // };
    // bossGif.load("./src/assets/images/boss.gif");
  // };
// };
