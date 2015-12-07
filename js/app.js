// running or not ?
var state = false;
var breakT;
// make setIntervals global and accesible
var workTime, breakTime, timer;

// count down until that time
function countDown(minutes, startTime) {
  var timerMinutes = minutes;
  var timerMiliSec = timerMinutes * 60000;
  var timerUTC = Date.parse(startTime) + timerMiliSec;

  var timeLeft = (timerUTC - Date.parse(new Date())) / 1000;
  var timeLeftMinutes = Math.floor(timeLeft / 60);
  var timeLeftSeconds = timeLeft - (timeLeftMinutes * 60);
  return {
    "left": timeLeft, // in seconds
    "minutes": timeLeftMinutes,
    "seconds": timeLeftSeconds
  };
}

function run(id, minutes){
  var startTime = new Date();
  var displayTimer = document.getElementById(id);

  timer = setInterval(function() {
    var time = countDown(minutes, startTime);
    displayTimer.innerHTML = 'minutes: ' + time.minutes + '<br>' +
                             'seconds: ' + time.seconds;
    if(time.left <= 0){
      clearInterval(timer);
      if(id === "work") {
        run("break", breakT);
      } else {
        run("work", minutes);
      }
    }
  },1000);
}

function runPomodoro(idWork, workMinutes){
  var startTime = new Date();
  var displayWorkTimer = document.getElementById(idWork);

  workTimer = setInterval(function() {
    var time = countDown(workMinutes, startTime);
    displayWorkTimer.innerHTML = 'minutes: ' + time.minutes + '<br>' +
                                 'seconds: ' + time.seconds;
    if(time.left <= 0){
      clearInterval(workTimer);
      state = false;
    }
  },1000);
}

function runBreak(idBreak, breakMinutes){
  var startTime = new Date();
  var displayBreakTimer = document.getElementById(idBreak);

  breakTimer = setInterval(function() {
    var time = countDown(1 + breakMinutes);
    displayBreakTimer.innerHTML = 'minutes: ' + time.minutes + '<br>' +
                                  'seconds: ' + time.seconds;
    if(time.left <= 0){
      clearInterval(breakTimer);
    }
  },1000);
}

document.getElementById('run').addEventListener("click",function(){
  var pomodoroT = 1;
  breakT = 1;

  if(state === false){
    state = true;
    run("work", pomodoroT);
  } else {
    state = false;
    clearInterval(timer);
  }
});
