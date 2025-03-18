   // Riddles database and system messages
const riddleDatabase = [
    { question: 'If 2 is company and 3 is a crowd, what are 4 and 5?', answer: ['9', 'nine'] },
    { question: 'If you multiply this number by any other number, the answer will always be the same. What number is this?', answer: ['0', 'zero'] },
    { question: 'What has hands but cannot clap?', answer: ['clock', 'a clock'] },
    { question: 'Which fish costs the most?', answer: ['goldfish', 'a goldfish'] },
    { question: 'The more of this there is, the less you see. What is it?', answer: 'darkness' },
    { question: 'What has legs, but does not walk?', answer: ['table', 'a table', 'chair', 'a chair'] },
    { question: 'What has words, but never speaks?', answer: ['book', 'a book'] },
    { question: 'What goes through cities and fields, but never moves?', answer: ['road', 'a road'] },
    { question: 'I have lakes with no water, mountains with no stone and cities with no buildings. What am I?', answer: ['map', 'a map'] },
    { question: 'What can you catch, but not throw?', answer: ['cold', 'a cold'] },
    { question: 'What kind of room has no doors or windows?', answer: ['mushroom', 'a mushroom'] },
    { question: 'What has many keys but cannot open a single lock?', answer: ['piano', 'a piano'] },
    { question: 'What has a head and a tail but no body?', answer: ['coin', 'a coin'] },
    { question: 'What has one head, one foot, and four legs?', answer: ['a bed', 'bed'] },
    { question: 'What starts with T, ends with T, and has T in it?', answer: ['a teapot', 'teapot'] },
    { question: 'Poor people have it. Rich people need it. If you eat it you die. What is it?', answer: ['nothing'] },
    { question: 'What building has the most stories?', answer: ['a library', 'library'] },
    { question: 'What goes up but never comes down?', answer: ['age', 'your age'] },
    { question: 'What must be broken before you can use it?', answer: ['an egg', 'egg'] },
    { question: 'What has branches, but no fruit, trunk or leaves?', answer: ['a bank', 'bank'] },
    { question: 'What is black when it’s clean and white when it’s dirty?', answer: ['a chalkboard', 'chalkboard'] },
    { question: 'What begins with an "e" and only contains one letter?', answer: ['an envelope', 'envelope'] },
    { question: 'I am easy to lift, but hard to throw. What am I?', answer: ['a feather', 'feather'] },
    { question: ' What is full of holes but still holds water?', answer: ['sponge', 'a sponge'] }
];

const systemMessages = [
    "Every step you take echoes in the dark.",
    "You feel a presence behind you.",
    "This hallway seems to be getting colder and colder.",
    "The silence is eerie.",
    "You wonder how long you can continue going."
];

const textMessages = {
    doorDeath: "You were killed in a fiery blaze.",
    runningSurvive: "You seem to have lost the killer.",
    turnSurvive: "It seems the killer is getting closer.",
    ignoreSurvive: "Speeding up, it seems you have lost the killer",
    continueSurvive: "The killer is extremly close.",
    restSurvive: "You seem to be getting closer to escaping.",
    towardsDeath: "You die in the killers strangely warm embrace.",
    nextSurvive: "You seem to be getting closer to escaping.",
    aroundSurvive: "You seem to have lost the killer."
};

//player status
let playerSurvived = true;
let playerDied = true;

