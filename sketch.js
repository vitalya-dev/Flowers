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
    // Размер одной ячейки (блока) растения
    let cellSize = 40;
    // Базовая линия (земля), откуда растут цветы
    let startY = height - 150;

    // Проходим по горизонтали холста
    for (let x = 120; x < width - 100; x += 80) {
        // Случайная высота растения: от 5 до 12 ячеек
        let plantHeight = floor(random(5, 13));

        // Цикл постройки растения снизу вверх
        for (let i = 0; i < plantHeight; i++) {
            let currentY = startY - i * cellSize;

            // ВЕРХУШКА: если это самая последняя ячейка, всегда рисуем цветок
            if (i === plantHeight - 1) {
                let flowerType = floor(random(3));
                drawFlower(x, currentY, cellSize, flowerType);
            }
            // ОСНОВА И ЛИСТЬЯ: для всех остальных ячеек
            else {
                // Обязательно рисуем стебель
                let stemType = floor(random(6));
                drawStem(x, currentY, cellSize, stemType);

                // Логика умного распределения листьев
                let leafProbability = 0;

                // В самом низу (i === 0) листья не растут, поэтому проверяем только ячейки выше
                if (i > 0) {
                    // Вычисляем, где мы находимся (от 0 до 1, где 0 - низ, 1 - верхушка)
                    let normalizedPos = i / (plantHeight - 2);

                    // Если мы находимся в центральной части стебля
                    if (normalizedPos >= 0.3 && normalizedPos <= 0.7) {
                        leafProbability = 0.7; // 70% шанс на лист
                    } else {
                        // Если мы ближе к низу или к самому цветку
                        leafProbability = 0.3; // 30% шанс на лист
                    }

                    // Бросаем виртуальный кубик от 0 до 1. Если выпало меньше нашей вероятности — рисуем!
                    if (random() < leafProbability) {
                        let leafType = floor(random(8));
                        let isLeft = random() > 0.5; // Случайно выбираем сторону (лево/право)
                        drawLeaf(x, currentY, cellSize, leafType, isLeft);
                    }
                }
            }
        }
    }
}

function drawFlower(x, y, size, type) {
    push();
    translate(x, y); // Смещаем координаты в центр верхней ячейки

    stroke(0);
    strokeWeight(2);

    // ДОБАВЛЕНО: Рисуем соединительный стебель, чтобы закрыть разрыв
    // Он идет от центра цветка вниз до границы ячейки
    line(0, 0, 0, size / 2);

    // Создаем палитру для цветов
    let colorPink = color(255, 100, 150);
    let colorPurple = color(150, 50, 250);
    let colorYellow = color(255, 200, 50);
    let colorMint = color(150, 255, 150);

    if (type === 0) {
        // Тип 0: Похож на тюльпан (полукруг снизу, два лепестка сверху)
        fill(colorPurple);
        arc(0, 0, size, size, 0, PI); // Нижняя чаша

        fill(colorPink);
        triangle(-size / 2, 0, -size / 4, -size / 2, 0, 0); // Левый лепесток
        triangle(0, 0, size / 4, -size / 2, size / 2, 0); // Правый лепесток

        // Черные точки-глазки внутри
        fill(0);
        circle(-size / 4, size / 4, 6);
        circle(size / 4, size / 4, 6);

        // Парящая точка сверху
        circle(0, -size / 2 - 10, 6);
        line(0, -size / 2, 0, -size / 2 - 5);
    } else if (type === 1) {
        // Тип 1: Геометрический квадрат
        fill(colorPink);
        rectMode(CENTER);
        rect(0, -size / 4, size, size);

        fill(colorYellow);
        arc(-size / 2, -size / 4, size, size, -PI / 2, PI / 2); // Полукруг внутри квадрата

        fill(colorPurple);
        triangle(
            0,
            -size / 4,
            size / 2,
            -size / 4 - size / 2,
            size / 2,
            -size / 4 + size / 2,
        );

        // Парящие точки сверху
        fill(0);
        circle(0, -size / 4 - size / 2 - 8, 4);
        fill(255, 100, 100);
        circle(-10, -size / 4 - size / 2 - 5, 4);
        circle(10, -size / 4 - size / 2 - 5, 4);
    } else if (type === 2) {
        // Тип 2: Строгий прямоугольник с дугой
        fill(colorMint);
        rectMode(CENTER);
        rect(0, 0, size, size * 0.8);

        fill(colorMint);
        arc(0, -size * 0.4, size, size / 2, -PI, 0); // Крышечка

        // Линии и точки
        line(-size / 2 + 5, 0, size / 2 - 5, 0);
        fill(0);
        circle(-size / 4, -10, 5);
        circle(size / 4, -10, 5);

        // Парящие точки
        fill(30, 120, 50);
        circle(0, -size * 0.4 - 10, 5);
        circle(-10, -size * 0.4 - 5, 3);
        circle(10, -size * 0.4 - 5, 3);
    }

    pop();
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
