const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const sessionCount = document.getElementById("session-count");
const alertSound = document.getElementById("alert-sound");

let timerDuration = 25 * 60; // 25 minutes
let timeLeft = timerDuration;
let timer = null;
let sessions = 0;

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        alertSound.play();
        alert("Time's up! Take a break!");
        sessions++;
        sessionCount.textContent = `Pomodoros Completed: ${sessions}`;
        timeLeft = timerDuration;
        updateDisplay();
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  stopTimer();
  timeLeft = timerDuration;
  updateDisplay();
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Initial setup
updateDisplay();