const situationMessages = [
{ //1
question: 'You feel a cool breeze coming from a door to your left. Do you:', 
options: ['open the door.', 'keep running.'],
outcomes: {
    door: 'You open the door, and a blinding light overcomes all of your senses. Suddenly, everything feels hot. Was this a trap? Of course it was. You can feel your eyelashes and eyebrows starting to burn, then your clothes catch aflame. As you try to scream, your lungs fill with smoke. This might be a death worse than what that killer was planning.', //death
    running:'You continue to run as fast as you can. For some reason, you cannot help but feel you escaped a painful death.' // survive
    }},
    //2
{question: 'Between your heavy breathing, you think you hear someone calling out to you. Do you:',
options: ['Turn around.','Ignore it.'],
outcomes: {
    turn:  'you stop in your tracks and slowly turn around, it seems like it was just your imagination. As you begin to run again, a door behind you opens.', //killer catches up
    ignore: 'You keep running and decide to ignore any sounds you hear.' //loses killer
}},
//3
{question: 'You finally feel like you are far enough from the killer to take a break. Do you:',
    options: ['Continue.','Rest in nearby room.'],
    outcomes: {
        continue:  'You keep running when suddenly you notice your legs arent keeping up with the rest of your body. You fall over with a huge thud and hear a large door behind you swing open.', //killer catches up
        rest: 'You quietly open the first door you see and sit on the floor. While trying to catch your breath, you notice a tiny door in the corner and decide that is your way out.' //defining moment you win the game
    }
},
//4
{question: 'You see a bit of light coming from behind a door at the end of the hallway. Do you:',
    options: ['Go towards it.','Enter the room next to it.', 'Turn around completely.'],
    outcomes: {
        towards:  'As you walk towards the door, you start feeling uneasy. Grabbing onto the doorknob, you twist and pull as hard as you can to no avail. As you are about to let go, the door is forcefully flung open, taking you with it. Within seconds, you feel something sharp pierce your stomach and something wet causing your shirt to stick to your skin. Looking up, you see a hooded man shrouded in shadow, he pulls you into an embrace as everything around you fades to darkness.', //death
        next: 'You decide the room is a trap and try heading into the one next to it. Inside is another door with another lock. You sigh as you prepare to answer another riddle. Maybe its time to give up.', // you survive and get closer to winning
        around: 'The vibes in this hallway seem terrible, and you cannot stop shaking. You decide that turning around completely seems like the best option. Maybe checking the doors you skipped previously will take you closer to the exit?' // you lose the killer 
    }},
];

const finalQuestion =[
    {question5: 'After slowly crawling through the dark, wet crawlspace for what seemed like 30 minutes, you begin to hear a plethora of noise, not just any noise but the sounds of people talking, cars and dogs barking. This is it. You have made it. Now, all you need to do is get out of this stupid hole. Do you:',
        options: ['Try to pry the wood open.','Call out for help.'],
        outcomes: {
            wood:  'Thinking staying as quiet as possible is better, you try to pry the wood open with your bare hands. Covered in splinters, you do not give up, you cannot, not when you are this close to being free, to getting out of this nightmare of a situation you were placed in. You do not deserve to die like this. Full of emotion, you begin kicking the wood as hard as you can, and it begins to snap. Finally, the hole is big enough for you to crawl out of. You did it. You escaped. As you lay on the ground in front of the hole, a few minutes later bystanders start to pass by. You begin to sob as you hear someone calling the police. A kind woman approaches you and helps you stand up. You are saved.', // you win
            scream: 'Feeling a rush of adrenaline, you begin to scream, you scream as loud as you can, begging for someone to help you. You continue to crawl towards the wood and get ready to pry it open when suddenly, you feel something tug on your leg. Your pants probably got caught on something. Don’t think about it; you are almost free. The tugging gets stronger and more frequent as you try to move forward. Stopping in your tracks, you slowly turn your head and tilt your head up. Behind you is a hooded man dressed head to toe in black. You try to kick him, but it’s too late. Glancing at his hand, you notice a large axe. He swings it up, and it lands in your right calf. You are not going anywhere. As you scream in pain, he begins to drag you backwards. Back to the tiny door you escaped from. Grabbing onto anything you can, trying to stop his movement, you see the light from the outside world slowly fading, the sounds of life getting further and further. I guess you should not have gotten your hopes up.'//death
        }
    }
];

let currentRiddle = {};  // Store the current riddle

// Random riddle function
function getRandomRiddle() {
    const randomIndex = Math.floor(Math.random() * riddleDatabase.length);
    currentRiddle = riddleDatabase[randomIndex];
    document.getElementById("riddle").textContent = currentRiddle.question;
    document.getElementById("responseMessage").textContent = "";  // Clear previous messages
    document.getElementById("answerInput").value = "";  // Clear the input field
}

// Check answers and handle messages
function checkAnswer() {
    const userAnswer = document.getElementById("answerInput").value.toLowerCase().trim();
    const responseMessage = document.getElementById("responseMessage");

    // Check if the user's answer is correct (case-insensitive)
    const correctAnswers = currentRiddle.answer.map(answer => answer.toLowerCase());

    let messageText = "";
    let messageClass = "message";

    // Display response message based on answer correctness
    if (correctAnswers.includes(userAnswer)) {
        messageText = "You managed to lose the killer.";
        messageClass = "message correct"; 
    } else {
        messageText = "The killer is getting closer.";
        messageClass = "message wrong";
    }

    // Add the response message to the message container
    addMessage(messageText, messageClass);

    // Clear the input field after checking the answer
    document.getElementById("answerInput").value = "";

    // Set a timeout to show the new riddle after a short delay
    setTimeout(() => {
        getRandomRiddle();  // Display a new riddle after a short delay
    }, 1000);
}

