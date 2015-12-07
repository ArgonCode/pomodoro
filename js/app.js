var state = false; // running or not ?
var breakT = 5;
var pomodoroT = 25;
var timer;

// Update HTML
function updatePomodoro(min, sec){
  document.getElementById("work-min").innerHTML = min;
  document.getElementById("work-sec").innerHTML = sec;
}

function updateBreak(min, sec){
    document.getElementById("break-min").innerHTML = min;
    document.getElementById("break-sec").innerHTML = sec;
}

//  Timer functions
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

  timer = setInterval(function() {
    var time = countDown(minutes, startTime);
    if(id === "work"){
      updatePomodoro(time.minutes, time.seconds);
    } else {
      updateBreak(time.minutes, time.seconds);
    }

    if(time.left <= 0){
      clearInterval(timer);
      if(id === "work") {
        updatePomodoro(pomodoroT, "00");
        run("break", breakT);
      } else {
        updateBreak(breakT, "00");
        run("work", pomodoroT);
      }
    }
  },1000);
}

// Event Listeners
document.getElementById('run').addEventListener("click",function(){
  updatePomodoro(pomodoroT, "00");
  updateBreak(breakT, "00");

  if(state === false){
    state = true;
    run("work", pomodoroT);
  } else {
    state = false;
    clearInterval(timer);
    updatePomodoro(pomodoroT, "00");
    updateBreak(breakT, "00");
  }
});

document.getElementById('plus-pomodoro').addEventListener("click",function(){
  pomodoroT++;
  updatePomodoro(pomodoroT, "00");
});

document.getElementById('minus-pomodoro').addEventListener("click",function(){
  if(pomodoroT > 0) {
    pomodoroT--;
  }else{
    pomodoroT = 0;
  }
  updatePomodoro(pomodoroT, "00");
});

document.getElementById('plus-break').addEventListener("click",function(){
  breakT++;
  updateBreak(breakT, "00");
});

document.getElementById('minus-break').addEventListener("click",function(){
  if(breakT > 0) {
    breakT--;
  }else{
    breakT = 0;
  }
  updateBreak(breakT, "00");
});

// Update time on page load
updateBreak(breakT, "00");
updatePomodoro(pomodoroT, "00");
