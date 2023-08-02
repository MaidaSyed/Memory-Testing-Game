// ALL ELEMENTS
const homePage = document.querySelector(".home")
const input = document.querySelector("input");
const startBtn = document.querySelector(".btn");
const loader = document.querySelector(".atomicLoader");
const gameContainer = document.querySelector(".container");
const game = document.querySelector(".game");
const restart = document.querySelector(".restart");
const countdownElement = document.querySelector("#timer");
const move = document.querySelector("#move");
const resultBox = document.querySelector(".result");
const resultMove = document.querySelector("#resultMove");
const resultTime = document.querySelector("#resultTime");
const userInput = document.querySelector("#userName")
const restartBtn = document.querySelector("#btn");

// CARD INNER CONTENT
const emojis = [
  "😉",
  "😉",
  "🎁",
  "🎁",
  "👍",
  "👍",
  "🌹",
  "🌹",
  "👏",
  "👏",
  "👀",
  "👀",
  "🎂",
  "🎂",
  "🤣",
  "🤣",
];

// INITIALY DISPLAY NONE FOR LOADER AND GAME
gameContainer.style.display = "none";
loader.style.display = "none";
// ================================

let userName;
// START BUTTON
startBtn.addEventListener("click", () => {
  homePage.style.display = "none";
  loader.style.display = "flex";

  // GET INPUT VALUE
 userName = input.value;
// ============================

  setTimeout(function () {
    loader.style.display = "none";
    cards();
    startTimer();
  }, 1500);
});
// ===================================

// TIMER IN GAME
let startTime;
let minutes = 0;
let seconds = 0;
let timerInterval;

function updateTimerDisplay() {
  const minutesDisplay = String(minutes).padStart(2, "0");
  const secondsDisplay = String(seconds).padStart(2, "0");
  countdownElement.textContent =
    "Timer: " + `${minutesDisplay}:${secondsDisplay}`;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    updateTimerDisplay();
  }, 1000);
}
// ============================

// TIME TAKEN FOR RESULT
function calculateTimeTaken() {
  const currentTime = Date.now();
  const timeTakenInMilliseconds = currentTime - startTime;

  // Convert time taken from milliseconds to minutes and seconds
  const minutes = Math.floor(timeTakenInMilliseconds / 60000);
  const seconds = Math.floor((timeTakenInMilliseconds % 60000) / 1000);

  return { minutes, seconds };
}
// ======================================

// GAME CONTENT
let moveCounter = 0;
// MADE FUNTION TO CALL AFTER LOADER
function cards() {
  gameContainer.style.display = "flex";
  // SHUFFLING EMOJIS RANDOMLY
  let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

  // CREATING DIV FOR CARDS AND ADDING FUNCTIONING
  for (var i = 0; i < emojis.length; i++) {
    let card = document.createElement("div");
    card.className = "item";
    card.innerHTML = shuffleEmojis[i];

    card.onclick = function () {
      this.classList.add("flip");
      moveCounter++;
      move.textContent = "Moves: " + moveCounter;

      setTimeout(function () {
        if (document.querySelectorAll(".flip").length > 1) {
          if (
            document.querySelectorAll(".flip")[0].innerHTML ==
            document.querySelectorAll(".flip")[1].innerHTML
          ) {
            document.querySelectorAll(".flip")[0].classList.add("cardMatch");
            document.querySelectorAll(".flip")[1].classList.add("cardMatch");

            document.querySelectorAll(".flip")[1].classList.remove("flip");
            document.querySelectorAll(".flip")[0].classList.remove("flip");

            if (
              document.querySelectorAll(".cardMatch").length == emojis.length
            ) {
              showResult();
            }
          } else {
            document.querySelectorAll(".flip")[1].classList.remove("flip");
            document.querySelectorAll(".flip")[0].classList.remove("flip");
          }
        }
      }, 500);
    };

    game.appendChild(card);
  }
}
//==================================================

// RESTART BUTTON FUNCTION IN GAME
restart.addEventListener("click", () => {
  window.location.reload();
});
// ===================================

// RESULT BOX
function showResult() {
  // SHOWING RESULT BOX
  gameContainer.style.display = "none";
  resultBox.style.display = "block";
  resultMove.textContent = "moves: " + moveCounter;

  // PUT USER NAME 
  if (userName === ""){
    userInput.innerHTML = "";
  }
  else {
    userInput.textContent = userName + "🏅";
  }

  // TIMER CONTENT
  const { minutes, seconds } = calculateTimeTaken();
  const timeTakenString = `${minutes}min and ${seconds} sec`;
  resultTime.textContent = `Time taken: ${timeTakenString}`;
}

// RESULT BOX RESTART BUTTON
restartBtn.addEventListener("click", () => {
  startBtn.style.display = "block";
  resultBox.style.display = "none";
  window.location.reload();
});
// ================================= THE END ================================