// Function to add a new message to the container
function addMessage(messageText, messageClass) {
    const messageContainer = document.getElementById("messageContainer");

    // Create a new message element
    let messageElement = document.createElement("p");
    messageElement.className = messageClass;
    messageElement.textContent = messageText;

    // Add the new message to the container
    messageContainer.appendChild(messageElement);

    // Limit the number of messages to 5
    let allMessages = messageContainer.getElementsByTagName("p");
    if (allMessages.length > 5) {
        messageContainer.removeChild(allMessages[0]); // Remove the oldest message
    }
}

// Function to show a system message at a set interval (every 2 minutes)
function showSystemMessage() {
    const randomSystemMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
    addMessage(randomSystemMessage, "systemMessage");
}

setInterval(showSystemMessage, 30000);

document.querySelector(".Button").addEventListener("click", checkAnswer);

        //script to unhide riddle containers after popup 
        let popup = document.getElementById("popup");
        let riddleContainer =document.getElementById("riddleContainer");
       
        let messageContainer = document.getElementById("messageContainer");
        let messageText = "";
        let messageClass = "message";

        const randomSystemMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
        document.getElementById("systemMessage").textContent = randomSystemMessage;


        function closePopup(){
            popup.classList.add("close-popup");
        }

        function startGame(){
            closePopup();
            riddleContainer.style.display = "block";
            riddleContainer.style.visibility = "visible";
            situationPopup.style.visibility = "visible";
        }

        // Function to show the situational popup
// Function to show the situational popup
function showSituationPopup() {
        const situationPopup = document.getElementById("situationPopup");
        const situationMessagesElement = document.getElementById("situationMessages");
        const buttons = document.querySelectorAll('.choiceButton'); // Get all the buttons
    
        // Hide any existing buttons and reset their content
        buttons.forEach(button => {
            button.style.display = "none"; // Hide all buttons initially
            button.textContent = ""; // Reset button text content
        });
    
        // Pick a random situation from the array
        const randomSituation = situationMessages[Math.floor(Math.random() * situationMessages.length)];
    
        // Log the random situation to verify its structure
        console.log("Random Situation:", randomSituation);
    
        // Update the question and options dynamically
        situationMessagesElement.textContent = randomSituation.question;
    
        // Ensure options are present and correctly assigned
        if (randomSituation.options && randomSituation.options.length > 0) {
            console.log("Options for situation:", randomSituation.options); // Log options to check
            buttons[0].textContent = randomSituation.options[0]; // Set the first option
            buttons[1].textContent = randomSituation.options[1]; // Set the second option
    
            // Set the corresponding 'onclick' values for each button
            buttons[0].setAttribute("onclick", `makeChoice('${randomSituation.options[0]}')`);
            buttons[1].setAttribute("onclick", `makeChoice('${randomSituation.options[1]}')`);
    
            // Make the buttons visible now that they have valid text
            buttons[0].style.display = "inline-block"; 
            buttons[1].style.display = "inline-block"; 
        }
    
    }

