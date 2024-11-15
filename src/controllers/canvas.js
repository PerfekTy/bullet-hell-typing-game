window.onload = function () {
  const canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 600;
  const context = canvas.getContext("2d");

  const background = new Image();
  background.src = "/src/assets/images/map.png"; // Double-check this path
  background.onload = function () {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
  };
  background.onerror = function () {
    console.error(
      "Failed to load the background image. Please check the file path."
    );
  };

  // ...additional canvas setup code if needed...
};
