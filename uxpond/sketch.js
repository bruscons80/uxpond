let scaleFactor = 1;
let scaling = false;
let scaleTimer = 0;

let blinking = false;
let blinkAmount = 0;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);
}

function draw() {
  background(220);

  // Quando clicado, controle de escala
  if (scaling) {
    scaleFactor = 1.5;
    scaleTimer++;
    if (scaleTimer > 20) {
      scaling = false;
      scaleTimer = 0;
    }
  } else {
    scaleFactor = lerp(scaleFactor, 1, 0.1);
  }

  // Função para piscar
  if (blinking) {
    blinkAmount = lerp(blinkAmount, 1, 0.2);
    if (blinkAmount > 0.95) blinking = false;
  } else {
    blinkAmount = lerp(blinkAmount, 0, 0.1);
  }

  push();
  translate(width / 2, height / 2);
  scale(scaleFactor);

  // Olho
  noStroke();
  fill(255);
  ellipse(0, 0, 300, 200 * (1 - blinkAmount));

  // Direção da pupila, e pra onde vai
  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  let angle = atan2(dy, dx);
  let distMax = 50;
  let px = cos(angle) * distMax;
  let py = sin(angle) * distMax;

  // pupila e íris
  fill(100, 150, 255);
  ellipse(px, py, 80, 80 * (1 - blinkAmount));
  fill(0);
  ellipse(px, py, 30, 30 * (1 - blinkAmount));

  pop();
}

// Clicar mouse
function mousePressed() {
  scaling = true;
}

// Clicar espaço faz olho piscar
function keyPressed() {
  if (key === ' ') {
    blinking = true;
  }
}

