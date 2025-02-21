let hueSlider;
let mySelect;
let img1, img2, img3, img4, img5, img6;
let imgWithHue;
let prevHueValue = 0;
let resetbutton;
let originalImages = {};

function preload() {
  img1 = loadImage('body.png');
  img2 = loadImage('shirt.png');
  img3 = loadImage('sleeve.png');
  img4 = loadImage('eyes.png');
  img5 = loadImage('one.png');
  img6 = loadImage('hair.png');

   // original images (for reset)
   originalImages.body = img1;
   originalImages.shirt = img2;
   originalImages.sleeve = img3;
   originalImages.eyes = img4;
   originalImages.one = img5;
   originalImages.hair = img6;

   // reset button
  resetbutton = createButton('Reset');
  resetbutton.position(150, 720);
  resetbutton.mousePressed(resetImages);
}

function setup() {
  createCanvas(600, 700);
  background('#ffe0ef');

  //hue slider
  hueSlider = createSlider(0, 600, 0);
  hueSlider.position(250, 720);

  // dropdown menu 
  mySelect = createSelect();
  mySelect.option('hair');
  mySelect.option('eyes');
  mySelect.option('shirt');
  mySelect.option('sleeve');
  mySelect.option('01');
  mySelect.position(500, 720);

  mySelect.changed(onSelect);
}

//connecting select options to loaded images
function onSelect() {
  let selectedOption = mySelect.value();

  if (selectedOption === 'hair') {
    img6 = loadImage('hair.png', () => imgWithHue = img6);
  } else if (selectedOption === 'eyes') {
    img4 = loadImage('eyes.png', () => imgWithHue = img4);
  } else if (selectedOption === '01') {
    img5 = loadImage('one.png', () => imgWithHue = img5);
  } else if (selectedOption === 'sleeve') {
    img3 = loadImage('sleeve.png', () => imgWithHue = img3);
  } else if (selectedOption === 'shirt') {
    img2 = loadImage('shirt.png', () => imgWithHue = img2);
  }
}

function draw() {
  mywindow.draw();

  let windowX = mywindow.x;
  let windowY = mywindow.y;
  let windowWidth = 500;
  let windowHeight = 550;

  beginClip();
  rect(windowX, windowY, windowWidth, windowHeight);
  
  image(img1, windowX, windowY, 500, 550);
  image(img2, windowX, windowY, 500, 550);
  image(img3, windowX, windowY, 500, 550); //images in box and clipping
  image(img4, windowX, windowY, 500, 550);
  image(img5, windowX, windowY, 500, 550);
  image(img6, windowX, windowY, 500, 550);
  
  endClip();

  // hue slider values
  if (imgWithHue) {
    let hueValue = hueSlider.value();
    
    if (hueValue !== prevHueValue) {
      imgWithHue.loadPixels();
      
      // Loop through all the pixels and adjust their hue
      for (let i = 0; i < imgWithHue.pixels.length; i += 4) {
        let r = imgWithHue.pixels[i]; // Red channel
        let g = imgWithHue.pixels[i + 1]; // Green channel
        let b = imgWithHue.pixels[i + 2]; // Blue channel

        // Convert RGB to HSB
        let hsb = rgbToHsb(r, g, b);

        // Adjust the hue (convert back to RGB)
        hsb[0] = (hsb[0] + hueValue) % 360; // Adjust hue based on the slider value

        let rgb = hsbToRgb(hsb[0], hsb[1], hsb[2]);

        // Update the pixels array with the new RGB values
        imgWithHue.pixels[i] = rgb[0]; // Red
        imgWithHue.pixels[i + 1] = rgb[1]; // Green
        imgWithHue.pixels[i + 2] = rgb[2]; // Blue
      }
      imgWithHue.updatePixels();
      prevHueValue = hueValue;
    }
    image(imgWithHue, 100, 100);
  }
}

// Convert RGB to HSB
function rgbToHsb(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let delta = max - min;
  let h = 0;
  let s = (max == 0 ? 0 : delta / max);
  let v = max;

  if (delta != 0) {
    if (max == r) {
      h = (g - b) / delta;
    } else if (max == g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
  }

  h = (h * 60) % 360;
  if (h < 0) {
    h += 360;
  }
  
  return [h, s * 100, v * 100];
}

// Convert HSB to RGB
function hsbToRgb(h, s, b) {
  s /= 100;
  b /= 100;
  let c = b * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = b - c;

  let rgb;

  if (h >= 0 && h < 60) {
    rgb = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    rgb = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    rgb = [0, c, x];
  } else if (h >= 180 && h < 240) {
    rgb = [0, x, c];
  } else if (h >= 240 && h < 300) {
    rgb = [x, 0, c];
  } else {
    rgb = [c, 0, x];
  }

  return [Math.round((rgb[0] + m) * 255), Math.round((rgb[1] + m) * 255), Math.round((rgb[2] + m) * 255)];
}

function resetImages() {
    //reset images
    img1 = originalImages.body;
    img2 = originalImages.shirt;
    img3 = originalImages.sleeve;
    img4 = originalImages.eyes;
    img5 = originalImages.one;
    img6 = originalImages.hair;
    
    // Reset sliders
    hueSlider.value(0);
  }

// Window
var mywindow = {
  x: 50,
  y: 100,
  colour: 'white',
  draw: function() {
    fill(this.colour);
    rect(this.x, this.y, 500, 550);
  },
}

// Requirements: 
// Two or more P5.dom GUI elements (slider, radio box, menu, input, etc.)
// Two or more  use of .value() (either to get or set the GUI value)
// Two or more callback functions (mousePressed, keyPressed, etc.)

// refs
//selection: https://p5js.org/reference/p5/createSelect/
//clipping: https://p5js.org/reference/p5/beginClip/, 
