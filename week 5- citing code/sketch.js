let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let catclock;

function preload() {
  catclock = createImage('catclock.jpg');
}

function setup(){
    createCanvas(900, 1100);
    stroke(255);
    colorMode(HSB);
  angleMode(DEGREES);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  //image
  
  

  describe('Functioning pink clock on a grey background.');

  angleMode(DEGREES);

  describe('Two eyes that follow the cursor.');

}

function draw(){
    background('lightblue')
    translate(width / 2, height / 2);

//clock example: https://p5js.org/examples/calculating-values-clock/

  // Draw the clock background
  noStroke();
  fill("grey");
  ellipse(0, 0, clockDiameter + 25, clockDiameter + 25);
  fill('black');
  ellipse(0, 0, clockDiameter, clockDiameter);

  // Calculate angle for each hand
  let secondAngle = map(second(), 0, 60, 0, 360);
  let minuteAngle = map(minute(), 0, 60, 0, 360);
  let hourAngle = map(hour(), 0, 12, 0, 360);

  stroke(255);

  // Second hand
  push();
  rotate(secondAngle);
  strokeWeight(1);
  line(0, 0, 0, -secondsRadius);
  pop();

  // Minute hand
  push();
  strokeWeight(2);
  rotate(minuteAngle);
  line(0, 0, 0, -minutesRadius);
  pop();

  // Hour hand
  push();
  strokeWeight(4);
  rotate(hourAngle);
  line(0, 0, 0, -hoursRadius);
  pop();

  // Tick markers around perimeter of clock
  push();
  strokeWeight(2);
  for (let ticks = 0; ticks < 60; ticks += 1) {
    point(0, -secondsRadius);
    rotate(6);
  }

  //aim example: https://p5js.org/examples/angles-and-motion-aim/
    // Draw left eye

    let leftX = 150;
    let leftY = 200;
    
  
    // Calculate angle between left eye and mouse
    let leftAngle = atan2(mouseY - leftY, mouseX - leftX);
  
    push();
    translate(leftX, leftY);
    fill(255);
    ellipse(0, 0, 50, 50);
    rotate(leftAngle);
    fill(0);
    ellipse(12.5, 0, 25, 25);
    pop();
  
    // Draw right eye
  
    let rightX = 0;
    let rightY = 200;
  
    // Calculate angle between right eye and angle
    let rightAngle = atan2(mouseY - rightY, mouseX - rightX);
  
    push();
    translate(0, 10);
    fill(255);
    ellipse(0, 0, 50, 50);
    rotate(rightAngle);
    fill(0);
    ellipse(0, 2, 30, 10);
    pop();
  pop();


}


