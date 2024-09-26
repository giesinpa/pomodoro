const timeDisplay = document.getElementById('time');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');

let timer;
let isRunning = false;
let currentTimer = 'work';
const workTime = 25 * 60; // Fixed work time in seconds
const shortBreakTime = 5 * 60; // Fixed short break time in seconds
let timeRemaining = workTime; // Initialize timeRemaining with initial work time

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startPauseButton.textContent = 'Pause';
    timer = setInterval(updateTimer, 1000);
  } else {
    isRunning = false;
    startPauseButton.textContent = 'Start';
    clearInterval(timer);
  }
}

function resetTimer() {
  isRunning = false;
  startPauseButton.textContent = 'Start';
  clearInterval(timer);
  timeRemaining = workTime; // Reset timeRemaining to workTime
  timeDisplay.textContent = `🍅 ${timeRemaining / 60}:00`;
  currentTimer = 'work';
}

function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  timeDisplay.textContent = `🍅 ${minutes}:${seconds}`;

  if (timeRemaining === 0) {
    clearInterval(timer);
    if (currentTimer === 'work') {
      currentTimer = 'short_break';
      timeRemaining = shortBreakTime;
    } else {
      currentTimer = 'work';
      timeRemaining = workTime;
    }
    startTimer();
  } else {
    timeRemaining--;
  }
}

startPauseButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
