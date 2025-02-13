var x = 0;
var y = 0;
var l = 0;
let drops = [];  // Array to store raindrops

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(135, 206, 235);

  //clouds
  for(var l = 0; l < 999; l++){
    rect((l * 10) % width,(l * 50) % height,90,15,70);
    fill('#ffffff');
  }

  // sun
  fill("rgb(254, 255, 0)");
  stroke("orange");
  strokeWeight(20);
  rect(x, y, 100, 100, 100);
  x = x + 1;
  x = x % 700;
  y = y + 1;
  y = y % 100;

  // rain effect
  let drop = new Raindrop(mouseX, mouseY);
  drops.push(drop);

  for (let i = drops.length - 1; i >= 0; i--) {
    drops[i].update();
    drops[i].show();
    if (drops[i].y > height) {
      drops.splice(i, 1);  //
    }
  }

  // mountains 
  // middle
  translate(width / 12, height / 1.7);
  stroke(0);
  strokeWeight(1);
  fill("#8c620d");
  triangle(100, 300, 500, 300, 300, 100);

  // right
  translate(width / 2, height / 60);
  stroke(0);
  strokeWeight(1);
  fill("#75510b");
  triangle(100, 300, 500, 300, 300, 100);

  // left
  translate(width / -1.6, height / 90);
  stroke(0);
  strokeWeight(1);
  fill("#75510b");
  triangle(100, 300, 500, 300, 300, 100);
}

// Raindrop class
class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(4, 8);  // Random speed for raindrops
  }

  update() {
    this.y += this.speed;  // Move raindrop down
  }

  show() {
    stroke('#0000ff');
    strokeWeight(3);
    line(this.x, this.y, this.x, this.y + 10);  // Draw raindrop
  }
}