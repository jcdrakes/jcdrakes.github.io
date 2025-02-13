function setup(){
    createCanvas(1350, 650);
}

var ball = {  //object 1
    x: 50,
    y: 80,
    xSpeed: 1,
    ySpeed: 0,
    colour: 'pink',
    draw: function(){
        fill( ball.colour );
        circle(ball.x, ball.y, 80,30, 30);
    },
    move: function(){
        ball.x = (ball.x + 1) % width;
        ball.y = (ball.y + 0) % height;
    }
};

var thing= {  //object 2
    x: 60,
    y: 30,
    w: 30,
    h: 30,
    xSpeed: 2,
    ySpeed: 1.5,
    colour: 'red',
    draw: function(){
        fill( thing.colour );
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        thing.x = (thing.x + 2) % width;
        thing.y = (thing.y + 3) % height;

        if(this.x < 0 || this.x > width){
            this.xSpeed *= -1;
        }
        if(this.y > height || this.y < 0){
            this.ySpeed *= -1;
        }
    }
};

var slow = {  //object 3
    x: 0,
    y: 0,
    colour: 'orange',
    draw: function(){
        fill( slow.colour );
        triangle(this.x, this.y, 1, 80, 80, 2);
    },
};

var runner= {  //object 4
    x: 60,
    y: -40,
    w: 80,
    h: 45,
    xSpeed: 5,
    ySpeed: 5,
    colour: 'yellow',
    draw: function(){
        fill( runner.colour );
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        runner.x = (runner.x + 3) % width;
        runner.y = (runner.y + 4) % height;

        if(this.x < 0 || this.x > width){
            this.xSpeed *= -1;
        }
        if(this.y > height || this.y < 0){
            this.ySpeed *= -1;
        }
    }
};

var finishl = {  //object 2
    x: 1300,
    y: 6,
    w: 30,
    h: 1920,
    xSpeed: 5,
    ySpeed: 5,
    colour: 'white',
    draw: function(){
        fill( finishl.colour );
        rect(this.x, this.y, this.w, this.h);
        translate();
    }
}

function draw(){
    background('#e6d5a8');
    ball.draw();
    ball.move();
    thing.draw();
    thing.move();
    slow.draw();
    runner.draw();
    runner.move();
    finishl.draw()
;
}

