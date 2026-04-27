function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(200);
  drawTexture();
}

function drawTexture() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let noiseVal = random(-20, 20);
    pixels[i] += noiseVal;
    pixels[i + 1] += noiseVal;
    pixels[i + 2] += noiseVal;
  }
  updatePixels();
}