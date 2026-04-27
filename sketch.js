function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(200);
  drawTexture();
  drawUI();
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

function drawUI() {
  fill(50);
  noStroke();
  textFont('monospace');
  textSize(12);
  
  // Основной текст терминала
  textAlign(LEFT, BASELINE);
  text("KALASH TERMINAL :> Karenna flowers, a sentient boron based flowers ...", 60, height - 80);
  
  // Текст в левом нижнем углу
  text("4567 A.D", 30, height - 30);
  
  // Текст в правом нижнем углу
  textAlign(RIGHT, BASELINE);
  text("KALASH ARCHIVES - ACCESSION #1", width - 30, height - 30);
  
  // Имя автора чуть выше
  text("M.R.A. Børan", width - 30, height - 60);
}