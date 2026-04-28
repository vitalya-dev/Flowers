function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(200);
  drawTexture();
  drawPlants();
  drawUI();
}

function drawPlants() {
  let cellSize = 40; // Размер одной ячейки (блока) растения
  let startY = height - 150; // Базовая линия (земля), откуда растут цветы
  
  // Проходим по горизонтали холста, оставляя отступы по краям и между растениями
  for (let x = 120; x < width - 100; x += 80) {
    
    // Выбираем случайную высоту растения: от 5 до 12 ячеек
    let plantHeight = floor(random(5, 13)); 
    
    // Строим растение снизу вверх
    for (let i = 0; i < plantHeight; i++) {
      // Вычисляем Y-координату для текущей ячейки
      let currentY = startY - (i * cellSize);
      
      // Временно рисуем квадратные границы ячейки для наглядности
      noFill();
      stroke(150); 
      strokeWeight(1);
      rectMode(CENTER);
      rect(x, currentY, cellSize, cellSize);
      
      // Если это самая верхняя ячейка — помечаем её кружочком (здесь будет цветок)
      if (i === plantHeight - 1) {
        fill(255, 100, 100); 
        noStroke();
        circle(x, currentY, cellSize / 2);
      }
    }
  }
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