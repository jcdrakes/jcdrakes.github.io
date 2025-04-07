let starImg;
let stars = [];

function preload(){
    
  starImg = loadImage('website assets/star.png');
}

function setup() {
  createCanvas(1900, 2000);

  let canvasElement = select('canvas');
  canvasElement.style('position', 'absolute');
  canvasElement.style('top', '0px');
  canvasElement.style('left', '0px');
  canvasElement.style('z-index', '-1');


  for (let i = 0; i < 10; i++) {
    stars.push(new Star(random(width), random(height), starImg));
  }
}

function draw() {
  background('white');
  for (let star of stars) {
    star.update();
    star.display();
  }
}

class Star {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.size = random(30, 60);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-1, -3);
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.x < 0 || this.x > width) this.xspeed *= -1;
    if (this.y < 0 || this.y > height) this.yspeed *= -1;
  }

  display() {
    image(this.img, this.x, this.y, this.size, this.size);
  }
}