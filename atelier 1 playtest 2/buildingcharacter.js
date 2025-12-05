let character;
let idleAni;
let awakeAni;

// eye parameters
let leftEye = { x: 245, y: 400, w: 100, h: 160 };
let rightEye = { x: 405, y: 400, w: 100, h: 160 };
let pupilRadius = 10;

let drawingPath = [];

let lastInteractionTime = 0;
let idleDelay = 90 * 1000;  // 1.5 min

let orientationOverlay;

function preload() {
  idleAni = loadAni("S_1.png", 2);
  awakeAni = loadAni("A_1.png", 1);
}

function setup() {
  createCanvas(655, 405);
  createOrientationOverlay();

  character = new Sprite(width / 2.2, height / 2.2);
  character.scale = 0.233;
  character.physics = "none";

  character.addAni("idle", idleAni);
  character.addAni("awake", awakeAni);

  character.changeAni("idle");
  character.ani.frameDelay = 8;

  lastInteractionTime = millis();
}

function draw() {
  checkOrientation();

  background("white");

  // sprite position
  character.x = width / 2.03;
  character.y = height / 2.15;

  // Draw path
  stroke(0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let p of drawingPath) vertex(p.x, p.y);
  endShape();

  let interacting = mouseIsPressed || touches.length > 0;

  if (interacting) {
    lastInteractionTime = millis();
    character.changeAni("awake");
    character.ani.frameDelay = 3;

    if (isPointOnSprite(mouseX, mouseY, character)) {
      drawingPath.push({ x: mouseX, y: mouseY });
    }
  } else {
    if (millis() - lastInteractionTime > idleDelay) {
      character.changeAni("idle");
      character.ani.frameDelay = 12;
    }
  }

  // eye tracking
  drawEye(leftEye);
  drawEye(rightEye);
}

function doubleClicked() {
  drawingPath = [];
}

// bounding box
function isPointOnSprite(px, py, spr) {
  return (
    px > spr.x - spr.w / 2 &&
    px < spr.x + spr.w / 2 &&
    py > spr.y - spr.h / 2 &&
    py < spr.y + spr.h / 2
  );
}

// touch + mouse 
function getInput() {
  if (touches.length > 0) return { x: touches[0].x, y: touches[0].y };
  return { x: mouseX, y: mouseY };
}

// pupil position
function getPupilPosition(eye, input) {
  let dx = input.x - eye.x;
  let dy = input.y - eye.y;

  // Normalize to ellipse space
  let nx = dx / (eye.w / 2);
  let ny = dy / (eye.h / 2);

  let distNorm = sqrt(nx * nx + ny * ny);

  if (distNorm > 1) {
    nx /= distNorm;
    ny /= distNorm;
  }

  return {
    x: eye.x + nx * (eye.w / 2 - pupilRadius),
    y: eye.y + ny * (eye.h / 2 - pupilRadius)
  };
}

function drawEye(eye) {
  let input = getInput();
  let pupil = getPupilPosition(eye, input);

  // White ellipse
  push();
  fill(255);
  noStroke();
  ellipse(eye.x, eye.y, eye.w, eye.h);
  pop();

  // Pupil
  push();
  fill(0);
  ellipse(pupil.x, pupil.y, pupilRadius * 2);
  pop();
}

// orientation overlay
function createOrientationOverlay() {
  orientationOverlay = createDiv(`
    <div style="
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.85);
      color: white;
      font-size: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      z-index: 99999;
      padding: 20px;
      font-family: Arial, sans-serif;
    ">
      Please rotate your phone to <b> LANDSCAPE </b> to continue.
    </div>
  `);
}

function checkOrientation() {
  if (windowHeight > windowWidth) {
    orientationOverlay.show();
    noLoop();
  } else {
    orientationOverlay.hide();
    loop();
  }
}

