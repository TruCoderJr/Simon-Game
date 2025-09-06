// Initialize game sequences and button colors
let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "black", "blue"];

// DOM elements
let body = document.querySelector("body");
let boxBtn = document.querySelectorAll(".box");
let level = 0;
let lvl = document.querySelector(".lvl");
let isPlay = false;
let str = document.querySelector(".str");

// Score display
let aftLine1 = document.querySelector(".l1");
let aftLine2 = document.querySelector(".l2");

let scr = document.createElement("h3");
let high = document.createElement("h3");

let score = 0;
let highestScore = localStorage.getItem("highestScore") || 0;

scr.innerText = `Score = ${score}`;
high.innerText = `HighestScore = ${highestScore}`;

aftLine1.append(scr);
aftLine2.append(high);

// 🔊 Sound mapping
let sounds = {
  red: new Audio("sounds/red.mp3"),
  green: new Audio("sounds/green.mp3"),
  black: new Audio("sounds/black.mp3"),
  blue: new Audio("sounds/blue.mp3"),
};

function playSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0;
    sounds[color].play();
  }
}

// 🎚 Difficulty control
let difficulty = "medium";
let speedMap = {
  easy: 800,
  medium: 500,
  hard: 250,
};

document.querySelector("#difficulty").addEventListener("change", (e) => {
  difficulty = e.target.value;
});

// 🔆 Flash effect
function flash(btn) {
  btn.classList.add("flash");
  let color = btn.getAttribute("id");
  playSound(color);

  setTimeout(() => {
    btn.classList.remove("flash");
  }, speedMap[difficulty]);
}

// ⬆️ Next level
function levelUp() {
  userSeq = [];
  level++;
  score = level - 1;
  scr.innerText = `Score = ${score}`;

  if (highestScore <= score) {
    highestScore = score;
    localStorage.setItem("highestScore", highestScore);
  }
  high.innerText = `HighestScore = ${highestScore}`;
  lvl.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * 4);
  let ranCol = btns[ranIdx];
  let ranBtn = document.querySelector(`#${ranCol}`);

  gameSeq.push(ranCol);
  flash(ranBtn);
}

// ▶️ Start/Exit button
str.addEventListener("click", function () {
  if (!isPlay) {
    isPlay = true;
    str.innerText = "Exit";
    levelUp();
  } else {
    isPlay = false;
    str.innerText = "Play";
    resetGame();
  }
});

// ✅ Check user answer
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(() => {
        levelUp();
      }, 1000);
    }
  } else {
    lvl.innerHTML = `Game Over!!! Press play button to start again`;
    body.classList.add("danger");

    setTimeout(() => {
      body.classList.remove("danger");
      isPlay = false;
      str.innerText = "Play";
      resetGame();
    }, 1000);
  }
}

// 🎮 Button click handler
function boxBtnPress() {
  if (!isPlay) return; // ignore if game not started

  let btn = this;
  flash(btn);
  let userCol = btn.getAttribute("id");
  userSeq.push(userCol);
  checkAns(userSeq.length - 1);
}

// Attach event listeners
for (let btn of boxBtn) {
  btn.addEventListener("click", boxBtnPress);
}

// ♻️ Reset game
function resetGame() {
  level = 0;
  score = 0;
  gameSeq = [];
  scr.innerText = `Score = ${score}`;
  lvl.innerText = `Press play button to start the game`;
}
