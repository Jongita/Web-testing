let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 1000);
    running = true;
    startStopBtn.innerHTML = "Stop";
}

function stop() {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.innerHTML = "Start";
}

function reset() {
    stop();
    elapsedTime = 0;
    display.innerHTML = "00:00:00";
    laps.innerHTML = "";
}

function lap() {
    if (running) {
        let lapTime = timeToString(elapsedTime);
        let li = document.createElement("li");
        li.innerText = lapTime;
        laps.appendChild(li);
    }
}

startStopBtn.addEventListener("click", () => {
    if (running) {
        stop();
    } else {
        start();
    }
});

resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
