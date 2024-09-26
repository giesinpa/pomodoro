const timeDisplay = document.getElementById('time');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('work-time');
const shortBreakTimeInput = document.getElementById('short-break-time');
const longBreakTimeInput = document.getElementById('long-break-time');

let timer;
let isRunning = false;
let currentTimer = 'work';
let workTime = parseInt(workTimeInput.value);
let shortBreakTime = parseInt(shortBreakTimeInput.value);
let longBreakTime = parseInt(longBreakTimeInput.value);
let cyclesCompleted = 0;

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
    timeDisplay.textContent = `${workTime}:00`;
    currentTimer = 'work';
    cyclesCompleted = 0;
}

function updateTimer() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (timeRemaining === 0) {
        clearInterval(timer);
        if (currentTimer === 'work') {
            if (cyclesCompleted % 4 === 0) {
                currentTimer = 'long_break';
                timeRemaining = longBreakTime * 60;
            } else {
                currentTimer = 'short_break';
                timeRemaining = shortBreakTime * 60;
            }
        } else {
            currentTimer = 'work';
            timeRemaining = workTime * 60;
            cyclesCompleted++;
        }
        startTimer();
    } else {
        timeRemaining--;
    }
}

startPauseButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

workTimeInput.addEventListener('change', () => {
    workTime = parseInt(workTimeInput.value);
    if (!isRunning) {
        timeDisplay.textContent = `${workTime}:00`;
    }
});

shortBreakTimeInput.addEventListener('change', () => {
    shortBreakTime = parseInt(shortBreakTimeInput.value);
});

longBreakTimeInput.addEventListener('change', () => {
    longBreakTime = parseInt(longBreakTimeInput.value);
});

// Initial timer setup
timeRemaining = workTime * 60;
timeDisplay.textContent = `${workTime}:00`;
