const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const loading = document.getElementById("loading");
canvas.style.display = "block";
canvas.width = 900;
canvas.height = 900;

const mapImage = new Image();
mapImage.src = "./src/assets/images/map.png";
ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

function generateMap() {
  ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
}

function hideCanvas() {
  canvas.style.display = "none";
}

function showCanvas() {
  canvas.style.display = "block";
}
