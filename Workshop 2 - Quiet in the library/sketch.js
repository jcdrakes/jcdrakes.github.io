//variables
let mic;
let micLevel = 0;
let micMultiplier = 4;
let threshold = 0.2; 
let threshold2 = 0.8;
let backgroundColor
let gif1; let gif2; let gif3;
let timeAtThreshold = 10; let goalTime = 10; let showPopup = false;
let timeAtThreshold2 = 2; let failTime = 2; showPopup2 = false;
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

    backgroundColor = color('black');
    
    mic = new p5.AudioIn();
    
    textAlign(CENTER, CENTER);
    textSize(16);
    
    lockGestures();

    enableMicTap();
}

function draw() 
{
    background(backgroundColor);
   image(gif1, width/2 - 110, height/2 - 150, 250, 250);

    
    // Check if microphone is available
       if (window.micEnabled) {
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
        
        // Display numeric value with more precision
        fill(200);
        text("Microphone Level: " + nf(micLevel, 1, 3), width/2, height/10 + 40);
        
        // Display time held at threshold1
        fill(150);
        text("Time Held at Goal: " + nf(timeAtThreshold, 1, 2) + " / " + goalTime + " seconds", width/2, height/9 + 80);
        
         if (showPopup) {
             fill(0, 0, 0, 500);
             rect(0, 0, width, height);
              fill(0, 255, 0);
              textSize(16);
            text("Congratulations! You reached the goal!", width / 2, height / 2 - 30);
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
        rect(thresholdX - 45, height - barHeight, 20, barHeight);
        
        // Draw threshold line
        thresholdX = map(threshold, 0, 1, 0, width);
        stroke('white');
        strokeWeight(2);
        line(50, 10, 50, height);
        
        // Label the threshold line
        fill(255, 200, 0);
        noStroke();
        text("Goal ->", thresholdX - 65, height / 2,10);
        
        // Instructions
        fill(255);
        //text("Can you get to the goal without the librarian catching you?", width/9, height - 230, 350);
        text("Instructions: Make as much noise as you can into the mic for 10 seconds without getting caught to win. ", width/8, height - 230,350);
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
