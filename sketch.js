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
                // Рисуем стебель
                let stemType = floor(random(6));
                drawStem(x, currentY, cellSize, stemType);

                // Логика листьев: не на самой нижней ячейке и с вероятностью 60%
                if (i > 0 && random() > 0.4) {
                    let leafType = floor(random(8)); // 8 типов листьев
                    let isLeft = random() > 0.5; // 50% шанс расти влево или вправо
                    drawLeaf(x, currentY, cellSize, leafType, isLeft);
                }
            }
        }
    }
}

function drawLeaf(x, y, size, type, isLeft) {
    push(); // Сохраняем текущие настройки холста
    translate(x, y); // Перемещаем точку отсчета координат в центр ячейки

    // Если лист должен быть слева, отзеркаливаем холст по горизонтали
    if (isLeft) {
        scale(-1, 1);
    }

    noStroke();

    // Палитра для листьев (зеленые, красные, желтые оттенки)
    let leafColors = [
        color(100, 200, 50), // Светло-зеленый
        color(30, 120, 50), // Темно-зеленый
        color(220, 80, 60), // Красно-оранжевый
        color(200, 255, 50), // Салатовый
    ];
    fill(random(leafColors));

    let offset = 2; // Небольшой отступ от центра стебля

    // 8 различных видов листьев
    if (type === 0) {
        // 0: Острый изогнутый листик
        beginShape();
        vertex(offset, 0);
        bezierVertex(offset + 10, -15, offset + 25, -5, offset + 30, -10);
        bezierVertex(offset + 20, 5, offset + 10, 10, offset, 0);
        endShape();
    } else if (type === 1) {
        // 1: Две точки
        circle(offset + 8, -5, 6);
        circle(offset + 16, -10, 6);
    } else if (type === 2) {
        // 2: Полукруг прижатый к стеблю
        arc(offset, 0, 20, 20, -PI / 2, PI / 2);
    } else if (type === 3) {
        // 3: Геометрический треугольник
        triangle(offset, -5, offset + 20, -15, offset, 15);
    } else if (type === 4) {
        // 4: Три точки по вертикали
        circle(offset + 6, -10, 5);
        circle(offset + 6, 0, 5);
        circle(offset + 6, 10, 5);
    } else if (type === 5) {
        // 5: Ромб с "глазиком" внутри
        quad(offset, 0, offset + 15, -10, offset + 30, 0, offset + 15, 10);
        fill(0);
        circle(offset + 15, 0, 4);
    } else if (type === 6) {
        // 6: Вытянутый овал
        ellipse(offset + 15, -5, 25, 8);
    } else if (type === 7) {
        // 7: Маленький квадратный листик под углом
        translate(offset + 12, 0);
        rotate(PI / 4);
        rectMode(CENTER);
        rect(0, 0, 10, 10);
    }

    pop(); // Возвращаем настройки холста в исходное состояние
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