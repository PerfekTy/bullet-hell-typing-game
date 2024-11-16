window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const loading = document.getElementById("loading");
  const playerText = document.getElementById("text-section");

  canvas.style.display = "none";
  playerText.style.display = "none";

  canvas.width = 1000;
  canvas.height = 1000;

  const mapImage = new Image();
  mapImage.src = "./src/assets/images/map.png";
  mapImage.onload = function () {
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

    const bossGif = GIF();
    bossGif.onload = function () {
      loading.style.display = "none";
      canvas.style.display = "block";
      playerText.style.display = "block";
      let bossX = 0;
      let direction = 2;
      const bullets = [];
      const explosionImage = new Image();
      explosionImage.src = "./src/assets/misc/expolde_bullet.png";
      const explosions = [];
      let isPaused = false;
      let bulletInterval;

      const playerImage = new Image();
      playerImage.src = "./src/assets/images/player.png";
      const playerWalkImage = new Image();
      playerWalkImage.src = "./src/assets/images/player_walk.gif";
      let playerX = canvas.width / 2;
      let playerY = canvas.height / 2;
      const playerSpeed = 5; // Increase player speed
      const playerSize = 80; // Increase player size

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

      function startBulletGeneration() {
        bulletInterval = setInterval(generateBullet, 500);
      }

      function stopBulletGeneration() {
        clearInterval(bulletInterval);
      }

      function animate() {
        if (!isPaused) {
          ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            bossGif.image,
            bossX,
            canvas.height / 2 - 330,
            150,
            150
          );
          bossX += direction;
          if (bossX > canvas.width - 150 || bossX < 0) {
            direction = -direction;
          }
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
              console.log("Player hit by bullet!");
              bullets.splice(index, 1); // Remove the bullet after hitting the player
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

          updatePlayerPosition();
          const currentPlayerImage = isPlayerMoving()
            ? playerWalkImage
            : playerImage;
          if (
            currentPlayerImage.complete &&
            currentPlayerImage.naturalHeight !== 0
          ) {
            const aspectRatio =
              currentPlayerImage.naturalWidth /
              currentPlayerImage.naturalHeight;
            ctx.drawImage(
              currentPlayerImage,
              playerX,
              playerY,
              playerSize * aspectRatio,
              playerSize
            );
          }
        }
        requestAnimationFrame(animate);
      }
      animate();
      startBulletGeneration();

      function generateBullet() {
        const bulletImage = new Image();
        bulletImage.src = "./src/assets/misc/bullet.png";
        bulletImage.onload = function () {
          const randomValue = Math.random();
          const isLargeBullet = randomValue < 0.2; // 20% chance to be a large bullet
          const isRedBullet = randomValue >= 0.2 && randomValue < 0.4; // 20% chance to be a red bullet
          const bullet = {
            image: new Image(),
            x: bossX + 75,
            y: canvas.height / 2 - 255,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            bounces: 0,
            size: isRedBullet ? 50 : isLargeBullet ? 60 : 30, // Red bullets are larger
            canSplit: isLargeBullet,
            rotation: 0, // Add rotation property
            isRed: isRedBullet, // Add isRed property
            explodeTime: isRedBullet ? Date.now() + Math.random() * 2000 : null, // Set random explode time for red bullet
          };
          bullet.image.src = isRedBullet
            ? "./src/assets/misc/bullet_red.png"
            : isLargeBullet
            ? "./src/assets/misc/bullet_green_big.png"
            : "./src/assets/misc/bullet.png";
          bullets.push(bullet);
        };
      }

      function splitBullet(bullet, index) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angles = [Math.PI / 4, -Math.PI / 4, Math.PI / 6, -Math.PI / 6];
        const newBulletImage = new Image();
        newBulletImage.src = "./src/assets/misc/bullet_green.png";
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
        newBulletImage.src = "./src/assets/misc/bullet_red_small.png";
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
    };
    bossGif.load("./src/assets/images/boss.gif");
  };
};
