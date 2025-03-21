let playing = false;
let video;
let button;
let img;

//load video 
function preload() {
    video = createVideo('mmorpg_addict.mp4');
    
}

function setup(){
    translate (0,0);

    createCanvas(1650, 800);     

    //play pause button
  button = createButton('play');
    button.mousePressed(toggleVid);
    button.position(950, 720);
    button.size(100,30)
    button.style('font-size', '20px');

    //video size and position
  video.size(800, 600);
  video.position(590, 150)

  //miku image
  imgElement = createImg('mikustamp.png');
  imgElement.position(1400, 310);
  imgElement.size(500, 600);
  imgElement.style('z-index', '2'); 
  
}

//for video
function toggleVid(){
    if (playing == true) {
        video.pause();
        button.html('play');
} else {
    video.loop();
    button.html('pause');
  }

    playing = !playing;
}

//to draw the background and image
function draw(){
    background('#b4f9fa');

  //image (creating a frame around the video)
  img = createImage(1100,500);
  img.loadPixels();


for (let x = 0; x < img.width; x += 1) {
  for (let y = 0; y < img.height; y += 1) {
    img.set(x, y, 255);
  }
}


img.updatePixels();
image(img, 290, 120);


}

//refs
//https://p5js.org/reference/p5/createImage/
//https://p5js.org/examples/imported-media-video/
//https://p5js.org/reference/p5.Element/size/#:~:text=Reference%20size()-,size(),20%2C%20height:%2010%20%7D%20.&text=The%20second%20parameter%2C%20'height%20%2C,until%20after%20the%20data%20loads.
//https://stackoverflow.com/questions/72257526/how-to-overlay-a-shape-on-a-video-in-p5js

