let tiredness = 0;
const TIREDNESS_THRESHOLD = 100;

let lastInteractionTime = 0;
let idleDelay = 90 * 1000; 
let currentState = "idle";

// touch
let touchStartTime = 0;
let touchStartX = 0;
let touchStartY = 0;

// tap
let lastTapTime = 0;
let rapidTapThreshold = 400;
let currentTapDetected = false;

// stressed timer 
let stressedStartTime = 0;
const stressedDuration = 500;

// cursor
let cursorX = 0;
let cursorY = 0;
let cursorActive = false;

// character animations
let character;
let idleAnimation, normalAnimation, angryAnimation, stressedAnimation;
let sparkleAnimation, sweatAnimation, tenseAnimation;

function preload() {
  idleAnimation = loadAnimation("animations/idle/I_1.png","animations/idle/I_2.png","animations/idle/I_3.png","animations/idle/I_4.png","animations/idle/I_5.png");
  normalAnimation = loadAnimation("animations/normal/N_1.png","animations/normal/N_2.png","animations/normal/N_3.png","animations/normal/N_4.png","animations/normal/N_5.png","animations/normal/N_6.png");
  angryAnimation = loadAnimation("animations/angry/A_1.png","animations/angry/A_2.png","animations/angry/A_3.png","animations/angry/A_4.png","animations/angry/A_5.png");
  stressedAnimation = loadAnimation("animations/stressed/S_1.png","animations/stressed/S_2.png","animations/stressed/S_3.png");
  sparkleAnimation = loadAnimation("animations/sparkle/SP_1.png","animations/sparkle/SP_2.png","animations/sparkle/SP_3.png","animations/sparkle/SP_4.png");
  sweatAnimation = loadAnimation("animations/sweat/SW_1.png","animations/sweat/SW_2.png","animations/sweat/SW_3.png");
  tenseAnimation = loadAnimation("animations/tense/T_1.png","animations/tense/T_2.png","animations/tense/T_3.png","animations/tense/T_4.png","animations/tense/T_5.png","animations/tense/T_6.png");
}

function setup() {
  createCanvas(720, 405);

  character = new Sprite(width / 1.55, height / 2);
  character.scale = 0.17;
  character.collider = "none";

  character.addAnimation("idle", idleAnimation);
  character.addAnimation("normal", normalAnimation);
  character.addAnimation("angry", angryAnimation);
  character.addAnimation("stressed", stressedAnimation);
  character.addAnimation("sparkle", sparkleAnimation);
  character.addAnimation("sweat", sweatAnimation);
  character.addAnimation("tense", tenseAnimation);

  idleAnimation.frameDelay = 9;    
  normalAnimation.frameDelay = 6;
  angryAnimation.frameDelay = 6;
  stressedAnimation.frameDelay = 6;
  sparkleAnimation.frameDelay = 6;
  sweatAnimation.frameDelay = 6;
  tenseAnimation.frameDelay = 6;

  character.changeAnimation("idle");
}

function draw() {
  background("ffffff");

  updateTiredness();
  updateStateMachine();
  drawUI();
  drawCursor();
}

function updateTiredness() {
  tiredness -= 0.009;
  tiredness = constrain(tiredness, 0, 100);

   if (tiredness >= 100 && currentState !== "tense") {
    currentState = "tense";
}
}

function updateStateMachine() {
  const now = millis();

  // rapid tap
  if (currentState === "sweat") {
    character.changeAnimation("sweat");
    if (now - stressedStartTime > stressedDuration) {
      currentState = "active"; // go back to normal after duration
    }
    return;
  }

  // swipe / stressed
  if (currentState === "stressed") {
    character.changeAnimation("stressed");
    if (now - stressedStartTime > stressedDuration) {
      currentState = "active"; // go back to normal after duration
    }
    return;
  }

  // tense
  if (currentState === "tense") {
    character.changeAnimation("tense");
    tiredness -= 0.07;
    if (tiredness <= 80) currentState = "idle";
    return;
  }

  // long press
  if (currentState === "sparkle") {
    character.changeAnimation("sparkle");
    if (now - lastInteractionTime > 1000) currentState = "active";
    return;
  }

  // angry + tense thresholds
  if (tiredness >= 75 && tiredness < 100) {
    currentState = "angry";
    character.changeAnimation("angry");
    return;
  }
  if (tiredness >= 100) {
    currentState = "tense";
    character.changeAnimation("tense");
    return;
  }

  // Normal / idle
  if (currentState === "active") {
    character.changeAnimation("normal");
    return;
  }
  if (currentState === "idle") {
    character.changeAnimation("idle");
    return;
  }
}

function touchStarted() {
  if (currentState === "tense") return false;
  touchStartTime = millis();
  touchStartX = mouseX;
  touchStartY = mouseY;
  cursorX = mouseX;
  cursorY = mouseY;
  cursorActive = true;
  return false;
}

function touchMoved() {
  cursorX = mouseX;
  cursorY = mouseY;
  cursorActive = true;
  return false;
}

function touchEnded() {
  if (currentState === "tense") return false;

  const dt = millis() - touchStartTime;
  const distMoved = dist(touchStartX, touchStartY, mouseX, mouseY);

  lastInteractionTime = millis();
  currentState = "active";
  cursorActive = false;

  // Long press → sparkle
  if (dt > 500 && distMoved < 10) {
    tiredness -= 5;
    currentState = "sparkle";
    lastInteractionTime = millis();
    return false;
  }

  // Swipe → stressed
  if (distMoved > 80) {
    tiredness += 5;
    currentState = "stressed";
    stressedStartTime = millis();
    return false;
  }

  // Quick tap
  if (dt < 200 && distMoved < 10) {
    const now = millis();
    if (now - lastTapTime < rapidTapThreshold) {
      tiredness += 8;
      currentState = "sweat";
      stressedStartTime = now;
    } else {
      tiredness += 2;
    }
    lastTapTime = now;
    return false;
  }

  return false;
}

function drawCursor() {
  if (!cursorActive) return;
  push();
  noStroke();
  fill("green");
  ellipse(cursorX, cursorY, 25, 25);
  pop();
}

function drawUI() {
  push();
  noStroke();
  fill(50, 50, 60);
  rect(20, 20, width - 40, 30, 5);

  let barWidth = map(tiredness, 0, 100, 0, width - 40);
  fill(tiredness >= TIREDNESS_THRESHOLD ? color(255,100,100) : color(100,255,100));
  rect(20, 20, barWidth, 30, 5);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(`Tiredness meter: ${floor(tiredness)}`, width / 2, 35);

  push();
  fill("black");
  textAlign(LEFT, BOTTOM);
  textSize(12);

  let startX = 10;
  let startY = height - 100;
  let boxWidth = 20;

  text("Instructions!", startX, startY - boxWidth * 9);
  text("Hui gets tired after too much use, \n and when he does he gets \n tense and shuts down.", startX, startY - boxWidth * 6);
  text("Inputs: Tap, Press, Swipe", startX, startY - boxWidth * 5);
  text("Quick Tap = increases tiredness", startX, startY - boxWidth * 4);
  text("Long Press = decreases tiredness", startX, startY - boxWidth * 3);
  text("Swipe = increases tiredness", startX, startY - boxWidth * 2);
  text("Rapid Tap = heavily increases tiredness \n and stress", startX, startY);
  text("*Please turn phone Landscape!", startX, startY +1 * boxWidth);
  pop();
}

