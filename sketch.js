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
    let cellSize = 40;
    let startY = height - 150;

    for (let x = 120; x < width - 100; x += 80) {
        let plantHeight = floor(random(5, 13));

        for (let i = 0; i < plantHeight; i++) {
            let currentY = startY - i * cellSize;

            if (i === plantHeight - 1) {
                // Здесь будет цветок (пока оставляем красный кружок)
                fill(255, 100, 100);
                noStroke();
                circle(x, currentY, cellSize / 2);
            } else {
                // Выбираем случайный тип стебля от 0 до 5 и рисуем его
                let stemType = floor(random(6));
                drawStem(x, currentY, cellSize, stemType);
            }
        }
    }
}

function drawStem(x, y, size, type) {
    stroke(0); // Черный цвет для стеблей
    strokeWeight(2); // Толщина линии
    noFill();

    let half = size / 2;

    if (type === 0) {
        // 0: Обычная прямая линия
        line(x, y - half, x, y + half);
    } else if (type === 1) {
        // 1: Зигзаг
        beginShape();
        vertex(x, y - half);
        vertex(x - 8, y - 10);
        vertex(x + 8, y + 10);
        vertex(x, y + half);
        endShape();
    } else if (type === 2) {
        // 2: Плавная волна
        bezier(x, y - half, x - 25, y - 10, x + 25, y + 10, x, y + half);
    } else if (type === 3) {
        // 3: Прямая линия с горизонтальными засечками
        line(x, y - half, x, y + half);
        line(x - 6, y - 12, x + 6, y - 12);
        line(x - 10, y, x + 10, y);
        line(x - 6, y + 12, x + 6, y + 12);
    } else if (type === 4) {
        // 4: Прямая линия с точками
        line(x, y - half, x, y + half);
        fill(0);
        noStroke();
        circle(x, y - 12, 5);
        circle(x, y, 5);
        circle(x, y + 12, 5);
    } else if (type === 5) {
        // 5: Линия с боковой дугой
        line(x, y - half, x, y + half);
        noFill();
        stroke(0);
        arc(x, y, 16, 24, -PI / 2, PI / 2);
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
    textFont("monospace");
    textSize(12);

    // Основной текст терминала
    textAlign(LEFT, BASELINE);
    text(
        "KALASH TERMINAL :> Karenna flowers, a sentient boron based flowers ...",
        60,
        height - 80,
    );

    // Текст в левом нижнем углу
    text("4567 A.D", 30, height - 30);

    // Текст в правом нижнем углу
    textAlign(RIGHT, BASELINE);
    text("KALASH ARCHIVES - ACCESSION #1", width - 30, height - 30);

    // Имя автора чуть выше
    text("M.R.A. Børan", width - 30, height - 60);
}
