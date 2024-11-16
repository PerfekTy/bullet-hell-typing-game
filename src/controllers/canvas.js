window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const loading = document.getElementById("loading");
  const playerText = document.getElementById("text-section");

  canvas.style.display = "none";
  playerText.style.display = "none";

  canvas.width = 800 * 1.5;
  canvas.height = 600 * 2;

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

      function animate() {
        ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bossGif.image, bossX, canvas.height / 2 - 330, 150, 150);
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
          if (bullet.x < 0 || bullet.x > canvas.width - bullet.size) {
            if (explosionImage.complete && explosionImage.naturalHeight !== 0) {
              explosions.push({ x: bullet.x, y: bullet.y, time: Date.now() });
            }
            bullet.vx = -bullet.vx;
            bullet.bounces += 1;
            if (bullet.bounces < 2) {
              splitBullet(bullet, index);
            }
          }
          if (bullet.y < 0 || bullet.y > canvas.height - bullet.size) {
            if (explosionImage.complete && explosionImage.naturalHeight !== 0) {
              explosions.push({ x: bullet.x, y: bullet.y, time: Date.now() });
            }
            bullet.vy = -bullet.vy;
            bullet.bounces += 1;
            if (bullet.bounces < 2) {
              splitBullet(bullet, index);
            }
          }
          if (bullet.bounces >= 2) {
            bullets.splice(index, 1);
          }
        });

        explosions.forEach((explosion, index) => {
          if (Date.now() - explosion.time < 2000) {
            ctx.drawImage(explosionImage, explosion.x, explosion.y, 30, 30);
          } else {
            explosions.splice(index, 1);
          }
        });

        requestAnimationFrame(animate);
      }
      animate();

      function generateBullet() {
        const bulletImage = new Image();
        bulletImage.src = "./src/assets/misc/bullet.png";
        bulletImage.onload = function () {
          const bullet = {
            image: bulletImage,
            x: bossX + 75,
            y: canvas.height / 2 - 255,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            bounces: 0,
            size: 30,
          };
          bullets.push(bullet);
        };
      }

      function splitBullet(bullet, index) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angle1 = Math.atan2(centerY - bullet.y, centerX - bullet.x);
        const angle2 = angle1 + Math.PI / 4;
        const angle3 = angle1 - Math.PI / 4;

        const newBullet1 = {
          image: bullet.image,
          x: bullet.x,
          y: bullet.y,
          vx: Math.cos(angle2) * 5,
          vy: Math.sin(angle2) * 5,
          bounces: bullet.bounces,
          size: bullet.size / 2,
        };
        const newBullet2 = {
          image: bullet.image,
          x: bullet.x,
          y: bullet.y,
          vx: Math.cos(angle3) * 5,
          vy: Math.sin(angle3) * 5,
          bounces: bullet.bounces,
          size: bullet.size / 2,
        };
        bullets.push(newBullet1, newBullet2);
        bullets.splice(index, 1); // Remove the original bullet after splitting
      }

      setInterval(generateBullet, 500);
    };
    bossGif.load("./src/assets/images/boss.gif");
  };
};
