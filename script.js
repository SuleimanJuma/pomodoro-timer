const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const modeIndicator = document.getElementById("mode-indicator");
const sessionCount = document.getElementById("session-count");
const alertSound = document.getElementById("alert-sound");

const themeToggle = document.getElementById("theme-toggle");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task");

let isFocus = true;
let focusDuration = 25 * 60;
let breakDuration = 5 * 60;
let timeLeft = focusDuration;
let timer = null;
let sessions = 0;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  modeIndicator.textContent = isFocus ? "Focus Mode" : "Break Time";
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

        if (isFocus) {
          sessions++;
          sessionCount.textContent = `Pomodoros Completed: ${sessions}`;
          isFocus = false;
          timeLeft = breakDuration;
          alert("Nice! Time for a 5-min break.");
        } else {
          isFocus = true;
          timeLeft = focusDuration;
          alert("Break’s over! Back to work 💪");
        }

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
  isFocus = true;
  timeLeft = focusDuration;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Theme toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

// Task list
addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task !== "") {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
    taskInput.value = "";
  }
});

// Initial UI state
updateDisplay();