// Function to handle the choice and display the outcome
const outcomes = {
   'Open the door.': "You open the door, and a blinding light overcomes all of your senses. Suddenly, everything feels hot. Was this a trap? Of course it was. You can feel your eyelashes and eyebrows starting to burn, then your clothes catch aflame. As you try to scream, your lungs fill with smoke. This might be a death worse than what that killer was planning.",
    'Keep running.':'You continue to run as fast as you can. For some reason, you cannot help but feel you escaped a painful death.',
    'Turn around.':  'you stop in your tracks and slowly turn around, it seems like it was just your imagination. As you begin to run again, a door behind you opens.',
   'Ignore it.': 'You keep running and decide to ignore any sounds you hear.',
    'Continue.':  'You keep running when suddenly you notice your legs arent keeping up with the rest of your body. You fall over with a huge thud and hear a large door behind you swing open.',
   'Rest in nearby room.': 'You quietly open the first door you see and sit on the floor. While trying to catch your breath, you notice a tiny door in the corner and decide that is your way out.',
   'Go towards it.':  'As you walk towards the door, you start feeling uneasy. Grabbing onto the doorknob, you twist and pull as hard as you can to no avail. As you are about to let go, the door is forcefully flung open, taking you with it. Within seconds, you feel something sharp pierce your stomach and something wet causing your shirt to stick to your skin. Looking up, you see a hooded man shrouded in shadow, he pulls you into an embrace as everything around you fades to darkness.',
   'Enter the room next to it.': 'You decide the room is a trap and try heading into the one next to it. Inside is another door with another lock. You sigh as you prepare to answer another riddle. Maybe its time to give up.',
    'Turn around completely.': 'The vibes in this hallway seem terrible, and you cannot stop shaking. You decide that turning around completely seems like the best option. Maybe checking the doors you skipped previously will take you closer to the exit?'
};
function makeChoice(choice) {
    console.log(`Choice clicked: ${choice}`);  // Log the clicked choice
    const outcomeText = outcomes[choice];


    // If outcome not found, log error and exit
    if (!outcomeText) {
        console.error("Outcome for choice '" + choice + "' not found in situation.");
        return;
    }
    let messageText = "";  // Declare messageText for system messages

    const outcomeElement = document.getElementById("outcomeMessage");
    if (outcomeElement) {
        outcomeElement.textContent = outcomeText;  // Update the content of the outcome message element
        outcomeElement.style.display = "block";  // Ensure it's visible on the page
      } else {
    console.error(`Outcome not found for choice: ${choice}`);
     }

    // Setting messages based on choices
    if (choice === 'Open the door.') {
        playerSurvived = false;
        messageText = textMessages.doorDeath;
    } else if (choice === 'Keep running.') {
        playerSurvived = true;
        messageText = textMessages.runningSurvive;
    }

    // For question 2
    if (choice ===  'Turn around.') {
        playerSurvived = true;
        messageText = textMessages.turnSurvive;
    } else if (choice ===  'Ignore it.') {
        playerSurvived = true;
        messageText = textMessages.ignoreSurvive;
    }

    // For question 3
    if (choice === 'Continue') {
        playerSurvived = true;
        messageText = textMessages.continueSurvive;
    } else if (choice === 'Rest in nearby room.') {
        playerSurvived = true;
        messageText = textMessages.restSurvive;
    }

    // For question 4
    if (choice ===  'Go towards it.') {
        playerSurvived = false;
        messageText = textMessages.towardsDeath;
    } else if (choice ===  'Enter the room next to it.') {
        playerSurvived = true;
        messageText = textMessages.nextSurvive;
    } else if (choice === 'Turn around completely.') {
        playerSurvived = true;
        messageText = textMessages.aroundSurvive;
    }

    // Display the outcome message in the system message container
    const systemMessageContainer = document.getElementById("systemMessage");
    systemMessageContainer.textContent = messageText; // Add the message to the container   

    // Hide the popup after the player chooses
    document.getElementById("situationPopup").style.display = "none";

}
       
        // Display the outcome message in the system message container
        const systemMessageContainer = document.getElementById("systemMessage");
        systemMessageContainer.textContent = messageText; // Add the message to the container 
        
        const playerOutcomeMessageContainer = document.getElementById("playerOutcomeMessage");
        playerOutcomeMessageContainer.textContent = messageText;

    // Hide the popup after the player chooses
    document.getElementById("situationPopup").style.display = "none";

     // Show the close button
     const closeButton = document.getElementById("closeOutcomeMessage");
     if (closeButton) {
         closeButton.style.display = "block";  // Show the close button
     }
 
     // Hide the situational popup after the player makes a choice
     document.getElementById("situationPopup").style.display = "none";
 
     // Set a timeout to hide the outcome message and the popup after a few seconds
     setTimeout(function() {
         // Hide the outcome message
         const outcomeElement = document.getElementById("outcomeMessage");
         if (outcomeElement) {
             outcomeElement.style.display = "none";  // Hide the outcome message
         }
 
         // Hide the "Close" button
         const closeButton = document.getElementById("closeOutcomeMessage");
         if (closeButton) {
             closeButton.style.display = "none";  // Hide the close button
         }
 
         // Show the situational popup again after the timeout, if you want to continue the story
         document.getElementById("situationPopup").style.display = "block"; // Show the popup after a delay
     }, 5000); // 5000ms = 5 seconds

// Set interval to show the situation popup every 3 minutes (180,000ms)
setInterval(showSituationPopup, 10000); // 180000 = 3 minutes

console.log(randomSituation);

