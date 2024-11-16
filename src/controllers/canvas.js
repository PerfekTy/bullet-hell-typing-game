window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const loading = document.getElementById("loading");
  const playerText = document.getElementById("text-section");

  canvas.style.display = "none";
  playerText.style.display = "none";

  canvas.width = 900;
  canvas.height = 900;

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

      function startBulletGeneration() {
        bulletInterval = setInterval(generateBullet, 500);
      }

      function stopBulletGeneration() {
        clearInterval(bulletInterval);
      }

      function pauseGame() {
        isPaused = true;
        bossGif.pause();
        stopBulletGeneration();
      }

      function resumeGame() {
        isPaused = false;
        bossGif.play();
        startBulletGeneration();
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
              ctx.drawImage(
                bullet.image,
                bullet.x,
                bullet.y,
                bullet.size,
                bullet.size
              );
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
        requestAnimationFrame(animate);
      }
      animate();
      startBulletGeneration();

      setInterval(() => {
        pauseGame();
        setTimeout(resumeGame, 5000);
      }, 10000);

      function generateBullet() {
        const bulletImage = new Image();
        bulletImage.src = "./src/assets/misc/bullet.png";
        bulletImage.onload = function () {
          const isLargeBullet = Math.random() < 0.2; // 20% chance to be a large bullet
          const bullet = {
            image: bulletImage,
            x: bossX + 75,
            y: canvas.height / 2 - 255,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            bounces: 0,
            size: isLargeBullet ? 60 : 30, // Large bullets are twice the size
            canSplit: isLargeBullet,
          };
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
    };
    bossGif.load("./src/assets/images/boss.gif");
  };
};
