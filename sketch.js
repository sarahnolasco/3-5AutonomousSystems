
let flowers = [];
let sparkles = [];

let flowerColors = [
  "#FF8FAB",
  "#C8A2FF",
  "#FFD166",
  "#FFB38A",
  "#A0C4FF",
  "#BDB2FF",
  "#CAFFBF",
  "#F4A7D9",
  "#F9E076"
];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvas-holder");

  generateGarden();
}

function draw() {
  background("#FFF5E9");

  drawBackground();

  // Draw all the flowers
  for (let i = 0; i < flowers.length; i++) {
    drawFlower(flowers[i]);
  }

  // Draw floating sparkles
  drawSparkles();
}

// Create a new garden
function generateGarden() {

  flowers = [];
  sparkles = [];

  // Generate 35 flowers
  for (let i = 0; i < 35; i++) {

    let flower = {
      x: random(30, width - 30),
      y: random(130, 420),
      size: random(20, 48),
      petals: floor(random(5, 10)),
      color: random(flowerColors),
      stemHeight: random(90, 190),
      curve: random(-70, 70),
      rotation: random(TWO_PI),
      movement: random(0.02, 0.05),
      phase: random(TWO_PI)
    };

    flowers.push(flower);
  }

  // Generate floating decorative dots
  for (let i = 0; i < 45; i++) {

    sparkles.push({
      x: random(width),
      y: random(height),
      size: random(2, 6),
      phase: random(TWO_PI)
    });
  }
}

// Draw the background
function drawBackground() {

  noStroke();

  // First flowing hill
  fill("#F8DDE5");

  beginShape();

  vertex(0, 440);
  curveVertex(0, 440);
  curveVertex(150, 390);
  curveVertex(300, 450);
  curveVertex(480, 390);
  curveVertex(650, 430);
  curveVertex(800, 380);

  vertex(800, 600);
  vertex(0, 600);

  endShape(CLOSE);

  // Second flowing hill
  fill("#DDEBCF");

  beginShape();

  vertex(0, 500);
  curveVertex(0, 500);
  curveVertex(200, 440);
  curveVertex(400, 510);
  curveVertex(600, 450);
  curveVertex(800, 490);

  vertex(800, 600);
  vertex(0, 600);

  endShape(CLOSE);
}

// Draw an individual flower
function drawFlower(flower) {

  // Gentle swaying movement
  let sway = sin(
    frameCount * flower.movement + flower.phase
  ) * 5;

  let flowerX = flower.x + sway;

  // Draw curved stem
  stroke("#66845B");
  strokeWeight(3);
  noFill();

  bezier(
    flowerX,
    flower.y,
    flowerX + flower.curve,
    flower.y + flower.stemHeight * 0.4,
    flowerX - flower.curve,
    flower.y + flower.stemHeight * 0.7,
    flowerX,
    flower.y + flower.stemHeight
  );

  // Draw leaves
  drawLeaf(
    flowerX - 5,
    flower.y + flower.stemHeight * 0.5,
    -0.7
  );

  drawLeaf(
    flowerX + 5,
    flower.y + flower.stemHeight * 0.75,
    0.7
  );

  // Draw flower petals
  push();

  translate(flowerX, flower.y);

  rotate(flower.rotation);

  noStroke();
  fill(flower.color);

  for (let i = 0; i < flower.petals; i++) {

    let angle = TWO_PI / flower.petals * i;

    push();

    rotate(angle);

    ellipse(
      0,
      -flower.size * 0.35,
      flower.size * 0.42,
      flower.size * 0.7
    );

    pop();
  }

  // Draw flower center
  fill("#F4C95D");

  circle(
    0,
    0,
    flower.size * 0.35
  );

  pop();
}

// Draw leaves
function drawLeaf(x, y, angle) {

  push();

  translate(x, y);
  rotate(angle);

  noStroke();
  fill("#91B77B");

  ellipse(
    0,
    -10,
    13,
    27
  );

  pop();
}

// Draw floating sparkles
function drawSparkles() {

  noStroke();

  for (let i = 0; i < sparkles.length; i++) {

    let sparkle = sparkles[i];

    let floatingY =
      sparkle.y +
      sin(frameCount * 0.025 + sparkle.phase) * 5;

    fill("#E9B85B");

    circle(
      sparkle.x,
      floatingY,
      sparkle.size
    );
  }
}

// Click to generate a new garden
function mousePressed() {

  generateGarden();
}

// Press S to save artwork
function keyPressed() {

  if (key === "s" || key === "S") {

    saveCanvas(
      "world-of-wildflowers",
      "png"
    );

  }
}