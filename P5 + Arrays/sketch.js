var words = [];
var input, button;
var sparksArray = [];
var balloons = [];
var balloonTimer = 0;
var sparksTimer = 0;

function setup() {
createCanvas(1890, 800);

//input for text and button, create sparks and balloons
  input = createInput();
  input.position(820, height + 35);

  button = createButton('Add Word');
  button.position(input.x + input.width + 10, height + 35);
  button.mousePressed(addWord);

  createBalloons();
  createSparks();
}

function draw() {
  background('#000000');

  //word array
  for (var i = words.length - 1; i >= 0; i--) {
    words[i].update();
    words[i].display();
    
    if (words[i].isDead()) {
      words.splice(i, 1);
    }
    
  }
 //balloon array
 for (var i = balloons.length - 1; i >= 0; i--) {
    balloons[i].update();
    balloons[i].display();
 }
 if (frameCount - balloonTimer >= 60) {
    createBalloons();
    balloonTimer = frameCount; 
}

// sparks array
for (let i = sparksArray.length - 1; i >= 0; i--) {
    sparksArray[i].update();
    sparksArray[i].display();
  }
  if (frameCount - sparksTimer >= 150){
    createSparks();
    sparksTimer = frameCount;
  }
}

//add word function
function addWord() {
  var newWord = input.value();
  var wordObject = new Word(newWord, random(width), random(height));
  words.push(wordObject);
  input.value('');
}

//create balloon function
function createBalloons() {
    for (var b = 0; b < 5; b++) {
      var balloon = new Balloon(random(width), random(height));
      balloons.push(balloon);
    }
  }

//create sparks function
function createSparks(){
    for (var s = 0; s < 10; s++ ) {
        var spark = new Sparks (random(width / 4, 3 * width / 4), random(height));  // Random starting position
    sparksArray.push(spark);
    }
}

//classes

//word
class Word {
  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.size = random(16, 32);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.lifespan = 600;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.lifespan -= 1;
    
    if (this.x < 0 || this.x > width) this.velocity.x *= -1;
    if (this.y < 0 || this.y > height) this.velocity.y *= -1;
  }

  display() {
    fill(255, this.lifespan);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

//balloons
class Balloon {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = random(30, 60);
      this.xspeed = random(-2, 2);
      this.yspeed = random(-1, -3);
      this.colour = color(random(255), random(255), random(255));
    }
  
    update() {
      this.x += this.xspeed;
      this.y += this.yspeed;
      
      if (this.x < 0 || this.x > width) this.xspeed *= -1;
      if (this.y < 0) this.yspeed *= -1;
    }
  
    display() {
      fill(this.colour);
      noStroke();
      ellipse(this.x, this.y, this.size);
    }
  }

  //sparks
  class Sparks {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 2;
      this.xspeed = random(-2, 2);
      this.yspeed = random(-1, -3);
      this.colour = color(255, 255, 255);
    }
  
    update() {
      this.x += this.xspeed;
      this.y += this.yspeed;
      
      if (this.x < 0 || this.x > width) this.xspeed *= -1;
      if (this.y < 0) this.yspeed *= -1;
    }
  
    display() {
      fill(this.colour);
      noStroke();
      rect(this.x, this.y, this.size , this.size *5); 
    }
}
/*refs
https://p5js.org/reference/p5/push/
https://p5js.org/examples/classes-and-objects-snowflakes/
https://archive.p5js.org/examples/simulate-particles.html
https://p5js.org/reference/p5/class/
https://p5js.org/reference/p5/stroke/
*/

