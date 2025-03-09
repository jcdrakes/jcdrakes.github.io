let img1;
let pupilX = -100;
let leftEyeX = 125; 
let rightEyeX = -100;
let speed = 2; 

// white ellipse
let whiteEllipseX = 125;
let whiteEllipseY = -540;
let whiteEllipseWidth = 155;
let whiteEllipseHeight = 160;

function preload() {
  img1 = loadImage('catclock.jpg');
}

function setup(){
    createCanvas(900, 1100);
    stroke(10);
    colorMode(HSB);
    angleMode(DEGREES);

    let radius = min(width, height) / 2;
    secondsRadius = radius * 0.3;
    minutesRadius = radius * 0.25;
    hoursRadius = radius * 0.15;
    clockDiameterW = radius * 2.1;
    clockDiameterH = radius * 2.6;

    describe('Functioning pink clock on a grey elliptical background.');
    angleMode(DEGREES);
    describe('Two eyes that move horizontally.');
}

function draw(){
    background('black');
    translate(width / 2, height / 2);

    // Cat clock image
    let imgWidth = img1.width * 2;
    let imgHeight = img1.height * 2;
    image(img1, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);

    // clock example: https://p5js.org/examples/calculating-values-clock/
    let clockOffsetY = 100;

    noStroke();
    fill("white");
    ellipse( width / 250, height / 7 + clockOffsetY, clockDiameterW * 0.32, clockDiameterH * 0.32);  // Elliptical shape

    fill('black');
    ellipse(width / 250, height / 7 + clockOffsetY, clockDiameterW * 0.3, clockDiameterH * 0.3);  // Smaller black ellipse for the clock face

    // angle for each hand
    let secondAngle = map(second(), 0, 60, 0, 360);
    let minuteAngle = map(minute(), 0, 60, 0, 360);
    let hourAngle = map(hour(), 0, 12, 0, 360);

    stroke(255);

    // Second hand
    push();
    translate(width / 250, height / 7 + clockOffsetY);
    rotate(secondAngle);
    strokeWeight(1);
    line(0, 0, 0, -secondsRadius); // Keep the same radius
    pop();

    // Minute hand
    push();
    translate(width / 250, height / 7 + clockOffsetY);
    strokeWeight(2);
    rotate(minuteAngle);
    line(0, 0, 0, -minutesRadius); // Keep the same radius
    pop();

    // Hour hand
    push();
    translate(width / 250, height / 7 + clockOffsetY);
    strokeWeight(4);
    rotate(hourAngle);
    line(0, 0, 0, -hoursRadius); // Keep the same radius
    pop();

    // Tick markers
    push();
    translate(width / 250, height / 7 + clockOffsetY);
    strokeWeight(2);
    for (let ticks = 0; ticks < 60; ticks += 1) {
        point(0, -secondsRadius);
        rotate(6);
    }
    translate();

    // aim example: https://p5js.org/examples/angles-and-motion-aim/

    // pupil movement
    
    pupilX = pupilX + speed;

    let leftBound = whiteEllipseX - whiteEllipseWidth / 2 + 45;
    let rightBound = whiteEllipseX + whiteEllipseWidth / 2 - 45; 

    if (pupilX > rightBound || pupilX < leftBound) {
        speed = -speed;
    }

    leftEyeX = leftEyeX + speed;                                    // added to replicate the hotizontal movement of the original kitkat clocks
    rightEyeX = rightEyeX + speed;

    if (leftEyeX > rightBound || leftEyeX < leftBound) {
        speed = -speed;
    }

    if (rightEyeX > rightBound || rightEyeX < leftBound) {
        speed = -speed;
    }

    let leftY = 200;
    let leftAngle = atan2(mouseY - leftY, mouseX - leftY);
    // left eye
    push();
    translate(120, -540);
    fill(255);
    ellipse(0, 0, 155, 160);
    fill(0);
    pop();
    // left pupil
    push();
    translate(leftEyeX, -540);
    rotate(leftAngle);
    ellipse(0, 2, 15.5, 90);
    pop();

    let rightY = 200;
    let rightAngle = atan2(mouseY - rightY, mouseX - rightY);
    // right eye
    push();
    translate(-100, -540);
    fill(255);
    ellipse(0, 0, 155, 160);
    fill(0);
    pop();
    // right pupil
    push();
    translate(rightEyeX, -540)
    rotate(rightAngle);
    ellipse(0, 2, 15.5, 90);
    pop();
}

//refs
// eyes moving back and forth: https://editor.p5js.org/atharvapatil/sketches/r1cXsk_YX
