// Initialize game sequences and button colors
let gameSeq = []; // Stores the sequence of colors to be followed by the user
let userSeq = []; // Stores the user's input sequence
let btns = ["red", "green", "black", "blue"]; // Available button colors

// DOM element references
let body = document.querySelector('body'); // Reference to the body element for visual effects
let boxBtn = document.querySelectorAll('.box'); // All game buttons

let level = 0; // Tracks the current game level
let lvl = document.querySelector('.lvl'); // Displays the current level
let isPlay = false; // Indicates if the game is in play mode
let str = document.querySelector('.str'); // Start/Exit button

let highestScore = 0; // Tracks the highest score achieved
let score = 0; // Tracks the current score

// Score display elements
let aftLine1 = document.querySelector(".l1");
let aftLine2 = document.querySelector(".l2");

let scr = document.createElement('h3'); // Element to display the current score
let high = document.createElement('h3'); // Element to display the highest score

scr.innerText = `Score = ${score}`; // Initialize score display
high.innerText = `HighestScore = ${highestScore}`; // Initialize highest score display

aftLine1.append(scr); // Append score element to the DOM
aftLine2.append(high); // Append highest score element to the DOM

/**
 * Flashes a button to indicate the sequence visually.
 * @param {HTMLElement} btn - The button element to flash.
 */
function flash(btn) {
    btn.classList.add('flash'); // Add flash effect
    setTimeout(() => {
        btn.classList.remove('flash'); // Remove flash effect after 333ms
    }, 333);
}

/**
 * Advances the game to the next level.
 * Resets the user sequence, updates the score, and generates a new color in the sequence.
 */
function levelUp() {
    userSeq = []; // Clear user sequence for the new level
    level++; // Increment the level
    score = level - 1; // Update score (level starts from 1)
    scr.innerText = `Score = ${score}`; // Update score display

    if (highestScore <= score) {
        highestScore = score; // Update highest score if the current score exceeds it
    }
    high.innerText = `HighestScore = ${highestScore}`; // Update highest score display
    lvl.innerText = `Level ${level}`; // Update level display

    let ranIdx = Math.floor(Math.random() * 4); // Random index for button color
    let ranCol = btns[ranIdx]; // Random color
    let ranBtn = document.querySelector(`.${ranCol}`); // Corresponding button element

    gameSeq.push(ranCol); // Add the random color to the game sequence
    flash(ranBtn); // Flash the random button
}

/**
 * Handles the Start/Exit button click event.
 * Toggles between starting and stopping the game.
 */
str.addEventListener('click', function () {
    if (!isPlay) {
        isPlay = true; // Set play mode to true
        str.innerText = "Exit"; // Update button text
        levelUp(); // Start the game
    } else {
        isPlay = false; // Set play mode to false
        str.innerText = "Play"; // Update button text
        level = 0; // Reset level
        score = 0; // Reset score
        lvl.innerText = `Press play button to start the game`; // Reset level display
    }
});

/**
 * Checks the user's input sequence against the game sequence.
 * Ends the game if the input is incorrect; otherwise, advances to the next level.
 * @param {number} idx - The index of the current button in the sequence.
 */
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // If the user sequence matches the game sequence
        if (gameSeq.length - 1 === userSeq.length - 1) {
            // If the user has completed the current sequence
            setTimeout(() => {
                levelUp(); // Advance to the next level
            }, 1000);
        }
    } else {
        // If the user sequence is incorrect
        lvl.innerHTML = `Game Over!!! Press play button to start the game`;
        body.classList.add('danger'); // Add visual feedback for game over
        setTimeout(() => {
            body.classList.remove('danger'); // Remove visual feedback
            isPlay = false; // Reset play mode
            str.innerText = "Play"; // Update button text
            level = 0; // Reset level
            score = 0; // Reset score
            gameSeq = []; // Clear the game sequence
        }, 1000);
    }
}

/**
 * Handles user button clicks.
 * Flashes the button, adds the button's color to the user sequence, and checks the answer.
 */
function boxBtnPress() {
    let btn = this; // Reference to the clicked button
    flash(btn); // Flash the button
    let userCol = btn.getAttribute('id'); // Get the button's color
    userSeq.push(userCol); // Add the color to the user sequence
    checkAns(userSeq.length - 1); // Check the user's input
}

// Attach event listeners to all game buttons
for (let btn of boxBtn) {
    console.log(btn);
    
    btn.addEventListener('click', boxBtnPress);
}
