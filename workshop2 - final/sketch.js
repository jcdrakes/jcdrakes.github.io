
let mic;
let micLevel = 0;
let micMultiplier = 4; 
let threshold = 0.2; let threshold2 = 0.8;
let timeAtThreshold = 10; let goalTime = 10; let showPopup = false;
let timeAtThreshold2 = 2; let failTime = 2; let showPopup2 = false;
let backgroundColor;
let gif1; let gif2; let gif3;
let feedback;
let button; 

function preload()
{

gif1 = loadImage('gif1.gif');
gif2 = loadImage('gif2.gif');
gif3 = loadImage('gif3.gif');
feedback = loadImage('feedback.png');

}
function setup() 
{
    createCanvas(windowWidth, windowHeight);
    
    // Set up colors
    backgroundColor = color('black');
    
    // Create microphone input (global variable for library to use)
    mic = new p5.AudioIn();
    
    textAlign(CENTER, CENTER);
    textSize(16);
    
    // lock Gesturs
    lockGestures();

    // Request permission for microphone on iOS
    enableMicTap();
}

function draw() 
{
    background(backgroundColor);
    image(gif1, width/2 - 110, height/2 - 150, 250, 250);

    if (window.micEnabled) 
    {
    
        micLevel = mic.getLevel() * micMultiplier;
        
       if (micLevel > threshold2) {
            image(gif3, width/2 - 110, height/2 - 150, 250, 250);
            timeAtThreshold2 += deltaTime / 200;
            if (timeAtThreshold2 > failTime && !showPopup2) {
                timeAtThreshold2 = failTime;
                 fail();
            }
        } else if (micLevel > threshold) {
            image(gif2, width/2 - 110, height/2 - 150, 250, 250);
            timeAtThreshold += deltaTime / 200;
            if (timeAtThreshold > goalTime && !showPopup) {
                timeAtThreshold = goalTime;
                congrats();
            }
        } else {
            timeAtThreshold = 0;
            image(gif1, width/2 - 110, height/2 - 150, 250, 250);
        }
    }
        
        text ("How loud can you get without getting caught? ",width/4, height/9,200);
        // goal value display
        fill(150);
        text("Time Held at Goal: " + nf(timeAtThreshold, 1, 2) + " / " + goalTime + " seconds", width/1.8, height/5);
        
         if (showPopup) {
             fill(0, 0, 0, 500);
             rect(0, 0, width, height);
              fill(0, 255, 0);
              textSize(16);
            text("Congratulations! You reached the goal!", width / 1.8, height / 2 - 30);
             text("Please scan for feedback", width / 2, height / 2 - 10);
                image(feedback, width/2 - 110, height/2 - 300,250, 250);
                createRetryButton();
        }
         
         if (showPopup2) {
             fill(0, 0, 0, 500);
            rect(0, 0, width, height);
              fill(255, 0, 0);
              textSize(16);
            text("Too Loud! You got caught!", width / 2, height / 2 - 30);
             text("Please try again", width / 2, height / 2 -10);
             image(gif3, width/2 - 110, height/2 - 300, 250, 250);
            createRetryButton();
        }

          // Calculate bar height based on mic level
        let barHeight = map(micLevel, 0, 1, 0, height);
        
        // Draw full-width bar graph from bottom
        let thresholdX = map(threshold, 0, 1, 0, width);
        fill(100, 200, 255);
        noStroke();
        rect(thresholdX, height - barHeight, 20, barHeight);
        
        // Draw threshold line
        thresholdX = map(threshold, 0, 1, 0, width);
        stroke('white');
        strokeWeight(2);
        line(95, 10, 95, height);
        
        // Label the threshold line
        fill(255, 200, 0);
        noStroke();
        text("Threshold ->", thresholdX - 65, height / 2,25);
        
        // Instructions
        fill(255);
        //text("Can you get to the goal without the librarian catching you?", width/9, height - 230, 350);
        text("Make as much noise as you can into the mic for 10 seconds without passing the threshold. ", width/4, height - 100,300);
    }

//FUNCTIONS

function createRetryButton() {
    if (!button) { 
        button = createButton('Retry');
        button.position(windowWidth / 2 - 40, windowHeight / 2 + 130);
        button.mousePressed(retry);
        button.touchStarted(retry);
        button.addClass('white-button');
    }
}

function congrats(){
    if (timeAtThreshold >= goalTime){
        showPopup = true;
        createRetryButton();
    }
}

function fail() {
    if (timeAtThreshold2 >= failTime){
    showPopup2 = true;
    createRetryButton();
    }
}

function retry() {
    timeAtThreshold = 0;
    showPopup = false;
    showPopup2 = false;
    timeAtThreshold2 = 0;
    button.remove();
    button = null;
    textSize(16);
}

// ==============================================
// TOUCH EVENT FUNCTIONS
// ==============================================

// This function runs when a new touch begins
function touchStarted() 
{
    // Touch positions will be updated in draw() function
    return false;
}

// This function runs when a touch ends
function touchEnded() 
{
    // Touch positions will be updated in draw() function
    return false;
}